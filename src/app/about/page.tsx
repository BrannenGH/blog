import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { Portrait } from "@/components/Portrait";
import { SectionLabel } from "@/components/SectionLabel";
import { aboutHero, biography, education, experience } from "@/content/about";
import { person } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { aboutStructuredData } from "@/lib/structured-data";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About Me",
  description:
    "Brannen Hall is a Minneapolis-based automation engineer and software developer at Western National Insurance.",
  openGraph: { type: "profile", firstName: person.givenName, lastName: person.familyName },
});

export default function AboutPage() {
  return (
    <PageShell current="/about" footer={["Brannen Hall", "Experience that informs what comes next"]}>
      <JsonLd data={aboutStructuredData()} />
      <section className={styles.hero} aria-labelledby="about-title">
        <div>
          <SectionLabel>{aboutHero.eyebrow}</SectionLabel>
          <h1 id="about-title" className={styles.title}>
            {aboutHero.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className={styles.intro}>
            {aboutHero.intro.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
        <Portrait className={styles.portrait} />
      </section>

      <section className={styles.split} aria-labelledby="bio-heading">
        <div>
          <SectionLabel tone="ink">{biography.label}</SectionLabel>
          <h2 id="bio-heading" className={styles.bioHeading}>
            {biography.heading}
          </h2>
        </div>
        <div className={styles.prose}>
          {biography.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="experience-heading">
        <SectionLabel as="h2" tone="ink" id="experience-heading">
          {experience.label}
        </SectionLabel>
        <ol className={styles.positions}>
          {experience.positions.map((position) => (
            <li key={position.employer} className={styles.position}>
              <p className={styles.period}>{position.period}</p>
              <div>
                <h3 className={styles.employer}>{position.employer}</h3>
                <ul className={styles.roles}>
                  {position.roles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
                <p className={styles.impact}>{position.impact}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.earlier}>
          <h3 className={styles.period}>{experience.earlierLabel}</h3>
          <ul>
            {experience.earlier.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.education}`} aria-labelledby="education-heading">
        <div>
          <SectionLabel as="h2" tone="ink" id="education-heading">
            {education.label}
          </SectionLabel>
          <ul className={styles.school}>
            {education.school.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="visually-hidden">Certifications</h3>
          <ul>
            {education.certifications.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <h3 className="visually-hidden">Skills</h3>
          <ul className={styles.skills}>
            {education.skills.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
