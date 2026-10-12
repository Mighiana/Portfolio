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

/** Runs before paint: enables JS-only reveal styles and restores the saved day/night theme. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('mu:mode')==='light'){d.dataset.mode='light';var t=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#faf9f6');};t();document.addEventListener('DOMContentLoaded',t);}}catch(e){}})();`;

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
