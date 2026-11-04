import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SectionLabel } from "@/components/SectionLabel";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={`container ${styles.main}`}>
        <SectionLabel>404 / Not found</SectionLabel>
        <h1 className={styles.title}>This thread comes loose.</h1>
        <p className={styles.body}>The page you were looking for isn’t here.</p>
        <ButtonLink href="/">Back to the homepage</ButtonLink>
      </main>
      <SiteFooter tagline={["Brannen Hall", "Software"]} />
    </>
  );
}
