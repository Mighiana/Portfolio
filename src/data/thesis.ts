export const thesis = {
  label: "Thesis project",
  titleLines: ["Automation of", "Red Team Security", "in Controlled Environments"],
  title: "Automation of Red Team Security in Controlled Environments",
  meta: [
    { label: "Type", value: "Thesis Project" },
    { label: "Domain", value: "Cybersecurity / Security Automation" },
    { label: "Year", value: "2026" },
    { label: "Status", value: "Ongoing" },
  ],
  scope:
    "Controlled, isolated security research. No live systems, no third-party targets.",
} as const;

export type DiagramNodeId =
  | "attacker"
  | "framework"
  | "recon"
  | "modules"
  | "execution"
  | "environment"
  | "targets"
  | "segmentation"
  | "logging"
  | "monitoring"
  | "reporting";

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

export const chapters: Chapter[] = [
  {
    id: "context",
    index: "01",
    title: "Context",
    heading: "Security testing involves repeatable workflows.",
    body: [
      "Security testing in controlled environments can involve repetitive preparation, execution, monitoring and reporting steps. This project explores how selected parts of those workflows can be automated while preserving reproducibility, isolation and clear reporting.",
    ],
    focus: ["attacker", "framework", "environment", "logging", "reporting"],
  },
  {
    id: "problem",
    index: "02",
    title: "Problem",
    heading: "Manual runs are hard to repeat and compare.",
    body: [
      "When environment preparation, test execution, log collection and reporting are done by hand, two runs of the same exercise rarely look the same. That makes results harder to reproduce, compare and review.",
      "The thesis investigates which of these steps can be automated — and how — without weakening the isolation of the test environment.",
    ],
    focus: ["framework", "environment"],
  },
  {
    id: "architecture",
    index: "03",
    title: "Architecture",
    heading: "A pipeline from test machine to report.",
    body: [
      "The conceptual architecture separates the machine that drives tests, the automation framework, the isolated target environment, the logging layer and the reporting stage. Each stage hands structured output to the next.",
    ],
    points: [
      { label: "Test machine", text: "Starts and supervises test runs." },
      { label: "Automation framework", text: "Sequences reconnaissance, test modules and execution steps." },
      { label: "Controlled environment", text: "Segmented target systems that exist only for the exercise." },
      { label: "Logging & monitoring", text: "Captures what happened, from both sides, for every run." },
      { label: "Reporting", text: "Turns collected evidence into a consistent, reviewable report." },
    ],
    focus: ["attacker", "framework", "recon", "modules", "execution", "environment", "targets", "segmentation", "logging", "monitoring", "reporting"],
  },
  {
    id: "implementation",
    index: "04",
    title: "Implementation",
    heading: "Orchestration, not exploitation.",
    body: [
      "The implementation focuses on workflow structure: environment checks, ordered stages, logging and report generation. The snippet below is an illustrative outline of that structure, not production code.",
    ],
    code: {
      caption: "Illustrative workflow outline",
      source: `@dataclass
class Run:
    environment: LabEnvironment
    stages: list[Stage]

    def execute(self) -> Report:
        assert self.environment.is_isolated(), "refuse to run outside the lab"
        log = RunLog(run_id=uuid4())
        for stage in self.stages:
            log.record(stage.name, stage.run(self.environment))
        return Report.from_log(log)`,
    },
    focus: ["framework", "recon", "modules", "execution"],
  },
  {
    id: "results",
    index: "05",
    title: "Results",
    heading: "Results to be updated.",
    body: ["Findings will be published here once the thesis evaluation is complete."],
    placeholder: "RESULTS TO BE UPDATED",
    focus: ["logging", "monitoring", "reporting"],
  },
  {
    id: "takeaways",
    index: "06",
    title: "Takeaways",
    heading: "Written on completion.",
    body: [
      "Takeaways will be added with the final thesis. The working focus areas are listed below.",
    ],
    points: [
      { label: "Isolation", text: "Automation must never widen the boundary of the test environment." },
      { label: "Reproducibility", text: "The same run definition should produce comparable results." },
      { label: "Reporting", text: "Every run should end in evidence a reviewer can follow." },
    ],
    placeholder: "TAKEAWAYS TO BE UPDATED",
    focus: ["segmentation", "reporting"],
  },
];
