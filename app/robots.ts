import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Indexation ouverte, sauf les mentions légales qui n'ont aucun intérêt de recherche. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/mentions-legales"] },
    sitemap: `https://${SITE.domaine}/sitemap.xml`,
  };
}
