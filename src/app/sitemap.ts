import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${profile.siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...projects.filter((p) => p.published).map((p) => ({
      url: `${profile.siteUrl}/projects/${p.slug}/`,
      changeFrequency: "monthly" as const, priority: 0.8,
    })),
  ];
}
