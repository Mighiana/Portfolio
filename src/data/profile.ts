/**
 * Central personal configuration. Every link, label and file path on the site
 * reads from here. Empty strings hide the related buttons instead of rendering
 * placeholder "#" links. Run `npm run predeploy` to list anything still unset.
 */
export const profile = {
  name: "Muhammad Usman",
  firstName: "Muhammad",
  lastName: "Usman",
  monogram: "MU",
  positioning: "Security / Cloud / Infrastructure",
  discipline: "Computer Science & Engineering",
  statement:
    "Building secure systems, cloud infrastructure and automation-driven security solutions.",

  degree: "BSc Computer Science and Engineering",
  university: "Óbuda University",
  faculty: "John von Neumann Faculty of Informatics",
  status: "Final semester",
  graduation: "2027",

  location: "Budapest, Hungary",
  locationShort: "BUDAPEST / HU",

  email: "usmanmighiana3898@gmail.com",
  linkedin: "https://www.linkedin.com/in/usman3898/",
  github: "https://github.com/Mighiana",

  /** Served from /public. Replace the placeholder PDF with the real CV. */
  cvPath: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Muhammad_Usman_CV.pdf`,
  cvFileName: "Muhammad_Usman_CV.pdf",

  /** Canonical origin used for metadata. Set NEXT_PUBLIC_SITE_URL when deploying. */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export type Profile = typeof profile;

export const seo = {
  title: "Muhammad Usman — Cybersecurity, Cloud & Infrastructure",
  description:
    "Portfolio of Muhammad Usman, a Computer Science and Engineering student focused on cybersecurity, cloud infrastructure, networking and automation.",
} as const;
