import { Comparateur } from "@/components/Comparateur";
import { Compteur } from "@/components/Compteur";
import { FeuilleVivante } from "@/components/FeuilleVivante";
import { MarqueTrait } from "@/components/Marque";
import { MicroDiagnostic } from "@/components/MicroDiagnostic";
import { QUESTIONS_SOCLE } from "@/lib/questions-socle";
import { SECTEURS } from "@/lib/questions-secteur";
import { ENGAGEMENTS, FAQ, HEBERGEUR, OFFRE, SITE, euro } from "@/lib/site";

const DEMO = ["acc-01", "sau-02", "inc-01", "four-01"]
  .map((id) => QUESTIONS_SOCLE.find((q) => q.id === id)!)
  .filter(Boolean);

const INCLUS = [
  "Le questionnaire de votre client, rempli case par case",
  "Le dossier de preuves, prêt à joindre",
  "Les documents qui vous manquent, rédigés",
  "Un atelier de 2 h avec votre direction",
  "Un plan d'action daté et chiffré",
];

const ETAPES = [
  { n: "1", titre: "Vous envoyez le fichier", detail: "Tel quel. Réponse sous 24 h.", couleur: "var(--ambre)" },
  { n: "2", titre: "Deux heures d'atelier", detail: "Une seule réunion, en visio.", couleur: "var(--violet)" },
  { n: "3", titre: "Vous recevez le dossier", detail: "Sous 10 jours ouvrés.", couleur: "var(--menthe)" },
];

const CHIFFRES = [
  { v: "15 000", l: "entreprises françaises soumises à NIS2" },
  { v: "18", l: "secteurs concernés, et leurs sous-traitants" },
  { v: "24 h", l: "le délai d'alerte que votre client doit tenir" },
  { v: "10 M€", l: "de sanction maximale, d'où la pression sur vous" },
];

