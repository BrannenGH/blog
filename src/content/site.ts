export const site = {
  name: "Brannen Hall",
  description:
    "Brannen Hall builds open, native applications and connected tools, with careful engineering and AI-assisted development.",
  githubUrl: "https://github.com/BrannenGH",
  /** The public address, used when the build doesn't name another (SITE_URL). */
  url: "https://brannen.hallb.me",
  language: "en",
  locale: "en_US",
} as const;

/** Who the site is about, for search engines' structured data. */
export const person = {
  givenName: "Brannen",
  familyName: "Hall",
  jobTitle: "Automation Engineer III",
  worksFor: "Western National Insurance",
  locality: "Minneapolis",
  region: "MN",
  alumniOf: "University of Minnesota — Twin Cities",
} as const;

export type NavPath = "/" | "/projects" | "/design" | "/about";

export const navigation: ReadonlyArray<{ href: NavPath; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/design", label: "App design" },
  { href: "/about", label: "About Me" },
];
