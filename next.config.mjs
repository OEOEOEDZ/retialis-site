/**
 * Durcissement HTTP.
 *
 * Ces en-têtes sont vérifiables publiquement par n'importe quel prospect en
 * quelques secondes — exactement comme nous vérifions les siens dans le
 * pré-audit. Un site qui vend de la conformité et qui échoue à ce contrôle
 * perd l'argument avant le premier rendez-vous.
 *
 * Note sur la CSP : `'unsafe-inline'` reste nécessaire sur script-src et
 * style-src parce que Next.js injecte son script d'amorçage et ses styles
 * critiques en ligne. La suppression exigerait un nonce par requête, donc un
 * rendu dynamique — ce qui ferait perdre la génération statique et
 * l'hébergement gratuit. Le compromis est assumé et documenté : le site ne
 * charge aucun script tiers, aucune police externe et n'accepte aucune saisie
 * côté serveur, ce qui réduit fortement la surface concernée.
 */

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self' mailto:",
  // La page de réservation Google Agenda s'affiche dans un cadre : sans cette
  // ligne, la CSP la bloque en silence. On autorise ce seul domaine.
  "frame-src https://calendar.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const EN_TETES = [
  { key: "Content-Security-Policy", value: CSP },
  // Deux ans, sous-domaines inclus, éligible à la liste de préchargement.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Aucune de ces API n'est utilisée : on les refuse explicitement.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // N'annonce pas la version du framework : information inutile à un attaquant.
  poweredByHeader: false,
  /*
   * Mesure compensatoire — sharp / libvips.
   *
   * Next embarque sharp pour l'optimisation d'images, et libvips traîne des
   * CVE non corrigées en amont (GHSA-f88m-g3jw-g9cj). Le site n'affiche
   * aucune image : plutôt que d'attendre un correctif, on désactive la
   * fonctionnalité, donc le chemin de code vulnérable n'est jamais atteint.
   * À réexaminer si des images sont ajoutées un jour.
   */
  images: { unoptimized: true },
  async headers() {
    return [{ source: "/:path*", headers: EN_TETES }];
  },
};

export default nextConfig;
