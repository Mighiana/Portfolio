import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { profile, seo } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(new URL(profile.siteUrl).origin),
  title: seo.title,
  description: seo.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  keywords: ["Muhammad Usman", "cybersecurity", "cloud", "infrastructure", "AWS", "networking", "automation", "portfolio"],
  alternates: { canonical: `${profile.siteUrl}/` },
  openGraph: {
    type: "profile",
    url: `${profile.siteUrl}/`,
    siteName: profile.name,
    title: seo.title,
    description: seo.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  colorScheme: "dark",
};

/** Runs before paint: enables JS-only reveal styles and decides whether the preloader plays. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var s=sessionStorage.getItem('mu:booted');d.dataset.boot=(r||s)?'skip':'run';sessionStorage.setItem('mu:booted','1');}catch(e){d.dataset.boot='skip';}})();`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  jobTitle: "Computer Science and Engineering student",
  description: seo.description,
  address: { "@type": "PostalAddress", addressLocality: "Budapest", addressCountry: "HU" },
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.university },
  knowsAbout: ["Cybersecurity", "Cloud infrastructure", "Networking", "Automation"],
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
