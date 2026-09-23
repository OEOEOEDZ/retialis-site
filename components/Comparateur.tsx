"use client";

import { useState } from "react";
import { ALTERNATIVES } from "@/lib/site";

/**
 * Le comparatif, en interactif.
 *
 * Un tableau se survole, il ne se lit pas. Ici le visiteur désigne ce qu'il
 * envisage réellement, et obtient la réponse sur ce choix précis. Il fait le
 * travail de qualification lui-même, ce qui vaut mieux que de le subir.
 */
export function Comparateur() {
  const options = ALTERNATIVES;
  const [actif, setActif] = useState(0);
  const o = options[actif];
  const nous = "nous" in o && o.nous;

  return (
    <div>
      <p className="text-[15px] text-[var(--ink-2)]">
        Qu&apos;envisagez-vous aujourd&apos;hui ?
      </p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {options.map((opt, i) => {
          const choisi = i === actif;
          const estNous = "nous" in opt && opt.nous;
          return (
            <button
              key={opt.quoi}
              onClick={() => setActif(i)}
              aria-pressed={choisi}
              className={`rounded-full border-2 px-4 py-2.5 text-[14.5px] font-bold transition-all duration-200 ${
                choisi
                  ? estNous
                    ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-ink)]"
                    : "border-[var(--ink)] bg-[var(--ink)] text-white"
                  : "border-[var(--border-fort)] bg-[var(--surface)] text-[var(--ink-2)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
              }`}
            >
              {opt.quoi}
            </button>
          );
        })}
      </div>

      {/* Le panneau change au clic : c'est le mouvement qui montre ce qui a changé */}
      <div
        key={actif}
        className="carte mt-8 animate-[panneau_0.4s_cubic-bezier(0.22,1,0.36,1)] p-8 sm:p-10"
        style={nous ? { borderColor: "var(--primary)", boxShadow: "6px 6px 0 0 var(--primary)" } : undefined}
      >
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--ink-2)]">
              Coût réel
            </p>
            <p
              className="mt-2.5 text-[1.7rem] font-semibold leading-tight"
              style={{ color: nous ? "var(--primary)" : "var(--ink)" }}
            >
              {o.cout}
            </p>
          </div>

          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--ink-2)]">
              Ce que vous obtenez
            </p>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--ink)]">{o.obtient}</p>
          </div>

          <div>
            <p
              className="text-[12.5px] font-semibold uppercase tracking-wide"
              style={{ color: nous ? "var(--ok)" : "var(--primary)" }}
            >
              {nous ? "Le point de vigilance" : "Ce qui coince"}
            </p>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--ink-2)]">{o.probleme}</p>
          </div>
        </div>

        {!nous && (
          <button
            onClick={() => setActif(options.length - 1)}
            className="mt-5 inline-flex min-h-11 items-center text-[14.5px] font-semibold text-[var(--primary)] underline underline-offset-4 hover:no-underline"
          >
            Voir ce que nous faisons à la place
          </button>
        )}
      </div>

      <style>{`
        @keyframes panneau {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-[panneau"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
