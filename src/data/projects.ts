export type ProjectVisual = "pipeline" | "graph" | "cloud" | "network";

export type ProjectLink = { label: string; href: string };

/** Engineering breakdown shown under each project. Verified facts only. */
export type ProjectDemo = {
  label: string;
  source?: string;
  note?: string;
  alt: string;
  webm: string;
  mp4: string;
  poster: string;
  width: number;
  height: number;
};

const media = (name: string) => {
  const base = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/${name}`;
  return { webm: `${base}.webm`, mp4: `${base}.mp4`, poster: `${base}.webp` };
};

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
  /** Figure number override, e.g. "T-01" when the card shows a case-study figure. */
  visualFigure?: string;
  links: ProjectLink[];
  spec?: ProjectSpec;
  /** Step through the pipeline stages one at a time (conceptual chains). */
  visualSequence?: boolean;
  demos?: ProjectDemo[];
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
      "BSc thesis investigating automated red-team security testing in a controlled Windows environment. The literature review, research questions and experimental methodology have been completed; the next phase focuses on controlled adversary-emulation experiments, endpoint telemetry validation and defensive monitoring analysis.",
    stack: ["MITRE ATT&CK", "MITRE CALDERA", "Windows", "Sysmon", "Wazuh", "PowerShell", "Virtual Machines"],
    stackLabel: "Planned stack",
    visual: "pipeline",
    visualLabels: ["FRAMEWORK", "ENDPOINT", "SYSMON", "WAZUH", "DETECTION"],
    visualBoundary: "CONTROLLED LAB (PLANNED)",
    visualFigure: "T-01",
    visualCaption: "Conceptual / planned architecture — not a lab run",
    visualSequence: true,
    links: [],
    specLabels: {
      built: "Completed so far",
      architecture: "Planned architecture",
      implementation: "Current work",
      decisions: "Research design",
    },
    spec: {
      problem: "Automated adversary-emulation frameworks report whether a step ran, but not whether it actually happened on the endpoint, reached monitoring, or was detected.",
      built: "Literature review, research questions, experimental methodology, evidence model, research scope and experimental plan. No lab or experiments yet.",
      architecture: "Conceptual evidence chain, planned — not deployed: CALDERA result → Windows endpoint → Sysmon endpoint evidence → Wazuh ingestion → defensive alert.",
      implementation: "Reviewing suitable CALDERA abilities and MITRE ATT&CK techniques. Controlled lab implementation and pilot experiments are the next phase.",
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
      { label: "Live app", href: "https://blastradius-hulf.onrender.com/" },
    ],
    spec: {
      problem: "A Terraform diff shows what changed, not what became reachable. A small change can open a new path to a sensitive resource.",
      built: "Analyzer that compares two Terraform snapshots (HCL or saved plan JSON), models supported AWS relationships and explains newly reachable paths to sensitive resources with evidence.",
      architecture: "React / TypeScript (Vite) → FastAPI → SQLAlchemy with PostgreSQL (SQLite locally). Bounded background jobs run the Python engine in isolation.",
      implementation: "Resource graph builder, IAM policy normalization, attack-path search, coverage diagnostics, JSON / Markdown / SARIF export, CLI and GitHub Actions gating.",
      decisions: "Fail closed: engine errors, timeouts or incomplete coverage return REVIEW. No Terraform execution, provider calls or AWS credentials are needed.",
      result: "Private beta, hosted on Render. Verdicts: BLOCK / REVIEW / SAFE.",
    },
    published: true,
  },
  {
    id: "03",
    title: "SafePaste",
    type: "Privacy Engineering / AppSec",
    year: "2026",
    status: "Live demo",
    summary:
      "Local privacy firewall for technical logs. Finds secrets, tokens, keys and personal data in pasted logs with 27 deterministic rules, explains every finding and lets the user approve the sanitized output. The log never leaves the device.",
    stack: ["JavaScript", "HTML / CSS", "Web Workers", "Node.js CLI", "Content Security Policy", "GitHub Actions"],
    visual: "pipeline",
    visualLabels: ["LOG", "DETECT", "REVIEW", "OUTPUT"],
    visualBoundary: "ON DEVICE · NO NETWORK",
    links: [
      { label: "Repository", href: "https://github.com/Mighiana/SafePaste" },
      { label: "Live demo", href: "https://mighiana.github.io/SafePaste/" },
    ],
    spec: {
      problem: "Engineers paste logs into AI assistants, tickets and support chats. Those logs often contain passwords, tokens, cloud keys, emails and IPs; manual redaction misses things, and cloud scanners need the same data uploaded.",
      built: "Browser app and CLI on one dependency-free engine: format detection, bounded parsers (JSON, env, HTTP headers, logfmt), 27 detectors, privacy profiles, per-finding Keep / Hide review, in-memory pseudonymization and a metadata-only privacy report.",
      architecture: "Static page → Web Worker → shared engine (src/sanitizer.js); the CLI runs the same engine. No backend, database, storage or network calls.",
      implementation: "Bounded lexers and validators instead of large regexes (IPv6, MAC, PEM, JWT, Basic auth), overlap resolution, fail-closed size limits, CLI --check exit codes for CI gates.",
      decisions: "Deterministic, explainable rules; no ML or remote APIs. Zero egress enforced by CSP (connect-src 'none'), static privacy checks and a pre-commit gate. Credentials are always redacted.",
      result: "Live as a static GitHub Pages demo that runs fully in the browser. 26 test suites pass in CI, incl. 144/144 synthetic corpus cases and a 46-case red-team suite with 10 recorded known misses. Academic Human-Centered AI project, extended October 2026.",
    },
    published: true,
  },
  {
    id: "04",
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
    demos: [
      {
        label: "Upload → validate → approve",
        source: "Local Docker",
        note: "Upload lands in the quarantine bucket, the validator runs basic checks + ClamAV, and only then is the download enabled.",
        alt: "Screen recording: a PDF is uploaded, shows Validating, then Approved with the Download button enabled.",
        ...media("cloud-approve"),
        width: 960,
        height: 600,
      },
      {
        label: "EICAR test file → quarantined",
        source: "Local Docker",
        note: "EICAR is the standard harmless antivirus test string. ClamAV flags it, the file stays quarantined and download is blocked.",
        alt: "Screen recording: the EICAR test file is uploaded, ClamAV detects it, status Quarantined, download blocked.",
        ...media("cloud-quarantine"),
        width: 960,
        height: 600,
      },
      {
        label: "Admin dashboard → audit log",
        source: "Local Docker",
        note: "Pipeline counts and audit events are read from SQL Server. Recorded locally (LocalStack S3, SQL Server, ClamAV); the validation pipeline is a 2026 extension of the 2025 coursework.",
        alt: "Screen recording: admin security dashboard with the file pipeline, then the audit log listing upload, validation and quarantine events.",
        ...media("cloud-admin"),
        width: 960,
        height: 600,
      },
    ],
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
    id: "05",
    title: "SecureVPC",
    type: "Cloud Networking / AWS",
    year: "2025",
    status: "Completed",
    summary:
      "Segmented AWS VPC with a public subnet for a bastion host and a private subnet for a web server. Access is restricted with security groups and network ACLs, outbound traffic uses a NAT gateway, and VPC Flow Logs are sent to CloudWatch.",
    stack: ["AWS VPC", "EC2", "Security Groups", "NACL", "NAT Gateway", "CloudWatch"],
    visual: "cloud",
    links: [{ label: "Repository", href: "https://github.com/Mighiana/SecureVPC" }],
    demos: [
      {
        label: "Terraform validation",
        source: "make check · 3× speed",
        note: "Real repository output: fmt, validate, mocked terraform test, TFLint, Checkov, ShellCheck. Offline checks of the 2026 Terraform reconstruction — not a live AWS deployment.",
        alt: "Terminal recording of make check in the SecureVPC repository: terraform validate, terraform test, TFLint and Checkov all pass.",
        ...media("securevpc-check"),
        width: 960,
        height: 636,
      },
    ],
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
