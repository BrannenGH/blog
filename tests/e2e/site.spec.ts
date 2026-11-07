import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", title: "Brannen Hall — Software", h1: "The future is here.", nav: "Home" },
  { path: "/projects", title: "Projects — Brannen Hall", h1: "Applications for Everybody", nav: "Projects" },
  {
    path: "/design",
    title: "App design — Brannen Hall",
    h1: "Craft in the details.Comfort in the familiar.",
    nav: "App design",
  },
  { path: "/about", title: "About Me — Brannen Hall", h1: "A builder, groundedin experience.", nav: "About Me" },
];

test.describe("server rendering", () => {
  test.use({ javaScriptEnabled: false });

  for (const page of pages) {
    test(`${page.path} renders its content without JavaScript`, async ({ page: browser }) => {
      const response = await browser.goto(page.path);
      expect(response?.status()).toBe(200);
      await expect(browser).toHaveTitle(page.title);
      await expect(browser.getByRole("heading", { level: 1 })).toHaveText(page.h1);
      await expect(browser.getByRole("navigation", { name: "Main" }).getByRole("link", { name: page.nav })).toHaveAttribute(
        "aria-current",
        "page",
      );
      await expect(browser.getByRole("main")).toBeVisible();
      await expect(browser.getByRole("contentinfo")).toBeVisible();
    });
  }

  test("an unknown page is a 404", async ({ page }) => {
    const response = await page.goto("/pricing");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This thread comes loose.");
  });
});

test("the navigation moves between every page", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  for (const target of pages.slice(1)) {
    await nav.getByRole("link", { name: target.nav }).click();
    await expect(page).toHaveURL(target.path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(target.h1);
  }
  await nav.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL("/");
});

test("the home actions lead to projects and about", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore my projects" }).click();
  await expect(page).toHaveURL("/projects");
  await page.goBack();
  await page.getByRole("link", { name: "About me", exact: true }).click();
  await expect(page).toHaveURL("/about");
});

test("the desktop layout keeps 1296 px of content with 72 px margins", async ({ page }) => {
  for (const { path } of pages) {
    await page.goto(path);
    const box = await page.getByRole("main").evaluate((main) => {
      const style = getComputedStyle(main);
      const rect = main.getBoundingClientRect();
      return {
        content: rect.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
        left: rect.left + parseFloat(style.paddingLeft),
        scroll: document.documentElement.scrollWidth,
      };
    });
    expect(box).toEqual({ content: 1296, left: 72, scroll: 1440 });
  }
});

test("the headshot is a responsive image and fonts come from this site", async ({ page }) => {
  const requests: URL[] = [];
  page.on("request", (request) => requests.push(new URL(request.url())));
  await page.goto("/about");

  const portrait = page.getByRole("img", { name: "Brannen Hall" });
  await expect(portrait).toHaveAttribute("srcset", /\/_next\/image\?url=/);
  await expect.poll(() => portrait.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await page.evaluate(() => document.fonts.ready);

  expect(requests.filter((url) => url.pathname.endsWith(".woff2")).length).toBeGreaterThanOrEqual(2);
  expect(new Set(requests.map((url) => url.origin))).toEqual(new Set([new URL(page.url()).origin]));
});

test("below 768 px the home page is one column with full-width actions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const actions = await page.getByRole("link", { name: "About me", exact: true }).boundingBox();
  expect(actions!.x).toBe(24);
  expect(actions!.width).toBe(342);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});
