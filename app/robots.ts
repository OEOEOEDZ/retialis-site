import type { MetadataRoute } from "next";
import { SITE, PRET_POUR_INDEXATION } from "@/lib/site";

/**
 * Interrupteur de vérité, même principe que `HEBERGEUR.souverain`.
 *
 * Tant que les mentions légales ne sont pas complètes, le site refuse
 * l'indexation en bloc. Se faire référencer avec un SIRET « à compléter » et
 * un encadré « note à l'éditeur » coûte plus cher que d'attendre : la première
 * impression dans un résultat de recherche ne se rejoue pas, et l'article
 * 6-III de la LCEN impose d'identifier l'éditeur.
 *
 * Aucune action à faire pour lever le blocage : renseigner `siret` et
 * `telephone` dans `lib/site.ts` suffit, `PRET_POUR_INDEXATION` bascule seul.
 */
export default function robots(): MetadataRoute.Robots {
  if (!PRET_POUR_INDEXATION) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/mentions-legales"] },
    sitemap: `https://${SITE.domaine}/sitemap.xml`,
  };
}
