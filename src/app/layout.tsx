import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { inter, playfair } from "./fonts";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: { default: `${site.name} — Software`, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.githubUrl }],
  openGraph: { type: "website", siteName: site.name },
};

export const viewport: Viewport = {
  themeColor: "#f2eddf",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a className={styles.skip} href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
