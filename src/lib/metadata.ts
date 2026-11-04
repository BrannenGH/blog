import type { Metadata } from "next";
import { site } from "@/content/site";

// public/opengraph-image.jpg: the headshot, as the link preview.
const shareImage = { url: "/opengraph-image.jpg", width: 1200, height: 1600, alt: site.name };

/**
 * A page's title, description, canonical URL and share tags. A page's
 * openGraph replaces the layout's whole, so every page sets all of it here.
 */
export function pageMetadata({
  path,
  title,
  description,
  openGraph,
}: {
  path: string;
  /** The page's own title; the full title adds the site name. */
  title?: string;
  description: string;
  openGraph?: Metadata["openGraph"];
}): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — Software`;
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [shareImage],
      ...openGraph,
    } as Metadata["openGraph"],
    twitter: { card: "summary", title: fullTitle, description, images: [shareImage] },
  };
}
