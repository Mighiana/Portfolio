/**
 * Public, sanitized thesis summary. Thesis documents, exact research-question
 * wording, ability/technique selection, procedure and thresholds are private
 * and must not be added here without the author's explicit approval.
 */
export const thesis = {
  label: "Active BSc cybersecurity research",
  statementLines: ["A reported result", "is not an", "observed result."],
  subtitle: "Validating automated adversary emulation against endpoint telemetry and detection.",
  title: "Automation of Red Team Security in Controlled Environments",
  meta: [
    { label: "Type", value: "BSc Thesis" },
    { label: "Status", value: "In Progress" },
    { label: "Period", value: "2026–2027" },
    { label: "Stage", value: "Research / Experimental Design" },
  ],
  supervision: { label: "Supervisor", value: "Rigó Ernő — Óbuda University" },
  scope: "Controlled, isolated, authorized academic security research. No live systems. No third-party targets.",
} as const;

export type DiagramNodeId =
  | "framework"
  | "abilities"
  | "operation"
  | "endpoint"
  | "isolation"
  | "groundtruth"
  | "sysmon"
  | "ingestion"
  | "ingestcheck"
  | "alert";

export type ChapterBlock = {
  /** Small caption above the block, e.g. "FIG. T-02 — Evidence model". */
  caption: string;
  items?: { label: string; text: string; tag?: string }[];
  chips?: string[];
};

export type Chapter = {
  id: string;
  index: string;
  title: string;
  heading: string;
  body: string[];
  /** Diagram nodes highlighted while this chapter is open. */
  focus: DiagramNodeId[];
  status?: { label: string; value: string; text: string };
  blocks?: ChapterBlock[];
};

const allNodes: DiagramNodeId[] = ["framework", "abilities", "operation", "endpoint", "isolation", "groundtruth", "sysmon", "ingestion", "ingestcheck", "alert"];

export const chapters: Chapter[] = [
  {
    id: "context",
    index: "01",
    title: "Context",
    heading: "Security testing involves repeatable workflows.",
    body: [
      "Investigating the reliability and repeatability of automated MITRE ATT&CK-based adversary emulation in a controlled Windows environment.",
      "The research examines whether framework-reported outcomes correspond with independently observed endpoint activity, and whether confirmed activity becomes visible to defensive monitoring.",
    ],
    blocks: [
      {
        caption: "Research foundation",
        chips: ["MITRE ATT&CK", "MITRE CALDERA", "Microsoft Sysmon", "Wazuh"],
        items: [
          { label: "Academic literature", text: "Adversary emulation, cyber ranges, endpoint telemetry and defensive detection." },
        ],
      },
    ],
    focus: allNodes,
  },
  {
    id: "focus",
    index: "02",
    title: "Research focus",
    heading: "Three areas of focus.",
    body: [
      "Automated frameworks report whether each step ran. The thesis asks how far that report can be trusted, and what happens to the activity after it.",
    ],
    blocks: [
      {
        caption: "Research focus",
        items: [
          { label: "Reported execution", text: "Reliability and repeatability of framework-reported execution." },
          { label: "Endpoint agreement", text: "Agreement between reported execution and endpoint-observed activity." },
          { label: "Detection visibility", text: "Visibility and detection of confirmed activity in defensive monitoring." },
        ],
      },
    ],
    focus: ["framework", "operation", "groundtruth", "alert"],
  },
  {
    id: "methodology",
    index: "03",
    title: "Methodology",
    heading: "Four layers of evidence, compared.",
    body: [
      "The planned evaluation compares each layer with the one before it, so a missed detection can be told apart from an action that never ran or telemetry that never arrived.",
    ],
    blocks: [
      {
        caption: "FIG. T-02 — Evidence model",
        items: [
          { label: "Framework report", text: "What the adversary-emulation framework reports." },
          { label: "Endpoint evidence", text: "What endpoint evidence independently shows." },
          { label: "Monitoring ingestion", text: "What telemetry reaches the monitoring platform." },
          { label: "Defensive alert", text: "Whether defensive monitoring surfaces the confirmed activity." },
        ],
      },
      {
        caption: "Working principles",
        items: [
          { label: "Isolation", text: "Research remains within a controlled academic environment." },
          { label: "Independent evidence", text: "Framework-reported outcomes are evaluated against independent endpoint evidence." },
          { label: "Repeatability", text: "The methodology is designed to support comparable evidence across repeated experimental runs." },
        ],
      },
    ],
    focus: ["framework", "groundtruth", "ingestion", "alert"],
  },
  {
    id: "architecture",
    index: "04",
    title: "Conceptual architecture",
    heading: "Planned — not deployed.",
    body: [
      "FIG. T-01 shows the conceptual experimental architecture behind the evidence model. It is a research design, not a description of a running environment. None of the stack below is deployed yet.",
    ],
    blocks: [
      {
        caption: "Planned stack",
        chips: ["MITRE ATT&CK", "MITRE CALDERA", "Windows", "Sysmon", "Wazuh", "PowerShell", "Virtual Machines"],
      },
    ],
    focus: allNodes,
  },
  {
    id: "progress",
    index: "05",
    title: "Current progress",
    heading: "Research design complete. Lab next.",
    body: [
      "Implementation and experiments are the next phase. No controlled lab has been built and no experiments have been run.",
    ],
    blocks: [
      {
        caption: "Completed so far",
        items: [
          { tag: "Done", label: "Literature review", text: "Main literature review completed." },
          { tag: "Done", label: "Research questions", text: "Research questions defined." },
          { tag: "Done", label: "Methodology", text: "Experimental methodology established." },
          { tag: "Done", label: "Evidence model", text: "Evidence model designed." },
          { tag: "Done", label: "Scope & plan", text: "Research scope and experimental plan prepared." },
          { tag: "Current", label: "Technique review", text: "CALDERA ability / ATT&CK technique review underway." },
        ],
      },
    ],
    focus: ["framework", "abilities"],
  },
  {
    id: "roadmap",
    index: "06",
    title: "Roadmap",
    heading: "Roadmap / next phase.",
    body: [],
    status: {
      label: "Status",
      value: "Experimental results pending",
      text: "No experiments have been run yet. Results will be added after implementation of the controlled lab and completion of the planned experimental work.",
    },
    blocks: [
      {
        caption: "FIG. T-03 — Research roadmap",
        items: [
          { tag: "Done", label: "Literature review", text: "Background and related work." },
          { tag: "Done", label: "Questions & methodology", text: "Research focus and evaluation approach." },
          { tag: "Current", label: "Technique selection", text: "Ability and technique review." },
          { tag: "Next 01", label: "Controlled lab", text: "Implement the isolated lab environment." },
          { tag: "Next 02", label: "Pilot experiments", text: "Small-scale runs to check the setup." },
          { tag: "Next 03", label: "Telemetry validation", text: "Compare reported outcomes with endpoint evidence." },
          { tag: "Next 04", label: "Detection analysis", text: "Assess ingestion and defensive alerting." },
          { tag: "Next 05", label: "Writing & submission", text: "Analysis, final writing and submission." },
        ],
      },
    ],
    focus: ["endpoint", "isolation", "groundtruth", "sysmon", "ingestion", "ingestcheck", "alert"],
  },
];
