export type ProjectIcon = "abacus" | "leaf" | "pages";

export interface Project {
  slug: string;
  name: string;
  /** owner/name on GitHub */
  repository: string;
  summary: string;
  icon: ProjectIcon;
  /** Woven illustration in public/art, 2:1 for cards. */
  art: string;
}

export const kabacus = {
  slug: "kabacus",
  name: "Kabacus",
  repository: "BrannenGH/kabacus",
  icon: "abacus",
  category: "In development / KDE + Web + MCP",
  specimen: "01 / Kabacus",
  homeSummary:
    "Personal bookkeeping for KDE, the web, and MCP clients. An early step toward that vision.",
  tagline: "Personal finance, supercharged with AI.",
  description:
    "Double-entry bookkeeping in development, with a Kirigami app, web interface, Tauri desktop shell, and MCP endpoint.",
  art: "/art/kabacus-panel.svg",
} as const;

export const experiments: readonly Project[] = [
  {
    slug: "ticktick-mcp",
    name: "TickTick MCP",
    repository: "BrannenGH/ticktick-mcp",
    summary: "Tasks, within reach.",
    icon: "leaf",
    art: "/art/ticktick-panel.svg",
  },
  {
    slug: "paperless-mcp",
    name: "Paperless MCP",
    repository: "BrannenGH/paperless-mcp",
    summary: "Documents, connected.",
    icon: "pages",
    art: "/art/paperless-panel.svg",
  },
  {
    slug: "ynab-mcp",
    name: "YNAB MCP",
    repository: "BrannenGH/ynab-mcp",
    summary: "A bridge to your budget.",
    icon: "abacus",
    art: "/art/ynab-panel.svg",
  },
];

export function repositoryUrl(repository: string): string {
  return `https://github.com/${repository}`;
}
