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
  /** Optional node labels for the pipeline schematic. */
  visualLabels?: string[];
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
    published: true,
  },
];
