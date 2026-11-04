import { expect, test } from "@playwright/test";

// The build runs without SITE_URL, so absolute URLs use the site's public address.
const origin = "https://hallb.vercel.app";
const paths = ["/", "/projects", "/design", "/about"];

test.describe("search engines", () => {
  test.use({ javaScriptEnabled: false });

  for (const path of paths) {
    test(`${path} names its canonical URL, description and share image`, async ({ page }) => {
      await page.goto(path);
      const head = page.locator("head");
      const canonical = path === "/" ? origin : `${origin}${path}`;

      await expect(head.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
      await expect(head.locator('meta[name="description"]')).toHaveAttribute("content", /\w{3,}/);
      await expect(head.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
      await expect(head.locator('meta[property="og:title"]')).toHaveAttribute("content", await page.title());
      await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
      await expect(head.locator('meta[name="robots"]')).toHaveCount(0);

      const image = await head.locator('meta[property="og:image"]').getAttribute("content");
      expect(image).toBe(`${origin}/opengraph-image.jpg`);
      await expect(head.locator('meta[name="twitter:image"]')).toHaveAttribute("content", image!);
      await expect(head.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", "Brannen Hall");
      const served = await page.request.get(new URL(image!).pathname);
      expect(served.status()).toBe(200);
      expect(served.headers()["content-type"]).toBe("image/jpeg");
    });
  }

  test("pages carry valid structured data", async ({ page }) => {
    const types: Record<string, string> = {};
    for (const path of ["/", "/projects", "/about"]) {
      await page.goto(path);
      const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "");
      types[path] = data["@type"] ?? data["@graph"].map((node: { "@type": string }) => node["@type"]).join(",");
    }
    expect(types).toEqual({ "/": "WebSite,Person", "/projects": "CollectionPage", "/about": "ProfilePage" });
  });

  test("robots.txt allows crawling and names the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("User-Agent: *\nAllow: /");
    expect(body).toContain(`Sitemap: ${origin}/sitemap.xml`);
  });

  test("sitemap.xml lists every page", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("xml");
    const locations = [...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(locations).toEqual(paths.map((path) => new URL(path, origin).href));
  });

  test("the 404 page is kept out of the index", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute("content", "noindex");
  });
});
