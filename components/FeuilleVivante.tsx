"use client";

import { useEffect, useRef, useState } from "react";
import type { Question } from "@/lib/referentiel";

/**
 * Le seul moment animé du site, et la démonstration du service.
 *
 * La feuille du client arrive vide. Elle se remplit une fois, ligne par ligne :
 * la réponse s'écrit, la preuve apparaît, l'état passe du rouge au vert. Puis
 * elle reste là, complète et lisible.
 *
 * Sans JavaScript, ou en mouvement réduit, la feuille s'affiche déjà remplie.
 */

/** Première phrase de la réponse type : assez pour convaincre, assez court pour se lire. */
const extrait = (s: string) => {
  const p = s.split(/(?<=\.)\s/)[0];
  return p.length > 145 ? p.slice(0, 142).trimEnd() + "…" : p;
};

export function FeuilleVivante({ questions }: { questions: Question[] }) {
  const lignes = questions.slice(0, 4).map((q) => ({
    id: q.id,
    question: q.clair,
    reponse: extrait(q.reponseType),
    preuve: q.preuve.split(/[.(]/)[0].trim(),
    bloquante: q.poids === 3,
  }));

  const [remplies, setRemplies] = useState(lignes.length);
  const [cle, setCle] = useState(0);
  const [saisie, setSaisie] = useState("");
  const conteneur = useRef<HTMLDivElement>(null);
  const horloges = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = conteneur.current;
    if (!el) return;

    setRemplies(0);
    const T = (fn: () => void, ms: number) => horloges.current.push(window.setTimeout(fn, ms));

    const jouer = () => {
      let t = 700;
      lignes.forEach((ligne, i) => {
        const texte = ligne.reponse;
        const pas = 2;
        for (let k = 0; k <= texte.length; k += pas) {
          T(() => setSaisie(texte.slice(0, k)), t + (k / pas) * 18);
        }
        t += (texte.length / pas) * 18 + 260;
        T(() => {
          setRemplies(i + 1);
          setSaisie("");
        }, t);
        t += 480;
      });
    };

    const obs = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting) continue;
          obs.disconnect();
          jouer();
        }
      },
      // Le bloc doit etre franchement visible, pas effleurer le bas du cadre :
      // sinon l'animation se joue pendant que le visiteur lit encore le titre.
      { threshold: 0.45, rootMargin: "0px 0px -12% 0px" },
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      horloges.current.forEach(clearTimeout);
      horloges.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cle]);

  const fini = remplies >= lignes.length;

  return (
    <div
      ref={conteneur}
      className="overflow-hidden rounded-2xl bg-[var(--surface)] text-[var(--ink)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
    >
      {/* Barre du document */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface-2)] px-5 py-3">
        <span className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[var(--ink)]">
          <span aria-hidden className="grid h-5 w-5 place-items-center rounded bg-[var(--ok)] text-[10px] font-bold text-white">
            X
          </span>
          questionnaire-fournisseur-securite.xlsx
        </span>
        <span className="text-[13px] text-[var(--ink-3)]">
          {fini ? "80 lignes sur 80 renseignées" : `${remplies} sur 80 renseignées`}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface-2)] text-[12.5px] font-semibold text-[var(--ink-3)]">
              <th className="w-12 px-4 py-2.5">N°</th>
              <th className="w-[30%] px-4 py-2.5">Question du client</th>
              <th className="px-4 py-2.5">Votre réponse</th>
              <th className="w-32 px-4 py-2.5">État</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((ligne, i) => {
              const faite = i < remplies;
              const active = i === remplies;
              return (
                <tr
                  key={ligne.id}
                  className={`border-b border-[var(--border)] last:border-0 ${
                    active ? "bg-[var(--primary-soft)]" : ""
                  }`}
                >
                  <td className="px-4 py-4 align-top text-[13px] text-[var(--ink-3)]">{i + 1}</td>

                  <td className="px-4 py-4 align-top text-[14px] leading-snug text-[var(--ink)]">
                    {ligne.question}
                  </td>

                  <td className="px-4 py-4 align-top">
                    {faite ? (
                      <>
                        <p className="text-[13.5px] leading-relaxed text-[var(--ink-2)]">{ligne.reponse}</p>
                        <p className="mt-1.5 text-[12.5px] text-[var(--ink-3)]">Preuve jointe : {ligne.preuve}</p>
                      </>
                    ) : active ? (
                      <p className="text-[13.5px] leading-relaxed text-[var(--ink-2)]">
                        {saisie}
                        <span className="curseur ml-px inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-[var(--primary)]" />
                      </p>
                    ) : (
                      <span className="text-[13.5px] text-[var(--ink-3)]">&nbsp;</span>
                    )}
                  </td>

                  <td className="px-4 py-4 align-top">
                    {faite ? (
                      <span className="etat etat-plein">Répondu</span>
                    ) : active ? (
                      <span className="etat etat-cours">Rédaction</span>
                    ) : ligne.bloquante ? (
                      <span className="etat etat-vide">Bloquant</span>
                    ) : (
                      <span className="etat etat-neutre">Vide</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--surface-2)] px-5 py-3 text-[13px] text-[var(--ink-3)]">
        <span>Extrait de 4 lignes. Le reste du fichier suit la même méthode.</span>
        {fini && (
          <button
            onClick={() => setCle((k) => k + 1)}
            className="font-semibold text-[var(--primary)] underline underline-offset-4 hover:no-underline"
          >
            Revoir le remplissage
          </button>
        )}
      </div>
    </div>
  );
}
