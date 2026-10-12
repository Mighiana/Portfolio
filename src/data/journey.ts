export type JourneyEntry = {
  title: string; org?: string; period?: string; status?: string; description?: string; href?: string;
};
export type JourneyTrack = {
  code: string; title: string; weight: "primary" | "secondary"; entries: JourneyEntry[];
};

export const journey: JourneyTrack[] = [
  {
    code: "L", title: "Experience & leadership", weight: "primary",
    entries: [
      { title: "Volunteer Secretary", org: "Erasmus Student Network (ESN) Óbuda", period: "2025 – 2026",
        description: "Coordinate communications, meeting documentation and operational follow-up; support international-student onboarding, university communication and recurring event and administrative coordination." },
      { title: "Mentor", org: "Stipendium Hungaricum Mentor Network", period: "2025 – 2026",
        description: "Mentor assigned international students through academic systems, university procedures, documentation and deadlines; create reusable guidance for recurring onboarding and administrative questions." },
    ],
  },
  {
    code: "T", title: "Technical development", weight: "secondary",
    entries: [
      { title: "Cybersecurity & Compliance Engineering Bootcamp", org: "Óbuda University × CC Lab",
        period: "2026", status: "Participant", description: "Additional cybersecurity development alongside university studies." },
    ],
  },
];
