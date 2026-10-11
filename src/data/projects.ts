export type ProjectVisual = "pipeline" | "graph" | "cloud" | "network";
export type ProjectLink = { label: string; href: string };
export type ProjectDemo = {
  label: string; source?: string; note?: string; alt: string;
  webm: string; mp4: string; poster: string; width: number; height: number;
};
export type ProjectSpec = {
  problem: string; built: string; architecture: string;
  implementation: string; decisions: string; result: string;
};
export type Project = {
  id: string; slug: string; title: string; type: string; year: string;
  status: string; summary: string; proof: string[]; proofNote?: string;
  stack: string[]; stackLabel?: string; visual: ProjectVisual;
  visualLabels?: string[]; visualBoundary?: string; visualCaption?: string;
  visualSequence?: boolean; links: ProjectLink[]; evidence?: ProjectLink[];
  spec: ProjectSpec; demos?: ProjectDemo[]; outputs?: ProjectOutput[]; tier: "featured" | "other"; published: boolean;
};
export type ProjectOutput = { label: string; caption: string; alt: string; src: string; width: number; height: number };

export const projectUrl = (slug: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/projects/${slug}/`;

const media = (name: string) => {
  const base = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/${name}`;
  return { webm: `${base}.webm`, mp4: `${base}.mp4`, poster: `${base}.webp` };
};

