export type SkillItem = { name: string; level?: "basic" };
export type SkillGroup = {
  code: string; title: string; subtitle: string;
  icon: "automation" | "cloud" | "network" | "systems" | "tools"; items: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  { code: "SEC", title: "Security", subtitle: "Identity / controls", icon: "tools",
    items: ["IAM", "RBAC", "PKI / TLS", "Active Directory", "Security hardening", "Audit logging"].map((name) => ({ name })) },
  { code: "CLD", title: "Cloud", subtitle: "AWS / infrastructure", icon: "cloud",
    items: ["AWS", "S3", "EC2", "VPC", "CloudWatch", "CloudTrail", "Terraform"].map((name) => ({ name })) },
  { code: "NET", title: "Network", subtitle: "Projects / coursework", icon: "network",
    items: ["Routing", "Switching", "VLAN", "NAT / ACL", "Security groups", "NACLs"].map((name) => ({ name })) },
  { code: "SYS", title: "Systems", subtitle: "Lab environments", icon: "systems",
    items: ["Linux", "Windows Server", "AD DS", "AD CS", "IIS"].map((name) => ({ name })) },
  { code: "ENG", title: "Engineering", subtitle: "Languages / tooling", icon: "automation",
    items: ["Python", "C#", "PowerShell", "Bash", "SQL", "JavaScript", "Git"].map((name) => ({ name })) },
  { code: "PLT", title: "Platform", subtitle: "DevSecOps / validation", icon: "tools",
    items: ["Docker", "GitHub Actions", "TFLint", "Checkov", "ShellCheck", "LocalStack"].map((name) => ({ name })) },
];
