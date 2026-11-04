import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionLabel } from "@/components/SectionLabel";
import { experiments, kabacus, repositoryUrl } from "@/content/projects";
import { formatUpdated, getRepoActivity } from "@/lib/github";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Open apps and connected tools by Brannen Hall: Kabacus, and MCP servers for TickTick, Paperless and YNAB.",
};

// Repository activity comes from GitHub's API; re-render at most hourly.
export const revalidate = 3600;

export default async function ProjectsPage() {
  const [featured, ...others] = await Promise.all(
    [kabacus.repository, ...experiments.map((project) => project.repository)].map((repository) =>
      getRepoActivity(repository),
    ),
  );

  return (
    <PageShell current="/projects" footer={["Brannen Hall", "Software, with character."]}>
      <header className={styles.intro}>
        <SectionLabel>Open software / Projects &amp; experiments</SectionLabel>
        <h1 className={styles.title}>Applications for Everybody</h1>
        <p className={styles.lead}>Open apps and connected tools. Personalized down to the Details.</p>
      </header>

      <section className={styles.feature} aria-labelledby="feature-name">
        <figure className={styles.featureArt}>
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG, nothing to optimise */}
          <img src={kabacus.art} alt="" width={790} height={540} />
          <figcaption className={styles.specimen}>{kabacus.specimen}</figcaption>
        </figure>
        <div className={styles.featureText}>
          <SectionLabel>{kabacus.category}</SectionLabel>
          <h2 id="feature-name" className={styles.featureName}>
            {kabacus.name}
          </h2>
          <div className={styles.featureDescription}>
            <p>{kabacus.tagline}</p>
            <p>{kabacus.description}</p>
          </div>
          <div className={styles.featureActions}>
            <ButtonLink href={repositoryUrl(kabacus.repository)}>View on GitHub</ButtonLink>
            {featured && <span className={styles.updated}>{formatUpdated(featured.pushedAt)}</span>}
          </div>
        </div>
      </section>

      <section aria-labelledby="experiments-heading">
        <h2 id="experiments-heading" className="visually-hidden">
          Connected tools
        </h2>
        <ul className={styles.cards}>
          {experiments.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} pushedAt={others[index]?.pushedAt} />
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
