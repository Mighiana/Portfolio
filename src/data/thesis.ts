export const thesis = {
  label: "BSc thesis",
  titleLines: ["Automation of", "Red Team Security", "in Controlled Environments"],
  title: "Automation of Red Team Security in Controlled Environments",
  meta: [
    { label: "Type", value: "BSc Thesis" },
    { label: "Status", value: "In Progress" },
    { label: "Period", value: "2026–2027" },
    { label: "Stage", value: "Research / Experimental Design" },
  ],
  scope:
    "Controlled, isolated, authorized academic security research. No live systems, no third-party targets.",
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

export type Chapter = {
  id: string;
  index: string;
  title: string;
  heading: string;
  body: string[];
  /** Diagram nodes highlighted while this chapter is open. */
  focus: DiagramNodeId[];
  placeholder?: string;
  points?: { label: string; text: string }[];
  code?: { caption: string; source: string };
};

const allNodes: DiagramNodeId[] = ["framework", "abilities", "operation", "endpoint", "isolation", "groundtruth", "sysmon", "ingestion", "ingestcheck", "alert"];

export const chapters: Chapter[] = [
  {
    id: "context",
    index: "01",
    title: "Context",
    heading: "Security testing involves repeatable workflows.",
    body: [
      "This BSc thesis investigates the reliability and repeatability of automated MITRE ATT&CK-based adversary emulation in a controlled Windows environment.",
      "It evaluates whether framework-reported execution outcomes correspond with independently observed endpoint activity, and whether confirmed activities are detected by defensive monitoring.",
    ],
    focus: allNodes,
  },
  {
    id: "problem",
    index: "02",
    title: "Problem",
    heading: "A reported result is not an observed result.",
    body: [
      "Automated adversary-emulation frameworks such as MITRE CALDERA report whether each step ran. That report alone does not show what actually happened on the endpoint, whether the telemetry reached the monitoring stack, or whether a defensive alert was raised.",
      "Without independent evidence at each layer, a missed detection cannot be told apart from an action that never ran or telemetry that never arrived.",
    ],
    focus: ["framework", "operation", "groundtruth"],
  },
  {
    id: "architecture",
    index: "03",
    title: "Architecture",
    heading: "Four questions, one evidence chain.",
    body: [
      "The conceptual experimental architecture follows the thesis evidence model: framework results → endpoint ground truth → monitoring ingestion → defensive alerts. Each layer is compared with the one before it.",
      "This is the planned design. It does not represent a deployed environment.",
    ],
    points: [
      { label: "Framework result", text: "What CALDERA says happened." },
      { label: "Endpoint ground truth", text: "What actually happened on the Windows endpoint, as recorded by Sysmon." },
      { label: "Monitoring ingestion", text: "What telemetry reached Wazuh." },
      { label: "Defensive detection", text: "What the defensive system detected." },
    ],
    focus: allNodes,
  },
  {
    id: "progress",
    index: "04",
    title: "Progress",
    heading: "Research design complete. Lab next.",
    body: [
      "The literature review, research questions and experimental methodology are complete. The controlled lab, CALDERA deployment and Sysmon / Wazuh integration have not been built yet, and no experiments have been run.",
    ],
    points: [
      { label: "Done — Literature review", text: "Automated adversary emulation, cyber ranges, endpoint telemetry and defensive detection." },
      { label: "Done — Research questions", text: "Three research questions and the experimental evaluation methodology." },
      { label: "Done — Evidence model", text: "Framework results → endpoint ground truth → monitoring ingestion → defensive alerts." },
      { label: "Done — Work Sheet & plan", text: "Thesis Work Sheet and experimental plan prepared." },
      { label: "Active — Ability review", text: "Reviewing and validating suitable CALDERA abilities and MITRE ATT&CK techniques." },
      { label: "Planned / evaluated stack", text: "MITRE ATT&CK · MITRE CALDERA · Windows · Sysmon · Wazuh · PowerShell · Virtual Machines" },
    ],
    focus: ["framework", "abilities"],
  },
  {
    id: "results",
    index: "05",
    title: "Results",
    heading: "No results yet.",
    body: [
      "No experiments have been run. Results will be added only after the controlled lab is implemented and the experiments are complete.",
    ],
    placeholder: "RESULTS PENDING",
    points: [
      { label: "Next — Controlled lab", text: "Implement the isolated Windows lab environment." },
      { label: "Next — Pilot experiments", text: "Run pilot experiments with the selected CALDERA abilities." },
      { label: "Next — Telemetry validation", text: "Check framework-reported outcomes against endpoint telemetry." },
      { label: "Next — Detection analysis", text: "Analyse which confirmed activities Wazuh ingests and alerts on." },
    ],
    focus: ["groundtruth", "sysmon", "ingestion", "ingestcheck", "alert"],
  },
  {
    id: "takeaways",
    index: "06",
    title: "Takeaways",
    heading: "Written on completion.",
    body: [
      "Takeaways will be added with the final thesis. The working principles are listed below.",
    ],
    points: [
      { label: "Isolation", text: "Experiments stay inside a controlled, isolated lab. No live systems, no third-party targets." },
      { label: "Independent evidence", text: "Framework-reported outcomes are checked against endpoint telemetry, not taken at face value." },
      { label: "Repeatability", text: "The same experiment definition should produce comparable evidence across runs." },
    ],
    placeholder: "TAKEAWAYS TO BE UPDATED",
    focus: ["isolation", "groundtruth"],
  },
];
