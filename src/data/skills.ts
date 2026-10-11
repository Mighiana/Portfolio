export type Evidence = "project" | "coursework";
export type SkillItem = { name: string; evidence: Evidence };
export type SkillGroup = {
  code: string; title: string; subtitle: string;
  icon: "automation" | "cloud" | "network" | "systems" | "tools"; items: SkillItem[];
};

export const evidenceLabels: Record<Evidence, string> = { project: "Projects", coursework: "Coursework / labs" };

const used = (...names: string[]) => names.map((name): SkillItem => ({ name, evidence: "project" }));
const studied = (...names: string[]) => names.map((name): SkillItem => ({ name, evidence: "coursework" }));

export const skillGroups: SkillGroup[] = [
  { code: "SEC", title: "Security", subtitle: "Identity / controls", icon: "tools",
    items: used("IAM / least privilege", "RBAC", "PKI / TLS", "Security hardening", "Audit logging") },
  { code: "CLD", title: "Cloud", subtitle: "AWS / infrastructure", icon: "cloud",
    items: [...used("AWS (S3, EC2, VPC, IAM)", "VPC Flow Logs", "Terraform"), ...studied("CloudWatch / CloudTrail")] },
  { code: "NET", title: "Network", subtitle: "Segmentation / routing", icon: "network",
    items: [...used("Subnets / security groups / NACLs"), ...studied("Routing & switching", "VLANs", "NAT / ACLs", "DNS")] },
  { code: "SYS", title: "Systems", subtitle: "Servers / identity", icon: "systems",
    items: [...used("Windows Server", "Active Directory (AD DS / AD CS)", "IIS"), ...studied("Linux / Ubuntu")] },
  { code: "ENG", title: "Engineering", subtitle: "Languages / tooling", icon: "automation",
    items: [...used("Python", "C# / ASP.NET Core", "PowerShell", "Bash", "SQL Server", "JavaScript", "Git / GitHub"), ...studied("REST APIs")] },
  { code: "PLT", title: "Platform", subtitle: "DevSecOps / validation", icon: "tools",
    items: used("Docker", "GitHub Actions", "TFLint / Checkov", "ShellCheck", "LocalStack") },
];
