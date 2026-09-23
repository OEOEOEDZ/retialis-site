import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Animations } from "@/components/Animations";
import { Marque } from "@/components/Marque";
import { SITE } from "@/lib/site";
import "./globals.css";

/* Geist : la fonte de Snyk et de Tenacy. Grotesque moderne, excellente en très
   grande taille comme en corps de texte. Une seule famille sur tout le site. */
const police = Geist({ subsets: ["latin"], variable: "--police", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domaine}`),
  title: {
    default: "Le questionnaire de sécurité de votre client, rempli et prouvé",
    template: `%s · ${SITE.nom}`,
  },
  description:
    "Votre client vous envoie un questionnaire de sécurité NIS2 ? Nous vous le rendons rempli et prouvé sous 10 jours, pour 1 490 €. IT, BTP, conseil.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.nom,
    title: "Le questionnaire de sécurité de votre client, rempli et prouvé",
    description:
      "Un cabinet vous vend une mission à 15 000 €. Un scan vous donne une note à 9 € par mois. Nous vous rendons le fichier rempli, sous 10 jours, pour 1 490 €.",
  },
  robots: { index: true, follow: true },
};

const NAV = [
  { href: "/secteurs/it", label: "Informatique" },
  { href: "/secteurs/btp", label: "BTP" },
  { href: "/secteurs/conseil", label: "Conseil" },
  { href: "/#prix", label: "Tarifs" },
  { href: "/rendez-vous", label: "Rendez-vous" },
  { href: "/a-propos", label: "Notre approche" },
];

/** Lien du pied de page : cible tactile de 44 px sous 640 px, serré au-delà. */
const LIEN_PIED = "flex min-h-11 items-center hover:text-white sm:min-h-0";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={police.variable}>
      <body>
        <Animations />

        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-[var(--primary-ink)]"
        >
          Aller au contenu
        </a>

        {/* En-tête sur fond de nuit, dans la continuité du hero */}
        <header className="bande sticky top-0 z-40 border-b-2 border-[var(--ink)] bg-[var(--surface)]">
          <div className="wrap flex h-[68px] items-center justify-between gap-6">
            {/* h-full : la zone cliquable prend toute la hauteur de l'en-tête,
                sinon le logo ne fait que 34 px de haut au doigt. */}
            <a href="/" className="flex h-full shrink-0 items-center gap-2.5">
              <Marque taille={34} />
              <span className="text-[18px] font-extrabold tracking-tight sm:text-[20px]">{SITE.nom}</span>
            </a>

            <nav aria-label="Navigation principale" className="hidden items-center gap-8 text-[14.5px] lg:flex">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="font-semibold text-[var(--ink-2)] transition-colors hover:text-[var(--primary)]"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            {/* Libellé court sous 640px : la version longue faisait déborder la
                page de 39px sur un écran de 390px, sur toutes les pages. */}
            <a href="/questionnaire" className="btn btn-action min-h-11 shrink-0 !px-4 !py-2.5 text-[14px] sm:!px-5 sm:text-[14.5px]">
              <span className="sm:hidden">Envoyer</span>
              <span className="hidden sm:inline">Envoyer votre questionnaire</span>
            </a>
          </div>
        </header>

        <main id="contenu">{children}</main>

        <footer className="bande bg-[var(--ink)] pt-16 pb-12 text-white">
          <div className="wrap">
            <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
              <div>
                <p className="text-[19px] font-semibold text-white">{SITE.nom}</p>
                <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/70">{SITE.baseline}</p>
                <p className="mt-6 text-[14px] text-white/70">
                  {SITE.ville}, {SITE.region}
                </p>
                <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center text-[14px] font-semibold text-[var(--ambre)] underline underline-offset-4 sm:mt-1 sm:min-h-0">
                  {SITE.email}
                </a>
              </div>

              <nav aria-label="Secteurs">
                <p className="text-[13px] font-semibold text-white">Votre métier</p>
                {/* Au doigt, chaque lien fait 44 px de haut ; à la souris on
                    revient à l'interligne serré d'origine à partir de 640 px. */}
                <ul className="mt-2 text-[14.5px] text-white/70 sm:mt-4 sm:space-y-2.5">
                  <li><a href="/secteurs/it" className={LIEN_PIED}>Informatique et infogérance</a></li>
                  <li><a href="/secteurs/btp" className={LIEN_PIED}>BTP et construction</a></li>
                  <li><a href="/secteurs/conseil" className={LIEN_PIED}>Conseil et bureaux d&apos;études</a></li>
                </ul>
              </nav>

              <nav aria-label="Informations">
                <p className="text-[13px] font-semibold text-white">En savoir plus</p>
                <ul className="mt-2 text-[14.5px] text-white/70 sm:mt-4 sm:space-y-2.5">
                  <li><a href="/questionnaire" className={LIEN_PIED}>Analyse gratuite sous 24 h</a></li>
                  <li><a href="/rendez-vous" className={LIEN_PIED}>Prendre rendez-vous</a></li>
                  <li><a href="/diagnostic" className={LIEN_PIED}>Auto-diagnostic</a></li>
                  <li><a href="/a-propos" className={LIEN_PIED}>Notre approche</a></li>
                  <li><a href="/mentions-legales" className={LIEN_PIED}>Mentions légales</a></li>
                </ul>
              </nav>
            </div>

            <div className="mt-14 border-t border-white/20 pt-7 text-[12.5px] leading-relaxed text-white/70">
              <p className="max-w-4xl">
                {SITE.nom} est un service privé et indépendant, sans lien avec l&apos;ANSSI ni avec aucune autorité
                publique. Les références à la directive NIS2 et au Référentiel Cyber France sont fournies à titre
                informatif et ne constituent pas un conseil juridique. Nous accompagnons la constitution d&apos;un
                dossier recevable ; nous ne délivrons aucune attestation de conformité.
              </p>
              <p className="mt-3">© {new Date().getFullYear()} {SITE.nom}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
