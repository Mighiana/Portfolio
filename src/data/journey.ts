import { projectUrl } from "./projects";

export type JourneyEntry = {
  title: string; org?: string; period?: string; status?: string; description: string; href?: string;
};
export type JourneyTrack = {
  code: string; title: string; weight: "primary" | "secondary"; entries: JourneyEntry[];
};

export const journey: JourneyTrack[] = [
  {
    code: "A", title: "Academic", weight: "primary",
    entries: [
      { title: "BSc Computer Science and Engineering", org: "Óbuda University",
        period: "Expected 2027", status: "Final semester",
        description: "Computer-science foundation progressing into practical security and infrastructure work.", href: "#education" },
      { title: "BSc cybersecurity thesis", period: "2026–2027", status: "Research / experimental design",
        description: "From framework-reported results toward independently observed endpoint evidence.", href: projectUrl("red-team-research") },
    ],
  },
  {
    code: "T", title: "Technical development", weight: "primary",
    entries: [
      { title: "Cloud, networking and security engineering", description: "Coursework and hands-on projects across AWS, Terraform, Windows identity and privacy tooling.", href: "#projects" },
      { title: "Cybersecurity & Compliance Engineering Bootcamp", org: "Óbuda University × CC Lab",
        status: "Participant", description: "Additional cybersecurity development alongside university studies." },
    ],
  },
  {
    code: "I", title: "International academic", weight: "secondary",
    entries: [
      { title: "European academic programs", period: "August 2026",
        description: "Human-Centered AI summer school in Kosovo and European Impact Sprint in Potsdam.", href: "#international" },
    ],
  },
  {
    code: "L", title: "Leadership", weight: "secondary",
    entries: [
      { title: "ESN Secretary", org: "Erasmus Student Network", description: "Supporting international students through an ESN secretary role." },
      { title: "Stipendium Hungaricum Mentor", description: "Peer mentoring within the international student community." },
    ],
  },
];
