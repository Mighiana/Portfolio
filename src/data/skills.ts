export type SkillItem = { name: string; level?: "basic" };

export type SkillGroup = {
  code: string;
  title: string;
  subtitle: string;
  icon: "automation" | "cloud" | "network" | "systems" | "tools";
  items: SkillItem[];
};

/** Verified baseline only. Add a tool here once it is part of real work. */
export const skillGroups: SkillGroup[] = [
  {
    code: "AUT",
    title: "Automation",
    subtitle: "Programming",
    icon: "automation",
    items: [
      { name: "Python" },
      { name: "C#" },
      { name: "Bash" },
      { name: "JavaScript", level: "basic" },
      { name: "HTML / CSS" },
      { name: "SQL" },
      { name: "REST APIs" },
    ],
  },
  {
    code: "CLD",
    title: "Cloud",
    subtitle: "Cloud / DevOps",
    icon: "cloud",
    items: [
      { name: "AWS" },
      { name: "IAM" },
      { name: "S3" },
      { name: "EC2" },
      { name: "CloudWatch" },
      { name: "CloudTrail" },
      { name: "VPC concepts" },
      { name: "Docker" },
      { name: "Kubernetes", level: "basic" },
    ],
  },
  {
    code: "NET",
    title: "Network",
    subtitle: "Networking",
    icon: "network",
    items: [
      { name: "Routing" },
      { name: "Switching" },
      { name: "VLAN" },
      { name: "NAT" },
      { name: "ACL" },
      { name: "CCNA topics" },
      { name: "Network security concepts" },
    ],
  },
  {
    code: "SYS",
    title: "Systems",
    subtitle: "Operating systems",
    icon: "systems",
    items: [{ name: "Linux / Ubuntu" }, { name: "Windows Server" }, { name: "Active Directory" }],
  },
  {
    code: "TLS",
    title: "Tools",
    subtitle: "Collaboration",
    icon: "tools",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Jira" },
      { name: "Confluence" },
      { name: "Microsoft 365" },
    ],
  },
];
