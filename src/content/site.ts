export const site = {
  name: "Brannen Hall",
  description:
    "Brannen Hall builds open, native applications and connected tools, with careful engineering and AI-assisted development.",
  githubUrl: "https://github.com/BrannenGH",
} as const;

export type NavPath = "/" | "/projects" | "/design" | "/about";

export const navigation: ReadonlyArray<{ href: NavPath; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/design", label: "App design" },
  { href: "/about", label: "About Me" },
];
