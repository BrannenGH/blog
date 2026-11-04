import { describe, expect, it, vi } from "vitest";
import { formatUpdated, getRepoActivity } from "@/lib/github";

function respond(status: number, body: unknown) {
  return vi.fn(async () => new Response(JSON.stringify(body), { status }));
}

describe("getRepoActivity", () => {
  it("reads the last push to a public repository", async () => {
    const fetcher = respond(200, {
      full_name: "BrannenGH/kabacus",
      pushed_at: "2026-10-28T21:14:03Z",
      stargazers_count: 14,
    });

    await expect(getRepoActivity("BrannenGH/kabacus", { fetcher })).resolves.toEqual({
      pushedAt: "2026-10-28T21:14:03Z",
    });
    expect(fetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/BrannenGH/kabacus",
      expect.objectContaining({ next: { revalidate: 3600 } }),
    );
  });

  it("sends a token only when one is configured", async () => {
    const fetcher = respond(200, { pushed_at: "2026-10-28T21:14:03Z", stargazers_count: 0 });

    await getRepoActivity("BrannenGH/kabacus", { fetcher, token: "ghp_7Qm2xVb9LkR4sTn8WcY1zPd6HfJ3aEu5GoKi" });
    const headers = (fetcher.mock.calls[0] as unknown as [string, RequestInit])[1].headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer ghp_7Qm2xVb9LkR4sTn8WcY1zPd6HfJ3aEu5GoKi");

    await getRepoActivity("BrannenGH/kabacus", { fetcher, token: "" });
    const anonymous = (fetcher.mock.calls[1] as unknown as [string, RequestInit])[1].headers as Record<string, string>;
    expect(anonymous).not.toHaveProperty("Authorization");
  });

  it.each([
    ["a private or missing repository", 404, { message: "Not Found" }],
    ["rate limiting", 403, { message: "API rate limit exceeded" }],
    ["an unexpected payload", 200, { pushed_at: 1730000000 }],
  ])("returns null for %s", async (_case, status, body) => {
    await expect(getRepoActivity("BrannenGH/ynab-mcp", { fetcher: respond(status, body) })).resolves.toBeNull();
  });

  it("returns null when the network fails", async () => {
    const fetcher = vi.fn(async () => {
      throw new TypeError("fetch failed");
    });
    await expect(getRepoActivity("BrannenGH/paperless-mcp", { fetcher })).resolves.toBeNull();
  });

  it("makes no request when GitHub data is switched off", async () => {
    const fetcher = respond(200, {});
    await expect(getRepoActivity("BrannenGH/kabacus", { fetcher, enabled: false })).resolves.toBeNull();
    expect(fetcher).not.toHaveBeenCalled();
  });
});

describe("formatUpdated", () => {
  it("names the month in UTC", () => {
    expect(formatUpdated("2026-10-31T23:30:00Z")).toBe("Updated October 2026");
    expect(formatUpdated("2026-11-01T00:10:00Z")).toBe("Updated November 2026");
  });
});
