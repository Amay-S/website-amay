import data from "@/data/portfolioData.json";

export const SITE_URL = "https://heyitsamay.com";

export const site = data;
export const hero = data.hero;

export type Experience = (typeof data.experience)[number];
export type Project = (typeof data.projects)[number];

export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

/** "1 item" / "2 items" */
export function plural(n: number, one: string, many = `${one}s`) {
  return `${n} ${n === 1 ? one : many}`;
}

/** Skill groups, with item lists split from the " · "-separated detail strings. */
export const skillGroups = data.skillsDashboard.map((g) => ({
  id: g.icon,
  label: g.label,
  items: g.detail
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean),
}));

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: hero.name,
  url: SITE_URL,
  jobTitle: hero.currentRole.title,
  worksFor: { "@type": "Organization", name: hero.currentRole.company },
  address: { "@type": "PostalAddress", addressLocality: "Phoenix", addressRegion: "AZ", addressCountry: "US" },
  alumniOf: { "@type": "CollegeOrUniversity", name: data.education.institution },
  sameAs: [hero.linkedin, hero.github],
  knowsAbout: ["Technical program management", "Cloud FinOps", "AI/ML products", "Agile delivery", "Release management"],
};
