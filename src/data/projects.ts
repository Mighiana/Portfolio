export type ProjectVisual = "pipeline" | "graph" | "cloud" | "network";

export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  type: string;
  year: string;
  status: string;
  summary: string;
  /** Only technologies that are part of the actual implementation. */
  stack: string[];
  visual: ProjectVisual;
  links: ProjectLink[];
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
    type: "Thesis Project",
    year: "2026",
    status: "Ongoing",
    summary:
      "Bachelor thesis exploring how selected parts of security-testing workflows in isolated lab environments can be automated while keeping runs reproducible, contained and clearly reported.",
    // TODO(projects): list technologies once the implementation is final.
    stack: [],
    visual: "pipeline",
    links: [],
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
    published: true,
  },
  {
    // TODO(projects): replace with the real AWS project name, scope and outcome.
    id: "03",
    title: "Cloud / AWS Project",
    type: "Cloud / Infrastructure",
    year: "—",
    status: "Write-up in progress",
    summary:
      "Hands-on work with core AWS services as part of cloud studies. A full project write-up — scope, architecture and outcome — will be added here.",
    stack: ["AWS", "IAM", "S3", "EC2", "CloudWatch", "CloudTrail"],
    visual: "cloud",
    links: [],
    draft: true,
    published: true,
  },
  {
    // TODO(projects): replace with the real networking project name, scope and outcome.
    id: "04",
    title: "Network / Infrastructure Project",
    type: "Networking / Routing & Switching",
    year: "—",
    status: "Write-up in progress",
    summary:
      "Routing, switching and segmentation studied through CCNA topics. A full project write-up — topology, configuration and outcome — will be added here.",
    stack: ["Routing", "Switching", "VLAN", "NAT", "ACL"],
    visual: "network",
    links: [],
    draft: true,
    published: true,
  },
];
