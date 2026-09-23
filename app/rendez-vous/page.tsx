import type { Metadata } from "next";
import { MarqueTrait } from "@/components/Marque";
import { OFFRE, RDV, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description:
    "Trente minutes en visioconférence pour regarder votre questionnaire ensemble. Gratuit, sans engagement, et vous repartez avec une analyse utilisable.",
};

const ORDRE_DU_JOUR = [
  {
    titre: "Ce que votre client vous demande",
    texte: "Vous nous montrez le fichier reçu, on regarde les questions qui posent problème.",
  },
  {
    titre: "Ce qui vous ferait recaler",
    texte: "Les points éliminatoires, et pourquoi votre évaluateur ne transigera pas dessus.",
  },
  {
    titre: "Ce que ça coûte de le régler",
    texte: "En jours de travail et en euros. Une bonne partie des corrections ne coûte rien.",
  },
  {
    titre: "Si on travaille ensemble, ou pas",
    texte: "Vous repartez avec l'analyse dans tous les cas. Sans relance de notre part.",
  },
];

export default function RendezVous() {
  const dispo = RDV.url.length > 0;

  return (
    <>
      {/* ================================================================ HAUT */}
      <section className="bande relative overflow-hidden bg-[var(--ground)] pt-14 pb-16 sm:pt-20">
        <span
          aria-hidden
          className="forme"
          style={{ background: "var(--ambre)", width: "24rem", height: "20rem", top: "-8rem", right: "-6rem" }}
        />
        <div className="wrap surcouche grid items-center gap-12 lg:grid-cols-[1.3fr_auto]">
          <div>
            <p
              className="entree inline-flex items-center gap-2.5 rounded-full border-2 border-[var(--ink)] bg-[var(--ok-soft)] px-4 py-2 text-[14px] font-bold text-[var(--ok)]"
              style={{ "--retard": "40ms" } as React.CSSProperties}
            >
              Gratuit, sans engagement
            </p>
            <h1 className="entree t-hero mt-6" style={{ "--retard": "140ms" } as React.CSSProperties}>
              {RDV.duree} pour <span className="surligne">y voir clair</span>.
            </h1>
            <p
              className="entree mt-7 text-[1.2rem] leading-relaxed text-[var(--ink-2)]"
              style={{ "--retard": "260ms" } as React.CSSProperties}
            >
              On regarde votre questionnaire ensemble, en visioconférence. Vous repartez avec une analyse
              utilisable, même si vous ne donnez pas suite.
            </p>
          </div>
          <div className="entree hidden justify-end lg:flex" style={{ "--retard": "340ms" } as React.CSSProperties}>
            <MarqueTrait taille={190} />
          </div>
        </div>
      </section>

      {/* ========================================================= RÉSERVATION */}
      <section className="bande bg-[var(--surface)] py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 data-revele className="t-section">
              Au programme
            </h2>
            <ul className="mt-9 space-y-7">
              {ORDRE_DU_JOUR.map((o, i) => (
                <li
                  key={o.titre}
                  data-revele
                  style={{ "--retard": `${i * 80}ms` } as React.CSSProperties}
                  className="flex gap-4"
                >
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-[var(--ink)] bg-[var(--ambre)] text-[15px] font-extrabold text-[#3a2600]"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[1.05rem] font-bold leading-snug">{o.titre}</p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--ink-2)]">{o.texte}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p data-revele className="mt-10 text-[14px] leading-relaxed text-[var(--ink-3)]">
              Le lien {RDV.outil} vous est envoyé automatiquement avec la confirmation. Rien à installer.
            </p>
          </div>

          <div data-revele>
            {dispo ? (
              <div className="carte overflow-hidden">
                <iframe
                  src={RDV.url}
                  title="Choisir un créneau"
                  className="h-[720px] w-full border-0"
                  loading="lazy"
                />
              </div>
            ) : (
              /* Tant qu'aucune plage de rendez-vous n'est publiée, on propose la
                 voie qui fonctionne vraiment plutôt qu'un cadre vide. */
              <div className="carte p-9 sm:p-11">
                <h3 className="t-bloc">Écrivez-nous, on vous propose deux créneaux</h3>
                <p className="mt-4 leading-relaxed text-[var(--ink-2)]">
                  Joignez le questionnaire reçu si vous l&apos;avez déjà, et dites-nous la date de retour
                  attendue par votre client. On revient vers vous sous {OFFRE.delaiReponseGratuite} avec deux
                  propositions d&apos;horaire.
                </p>

                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                    "Demande de rendez-vous",
                  )}&body=${encodeURIComponent(
                    [
                      "Bonjour,",
                      "",
                      "Nous souhaitons convenir d'un rendez-vous pour regarder notre questionnaire de sécurité.",
                      "",
                      "Entreprise :",
                      "Secteur :",
                      "Date de retour attendue par notre client :",
                      "Disponibilités :",
                      "",
                      "Cordialement,",
                    ].join("\n"),
                  )}`}
                  className="btn btn-action mt-8 w-full"
                >
                  Demander un rendez-vous
                </a>

                <a href="/questionnaire" className="btn btn-contour mt-3 w-full">
                  Ou faire analyser le fichier d&apos;abord
                </a>

                <p className="mt-6 border-t-2 border-[var(--border)] pt-5 text-[13.5px] leading-relaxed text-[var(--ink-3)]">
                  Vous pouvez aussi écrire directement à{" "}
                  <a href={`mailto:${SITE.email}`} className="lien">
                    {SITE.email}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================= FIN */}
      <section className="bande bloc-bleu py-20">
        <div className="wrap centre max-w-2xl">
          <h2 data-revele className="t-section">
            Pas encore prêt pour un appel ?
          </h2>
          <p data-revele className="mt-6 leading-relaxed opacity-90">
            Envoyez simplement le questionnaire. On vous répond par écrit sous {OFFRE.delaiReponseGratuite}, et
            vous décidez ensuite.
          </p>
          <div data-revele className="mt-9 flex justify-center">
            <a href="/questionnaire" className="btn btn-blanc">
              Envoyer votre questionnaire
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
