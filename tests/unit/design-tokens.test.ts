import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { palette, primaryInk } from "@/content/design";

const css = readFileSync(resolve(process.cwd(), "src/app/globals.css"), "utf8");

function tokenValue(token: string): string | undefined {
  return css.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`))?.[1]?.toUpperCase();
}

describe("design tokens", () => {
  it.each([...palette, { name: "Primary ink", ...primaryInk }])(
    "$name on the design page is the colour the site uses",
    ({ hex, token }) => {
      expect(tokenValue(token)).toBe(hex);
    },
  );
});
