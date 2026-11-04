import type { ReactNode } from "react";
import type { NavPath } from "@/content/site";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({
  current,
  footer,
  children,
}: {
  current: NavPath;
  footer: readonly string[];
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader current={current} />
      <main id="main" className="container">
        {children}
      </main>
      <SiteFooter tagline={footer} />
    </>
  );
}
