import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { navigation } from "@/content/site";

describe("SiteHeader", () => {
  it("links every page and marks only the current one", () => {
    render(<SiteHeader current="/projects" />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    const links = within(nav).getAllByRole("link");

    expect(links.map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Home", "/"],
      ["Projects", "/projects"],
      ["App design", "/design"],
      ["About Me", "/about"],
    ]);
    expect(links.filter((link) => link.getAttribute("aria-current") === "page")).toEqual([
      within(nav).getByRole("link", { name: "Projects" }),
    ]);
  });

  it("marks nothing as current on pages outside the navigation", () => {
    render(<SiteHeader />);
    for (const item of navigation) {
      expect(screen.getByRole("link", { name: item.label })).not.toHaveAttribute("aria-current");
    }
  });
});

describe("SiteFooter", () => {
  it("joins the tagline with slashes and links GitHub", () => {
    render(<SiteFooter tagline={["Brannen Hall", "Software, with character."]} />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Brannen Hall / Software, with character.");
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/BrannenGH");
  });
});
