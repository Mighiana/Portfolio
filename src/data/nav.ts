export type NavItem = { id: string; label: string; index: string };

/** Order matches the page. Sub-sections set `data-nav` to their parent id. */
export const navItems: NavItem[] = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "experience", label: "Experience", index: "04" },
  { id: "skills", label: "Skills", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];
