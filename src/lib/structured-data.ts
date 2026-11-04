import { kabacus, experiments, repositoryUrl } from "@/content/projects";
import { person, site } from "@/content/site";
import { absoluteUrl } from "./site-url";

const context = "https://schema.org";
const personId = absoluteUrl("/#person");
const websiteId = absoluteUrl("/#website");

function personNode() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    givenName: person.givenName,
    familyName: person.familyName,
    url: absoluteUrl("/about"),
    image: absoluteUrl("/opengraph-image.jpg"),
    jobTitle: person.jobTitle,
    worksFor: { "@type": "Organization", name: person.worksFor },
    alumniOf: { "@type": "CollegeOrUniversity", name: person.alumniOf },
    address: { "@type": "PostalAddress", addressLocality: person.locality, addressRegion: person.region },
    sameAs: [site.githubUrl],
  };
}

export function homeStructuredData() {
  return {
    "@context": context,
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name: site.name,
        description: site.description,
        inLanguage: site.language,
        publisher: { "@id": personId },
      },
      personNode(),
    ],
  };
}

export function aboutStructuredData() {
  return {
    "@context": context,
    "@type": "ProfilePage",
    url: absoluteUrl("/about"),
    isPartOf: { "@id": websiteId },
    mainEntity: personNode(),
  };
}

export function projectsStructuredData() {
  const projects = [
    { name: kabacus.name, description: kabacus.tagline, repository: kabacus.repository },
    ...experiments.map((project) => ({
      name: project.name,
      description: project.summary,
      repository: project.repository,
    })),
  ];
  return {
    "@context": context,
    "@type": "CollectionPage",
    url: absoluteUrl("/projects"),
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareSourceCode",
          name: project.name,
          description: project.description,
          codeRepository: repositoryUrl(project.repository),
          author: { "@id": personId },
        },
      })),
    },
  };
}
