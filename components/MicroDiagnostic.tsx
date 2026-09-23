"use client";

import { useState } from "react";
import { QUESTIONS_SOCLE } from "@/lib/questions-socle";

/**
 * Trois questions, un verdict immédiat.
 *
 * C'est la pièce interactive centrale du site : le visiteur agit et obtient une
 * réponse sur SA situation en quinze secondes, au lieu de lire un argumentaire.
 * Les trois questions retenues sont les plus éliminatoires du référentiel, et
 * les textes viennent du référentiel réel, jamais d'une rédaction de vitrine.
 */

const IDS = ["acc-01", "sau-02", "inc-01"];

type Reponse = "oui" | "partiel" | "non";

const CHOIX: { v: Reponse; l: string }[] = [
  { v: "oui", l: "Oui, et c'est documenté" },
  { v: "partiel", l: "En partie" },
  { v: "non", l: "Non, ou je ne sais pas" },
];

const POINTS: Record<Reponse, number> = { oui: 2, partiel: 1, non: 0 };

export function MicroDiagnostic() {
  const questions = IDS.map((id) => QUESTIONS_SOCLE.find((q) => q.id === id)!).filter(Boolean);
  const [index, setIndex] = useState(0);
  const [reponses, setReponses] = useState<Reponse[]>([]);

  const fini = index >= questions.length;
  const score = reponses.reduce((t, r) => t + POINTS[r], 0);
  const max = questions.length * 2;

  const repondre = (r: Reponse) => {
    setReponses((prev) => [...prev, r]);
    setIndex((i) => i + 1);
  };

  const recommencer = () => {
    setReponses([]);
    setIndex(0);
  };

  const verdict = () => {
    if (score <= 1)
      return {
        ton: "signal" as const,
        titre: "Votre dossier serait recalé",
        texte:
          "Les trois questions que vous venez de voir sont celles sur lesquelles un évaluateur ne transige jamais. En l'état, un donneur d'ordre suspendrait le référencement ou imposerait un plan d'action sous contrainte de délai. La bonne nouvelle : ces trois points se corrigent en quelques jours et coûtent presque rien.",
      };
    if (score <= 4)
      return {
        ton: "warn" as const,
        titre: "Vous passez chez les uns, vous bloquez chez les autres",
        texte:
          "Le socle existe, mais il reste au moins un écart majeur qu'un évaluateur attentif relèvera. À ce niveau, un petit client laisse passer et un grand compte refuse. Traiter les points partiels avant l'envoi change le résultat.",
      };
    return {
      ton: "ok" as const,
      titre: "Vous êtes au-dessus de la moyenne",
      texte:
        "Votre niveau dépasse celui de la plupart des PME évaluées sur ces mêmes critères. Ce qui vous manque probablement n'est pas la mesure, c'est la preuve écrite et datée. C'est exactement ce que réclame l'évaluateur, et c'est ce que nous produisons.",
    };
  };

  if (fini) {
    const v = verdict();
    const couleur =
      v.ton === "ok" ? "var(--ok)" : v.ton === "warn" ? "var(--warn)" : "var(--signal)";

    return (
      <div className="carte p-8 text-[var(--ink)] sm:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="text-[13px] font-semibold text-[var(--ink-3)]">Votre résultat</p>
          <p className="text-[13px] text-[var(--ink-3)]">
            <span className="text-[1.6rem] font-semibold leading-none" style={{ color: couleur }}>
              {score}
            </span>
            <span className="ml-1">sur {max}</span>
          </p>
        </div>

        {/* Jauge : la position se lit d'un coup d'œil */}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-2)]">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${Math.max((score / max) * 100, 6)}%`, background: couleur }}
          />
        </div>

        <div className="mt-7 flex items-center gap-5">
          <span
            className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 text-[1.9rem] font-extrabold"
            style={{ borderColor: couleur, color: couleur }}
          >
            {score}
          </span>
          <h3 className="t-bloc" style={{ color: couleur }}>
            {v.titre}
          </h3>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{v.texte}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/questionnaire" className="btn btn-action">
            Envoyer votre questionnaire
          </a>
          <button onClick={recommencer} className="btn btn-contour">
            Recommencer
          </button>
        </div>

        <p className="mt-5 text-[13px] leading-relaxed text-[var(--ink-3)]">
          Trois questions sur les quarante-quatre du référentiel. L&apos;auto-diagnostic complet prend douze
          minutes et reste gratuit.{" "}
          <a href="/diagnostic" className="lien">
            Le faire en entier
          </a>
        </p>
      </div>
    );
  }

  const q = questions[index];

  return (
    <div className="carte p-8 text-[var(--ink)] sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[13px] font-semibold text-[var(--ink-3)]">
          Question {index + 1} sur {questions.length}
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {questions.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-8 rounded-full transition-colors duration-300"
              style={{ background: i <= index ? "var(--primary)" : "var(--surface-2)" }}
            />
          ))}
        </div>
      </div>

      <h3 className="t-bloc mt-6 leading-snug">{q.clair}</h3>

      <div className="mt-7 grid gap-3">
        {CHOIX.map((c) => (
          <button
            key={c.v}
            onClick={() => repondre(c.v)}
            className="group flex items-center justify-between gap-4 rounded-xl border-2 border-[var(--border)] px-5 py-4 text-left text-[15.5px] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--primary-soft)]"
          >
            {c.l}
            <span
              aria-hidden
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--border-fort)] text-[13px] transition-colors group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-ink)]"
            >
              ✓
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 border-t border-[var(--border)] pt-5 text-[13.5px] leading-relaxed text-[var(--ink-3)]">
        <span className="font-semibold text-[var(--ink-2)]">Pourquoi votre client la pose : </span>
        {q.enjeu}
      </p>
    </div>
  );
}
