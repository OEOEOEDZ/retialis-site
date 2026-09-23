"use client";

import { useMemo, useState } from "react";
import { THEMES, NIS2_MESURES, type Niveau, type Question } from "@/lib/referentiel";
import { QUESTIONS_SOCLE } from "@/lib/questions-socle";
import { QUESTIONS_SECTEUR, SECTEURS } from "@/lib/questions-secteur";
import { calculer, planDAction, LIBELLE_NIVEAU, type Reponses } from "@/lib/scoring";

const NIVEAUX: Niveau[] = ["conforme", "partiel", "non_conforme", "non_applicable"];

const COULEUR_SCORE = (s: number) =>
  s >= 85 ? "var(--ok)" : s >= 65 ? "var(--primary)" : s >= 40 ? "var(--warn)" : "var(--signal)";

export default function Diagnostic() {
  const [secteur, setSecteur] = useState<string | null>(null);
  const [etape, setEtape] = useState(0); // index du thème en cours
  const [reponses, setReponses] = useState<Reponses>({});
  const [termine, setTermine] = useState(false);

  const questions = useMemo(() => {
    if (!secteur) return [];
    return [...QUESTIONS_SOCLE, ...(QUESTIONS_SECTEUR[secteur] ?? [])];
  }, [secteur]);

  const themesActifs = useMemo(
    () => THEMES.filter((t) => questions.some((q) => q.theme === t.id)),
    [questions],
  );

  if (!secteur) return <ChoixSecteur onChoix={setSecteur} />;

  if (termine)
    return (
      <Resultats
        questions={questions}
        reponses={reponses}
        secteur={secteur}
        onRecommencer={() => {
          setTermine(false);
          setEtape(0);
        }}
      />
    );

  const theme = themesActifs[etape];
  const qsTheme = questions.filter((q) => q.theme === theme.id);
  const toutesRepondues = qsTheme.every((q) => reponses[q.id]);
  const progression = Math.round((etape / themesActifs.length) * 100);

  return (
    <div className="wrap max-w-3xl py-12">
      <div className="mb-10">
        <div className="mb-3 flex items-baseline justify-between text-sm">
          <span className="font-medium">
            Étape {etape + 1} sur {themesActifs.length}
          </span>
          <span className="text-[var(--ink-2)]">{progression} %</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
          <div
            className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
            style={{ width: `${Math.max(progression, 3)}%` }}
          />
        </div>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight">{theme.titre}</h1>
      <p className="mt-3 leading-relaxed text-[var(--ink-2)]">{theme.intention}</p>

      <div className="mt-10 space-y-5">
        {qsTheme.map((q) => (
          <CarteQuestion
            key={q.id}
            q={q}
            valeur={reponses[q.id]}
            onChange={(n) => setReponses((r) => ({ ...r, [q.id]: n }))}
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
        <button
          onClick={() => (etape === 0 ? setSecteur(null) : setEtape((e) => e - 1))}
          className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--surface)]"
        >
          Retour
        </button>
        <div className="flex items-center gap-4">
          {!toutesRepondues && (
            <span className="text-sm text-[var(--ink-2)]">
              {qsTheme.filter((q) => reponses[q.id]).length} / {qsTheme.length} répondues
            </span>
          )}
          <button
            disabled={!toutesRepondues}
            onClick={() => (etape === themesActifs.length - 1 ? setTermine(true) : setEtape((e) => e + 1))}
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {etape === themesActifs.length - 1 ? "Voir mon résultat" : "Continuer"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- SÉLECTION */

function ChoixSecteur({ onChoix }: { onChoix: (s: string) => void }) {
  return (
    <div className="wrap max-w-3xl py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Diagnostic fournisseur</h1>
      <p className="mt-5 text-lg leading-relaxed text-[var(--ink-2)]">
        Une quarantaine de questions, formulées comme vos clients les posent réellement. Comptez douze minutes.
        Répondez honnêtement : le but n&apos;est pas d&apos;avoir un bon score, c&apos;est de savoir ce qui vous
        ferait recaler avant que votre client ne le découvre.
      </p>
      <h2 className="mt-12 text-sm font-medium uppercase tracking-wide text-[var(--ink-2)]">
        Quel est votre secteur ?
      </h2>
      <div className="mt-5 space-y-3">
        {SECTEURS.map((s) => (
          <button
            key={s.id}
            onClick={() => onChoix(s.id)}
            className="block w-full rounded-sm border border-[var(--border)] p-5 text-left transition hover:border-[var(--primary)] hover:bg-[var(--surface)]"
          >
            <span className="font-semibold">{s.titre}</span>
            <span className="mt-2 block text-sm leading-relaxed text-[var(--ink-2)]">{s.positionNis2}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- QUESTION */

function CarteQuestion({
  q,
  valeur,
  onChange,
}: {
  q: Question;
  valeur?: Niveau;
  onChange: (n: Niveau) => void;
}) {
  const [ouvert, setOuvert] = useState(false);
  return (
    <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-start gap-3">
        {q.poids === 3 && (
          <span
            title="Souvent éliminatoire"
            className="mt-1 shrink-0 rounded bg-[var(--signal)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
          >
            Clé
          </span>
        )}
        <p className="font-medium leading-relaxed">{q.question}</p>
      </div>
      <p className="mt-2 text-sm italic text-[var(--ink-2)]">Autrement dit : {q.clair}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {NIVEAUX.map((n) => {
          const actif = valeur === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              aria-pressed={actif}
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                actif
                  ? "border-[var(--primary)] bg-[var(--primary)] font-medium text-white"
                  : "border-[var(--border)] hover:border-[var(--primary)]"
              }`}
            >
              {LIBELLE_NIVEAU[n]}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setOuvert((o) => !o)}
        className="mt-4 text-sm font-medium text-[var(--primary)] hover:underline"
      >
        {ouvert ? "Masquer" : "Pourquoi cette question ?"}
      </button>
      {ouvert && (
        <div className="mt-3 space-y-3 border-t border-[var(--border)] pt-3 text-sm leading-relaxed">
          <p className="text-[var(--ink-2)]">{q.enjeu}</p>
          <p>
            <span className="font-medium">Preuve attendue : </span>
            <span className="text-[var(--ink-2)]">{q.preuve}</span>
          </p>
          <p className="text-xs text-[var(--ink-2)]">
            Rattachement NIS2, article 21(2) : {q.nis2.map((m) => `${m}) ${NIS2_MESURES[m]}`).join(" · ")}
          </p>
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- RÉSULTATS */

function Resultats({
  questions,
  reponses,
  secteur,
  onRecommencer,
}: {
  questions: Question[];
  reponses: Reponses;
  secteur: string;
  onRecommencer: () => void;
}) {
  const res = useMemo(() => calculer(questions, reponses), [questions, reponses]);
  const plan = useMemo(() => planDAction(questions, reponses), [questions, reponses]);
  const nomSecteur = SECTEURS.find((s) => s.id === secteur)?.titre ?? "";

  const joursTotal = plan.reduce((a, p) => a + p.jours, 0);

  return (
    <div className="wrap max-w-4xl py-12">
      <p className="text-sm text-[var(--ink-2)]">{nomSecteur}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Votre posture fournisseur</h1>

      {/* Score */}
      <div className="mt-10 grid gap-6 rounded-sm border border-[var(--border)] bg-[var(--surface)] p-8 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="text-center">
          <div className="text-6xl font-semibold tracking-tight" style={{ color: COULEUR_SCORE(res.scoreGlobal) }}>
            {res.scoreGlobal}
          </div>
          <div className="mt-1 text-sm text-[var(--ink-2)]">sur 100</div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{res.verdict.titre}</h2>
          <p className="mt-3 leading-relaxed text-[var(--ink-2)]">{res.verdict.message}</p>
        </div>
      </div>

      {/* Bloquants */}
      {res.bloquants.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            {res.bloquants.length} point{res.bloquants.length > 1 ? "s" : ""} qui vous fera
            {res.bloquants.length > 1 ? "ont" : ""} recaler
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--ink-2)]">
            Ce sont les questions sur lesquelles un évaluateur ne transige pas. Traitez-les avant d&apos;envoyer quoi
            que ce soit.
          </p>
          <div className="mt-6 space-y-4">
            {res.bloquants.map((q) => (
              <div key={q.id} className="rounded-sm border-l-4 border-[var(--signal)] bg-[var(--surface)] p-5">
                <p className="font-medium">{q.question}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-2)]">{q.enjeu}</p>
                <div className="mt-4 rounded-lg bg-[var(--ground)] p-4 text-sm">
                  <p className="font-medium">Ce qu&apos;il faut faire</p>
                  <p className="mt-2 leading-relaxed text-[var(--ink-2)]">{q.remediation.action}</p>
                  <p className="mt-3 text-[var(--ink-2)]">
                    <span className="font-medium text-[var(--ink)]">Effort :</span> {q.remediation.effort} ·{" "}
                    <span className="font-medium text-[var(--ink)]">Coût :</span> {q.remediation.cout}
                  </p>
                  {q.remediation.formulationInterim && (
                    <p className="mt-3 leading-relaxed text-[var(--ink-2)]">
                      <span className="font-medium text-[var(--ink)]">En attendant, à répondre : </span>
                      <span className="italic">« {q.remediation.formulationInterim} »</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Détail par thème */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Le détail, domaine par domaine</h2>
        <div className="mt-6 space-y-3">
          {res.themes.map((t) => (
            <div key={t.themeId} className="flex items-center gap-4">
              <span className="w-56 shrink-0 text-sm">{t.titre}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.max(t.score, 2)}%`, background: COULEUR_SCORE(t.score) }}
                />
              </div>
              <span className="w-14 shrink-0 text-right text-sm font-medium tabular-nums">{t.score} %</span>
            </div>
          ))}
        </div>
      </section>

      {/* Plan d'action */}
      {plan.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Votre plan d&apos;action</h2>
          <p className="mt-3 leading-relaxed text-[var(--ink-2)]">
            Trié par ce qui débloque le plus vite. Charge totale estimée :{" "}
            <span className="font-medium text-[var(--ink)]">{Math.ceil(joursTotal)} jours-homme</span>, dont une large
            part à coût nul.
          </p>
          <ol className="mt-6 space-y-3">
            {plan.map((p, i) => (
              <li key={p.question.id} className="flex gap-4 rounded-sm border border-[var(--border)] p-4">
                <span className="mt-0.5 shrink-0 text-sm font-semibold tabular-nums text-[var(--ink-2)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-relaxed">{p.question.remediation.action}</p>
                  <p className="mt-2 text-xs text-[var(--ink-2)]">
                    {p.question.remediation.effort} · {p.question.remediation.cout} ·{" "}
                    {p.priorite === 3 ? "Priorité haute" : p.priorite === 2 ? "Priorité moyenne" : "Priorité basse"}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Réponses types */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Vos réponses rédigées</h2>
        <p className="mt-3 leading-relaxed text-[var(--ink-2)]">
          Pour chaque point déclaré en place, voici la formulation à recopier dans le questionnaire de votre client.
          Remplacez les crochets par vos éléments réels, et seulement s&apos;ils sont exacts.
        </p>
        <div className="mt-6 space-y-4">
          {questions
            .filter((q) => reponses[q.id] === "conforme")
            .map((q) => (
              <details key={q.id} className="rounded-sm border border-[var(--border)] p-5">
                <summary className="flex min-h-11 cursor-pointer items-center text-sm font-medium">{q.question}</summary>
                <p className="mt-4 rounded-lg bg-[var(--surface)] p-4 text-sm leading-relaxed text-[var(--ink-2)]">
                  {q.reponseType}
                </p>
                <p className="mt-3 text-xs text-[var(--ink-2)]">
                  <span className="font-medium text-[var(--ink)]">À joindre : </span>
                  {q.preuve}
                </p>
              </details>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="no-print mt-14 rounded-sm border border-[var(--border)] bg-[var(--primary-soft)] p-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Vous voulez le dossier complet, prêt à envoyer ?</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[var(--ink-2)]">
          Nous reprenons chaque réponse avec vous, rédigeons les documents qui manquent et livrons le questionnaire
          de votre client rempli et argumenté, avec ses preuves.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/rendez-vous" className="btn btn-action">
            Prendre rendez-vous
          </a>
          <button
            onClick={() => window.print()}
            className="btn btn-contour"
          >
            Imprimer ou enregistrer en PDF
          </button>
        </div>
        <button onClick={onRecommencer} className="mt-6 text-sm text-[var(--ink-2)] hover:underline">
          Revoir mes réponses
        </button>
      </section>
    </div>
  );
}
