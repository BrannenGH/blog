import Image from "next/image";
import headshot from "@/assets/brannen-hall.jpg";
import styles from "./Portrait.module.css";

/** The headshot, framed in an arch on the woven panel. */
export function Portrait({ className = "" }: { className?: string }) {
  return (
    <figure className={`${styles.panel} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG, nothing to optimise */}
      <img className={styles.weave} src="/art/portrait-panel.svg" alt="" width={262} height={318} />
      <div className={styles.arch}>
        <Image
          src={headshot}
          alt="Brannen Hall"
          fill
          priority
          sizes="(max-width: 767px) 190px, 200px"
          placeholder="blur"
        />
      </div>
    </figure>
  );
}
