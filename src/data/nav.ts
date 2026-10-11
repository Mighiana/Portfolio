export type NavItem = { id: string; label: string; index: string };

/** Order matches the page. Sub-sections set `data-nav` to their parent id. */
export const navItems: NavItem[] = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "projects", label: "Projects", index: "04" },
  { id: "experience", label: "Journey", index: "05" },
  { id: "skills", label: "Skills", index: "09" },
  { id: "contact", label: "Contact", index: "10" },
];