export const projects: Project[] = [
  {
    id: "01", slug: "blastradius", title: "BlastRadius",
    type: "Cloud security / Security automation", year: "2026", status: "Private beta · Render",
    summary: "Compares Terraform snapshots and explains newly reachable paths to sensitive cloud resources using supported AWS relationships.",
    proof: ["Terraform change", "Infrastructure graph", "New reachability path", "Security impact"],
    stack: ["Python", "FastAPI", "React", "Terraform", "GitHub Actions"],
    visual: "graph",
    links: [
      { label: "View repository", href: "https://github.com/Mighiana/BlastRadius" },
      { label: "Live app", href: "https://blastradius-hulf.onrender.com/" },
    ],
    evidence: [{ label: "Model limits & readiness", href: "https://github.com/Mighiana/BlastRadius/blob/main/docs/readiness.md" }],
    outputs: [
      { label: "BLOCK CHANGE — real CLI result", caption: "Captured output for the bundled examples/safe → examples/vulnerable pair (one changed line: SSH ingress CIDR). Exit code 1. Bundled example, not a customer environment.",
        alt: "BlastRadius CLI output: Decision BLOCK CHANGE, verdict SECURITY REGRESSION, score 100 to 20, and the new path Internet to Web SG to Web Server to App Role to Customer Data.",
        src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/blastradius-block.webp`, width: 1122, height: 707 },
      { label: "SARIF 2.1.0 export — excerpt", caption: "First result from --format sarif on the bundled plan JSON example; codeFlows, fingerprints and edge evidence omitted for length. Logical resource addresses, not guessed line numbers.",
        alt: "BlastRadius SARIF result BR001, level error, CRITICAL attack path from INTERNET to sensitive_data.customer_data with logical location aws_security_group.web.",
        src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/blastradius-sarif.webp`, width: 1122, height: 932 },
    ],
    spec: {
      problem: "A Terraform diff shows what changed, not what became reachable. A small change can open a new path to a sensitive resource.",
      built: "A bounded analyzer for before/after HCL snapshots or saved plan JSON, with path evidence, coverage diagnostics and security verdicts.",
      architecture: "React / TypeScript → FastAPI → SQLAlchemy with PostgreSQL (SQLite locally). Isolated background jobs run the Python analysis engine.",
      implementation: "Infrastructure graph construction, IAM normalization, attack-path search, findings, remediation guidance and JSON / Markdown / SARIF exports; CLI and GitHub PR checks.",
      decisions: "No Terraform execution, provider calls or AWS credentials. Analysis errors and incomplete coverage lead to REVIEW; strict CLI gating requires --fail-on-review.",
      result: "Private beta on Render, not a complete AWS security assessment. Only supported relationships are modeled; dynamic/runtime behavior and unsupported coverage remain limitations.",
    },
    tier: "featured", published: true,
  },
  {
    id: "02", slug: "secure-cloud-files", title: "Secure Cloud File Management Platform",
    type: "Cloud security / Application security / AWS", year: "2025 → 2026", status: "Working / locally verified",
    summary: "Quarantines uploads until integrity, file-signature and optional ClamAV checks pass, with per-user access, least-privilege S3 storage and tamper-evident auditing.",
    proof: ["Untrusted upload", "Quarantine", "Validation", "Approved / rejected", "Controlled download"],
    proofNote: "Rejected or quarantined files remain blocked.",
    stack: ["ASP.NET Core 8", "SQL Server", "Amazon S3", "Terraform", "ClamAV", "LocalStack", "Docker"],
    visual: "pipeline", visualLabels: ["UPLOAD", "QUARANTINE", "VALIDATE", "DOWNLOAD"], visualBoundary: "PRIVATE STORAGE",
    links: [{ label: "View repository", href: "https://github.com/Mighiana/Cloud-Based-Secure-File-Management-System" }],
    evidence: [{ label: "Tests & CI", href: "https://github.com/Mighiana/Cloud-Based-Secure-File-Management-System/actions" }],
    spec: {
      problem: "Cloud storage should not turn an untrusted upload into a downloadable file. Authorization, validation and audit evidence must survive failures.",
      built: "An ASP.NET Core 8 file portal with Admin / User roles, per-user ownership, private quarantine and approved S3 buckets, and a hash-chained application audit log.",
      architecture: "Authenticated Razor/MVC application → SQL Server metadata and audit chain → quarantine S3 → validation worker → approved S3. Short-lived pre-signed URLs allow authorized downloads.",
      implementation: "SHA-256 re-hashing, magic-byte validation, optional ClamAV and fail-closed scanner behavior. Terraform defines storage/IAM; Docker uses LocalStack, SQL Server and ClamAV. Automated .NET, Lambda and infrastructure tests run in CI.",
      decisions: "Authenticated-by-default and least-privilege IAM. Application audit records user/security actions; CloudTrail records AWS API activity. The audit chain detects tampering but has no external anchor. No GuardDuty dependency.",
      result: "Original November 2025 coursework; validation pipeline and reproducibility added in 2026. Working local Docker evidence, not a public production service. Terraform/Lambda have not been deployed to real AWS from this repository; scanner limits, no MFA and shared worker permissions remain.",
    },
    demos: [
      { label: "Upload → validate → approve", source: "Local Docker · 2026 extension",
        note: "LocalStack S3, SQL Server and ClamAV. Approval enables download.",
        alt: "Real local recording: PDF upload, Validating, then Approved with Download enabled.",
        ...media("cloud-approve"), width: 960, height: 600 },
      { label: "EICAR → quarantined", source: "Local Docker · 2026 extension",
        note: "Harmless antivirus test string; ClamAV flags it and download stays blocked.",
        alt: "Real local recording: EICAR test file is quarantined and download is blocked.",
        ...media("cloud-quarantine"), width: 960, height: 600 },
      { label: "Dashboard → audit log", source: "Local Docker · 2026 extension",
        note: "Pipeline states and application audit events; not live AWS telemetry.",
        alt: "Real local recording: admin dashboard and audit log with upload and validation events.",
        ...media("cloud-admin"), width: 960, height: 600 },
    ],
    tier: "featured", published: true,
  },
  {
    id: "03", slug: "securevpc", title: "SecureVPC",
    type: "Network security / AWS / Terraform", year: "2025 → 2026", status: "Original lab + Terraform reconstruction",
    summary: "Segments a public bastion from a private workload with no public IP, SG-to-SG access, custom NACLs, NAT-only egress and VPC Flow Logs.",
    proof: ["Internet", "Bastion", "Private workload", "NAT-only egress"],
    proofNote: "Administration via bastion; private workload outbound via NAT.",
    stack: ["AWS VPC", "EC2", "Terraform", "Security groups", "NACLs", "CloudWatch"],
    visual: "cloud",
    links: [{ label: "View repository", href: "https://github.com/Mighiana/SecureVPC" }],
    evidence: [{ label: "Advanced design — not deployed", href: "https://github.com/Mighiana/SecureVPC/tree/main/terraform/advanced" }],
    spec: {
      problem: "Keep a workload off the public internet while retaining scoped administration, outbound access and network visibility.",
      built: "Original manual AWS lab in August 2025; faithful Terraform reconstruction and security hardening in 2026.",
      architecture: "Public subnet: bastion and NAT Gateway. Private subnet: workload without a public IP. SG-to-SG SSH, custom NACLs and VPC Flow Logs → CloudWatch.",
      implementation: "IMDSv2, scoped security groups, subnet filtering, logging and offline Terraform tests with a mocked provider, TFLint, Checkov, ShellCheck and CI.",
      decisions: "Console → Terraform; private key on bastion → key stays on workstation with ProxyJump; broad configuration → scoped hardening; manual checks → automated validation.",
      result: "The original 2025 AWS lab is distinct from the 2026 reconstruction. Current Terraform has offline validation, not a fresh AWS deployment. The advanced security architecture is a Terraform-validated design, not deployed; offline checks do not prove live routing.",
    },
    demos: [{ label: "Terraform validation", source: "Recorded make check · 3× speed",
      note: "Historical 2026 recording of real offline checks — not live AWS deployment or current test-count evidence.",
      alt: "Real terminal recording: Terraform validation, mocked tests, TFLint, Checkov and ShellCheck.",
      ...media("securevpc-check"), width: 960, height: 636 }],
    tier: "featured", published: true,
  },
  {
    id: "04", slug: "windows-pki", title: "Windows Enterprise PKI & Certificate Trust Lab",
    type: "Windows security / Identity / PKI", year: "May 2026 → 2026 extension", status: "Original lab completed · Live rebuild documented",
    summary: "AD-integrated Windows Server 2022 PKI with an Enterprise Root CA, GPO trust distribution, machine certificates and trusted IIS HTTPS.",
    proof: ["Enterprise Root CA", "GPO trust", "Machine certificate", "IIS :443", "Trusted browser"],
    stack: ["Windows Server 2022", "AD DS / AD CS", "IIS", "PowerShell", "Pester", "PSScriptAnalyzer"],
    visual: "pipeline", visualLabels: ["ROOT CA", "GPO", "CERT", "TLS TRUST"], visualBoundary: "LAB TRUST",
    links: [{ label: "View repository", href: "https://github.com/Mighiana/Windows-enterprise-pk" }],
    evidence: [{ label: "Recorded two-VM rebuild evidence", href: "https://github.com/Mighiana/Windows-enterprise-pk/blob/main/docs/live-lab.md" }],
    spec: {
      problem: "An HTTPS binding is not enough: issuer trust, certificate identity, enrollment permissions and revocation must be checked independently.",
      built: "Manual university lab completed May 2026: AD DS, AD CS Enterprise Root CA, GPO-based root trust, machine certificate issuance and IIS HTTPS. The repository was created later for documentation and reproducibility.",
      architecture: "Original single-VM lab; a separate 2026 extension documents a Windows Server 2022 server and a Windows 11 domain client on a host-only network.",
      implementation: "Read-only PowerShell PKI verification and AD CS misconfiguration auditing, Pester/PSScriptAnalyzer and CI. The documented live rebuild tested separate-client GPO delivery, hardened auto-enrollment, revocation and detection/remediation of AD CS misconfigurations.",
      decisions: "Keep original lab, live rebuild, fixture-based sample reports and production target design distinct. Audit findings indicate review, not proof of exploitation.",
      result: "Lab evidence, not production PKI. The live rebuild remains an online root CA. The offline-root / issuing-CA production target is design-only and unimplemented; fixture sample reports are not live evidence.",
    },
    tier: "featured", published: true,
  },
  {
    id: "05", slug: "red-team-research", title: "Automation of Red Team Security in Controlled Environments",
    type: "Security research / Adversary emulation", year: "2026–2027", status: "In progress · Research / experimental design",
    summary: "Research into whether automated adversary-emulation results correspond with independent endpoint evidence and defensive detection.",
    proof: ["Framework result", "Windows endpoint", "Sysmon evidence", "Wazuh ingestion", "Defensive detection"],
    proofNote: "Conceptual experimental architecture · Planned — not deployed.",
    stack: ["MITRE ATT&CK", "CALDERA", "Windows", "Sysmon", "Wazuh"], stackLabel: "Planned / evaluated — not implemented",
    visual: "pipeline", visualLabels: ["FRAMEWORK", "ENDPOINT", "SYSMON", "WAZUH", "DETECTION"],
    visualBoundary: "CONTROLLED LAB (PLANNED)", visualCaption: "Conceptual / planned", visualSequence: true,
    links: [],
    spec: {
      problem: "A framework-reported result is not independent proof of endpoint activity or detection.",
      built: "Literature review, research questions, methodology, evidence model and experimental plan. No implemented lab or experiments yet.",
      architecture: "Conceptual evidence chain: framework → Windows endpoint → Sysmon evidence → Wazuh ingestion → defensive detection.",
      implementation: "Current: CALDERA ability review and MITRE ATT&CK technique selection. Next: controlled lab, pilot experiments, telemetry validation and detection analysis.",
      decisions: "Isolated, authorized academic work; sanitized public overview only. No private research questions, detailed procedures, scripts or unpublished results.",
      result: "BSc thesis, Óbuda University, 2026–2027. Supervisor: Rigó Ernő. Research / experimental design; not deployed.",
    },
    tier: "featured", published: true,
  },
  {
    id: "06", slug: "safepaste", title: "SafePaste",
    type: "Privacy engineering / Application security / Human-centered AI", year: "2026", status: "Working · Local-only hosted demo",
    summary: "Local-only log sanitizer that detects sensitive values, supports human review and produces shareable output without uploading or storing original logs.",
    proof: ["Technical log", "Local detection", "Human review", "Sanitized output"],
    proofNote: "Local only · No network egress · No tracking · No persistent log storage.",
    stack: ["JavaScript", "Web Workers", "Node.js CLI", "CSP", "GitHub Actions"],
    visual: "pipeline", visualLabels: ["LOG", "DETECT", "REVIEW", "OUTPUT"], visualBoundary: "ON DEVICE · NO NETWORK",
    links: [
      { label: "View repository", href: "https://github.com/Mighiana/SafePaste" },
      { label: "Live demo", href: "https://mighiana.github.io/SafePaste/" },
    ],
    evidence: [{ label: "Privacy threat model", href: "https://github.com/Mighiana/SafePaste#privacy-threat-model" }],
    spec: {
      problem: "Technical logs can expose credentials and personal data when shared with AI assistants, support or issue trackers.",
      built: "A local privacy firewall: deterministic detection, per-finding human review, sanitized output and metadata-only privacy reports. Originated in Human-Centered AI software engineering coursework.",
      architecture: "Static browser UI → Web Worker → shared sanitizer engine; a Node.js CLI uses the same engine. No backend, analytics, network API or persistent log storage.",
      implementation: "Bounded structured-format parsing, overlap resolution, in-memory pseudonymization, privacy profiles, CLI checks and automated security/behavior tests.",
      decisions: "Local only, no remote model or judge. CSP blocks network egress; logs remain in memory. Human review is mandatory because deterministic detection is best-effort and unknown formats can be missed.",
      result: "Hosted static demo processes logs on the device. The host still sees the initial page request, and clipboard/export actions deliberately leave the in-memory boundary. No claim that sanitized output is guaranteed safe.",
    },
    tier: "other", published: true,
  },
  {
    id: "07", slug: "splitsmart", title: "SplitSmart",
    type: "Mobile engineering / Flutter / Firebase", year: "2026", status: "Android beta · Invite-only internal testing",
    summary: "Local-first Flutter expense app with group balances, budgets and saving goals, encrypted SQLite storage and Firebase synchronization for signed-in users.",
    proof: ["Group expenses", "Balance engine", "Local state", "Firebase sync"],
    proofNote: "App name: Splitzee · No public release.",
    stack: ["Flutter / Dart", "Firebase Auth", "Firestore", "SQLite / SQLCipher", "Provider"],
    visual: "pipeline", visualLabels: ["EXPENSE", "BALANCE", "LOCAL DB", "SYNC"], visualBoundary: "LOCAL FIRST",
    links: [{ label: "View repository", href: "https://github.com/Mighiana/SplitSmart" }],
    evidence: [{ label: "Implementation status & limits", href: "https://github.com/Mighiana/SplitSmart#status" }],
    spec: {
      problem: "Shared expenses need stable per-member balances without making everyday entry depend on network availability.",
      built: "Splitzee: group expense splitting and settlements, wallets, budgets, saving goals, subscriptions and reminders, with multi-currency data and authentication.",
      architecture: "Flutter / Provider → AppState → encrypted SQLite; background Firestore sync for signed-in users. Firebase Auth separates local, anonymous guest and full account tiers.",
      implementation: "Stable member-ID balance calculations, equal/percentage/share/custom splits, local-first writes, SQLCipher with device-held keys and membership-scoped Firestore rules.",
      decisions: "Subscriptions and scheduled notifications stay local; reminders and other supported data sync for signed-in users. Local storage remains primary and Firestore rules enforce cloud access.",
      result: "Android beta on Google Play internal testing, not publicly released. Cloud Functions/Storage are not deployed and iOS is not configured. No claim of a public production demo.",
    },
    tier: "other", published: true,
  },
];
