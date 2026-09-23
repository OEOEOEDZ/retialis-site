"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Chiffre qui s'incrémente quand il entre dans le champ de vision.
 *
 * Accepte une valeur déjà mise en forme ("15 000", "24 h", "10 M€") : le
 * nombre est extrait, animé, puis le préfixe et le suffixe sont remis en
 * place. La valeur finale s'affiche d'emblée si le mouvement est désactivé ou
 * si le script ne tourne pas, donc le chiffre est toujours lisible.
 */
export function Compteur({ valeur, duree = 1300 }: { valeur: string; duree?: number }) {
  const [affiche, setAffiche] = useState(valeur);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    /* « 15 000 » donne préfixe "", nombre 15000, suffixe "" ; « 10 j » donne
       suffixe " j". Le groupe du nombre doit se terminer sur un chiffre, sinon
       il avale l'espace qui sépare la valeur de son unité et « 1 490 € »
       s'affiche « 1 490€ ». Les espaces admis à l'intérieur sont l'espace
       normal, l'insécable et l'insécable fine, nos séparateurs de milliers. */
    const m = valeur.match(/^(\D*)(\d[\d \u00a0\u202f]*\d|\d)(.*)$/);
    if (!m) return;
    const [, prefixe, brut, suffixe] = m;
    const cible = parseInt(brut.replace(/[^\d]/g, ""), 10);
    if (!Number.isFinite(cible) || cible <= 0) return;

    setAffiche(prefixe + "0" + suffixe);

    const obs = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting) continue;
          obs.disconnect();
          const debut = performance.now();
          const pas = (t: number) => {
            const p = Math.min((t - debut) / duree, 1);
            const adouci = 1 - Math.pow(1 - p, 3);
            setAffiche(prefixe + Math.round(cible * adouci).toLocaleString("fr-FR") + suffixe);
            if (p < 1) requestAnimationFrame(pas);
          };
          requestAnimationFrame(pas);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [valeur, duree]);

  return (
    <span ref={ref} className="tabular-nums">
      {affiche}
    </span>
  );
}
