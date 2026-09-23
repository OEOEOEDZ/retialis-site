import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QUESTIONS_SECTEUR, SECTEURS } from "@/lib/questions-secteur";
import { QUESTIONS_SOCLE } from "@/lib/questions-socle";
import { THEMES } from "@/lib/referentiel";
import { OFFRE, euro } from "@/lib/site";

const PUBLIES = SECTEURS.filter((s) => s.id !== "autre");

export function generateStaticParams() {
  return PUBLIES.map((s) => ({ secteur: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ secteur: string }>;
}): Promise<Metadata> {
  const { secteur } = await params;
  const s = PUBLIES.find((x) => x.id === secteur);
  if (!s) return {};
  return {
    title: `Questionnaire de sécurité, ${s.titre.split(" / ")[0]}`,
    description: `${s.titre.split(" / ")[0]} : les questions qui font échouer un dossier dans votre métier, et comment y répondre.`,
  };
}

export default async function PageSecteur({ params }: { params: Promise<{ secteur: string }> }) {
  const { secteur } = await params;
  const s = PUBLIES.find((x) => x.id === secteur);
  if (!s) notFound();

  const specifiques = QUESTIONS_SECTEUR[s.id] ?? [];
  const eliminatoires = QUESTIONS_SOCLE.filter((q) => q.poids === 3).slice(0, 5);
  const titreTheme = (id: string) => THEMES.find((t) => t.id === id)?.titre ?? "";

  return (
    <>
      {/* ------------------------------------------------------------- HERO */}
      <section className="wrap pt-14 pb-12 sm:pt-20">
        <div className="texte">
          <p className="text-[13px] font-semibold text-[var(--ink-3)]">Votre métier</p>
          <h1 className="mt-5 text-4xl sm:text-5xl">{s.titre}</h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--ink-2)]">{s.positionNis2}</p>
        </div>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
          <div className="bg-[var(--surface)] p-6">
            <dt className="text-[13px] font-semibold text-[var(--ink-3)]">Qui vous questionne</dt>
            <dd className="mt-3 leading-relaxed text-[var(--ink-2)]">{s.donneursDOrdre}</dd>
          </div>
          <div className="bg-[var(--surface)] p-6">
            <dt className="text-[13px] font-semibold text-[var(--signal)]">Le déclencheur</dt>
            <dd className="mt-3 leading-relaxed text-[var(--ink-2)]">{s.declencheur}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/questionnaire" className="btn btn-action">
            Faire analyser votre questionnaire
          </a>
          <a href="/diagnostic" className="btn btn-contour">
            Auto-diagnostic en 12 minutes
          </a>
        </div>
      </section>

      {/* -------------------------------------------- QUESTIONS SECTORIELLES */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-20">
        <div className="wrap">
          <div className="texte">
            <h2 className="text-3xl sm:text-4xl">Les questions propres à votre métier</h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ink-2)]">
              Celles-ci ne figurent pas dans un questionnaire générique. Elles sont posées parce que votre activité
              crée un risque particulier pour votre client, et ce sont souvent elles qui décident du
              référencement.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {specifiques.map((q) => (
              <article key={q.id} className="rounded-sm border border-[var(--border)] bg-[var(--ground)] p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[13px] font-semibold rounded bg-[var(--surface-2)] px-2 py-1 text-[var(--ink-3)]">
                    {titreTheme(q.theme)}
                  </span>
                  {q.poids === 3 && (
                    <span className="text-[13px] font-semibold rounded bg-[var(--signal)] px-2 py-1 text-white">
                      Souvent éliminatoire
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug">{q.question}</h3>
                <p className="mt-2 text-[15px] italic text-[var(--ink-3)]">Autrement dit : {q.clair}</p>

                <div className="mt-5 grid gap-5 border-t border-[var(--border)] pt-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold">Pourquoi votre client la pose</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{q.enjeu}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">La preuve qu&apos;il attend</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">{q.preuve}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ LE SOCLE */}
      <section className="wrap py-20">
        <div className="texte">
          <h2 className="text-3xl sm:text-4xl">Et les cinq questions qui recalent tout le monde</h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--ink-2)]">
            Quel que soit le métier, ce sont celles sur lesquelles un évaluateur ne transige jamais. Si vous ne
            deviez en traiter que cinq avant de répondre, ce sont celles-là.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {eliminatoires.map((q, i) => (
            <li key={q.id} className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6">
              <span className="text-sm font-semibold text-[var(--signal)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-medium leading-snug">{q.clair}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-3)]">
                {q.remediation.action.split(".")[0]}.
              </p>
              <p className="mt-3 text-xs text-[var(--ink-3)]">
                {q.remediation.effort} · {q.remediation.cout}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* -------------------------------------------------------------- CTA */}
      <section className="wrap pb-20">
        <div className="rounded-sm border border-[var(--border)] bg-[var(--primary-soft)] p-10 text-center sm:p-14">
          <h2 className="text-3xl sm:text-4xl">Vous avez déjà le fichier sur votre bureau ?</h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-[var(--ink-2)]">
            Envoyez-le nous. Réponse sous {OFFRE.delaiReponseGratuite}, gratuitement : ce qui bloque, ce qui est
            éliminatoire, et ce que coûte la remise à niveau. Le dossier complet, lui, est à{" "}
            {euro(OFFRE.prixDossier)} et livré sous {OFFRE.delaiJours} jours ouvrés.
          </p>
          <a href="/questionnaire" className="btn btn-action mt-9">
            Faire analyser votre questionnaire
          </a>
        </div>
      </section>
    </>
  );
}
