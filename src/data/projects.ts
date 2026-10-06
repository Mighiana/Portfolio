export type ProjectVisual = "pipeline" | "graph" | "cloud" | "network";

export type ProjectLink = { label: string; href: string };

/** Engineering breakdown shown under each project. Verified facts only. */
export type ProjectSpec = {
  problem: string;
  built: string;
  architecture: string;
  implementation: string;
  decisions: string;
  result: string;
};

export type Project = {
  id: string;
  title: string;
  type: string;
  year: string;
  status: string;
  summary: string;
  /** Only technologies that are part of the actual implementation, unless stackLabel says otherwise. */
  stack: string[];
  /** Shown above the stack when it is not (yet) the actual implementation, e.g. "Planned / evaluated". */
  stackLabel?: string;
  visual: ProjectVisual;
  /** Optional node labels for the pipeline schematic. */
  visualLabels?: string[];
  /** Optional boundary label for the pipeline schematic. */
  visualBoundary?: string;
  /** Figure caption override, e.g. "Conceptual architecture". */
  visualCaption?: string;
  links: ProjectLink[];
  spec?: ProjectSpec;
  /** Per-project overrides for spec row headings. */
  specLabels?: Partial<Record<keyof ProjectSpec, string>>;
  /** Internal anchor for the full case study, if any. */
  caseStudy?: string;
  flagship?: boolean;
  /** Draft entries render with a "write-up in progress" marker. */
  draft?: boolean;
  /** Set false to hide an entry without deleting it. */
  published: boolean;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Automation of Red Team Security in Controlled Environments",
    type: "BSc Thesis",
    year: "2026–2027",
    status: "In Progress",
    summary:
      "BSc thesis investigating automated red-team security testing in a controlled Windows environment. The literature review, research questions and experimental methodology have been completed; the next phase focuses on CALDERA-based adversary emulation, endpoint telemetry validation and Wazuh detection analysis.",
    stack: ["MITRE ATT&CK", "MITRE CALDERA", "Windows", "Sysmon", "Wazuh", "PowerShell", "Virtual Machines"],
    stackLabel: "Planned / evaluated",
    visual: "pipeline",
    visualLabels: ["CALDERA", "ENDPOINT", "SYSMON", "WAZUH"],
    visualBoundary: "CONTROLLED LAB",
    visualCaption: "Conceptual architecture",
    links: [],
    specLabels: {
      built: "Completed so far",
      architecture: "Planned architecture",
      implementation: "Current work",
      decisions: "Research design",
    },
    spec: {
      problem: "Automated adversary-emulation frameworks report whether a step ran, but not whether it actually happened on the endpoint, reached monitoring, or was detected.",
      built: "Literature review, three research questions, experimental methodology, evidence model, thesis Work Sheet and experimental plan. No lab or experiments yet.",
      architecture: "Conceptual evidence chain: CALDERA result → Windows endpoint → Sysmon ground truth → Wazuh ingestion → defensive alert.",
      implementation: "Reviewing and validating suitable CALDERA abilities and MITRE ATT&CK techniques before implementing the controlled lab and running pilot experiments.",
      decisions: "Framework-reported outcomes are compared with independent endpoint telemetry before detection is assessed. Controlled, isolated lab only; no live or third-party systems.",
      result: "In progress — research / experimental design. No experiments have been run and no results are available yet.",
    },
    caseStudy: "#thesis",
    flagship: true,
    published: true,
  },
  {
    id: "02",
    title: "BlastRadius",
    type: "Cloud Security / Tooling",
    year: "2026",
    status: "Private beta",
    summary:
      "Attack-path diff for Terraform pull requests. Compares Terraform snapshots, models supported AWS relationships and explains newly reachable paths to sensitive resources with evidence.",
    stack: ["Python", "FastAPI", "React", "TypeScript", "Terraform HCL / plan JSON", "GitHub Actions"],
    visual: "graph",
    links: [
      { label: "Repository", href: "https://github.com/Mighiana/BlastRadius" },
      { label: "Live demo", href: "https://blastradius.streamlit.app/" },
    ],
    spec: {
      problem: "A Terraform diff shows what changed, not what became reachable. A small change can open a new path to a sensitive resource.",
      built: "Analyzer that compares two Terraform snapshots (HCL or saved plan JSON), models supported AWS relationships and explains newly reachable paths to sensitive resources with evidence.",
      architecture: "React / TypeScript (Vite) → FastAPI → SQLAlchemy with PostgreSQL (SQLite locally). Bounded background jobs run the Python engine in isolation.",
      implementation: "Resource graph builder, IAM policy normalization, attack-path search, coverage diagnostics, JSON / Markdown / SARIF export, CLI and GitHub Actions gating.",
      decisions: "Fail closed: engine errors, timeouts or incomplete coverage return REVIEW. No Terraform execution, provider calls or AWS credentials are needed.",
      result: "Private beta with a public Streamlit demo. Verdicts: BLOCK / REVIEW / SAFE.",
    },
    published: true,
  },
  {
    id: "03",
    title: "Cloud-Based Secure File Management System",
    type: "Cloud / Application Security",
    year: "2025",
    status: "Completed",
    summary:
      "ASP.NET Core MVC web application for uploading and managing files on AWS S3, with role-based access control, hashed credentials, an admin dashboard and audit logging of user activity.",
    stack: ["C#", "ASP.NET Core 8", "AWS S3", "SQL Server", "Bootstrap"],
    visual: "pipeline",
    visualLabels: ["USER", "AUTH", "S3", "AUDIT"],
    links: [{ label: "Repository", href: "https://github.com/Mighiana/Cloud-Based-Secure-File-Management-System" }],
    spec: {
      problem: "Users need to upload and access files in cloud storage with access limited by role and their activity traceable.",
      built: "ASP.NET Core MVC application with login and registration, file upload and download to AWS S3, and an admin dashboard for users, activity logs and reports.",
      architecture: "Controllers → services (AWS S3 integration) → S3 bucket. SQL Server stores application data. Razor views with Bootstrap.",
      implementation: "Authentication with hashed passwords, role-based authorization, audit logging of user activity with ASP.NET Core logging, custom error pages.",
      decisions: "Configuration secrets (appsettings.json) are kept out of Git. S3 is accessed with dedicated credentials and strict access policies.",
      result: "Completed.",
    },
    published: true,
  },
  {
    id: "04",
    title: "SecureVPC",
    type: "Cloud Networking / AWS",
    year: "2025",
    status: "Completed",
    summary:
      "Segmented AWS VPC with a public subnet for a bastion host and a private subnet for a web server. Access is restricted with security groups and network ACLs, outbound traffic uses a NAT gateway, and VPC Flow Logs are sent to CloudWatch.",
    stack: ["AWS VPC", "EC2", "Security Groups", "NACL", "NAT Gateway", "CloudWatch"],
    visual: "cloud",
    links: [{ label: "Repository", href: "https://github.com/Mighiana/SecureVPC" }],
    spec: {
      problem: "Keep a web server out of the public subnet while still allowing administration and outbound connectivity.",
      built: "Segmented AWS VPC: public subnet with a bastion host, private subnet with the web server.",
      architecture: "Admin access → bastion host (public subnet) → web server (private subnet). Outbound traffic from the private subnet goes through a NAT gateway.",
      implementation: "Security groups at instance level and network ACLs at subnet level. VPC Flow Logs are sent to CloudWatch.",
      decisions: "Single administrative entry point through the bastion host. Two filtering layers (SG + NACL). Outbound-only internet access for private instances.",
      result: "Completed.",
    },
    published: true,
  },
];
