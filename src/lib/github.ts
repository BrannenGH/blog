import "server-only";

export interface RepoActivity {
  pushedAt: string;
}

interface Options {
  fetcher?: typeof fetch;
  token?: string | undefined;
  enabled?: boolean;
}

const REVALIDATE_SECONDS = 3600;

/**
 * Public metadata for one repository, cached by Next's data cache. Pages
 * render without it, so every failure (private repository, rate limit,
 * network) is null rather than an error.
 */
export async function getRepoActivity(
  repository: string,
  {
    fetcher = fetch,
    token = process.env.GITHUB_TOKEN,
    enabled = process.env.GITHUB_DATA !== "off",
  }: Options = {},
): Promise<RepoActivity | null> {
  if (!enabled) return null;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "hallb-blog",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetcher(`https://api.github.com/repos/${repository}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    const body: unknown = await response.json();
    if (
      typeof body !== "object" ||
      body === null ||
      !("pushed_at" in body) ||
      typeof body.pushed_at !== "string"
    ) {
      return null;
    }
    return { pushedAt: body.pushed_at };
  } catch {
    return null;
  }
}

const month = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

export function formatUpdated(isoDate: string): string {
  return `Updated ${month.format(new Date(isoDate))}`;
}
