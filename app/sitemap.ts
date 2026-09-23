import type { MetadataRoute } from "next";
import { SECTEURS } from "@/lib/questions-secteur";
import { SITE } from "@/lib/site";

/**
 * Plan du site. Les priorités suivent l'intention commerciale : la page qui
 * déclenche un contact passe avant celle qui explique.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domaine}`;
  const maj = new Date();

  const fixes: [string, number][] = [
    ["", 1],
    ["/questionnaire", 0.9],
    ["/rendez-vous", 0.8],
    ["/diagnostic", 0.7],
    ["/a-propos", 0.5],
  ];

  return [
    ...fixes.map(([url, priority]) => ({
      url: base + url,
      lastModified: maj,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...SECTEURS.filter((s) => s.id !== "autre").map((s) => ({
      url: `${base}/secteurs/${s.id}`,
      lastModified: maj,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
