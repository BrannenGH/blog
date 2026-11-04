import { site } from "@/content/site";

type Env = { SITE_URL?: string; VERCEL_PROJECT_PRODUCTION_URL?: string; [name: string]: string | undefined };

/**
 * The public origin for canonical URLs, the sitemap and share tags. Read at
 * build time, so the container image takes SITE_URL as a build argument.
 */
export function resolveSiteUrl(env: Env = process.env): URL {
  if (env.SITE_URL) return new URL(env.SITE_URL);
  // Vercel sets VERCEL_PROJECT_PRODUCTION_URL (a bare host) on its builds.
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return new URL(`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`);
  return new URL(site.url);
}

export const siteUrl = resolveSiteUrl();

/** An absolute URL on this site. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).href;
}
