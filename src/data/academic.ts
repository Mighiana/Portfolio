export type Credential = { title: string; href?: string };
export type AcademicRecord = {
  title: string; institution: string; date?: string; location?: string;
  metadata: string[]; description: string; credentials: Credential[];
};

// Dates and academic details supplied by the author. Add only verified public credential URLs.
export const programs: AcademicRecord[] = [
  {
    title: "Human-Centered Artificial Intelligence and Emerging Digital Technologies",
    institution: "University “Ukshin Hoti” Prizren", location: "Kosovo", date: "5–14 August 2026",
    metadata: ["10 days", "4 ECTS", "Grade A"],
    description: "International summer school in human-centered AI: AI-assisted software engineering, specifications, development harnesses, behavior evaluation, safety, reliability and ethical impact.",
    credentials: [{ title: "Summer school certificate" }],
  },
  {
    title: "European Impact Sprint", institution: "HPI Engine / Hasso Plattner Institute",
    location: "Potsdam, Germany", date: "August 2026",
    metadata: ["4 days", "60 CS students", "25 European universities"],
    description: "Cross-border innovation sprint with European computer-science students: collaborative problem-solving, workshops, mentoring, Design Thinking and rapid prototyping.",
    credentials: [{ title: "European Impact Sprint credential" }],
  },
];

export const training: AcademicRecord[] = [
  {
    title: "DevOps with Docker", institution: "University of Helsinki",
    metadata: ["2 completed course components", "Dockerfiles", "Volumes", "Networking", "Docker Compose", "Container security", "Optimization"],
    description: "Container development and multi-container applications, supported by two related course credentials.",
    credentials: [
      { title: "DevOps with Docker" },
      { title: "DevOps with Docker — Docker Compose, Security and Optimization" },
    ],
  },
  {
    title: "AWS Cloud Foundations", institution: "Amazon Web Services",
    metadata: ["AWS", "Cloud", "Security", "Architecture", "Training — not AWS Certification"],
    description: "AWS Cloud Practitioner Essentials and AWS Cloud Quest: Cloud Practitioner. Cloud Quest date: August 2025.",
    credentials: [{ title: "AWS Cloud Practitioner Essentials" }, { title: "AWS Cloud Quest: Cloud Practitioner" }],
  },
];

export const professionalDevelopment = "McKinsey.org Forward Program (McKinsey & Company, April 2024) — structured problem solving and communication; not a cybersecurity credential.";
