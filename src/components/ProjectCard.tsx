import { repositoryUrl, type Project } from "@/content/projects";
import { formatUpdated } from "@/lib/github";
import { TextLink } from "./TextLink";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project, pushedAt }: { project: Project; pushedAt?: string | undefined }) {
  return (
    <article className={styles.card} aria-labelledby={`${project.slug}-name`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG, nothing to optimise */}
      <img className={styles.art} src={project.art} alt="" width={416} height={208} loading="lazy" />
      <div className={styles.body}>
        <h3 id={`${project.slug}-name`} className={styles.name}>
          {project.name}
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <p className={styles.links}>
          <TextLink href={repositoryUrl(project.repository)} size="sm">
            Source code
          </TextLink>
          {pushedAt && <span className={styles.updated}>{formatUpdated(pushedAt)}</span>}
        </p>
      </div>
    </article>
  );
}
