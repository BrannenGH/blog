import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Portrait } from "@/components/Portrait";
import { SectionLabel } from "@/components/SectionLabel";
import { TextLink } from "@/components/TextLink";
import { WovenIcon } from "@/components/WovenIcon";
import { site } from "@/content/site";
import { focusAreas, hero, vision } from "@/content/home";
import { kabacus, repositoryUrl } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { homeStructuredData } from "@/lib/structured-data";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({ path: "/", description: site.description });

export default function HomePage() {
  return (
    <PageShell current="/" footer={["Brannen Hall", "Software"]}>
      <JsonLd data={homeStructuredData()} />
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <h1 id="hero-title" className={styles.title}>
            {hero.title[0]} <span className={styles.nowrap}>{hero.title[1]}</span>
          </h1>
          <p className={styles.intro}>{hero.intro}</p>
          <div className={styles.actions}>
            <ButtonLink href="/projects">Explore my projects</ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              About me
            </ButtonLink>
          </div>
        </div>
        <Portrait className={styles.portrait} />
      </section>

      <section className={`${styles.section} ${styles.vision}`} aria-labelledby="vision-heading">
        <SectionLabel>{vision.label}</SectionLabel>
        <h2 id="vision-heading" className={styles.visionHeading}>
          {vision.heading}
        </h2>
        <div className={styles.visionBody}>
          {vision.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="focus-heading">
        <SectionLabel as="h2" id="focus-heading">
          {focusAreas.label}
        </SectionLabel>
        <ul className={styles.focus}>
          {focusAreas.items.map((item) => (
            <li key={item.title}>
              <h3 className={styles.focusTitle}>{item.title}</h3>
              <p className={styles.focusBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.development} aria-labelledby="development-heading">
        <SectionLabel as="h2" id="development-heading">
          03 / In development
        </SectionLabel>
        <article className={styles.project} aria-labelledby="kabacus-title">
          <WovenIcon icon={kabacus.icon} size={112} className={styles.projectIcon} />
          <h3 id="kabacus-title" className={styles.projectTitle}>
            {kabacus.name}
          </h3>
          <p className={styles.projectSummary}>{kabacus.homeSummary}</p>
          <p className={styles.projectLink}>
            <TextLink href={repositoryUrl(kabacus.repository)}>Explore the source</TextLink>
          </p>
        </article>
      </section>
    </PageShell>
  );
}