export default function Accueil() {
  return (
    <>
      {/* =============================================================== HERO */}
      <section className="bande relative overflow-hidden bg-[var(--ground)] pt-14 pb-20 sm:pt-20">
        <span
          aria-hidden
          className="forme"
          style={{ background: "var(--ambre)", width: "28rem", height: "24rem", top: "-8rem", right: "-6rem" }}
        />
        <span
          aria-hidden
          className="forme forme-2"
          style={{ background: "var(--violet)", width: "22rem", height: "20rem", bottom: "-6rem", left: "-7rem" }}
        />

        <div className="wrap surcouche grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p
              className="entree inline-flex items-center gap-2.5 rounded-full border-2 border-[var(--ink)] bg-[var(--ambre)] px-4 py-2 text-[14px] font-bold text-[#3a2600]"
              style={{ "--retard": "40ms" } as React.CSSProperties}
            >
              <span aria-hidden className="pastille inline-block h-2 w-2 rounded-full bg-[#3a2600]" />
              NIS2 : la loi française est votée
            </p>

            <h1 className="entree t-hero mt-7" style={{ "--retard": "160ms" } as React.CSSProperties}>
              Votre client attend son <span className="surligne">questionnaire de sécurité</span>.
            </h1>

            <p
              className="entree mt-7 text-[1.25rem] leading-relaxed text-[var(--ink-2)]"
              style={{ "--retard": "300ms" } as React.CSSProperties}
            >
              On vous le rend rempli, prouvé, prêt à renvoyer.
            </p>

            {/* Le prix tout de suite : c'est la première question que tout le monde se pose. */}
            <div
              className="entree mt-8 flex flex-wrap items-end gap-x-4 gap-y-1"
              style={{ "--retard": "400ms" } as React.CSSProperties}
            >
              <span className="text-[3.4rem] font-extrabold leading-none tracking-tight text-[var(--primary)]">
                <Compteur valeur={euro(OFFRE.prixDossier)} duree={1500} />
              </span>
              <span className="pb-1 text-[1.05rem] font-semibold text-[var(--ink-2)]">
                HT, tout compris, livré en {OFFRE.delaiJours} jours
              </span>
            </div>

            <div
              className="entree mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ "--retard": "500ms" } as React.CSSProperties}
            >
              <a href="/questionnaire" className="btn btn-action">
                Faire analyser mon questionnaire
              </a>
              <a href="#prix" className="btn btn-contour">
                Ce que ça comprend
              </a>
            </div>

            <p
              className="entree mt-5 text-[15px] font-bold text-[var(--ok)]"
              style={{ "--retard": "600ms" } as React.CSSProperties}
            >
              L&apos;analyse de votre fichier est gratuite. Réponse sous 24 h.
            </p>
          </div>

          <div
            className="entree flex justify-center lg:justify-end"
            style={{ "--retard": "360ms" } as React.CSSProperties}
          >
            <div className="relative w-full max-w-[26rem]">
              {/* Le halo donne l'assise : sans lui, la marque flotte sans poids */}
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: "var(--primary-soft)" }}
              />
              <div className="flex justify-center py-6">
                <MarqueTrait taille={340} />
              </div>

              <div className="carte absolute -left-6 top-2 w-44 px-5 py-4 sm:-left-14">
                <p className="text-[2.6rem] font-extrabold leading-none tracking-tight text-[var(--primary)]">
                  <Compteur valeur="80" duree={1100} />
                </p>
                <p className="mt-1.5 text-[14px] font-bold leading-tight">questions à remplir</p>
                <p className="mt-1 text-[13px] text-[var(--ink-3)]">on s&apos;en occupe</p>
              </div>

              {/* Le débord reste sous la gouttière de .wrap (32 px), sinon la
                  carte est rognée par le bord de l'écran en dessous de 1500 px
                  et perd sa bordure et son ombre portée. */}
              <div className="carte absolute -right-6 bottom-2 w-44 px-5 py-4 sm:-right-5">
                <p className="text-[2.6rem] font-extrabold leading-none tracking-tight text-[var(--ok)]">
                  <Compteur valeur="10 j" duree={1100} />
                </p>
                <p className="mt-1.5 text-[14px] font-bold leading-tight">et le dossier part</p>
                <p className="mt-1 text-[13px] text-[var(--ink-3)]">délai contractuel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= LES ÉTAPES */}
      <section className="bande bg-[var(--surface)] py-16">
        <div className="wrap grid gap-6 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <div
              key={e.n}
              data-revele
              className="carte carte-relief flex items-center gap-5 p-6"
              style={{ "--retard": `${i * 110}ms` } as React.CSSProperties}
            >
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[var(--ink)] text-[1.5rem] font-extrabold"
                style={{ background: e.couleur, color: "#10183a" }}
              >
                {e.n}
              </span>
              <div>
                <p className="text-[1.05rem] font-bold leading-snug">{e.titre}</p>
                <p className="mt-1 text-[14px] text-[var(--ink-2)]">{e.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== PRIX */}
      <section id="prix" className="bande scroll-mt-16 bg-[var(--ground)] py-20">
        <div className="wrap">
          <div className="carte overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_1fr]">
              <div className="p-9 sm:p-12">
                <p className="text-[14px] font-bold uppercase tracking-wide text-[var(--ink-3)]">
                  Un seul prix, affiché
                </p>
                <p className="mt-4 text-[4.2rem] font-extrabold leading-none tracking-tight text-[var(--primary)]">
                  {euro(OFFRE.prixDossier)}
                </p>
                <p className="mt-3 text-[1.15rem] font-bold">
                  HT, une seule fois. Pas d&apos;abonnement obligatoire.
                </p>

                <ul className="mt-8 space-y-3">
                  {INCLUS.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-[15.5px]">
                      <span
                        aria-hidden
                        className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--ok)] text-[13px] font-bold text-white"
                      >
                        ✓
                      </span>
                      {l}
                    </li>
                  ))}
                </ul>

                <a href="/questionnaire" className="btn btn-action mt-9">
                  Commencer par l&apos;analyse gratuite
                </a>
              </div>

              <div className="bloc-ambre flex flex-col justify-center gap-6 border-t-2 border-[var(--ink)] p-9 sm:p-12 lg:border-l-2 lg:border-t-0">
                <p className="text-[14px] font-bold uppercase tracking-wide opacity-70">Pour comparer</p>
                <div>
                  <p className="text-[2rem] font-extrabold leading-none">15 000 à 40 000 €</p>
                  <p className="mt-2 text-[15px] font-semibold">un cabinet de conseil, en 3 à 6 semaines</p>
                </div>
                <div>
                  <p className="text-[2rem] font-extrabold leading-none">1 100 à 1 500 €</p>
                  <p className="mt-2 text-[15px] font-semibold">la journée d&apos;un consultant indépendant</p>
                </div>
                <div>
                  <p className="text-[2rem] font-extrabold leading-none">9 € par mois</p>
                  <p className="mt-2 text-[15px] font-semibold">
                    un scan en ligne, qui ne remplit rien à votre place
                  </p>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed opacity-80">
                  Prix relevés publiquement en septembre 2026 auprès de cabinets et prestataires français.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[15px] text-[var(--ink-2)]">
            Besoin d&apos;un suivi ensuite ? {euro(OFFRE.prixMaintien)} HT par mois, questionnaires illimités, sans
            engagement au-delà de 12 mois.
          </p>
        </div>
      </section>

      {/* =========================================================== CHIFFRES */}
      <section className="bande bloc-bleu py-14">
        <div className="wrap grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CHIFFRES.map((c) => (
            <div key={c.v} data-revele>
              <p className="text-[2.9rem] font-extrabold leading-none tracking-tight">
                <Compteur valeur={c.v} />
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed opacity-90">{c.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================== DÉMONSTRATION */}
      <section className="bande bg-[var(--surface)] py-20">
        <div className="wrap">
          <div className="centre max-w-2xl">
            <h2 data-revele className="t-section">
              Voilà ce qu&apos;on vous renvoie
            </h2>
            <p data-revele className="mt-5 text-[1.08rem] text-[var(--ink-2)]">
              Pas un rapport d&apos;audit à traduire. Pas un logiciel à remplir. Le fichier de votre client,
              complété.
            </p>
          </div>

          <div data-revele className="mx-auto mt-12 max-w-4xl">
            <FeuilleVivante questions={DEMO} />
          </div>
        </div>
      </section>

      {/* ===================================================== SOUVERAINETÉ */}
      <section className="bande relative overflow-hidden bg-[var(--surface)] py-20">
        <span
          aria-hidden
          className="forme forme-2"
          style={{ background: "var(--menthe)", width: "24rem", height: "20rem", top: "-6rem", right: "-7rem" }}
        />
        <div className="wrap surcouche">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.25fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--ok-soft)] px-4 py-2 text-[14px] font-bold text-[var(--ok)]">
                {HEBERGEUR.souverain ? "🇫🇷 Données en France" : "Vos données, et rien d'autre"}
              </span>
              <h2 data-revele className="t-section mt-6">
                {HEBERGEUR.souverain ? "Vos fichiers ne quittent pas le territoire" : "Ce que devient le fichier que vous nous confiez"}
              </h2>
              <p data-revele className="mt-6 text-[1.06rem] leading-relaxed text-[var(--ink-2)]">
                Vous nous confiez le document qui décrit vos failles. C&apos;est probablement le fichier le plus
                sensible que vous enverrez cette année. Voici précisément ce qu&apos;il devient, et comment le
                vérifier.
              </p>
              {HEBERGEUR.souverain && (
                <p data-revele className="mt-4 text-[15px] leading-relaxed text-[var(--ink-3)]">
                  Hébergement {HEBERGEUR.nom}, {HEBERGEUR.ville}, {HEBERGEUR.pays}. Nommé dans nos mentions
                  légales.
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {ENGAGEMENTS.filter((e) => !("exigeSouverainete" in e) || HEBERGEUR.souverain).map((e, i) => (
                <div
                  key={e.titre}
                  data-revele
                  style={{ "--retard": `${i * 90}ms` } as React.CSSProperties}
                  className="carte carte-relief flex flex-col p-6"
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--ok)] text-[14px] font-bold text-white"
                    >
                      ✓
                    </span>
                    <p className="text-[1.05rem] font-bold leading-snug">{e.titre}</p>
                  </div>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-[var(--ink-2)]">{e.texte}</p>
                  <p className="mt-4 border-t-2 border-[var(--border)] pt-3 text-[13px] leading-relaxed text-[var(--ink-3)]">
                    <span className="font-bold text-[var(--ink-2)]">Comment le vérifier : </span>
                    {e.verifiable}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== AUTO-TEST */}
      <section className="bande relative overflow-hidden bg-[var(--violet-doux)] py-20">
        <span
          aria-hidden
          className="forme forme-3"
          style={{ background: "var(--violet)", width: "26rem", height: "22rem", top: "-7rem", left: "-8rem" }}
        />
        <div className="wrap surcouche grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <h2 data-revele className="t-section">
              Trois questions, et vous saurez
            </h2>
            <p data-revele className="mt-6 text-[1.08rem] leading-relaxed text-[var(--ink-2)]">
              Ce sont les trois points sur lesquels un évaluateur ne transige jamais. Répondez honnêtement,
              personne ne vous regarde.
            </p>
            <p data-revele className="mt-4 text-[15px] font-bold text-[var(--ink-2)]">
              Quinze secondes. Rien n&apos;est enregistré, rien n&apos;est envoyé.
            </p>
          </div>
          <div data-revele>
            <MicroDiagnostic />
          </div>
        </div>
      </section>

      {/* ============================================================ OPTIONS */}
      <section id="options" className="bande scroll-mt-16 bg-[var(--ground)] py-20">
        <div className="wrap">
          <h2 data-revele className="t-section">
            Vos autres options
          </h2>
          <p data-revele className="mt-5 text-[1.08rem] text-[var(--ink-2)]">
            On ne prétend pas être seuls. On prétend être les seuls à votre taille.
          </p>
          <div data-revele className="mt-10">
            <Comparateur />
          </div>
        </div>
      </section>

      {/* ========================================================== SECTEURS */}
      <section className="bande bg-[var(--surface)] py-20">
        <div className="wrap">
          <h2 data-revele className="t-section">
            Votre métier change les questions
          </h2>
          <p data-revele className="mt-5 text-[1.08rem] text-[var(--ink-2)]">
            Le socle est commun. Celles qui font échouer un dossier, non.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {SECTEURS.filter((s) => s.id !== "autre").map((s, i) => (
              <a
                key={s.id}
                href={`/secteurs/${s.id}`}
                data-revele
                style={{ "--retard": `${i * 110}ms` } as React.CSSProperties}
                className="carte carte-relief groupe flex flex-col p-8"
              >
                <h3 className="t-bloc">{s.titre}</h3>
                <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-[var(--ink-2)]">{s.positionNis2}</p>
                <p className="mt-6 font-bold text-[var(--primary)]">
                  Ce qu&apos;on vous demandera <span aria-hidden className="fleche">→</span>
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================================== FAQ */}
      <section className="bande bg-[var(--ground)] py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[auto_1fr]">
          <div data-revele className="flex justify-center lg:justify-start">
            <MarqueTrait taille={170} couleur="var(--border-fort)" />
          </div>
          <div>
            <h2 data-revele className="t-section">
              Les questions qu&apos;on nous pose
            </h2>
            <div className="mt-8 max-w-3xl">
              {FAQ.map((f) => (
                <details key={f.q} data-revele className="group border-b-2 border-[var(--border)] py-5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-bold marker:content-['']">
                    <span>{f.q}</span>
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--primary)] text-[16px] font-bold text-white transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-[var(--ink-2)]">{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================== FIN */}
      <section className="bande bloc-bleu relative overflow-hidden py-20">
        <span
          aria-hidden
          className="forme"
          style={{ background: "var(--ambre)", width: "26rem", height: "22rem", bottom: "-8rem", right: "-6rem" }}
        />
        <div className="wrap surcouche centre max-w-2xl">
          <div className="flex justify-center">
            <MarqueTrait taille={120} couleur="rgba(255,255,255,0.85)" />
          </div>
          <h2 data-revele className="t-section mt-8">
            Envoyez-nous votre questionnaire
          </h2>
          <p data-revele className="mt-6 text-[1.08rem] leading-relaxed opacity-90">
            Réponse sous {OFFRE.delaiReponseGratuite} : ce qui bloque, ce qui est éliminatoire, ce que ça coûte de
            le régler. Gratuit, sans engagement.
          </p>
          <div data-revele className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/questionnaire" className="btn btn-blanc">
              Faire analyser mon questionnaire
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="btn btn-clair-contour"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
