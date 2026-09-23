"use client";

import { useEffect } from "react";

/**
 * Active le mouvement sur le site.
 *
 * La page est entièrement lisible sans ce composant : les règles d'animation
 * sont toutes portées par la classe `.anim` posée ici sur <html>. Si le script
 * ne tourne pas, ou si l'utilisateur a demandé de réduire les animations, rien
 * n'est masqué et rien ne bouge.
 *
 * Le calcul se fait sur la position réelle à chaque défilement, et non via un
 * IntersectionObserver à marge négative : une première version laissait des
 * blocs présents à l'écran bloqués à opacité zéro, parce qu'ils tombaient dans
 * la zone morte de cette marge. Un élément visible qui reste invisible est le
 * pire défaut possible, donc la règle ici est volontairement simple et
 * vérifiable : dès qu'un bloc entre dans les 88 % hauts de la fenêtre, il est
 * révélé, définitivement.
 */
export function Animations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const racine = document.documentElement;
    racine.classList.add("anim");

    const cibles = new Set(Array.from(document.querySelectorAll<HTMLElement>("[data-revele]")));
    if (!cibles.size) return;

    let planifie = false;

    const passer = () => {
      planifie = false;
      const h = window.innerHeight;
      let rang = 0;
      for (const el of cibles) {
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.88 && r.bottom > 0) {
          el.style.setProperty("--retard", `${Math.min(rang, 4) * 90}ms`);
          el.classList.add("vu");
          cibles.delete(el);
          rang += 1;
        }
      }
      if (!cibles.size) retirer();
    };

    const demander = () => {
      if (planifie) return;
      planifie = true;
      requestAnimationFrame(passer);
    };

    const retirer = () => {
      window.removeEventListener("scroll", demander);
      window.removeEventListener("resize", demander);
    };

    window.addEventListener("scroll", demander, { passive: true });
    window.addEventListener("resize", demander, { passive: true });

    // Premier passage pour ce qui est déjà visible au chargement.
    demander();

    /*
     * Balayage périodique pendant les premières secondes. Le seul écouteur de
     * défilement ne suffit pas dans deux cas réels : l'arrivée directe sur une
     * ancre (#prix), et le défilement fluide déclenché par un lien interne, qui
     * termine sa course après le dernier événement observé. Un passage toutes
     * les 400 ms couvre les deux sans coût perceptible.
     */
    const balayage = window.setInterval(() => {
      if (!cibles.size) {
        clearInterval(balayage);
        return;
      }
      demander();
    }, 400);

    /*
     * Filet de sécurité : si un bloc n'a toujours pas été révélé au bout de
     * quinze secondes alors qu'il se trouve à l'écran, on le révèle sans
     * condition. Mieux vaut perdre un effet que perdre du contenu.
     */
    const filet = window.setTimeout(() => {
      for (const el of cibles) {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("vu");
          cibles.delete(el);
        }
      }
    }, 15000);

    return () => {
      retirer();
      clearInterval(balayage);
      clearTimeout(filet);
    };
  }, []);

  return null;
}
