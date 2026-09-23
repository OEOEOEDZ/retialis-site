import type { Metadata } from "next";
import { MarqueTrait } from "@/components/Marque";
import { OFFRE, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Notre approche",
  description:
    "Pourquoi ce service existe, ce que nous savons faire, et surtout ce que nous ne faisons pas. Sans promesse de conformité.",
};

const FAISONS: [string, string][] = [
  [
    "Lire un questionnaire d'évaluation",
    "et savoir, ligne par ligne, ce que l'évaluateur cherche réellement derrière la formulation.",
  ],
  [
    "Écrire une réponse défendable",
    "ni mensongère ni défaitiste, y compris quand la mesure n'est pas encore en place.",
  ],
  [
    "Rédiger les documents qui manquent",
    "politique de sécurité, procédures d'arrivée et de départ, analyse de risques, registres, clauses.",
  ],
  [
    "Distinguer l'urgent du reste",
    "et chiffrer honnêtement chaque correction en jours de travail et en euros.",
  ],
];

const NE_FAISONS_PAS: [string, string][] = [
  [
    "Nous ne vous rendons pas « conforme »",
    "la conformité ne se constate qu'au contrôle. Nous constituons un dossier recevable et un plan d'action tenable. Quiconque vous promet autre chose vous fera porter le risque.",
  ],
  [
    "Nous ne remplaçons pas votre prestataire informatique",
    "sur la technique, il est meilleur que nous sur son périmètre. Nous traitons la moitié organisationnelle, et nous travaillons avec lui.",
  ],
  [
    "Nous ne faisons ni infogérance ni supervision",
    "ce n'est pas notre métier, et nous ne le prendrons pas.",
  ],
  [
    "Nous ne testons jamais vos systèmes sans autorisation écrite",
    "avant toute mission, nous ne consultons que des informations publiques : vos enregistrements DNS, ce que votre site renvoie à un navigateur. Rien d'autre.",
  ],
];

const SOURCES: [string, string][] = [
  ["Directive NIS2", "Article 21, les dix mesures de gestion des risques"],
  ["ReCyF", "Le référentiel cyber publié par l'ANSSI"],
  ["Guides d'hygiène", "Les recommandations de l'ANSSI"],
  ["EBIOS Risk Manager", "La méthode d'analyse de risques de l'ANSSI"],
];

