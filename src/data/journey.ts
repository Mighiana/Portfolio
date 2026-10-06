export type JourneyEntry = {
  title: string;
  org?: string;
  /** Leave undefined rather than guessing dates. */
  period?: string;
  status?: string;
  description: string;
  href?: string;
};

export type JourneyTrack = {
  code: string;
  title: string;
  weight: "primary" | "secondary";
  entries: JourneyEntry[];
};

export const journey: JourneyTrack[] = [
  {
    code: "T",
    title: "Technical development",
    weight: "primary",
    entries: [
      {
        title: "Cybersecurity, cloud and networking studies",
        status: "Ongoing",
        description:
          "Coursework and self-study across security concepts, AWS cloud services and CCNA networking topics.",
      },
      {
        // TODO(journey): add organiser, dates and focus of the boot camp.
        title: "CC Lab boot camp",
        description: "Boot camp participant.",
      },
      {
        title: "BlastRadius",
        period: "2026",
        status: "Private beta",
        description: "Building a Terraform attack-path analysis tool for pull-request review.",
        href: "#projects",
      },
    ],
  },
  {
    code: "A",
    title: "Academic",
    weight: "primary",
    entries: [
      {
        title: "BSc Computer Science and Engineering",
        org: "Óbuda University — John von Neumann Faculty of Informatics",
        period: "Expected 2027",
        status: "Final semester",
        description: "Undergraduate programme in computer science and engineering.",
        href: "#education",
      },
      {
        title: "Thesis — Automation of Red Team Security in Controlled Environments",
        org: "Óbuda University",
        period: "2026–2027",
        status: "In Progress",
        description:
          "BSc thesis on the reliability and repeatability of automated MITRE ATT&CK-based adversary emulation in a controlled Windows environment.",
        href: "#thesis",
      },
      {
        // TODO(journey): add programme names and dates.
        title: "International academic programmes",
        description: "Participation in international academic programmes.",
      },
    ],
  },
  {
    code: "L",
    title: "Leadership / International",
    weight: "secondary",
    entries: [
      {
        // TODO(journey): add section name and dates.
        title: "Secretary",
        org: "Erasmus Student Network (ESN)",
        description: "Secretary role within ESN, supporting international students.",
      },
      {
        // TODO(journey): add context (programme, dates).
        title: "Mentoring",
        description: "Mentoring activity with fellow students.",
      },
    ],
  },
];
