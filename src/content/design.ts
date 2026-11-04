export interface Swatch {
  name: string;
  hex: string;
  role: string;
  /** CSS custom property that carries this colour. */
  token: string;
}

export const palette: readonly Swatch[] = [
  { name: "Parchment", hex: "#F2EDDF", role: "Background", token: "--parchment" },
  { name: "Forest", hex: "#304E41", role: "Brand forest", token: "--forest" },
  { name: "Sage", hex: "#A7B298", role: "Illustration", token: "--sage" },
  { name: "Madder", hex: "#8A5149", role: "Links / emphasis", token: "--madder" },
  { name: "Antique gold", hex: "#AD915B", role: "Stitch / detail", token: "--gold" },
  { name: "Slate blue", hex: "#536C73", role: "Secondary art", token: "--slate" },
];

export const primaryInk = { hex: "#263E35", token: "--ink" };

export const designPage = {
  eyebrow: "Verdure / A shared design language",
  title: ["Craft in the details.", "Comfort in the familiar."],
  intro:
    "Botanical rhythm from Morris verdure tapestry. Quiet structure, warm materials, and precise finishing inspired by heritage leatherwork and travel trunks.",
  paletteLabel: "01 / The palette",
  type: {
    label: "02 / Type & material",
    specimen: "Thoughtfully woven.",
    fonts: [
      "Playfair Display / editorial headings",
      "Inter / website text and controls",
      "System font / native applications",
    ],
    materialLabel: "Verdure / Original botanical motif",
    principle: [
      "Use cloth texture in illustrations and app identities. Keep reading surfaces calm.",
      "Take inspiration from materials and craftsmanship; use original motifs and initials.",
    ],
  },
  native: {
    label: "03 / Native by default",
    headline: "The platform sets the manners.",
    rationale:
      "KDE apps use Kirigami and Qt Quick Controls, system fonts, system colors, and familiar actions. Apply Verdure to icons, welcome art, and content—not forced toolbar colors.",
    guidance: [
      {
        heading: "Other platforms",
        body: "Respect window chrome, menu placement, shortcuts, focus, dialogs, and light/dark preference. Web wrappers should feel at home; validate each platform separately.",
      },
      {
        heading: "Interaction & accessibility",
        body: "Clear focus rings. Labels beside unfamiliar icons. Keyboard access throughout. Quiet motion with reduced-motion support. Never place texture behind working text.",
      },
    ],
  },
  icons: {
    label: "04 / App icons as woven emblems",
    rules: [
      "One clear metaphor. A shared stitched edge. Two to four muted colors.",
      "Cloth grain is a subtle accent; the silhouette must work without it.",
      "Design at 48 px, expand to 128/256/512; simplify at 16/22/32.",
      "Use system symbolic icons inside toolbars.",
    ],
  },
  build: {
    label: "05 / Website implementation",
    notes: [
      "Server-rendered React: /, /projects, /design, /about. Render content and links on the server; hydrate interactive controls as needed. Fetch public GitHub data server-side and cache it. Use semantic landmarks, real links, useful page titles, responsive images, and locally hosted fonts.",
      "Layout: 1440 px desktop canvas, 1296 px content, 72 px margins. Below 768 px: one column with 24 px gutters; portrait follows the introduction and actions. At 768–1199 px: two columns where space allows. Keep body text near 65 characters per line. Home flows from vision to areas of focus to work in development.",
    ],
    ink: "Primary text / #263E35. Use forest and parchment for the website; native apps follow the user’s system theme.",
  },
  references: {
    label: "Design references",
    links: [
      { label: "KDE HIG", href: "https://develop.kde.org/hig/" },
      {
        label: "Kirigami theme guidance",
        href: "https://develop.kde.org/docs/getting-started/kirigami/style-colors/",
      },
    ],
  },
};
