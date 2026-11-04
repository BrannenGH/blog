import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SectionLabel } from "@/components/SectionLabel";
import { WovenIcon } from "@/components/WovenIcon";
import { designPage as d, palette } from "@/content/design";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "App design",
  description: "Verdure, the design language behind Brannen Hall’s apps and this site: palette, type, materials and icons.",
};

export default function DesignPage() {
  return (
    <PageShell current="/design" footer={["Brannen Hall"]}>
      <header className={styles.intro}>
        <SectionLabel>{d.eyebrow}</SectionLabel>
        <h1 className={styles.title}>
          {d.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className={styles.lead}>{d.intro}</p>
      </header>

      <section className={styles.palette} aria-labelledby="palette-heading">
        <SectionLabel as="h2" id="palette-heading">
          {d.paletteLabel}
        </SectionLabel>
        <ul className={styles.swatches}>
          {palette.map((swatch) => (
            <li key={swatch.name}>
              <span className={styles.swatch} style={{ background: `var(${swatch.token})` }} />
              <p className={styles.swatchName}>{swatch.name}</p>
              <p className={styles.swatchRole}>
                {swatch.hex} &nbsp;/&nbsp; {swatch.role}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.section} ${styles.type}`} aria-labelledby="type-heading">
        <div>
          <SectionLabel as="h2" id="type-heading">
            {d.type.label}
          </SectionLabel>
          <p className={styles.specimen}>{d.type.specimen}</p>
          <ul className={styles.fonts}>
            {d.type.fonts.map((font) => (
              <li key={font}>{font}</li>
            ))}
          </ul>
        </div>
        <figure className={styles.material}>
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG, nothing to optimise */}
          <img src="/art/verdure-panel.svg" alt="" width={454} height={251} />
          <figcaption className={styles.materialLabel}>{d.type.materialLabel}</figcaption>
        </figure>
        <div className={styles.principle}>
          {d.type.principle.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="native-heading">
        <SectionLabel>{d.native.label}</SectionLabel>
        <h2 id="native-heading" className={styles.headline}>
          {d.native.headline}
        </h2>
        <p className={styles.rationale}>{d.native.rationale}</p>
        <div className={styles.guidance}>
          {d.native.guidance.map((item) => (
            <div key={item.heading}>
              <h3 className={styles.guidanceHeading}>{item.heading}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="icons-heading">
        <SectionLabel as="h2" id="icons-heading">
          {d.icons.label}
        </SectionLabel>
        <div className={styles.icons}>
          <div className={styles.iconRow}>
            <WovenIcon icon="abacus" />
            <WovenIcon icon="leaf" />
            <WovenIcon icon="pages" />
          </div>
          <ul className={styles.iconRules}>
            {d.icons.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="build-heading">
        <SectionLabel as="h2" id="build-heading">
          {d.build.label}
        </SectionLabel>
        <div className={styles.build}>
          {d.build.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
        <p className={styles.ink}>{d.build.ink}</p>
        <div className={styles.references}>
          <SectionLabel as="h2">{d.references.label}</SectionLabel>
          <ul>
            {d.references.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel="noopener">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
