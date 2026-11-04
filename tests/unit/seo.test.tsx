import { render } from "@testing-library/react";
import type { Metadata } from "next";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { metadata as aboutMetadata } from "@/app/about/page";
import AboutPage from "@/app/about/page";
import { metadata as designMetadata } from "@/app/design/page";
import { metadata as homeMetadata } from "@/app/page";
import HomePage from "@/app/page";
import { metadata as projectsMetadata } from "@/app/projects/page";
import ProjectsPage from "@/app/projects/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getRepoActivity } from "@/lib/github";
import { resolveSiteUrl } from "@/lib/site-url";

vi.mock("@/lib/github", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/github")>()),
  getRepoActivity: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(getRepoActivity).mockReset().mockResolvedValue(null);
});

describe("resolveSiteUrl", () => {
  it("prefers SITE_URL", () => {
    expect(
      resolveSiteUrl({ SITE_URL: "https://hallb.me", VERCEL_PROJECT_PRODUCTION_URL: "hallb.vercel.app" }).href,
    ).toBe("https://hallb.me/");
  });

  it("uses Vercel's production host when SITE_URL is unset", () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "hallb-git-main.vercel.app" }).href).toBe(
      "https://hallb-git-main.vercel.app/",
    );
  });

  it("falls back to the site's public address, never localhost", () => {
    expect(resolveSiteUrl({}).href).toBe("https://hallb.vercel.app/");
    expect(resolveSiteUrl({ SITE_URL: "" }).href).toBe("https://hallb.vercel.app/");
  });
});

const pages: Array<[string, Metadata, string]> = [
  ["/", homeMetadata, "Brannen Hall — Software"],
  ["/projects", projectsMetadata, "Projects — Brannen Hall"],
  ["/design", designMetadata, "App design — Brannen Hall"],
  ["/about", aboutMetadata, "About Me — Brannen Hall"],
];

describe("page metadata", () => {
  it.each(pages)("%s has a canonical URL and share tags", (path, metadata, title) => {
    expect(metadata.alternates?.canonical).toBe(path);
    expect(metadata.description).toEqual(expect.any(String));
    expect(metadata.openGraph).toMatchObject({
      url: path,
      title,
      description: metadata.description,
      siteName: "Brannen Hall",
      locale: "en_US",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary", title, description: metadata.description });
  });

  it("gives every page its own description", () => {
    expect(new Set(pages.map(([, metadata]) => metadata.description)).size).toBe(pages.length);
  });

  it("describes the about page as a profile", () => {
    expect(aboutMetadata.openGraph).toMatchObject({ type: "profile", firstName: "Brannen", lastName: "Hall" });
  });
});

describe("robots.txt", () => {
  it("allows crawling and points to the sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://hallb.vercel.app/sitemap.xml",
    });
  });
});

describe("sitemap.xml", () => {
  it("lists every page in the navigation by its absolute URL", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      "https://hallb.vercel.app/",
      "https://hallb.vercel.app/projects",
      "https://hallb.vercel.app/design",
      "https://hallb.vercel.app/about",
    ]);
  });
});

function structuredData(container: HTMLElement) {
  return [...container.querySelectorAll('script[type="application/ld+json"]')].map((script) =>
    JSON.parse(script.textContent ?? ""),
  );
}

describe("structured data", () => {
  it("describes the site and its author on the home page", () => {
    const { container } = render(<HomePage />);
    const [data] = structuredData(container);
    const graph = data["@graph"];

    expect(data["@context"]).toBe("https://schema.org");
    expect(graph).toContainEqual(
      expect.objectContaining({
        "@type": "WebSite",
        "@id": "https://hallb.vercel.app/#website",
        url: "https://hallb.vercel.app/",
        name: "Brannen Hall",
        inLanguage: "en",
        publisher: { "@id": "https://hallb.vercel.app/#person" },
      }),
    );
    expect(graph).toContainEqual(
      expect.objectContaining({
        "@type": "Person",
        "@id": "https://hallb.vercel.app/#person",
        name: "Brannen Hall",
        jobTitle: "Automation Engineer III",
        worksFor: { "@type": "Organization", name: "Western National Insurance" },
        sameAs: ["https://github.com/BrannenGH"],
      }),
    );
  });

  it("marks the about page as Brannen's profile", () => {
    const { container } = render(<AboutPage />);
    const [data] = structuredData(container);

    expect(data).toMatchObject({
      "@type": "ProfilePage",
      url: "https://hallb.vercel.app/about",
      mainEntity: { "@type": "Person", "@id": "https://hallb.vercel.app/#person", name: "Brannen Hall" },
    });
  });

  it("lists the projects as source code with their repositories", async () => {
    const { container } = render(await ProjectsPage());
    const [data] = structuredData(container);

    expect(data["@type"]).toBe("CollectionPage");
    expect(
      data.mainEntity.itemListElement.map((item: { position: number; item: Record<string, string> }) => [
        item.position,
        item.item["@type"],
        item.item.name,
        item.item.codeRepository,
      ]),
    ).toEqual([
      [1, "SoftwareSourceCode", "Kabacus", "https://github.com/BrannenGH/kabacus"],
      [2, "SoftwareSourceCode", "TickTick MCP", "https://github.com/BrannenGH/ticktick-mcp"],
      [3, "SoftwareSourceCode", "Paperless MCP", "https://github.com/BrannenGH/paperless-mcp"],
      [4, "SoftwareSourceCode", "YNAB MCP", "https://github.com/BrannenGH/ynab-mcp"],
    ]);
  });

  it("escapes markup so the data cannot close its script", async () => {
    const { JsonLd } = await import("@/components/JsonLd");
    const { container } = render(<JsonLd data={{ name: "</script><b>Brannen</b>" }} />);
    const script = container.querySelector("script")!;

    expect(script.innerHTML).not.toContain("</script>");
    expect(JSON.parse(script.textContent!)).toEqual({ name: "</script><b>Brannen</b>" });
  });
});
