import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AboutPage from "@/app/about/page";
import DesignPage from "@/app/design/page";
import HomePage from "@/app/page";
import ProjectsPage from "@/app/projects/page";
import { getRepoActivity } from "@/lib/github";

vi.mock("@/lib/github", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/github")>()),
  getRepoActivity: vi.fn(),
}));

const activity = vi.mocked(getRepoActivity);

beforeEach(() => {
  activity.mockReset();
});

function headingOutline() {
  return screen.getAllByRole("heading").map((heading) => [heading.tagName, heading.textContent]);
}

describe("home page", () => {
  it("flows from vision to areas of focus to work in development", () => {
    render(<HomePage />);
    expect(headingOutline()).toEqual([
      ["H1", "The future is here."],
      ["H2", "AI empowers developers to build the future."],
      ["H2", "02 / Areas of focus"],
      ["H3", "Qt apps for everybody"],
      ["H3", "Efficient insurance"],
      ["H3", "A smarter home"],
      ["H2", "03 / In development"],
      ["H3", "Kabacus"],
    ]);
  });

  it("links projects and about without showing the portrait", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: "Explore my projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "About me" })).toHaveAttribute("href", "/about");
    expect(screen.queryByRole("img", { name: "Brannen Hall" })).not.toBeInTheDocument();
  });

  it("links the Kabacus source", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: "Explore the source" })).toHaveAttribute(
      "href",
      "https://github.com/BrannenGH/kabacus",
    );
  });
});

describe("projects page", () => {
  it("features Kabacus and lists each connected tool with its repository", async () => {
    activity.mockResolvedValue(null);
    render(await ProjectsPage());

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Applications for Everybody");
    expect(screen.getByRole("link", { name: "View on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/BrannenGH/kabacus",
    );

    const cards = screen.getAllByRole("article");
    expect(
      cards.map((card) => [
        within(card).getByRole("heading").textContent,
        within(card).getByRole("link", { name: "Source code" }).getAttribute("href"),
      ]),
    ).toEqual([
      ["TickTick MCP", "https://github.com/BrannenGH/ticktick-mcp"],
      ["Paperless MCP", "https://github.com/BrannenGH/paperless-mcp"],
      ["YNAB MCP", "https://github.com/BrannenGH/ynab-mcp"],
    ]);
    expect(screen.queryByText(/^Updated /)).not.toBeInTheDocument();
  });

  it("shows when each repository was last updated, where GitHub says", async () => {
    activity.mockImplementation(async (repository) =>
      ({
        "BrannenGH/kabacus": { pushedAt: "2026-11-02T18:40:00Z" },
        "BrannenGH/paperless-mcp": { pushedAt: "2026-08-14T09:05:00Z" },
      })[repository] ?? null,
    );
    render(await ProjectsPage());

    expect(screen.getByText("Updated November 2026")).toBeInTheDocument();
    const paperless = screen.getByRole("article", { name: "Paperless MCP" });
    expect(within(paperless).getByText("Updated August 2026")).toBeInTheDocument();
    expect(within(screen.getByRole("article", { name: "YNAB MCP" })).queryByText(/^Updated /)).toBeNull();
  });
});

describe("design page", () => {
  it("lists the palette with names, hex values and roles", () => {
    render(<DesignPage />);
    const palette = screen.getByRole("heading", { name: "01 / The palette" }).closest("section")!;
    expect(within(palette).getAllByRole("listitem").map((item) => item.textContent?.replace(/\s+/g, " "))).toEqual([
      "Parchment#F2EDDF / Background",
      "Forest#304E41 / Brand forest",
      "Sage#A7B298 / Illustration",
      "Madder#8A5149 / Links / emphasis",
      "Antique gold#AD915B / Stitch / detail",
      "Slate blue#536C73 / Secondary art",
    ]);
  });

  it("links the design references", () => {
    render(<DesignPage />);
    expect(screen.getByRole("link", { name: "KDE HIG" })).toHaveAttribute("href", "https://develop.kde.org/hig/");
    expect(screen.getByRole("link", { name: "Kirigami theme guidance" })).toHaveAttribute(
      "href",
      "https://develop.kde.org/docs/getting-started/kirigami/style-colors/",
    );
  });
});

describe("about page", () => {
  it("shows the portrait after the introduction", () => {
    render(<AboutPage />);
    const title = screen.getByRole("heading", { level: 1 });
    const portrait = screen.getByRole("img", { name: "Brannen Hall" });
    expect(title.compareDocumentPosition(portrait) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("lists work experience newest first", () => {
    render(<AboutPage />);
    const experience = screen.getByRole("heading", { name: "02 / Work experience" }).closest("section")!;
    expect(within(experience).getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Western National Insurance",
      "Cognizant Softvision",
      "Magenic / Cognizant Softvision",
      "IndusTrack",
      "Earlier experience",
    ]);
  });
});
