export const aboutHero = {
  eyebrow: "About me / Brannen Hall",
  title: ["A builder, grounded", "in experience."],
  intro: [
    "Automation Engineer III at Western National Insurance.",
    "Software developer. Longtime Linux enthusiast.",
  ],
};

export const biography = {
  label: "01 / The person behind the work",
  heading: "Where Technology and Product Meet",
  paragraphs: [
    "I’m Brannen Hall, a Minneapolis-based automation engineer and software developer. My career has moved from building applications to improving the systems and practices that make them dependable.",
    "At Western National Insurance, I’ve developed a deep passion for insurance and the work behind it. Outside that work, I’m exploring how AI-assisted development can help turn my love for Linux into useful, open apps and a more connected home.",
  ],
};

export interface Position {
  period: string;
  employer: string;
  roles: string[];
  impact: string;
}

export const experience = {
  label: "02 / Work experience",
  positions: [
    {
      period: "2024 — Present",
      employer: "Western National Insurance",
      roles: [
        "Automation Engineer III · Mar 2026–present",
        "Automation Engineer II · Jan 2024–Mar 2026",
      ],
      impact:
        "Built the team’s primary JSON-RPC API automation framework in Node.js/JavaScript. Moving coverage from UI to API tests cut execution time by 80%.",
    },
    {
      period: "2021 — 2024",
      employer: "Cognizant Softvision",
      roles: ["Quality Engineer · Aug 2021–Jan 2024"],
      impact:
        "Led automation from framework design to rollout. Cut PR review time 60% with customized linters; built browser and API tests, contributed to React code, and mentored engineers.",
    },
    {
      period: "2020 — 2021",
      employer: "Magenic / Cognizant Softvision",
      roles: ["Associate Quality Engineer · Apr 2020–Aug 2021"],
      impact:
        "Moved integration tests from VMs to Docker, cut test data cleanup time 60% with SQL resets, and improved .NET Core support on macOS and Linux.",
    },
    {
      period: "2019 — 2020",
      employer: "IndusTrack",
      roles: ["Junior Software Developer · Jun 2019–Apr 2020"],
      impact:
        "Built an employee performance system with Angular, ASP.NET, and SQL; integrated QuickBooks Online. Cut report development time 30% and improved Angular performance 50%.",
    },
  ] satisfies Position[],
  earlierLabel: "Earlier experience",
  earlier: [
    "PTC · Enterprise Application Security Intern · 2018–2019",
    "IndusTrack · Software & Testing Intern · 2017–2018",
    "UMN App Developers Club · Software Developer · 2017–2018",
    "University of Minnesota · Dean’s Freshman Research Scholar · 2017",
  ],
};

export const education = {
  label: "03 / Education & credentials",
  school: [
    "University of Minnesota — Twin Cities",
    "BA, Computer Science · 2016–2019",
    "Phi Beta Kappa · 3.77 GPA · Dean’s List",
  ],
  certifications: [
    "Associate in Insurance (AINS)",
    "Guidewire Certified Associate — InsuranceSuite Analyst (Qusar)",
    "Microsoft Certified: Azure Fundamentals",
  ],
  skills: [
    "JavaScript · TypeScript · Node.js · C# / .NET · SQL",
    "React · Angular · ASP.NET · Playwright · Selenium · API automation",
  ],
};