export default function APropos() {
  return (
    <>
      {/* ================================================================ HAUT */}
      <section className="bande relative overflow-hidden bg-[var(--ground)] pt-14 pb-16 sm:pt-20">
        <span
          aria-hidden
          className="forme"
          style={{ background: "var(--violet)", width: "24rem", height: "20rem", top: "-7rem", right: "-6rem" }}
        />
        <div className="wrap surcouche grid items-center gap-12 lg:grid-cols-[1.3fr_auto]">
          <div>
            <h1 className="entree t-hero" style={{ "--retard": "60ms" } as React.CSSProperties}>
              Un seul sujet, <span className="surligne">celui qu&apos;on maîtrise</span>.
            </h1>
            <p
              className="entree mt-7 text-[1.2rem] leading-relaxed text-[var(--ink-2)]"
              style={{ "--retard": "200ms" } as React.CSSProperties}
            >
              {SITE.nom} répond aux questionnaires de sécurité que les donneurs d&apos;ordre soumis à NIS2
              envoient à leurs sous-traitants. Rien d&apos;autre.
            </p>
          </div>
          <div className="entree hidden justify-end lg:flex" style={{ "--retard": "300ms" } as React.CSSProperties}>
            <MarqueTrait taille={190} />
          </div>
        </div>
      </section>

      {/* ========================================================= LE CONSTAT */}
      <section className="bande bg-[var(--surface)] py-20">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <h2 data-revele className="t-section">
            Pourquoi ce service existe
          </h2>
          <div className="space-y-5">
            <p data-revele className="text-[1.06rem] leading-relaxed text-[var(--ink-2)]">
              Une PME de quarante personnes qui reçoit un questionnaire de sécurité n&apos;a le choix
              qu&apos;entre un outil en ligne qui lui donne une note sans rien résoudre, et un cabinet qui
              facture quinze mille euros une mission plus longue que son délai de réponse.
            </p>
            <p data-revele className="text-[1.06rem] leading-relaxed text-[var(--ink-2)]">
              Entre les deux, il n&apos;y a rien. Pourtant le travail n&apos;est pas si lourd : la plupart des
              écarts se corrigent en quelques jours et coûtent zéro euro.
            </p>
            <p data-revele className="text-[1.15rem] font-bold leading-relaxed">
              Ce qui manque n&apos;est ni le budget ni la technique. C&apos;est quelqu&apos;un qui connaît les
              questions et qui sait écrire les réponses.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== LE FRANC-JEU */}
      <section className="bande bg-[var(--ground)] py-20">
        <div className="wrap">
          <h2 data-revele className="t-section">
            Ce que nous faisons, et ce que nous ne ferons pas
          </h2>
          <p data-revele className="mt-5 text-[1.06rem] text-[var(--ink-2)]">
            La deuxième colonne est la plus utile des deux. Autant le savoir avant de nous appeler.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div data-revele className="carte p-8">
              <span className="etat etat-plein">Ce que nous faisons</span>
              <ul className="mt-7 space-y-6">
                {FAISONS.map(([t, d]) => (
                  <li key={t} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--ok)] text-[14px] font-bold text-white"
                    >
                      ✓
                    </span>
                    <div>
                      <p className="font-bold">{t}</p>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--ink-2)]">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div data-revele className="carte bg-[var(--surface-2)] p-8">
              <span className="etat etat-vide">Ce que nous ne faisons pas</span>
              <ul className="mt-7 space-y-6">
                {NE_FAISONS_PAS.map(([t, d]) => (
                  <li key={t} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--signal)] text-[15px] font-bold text-white"
                    >
                      ×
                    </span>
                    <div>
                      <p className="font-bold">{t}</p>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--ink-2)]">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= NOS SOURCES */}
      <section className="bande bg-[var(--surface)] py-20">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 data-revele className="t-section">
              Sur quoi nous nous appuyons
            </h2>
            <p data-revele className="mt-6 text-[1.06rem] leading-relaxed text-[var(--ink-2)]">
              Sur des référentiels publics et vérifiables, jamais sur une méthode maison invendable devant un
              auditeur. Quand une réponse relève de notre interprétation plutôt que du texte, nous vous le
              disons.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {SOURCES.map(([t, d], i) => (
              <div
                key={t}
                data-revele
                style={{ "--retard": `${i * 80}ms` } as React.CSSProperties}
                className="carte-douce carte-relief p-6"
              >
                <p className="font-bold">{t}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-2)]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================== FRANCHISE */}
      <section className="bande bloc-bleu py-20">
        <div className="wrap texte">
          <h2 data-revele className="t-section">
            Pas encore de références, et nous le disons
          </h2>
          <p data-revele className="mt-7 text-[1.06rem] leading-relaxed opacity-90">
            Nous démarrons. Pas de logo client à afficher, pas de témoignage à montrer, et nous avons choisi de
            ne pas en inventer. Vous vendez vous-même à des clients qui vérifient : vous savez ce que vaut une
            preuve fabriquée.
          </p>
          <p data-revele className="mt-4 text-[1.06rem] leading-relaxed opacity-90">
            Ce que nous proposons à la place est plus utile. Envoyez-nous le questionnaire reçu, nous répondons
            sous {OFFRE.delaiReponseGratuite} avec une analyse écrite, gratuite et sans engagement. Vous jugerez
            sur pièce.
          </p>

          <div data-revele className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="/questionnaire" className="btn btn-blanc">
              Envoyer votre questionnaire
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="btn btn-clair-contour"
            >
              Nous écrire
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
