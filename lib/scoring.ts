import type { Niveau, Question } from "./referentiel";
import { THEMES } from "./referentiel";

export type Reponses = Record<string, Niveau>;

const POINTS: Record<Niveau, number | null> = {
  conforme: 1,
  partiel: 0.5,
  non_conforme: 0,
  non_applicable: null, // exclu du dénominateur
};

export interface ScoreTheme {
  themeId: string;
  titre: string;
  score: number; // 0-100
  repondues: number;
  total: number;
  bloquants: number;
}

export interface Verdict {
  niveau: "critique" | "fragile" | "acceptable" | "solide";
  titre: string;
  message: string;
}

export interface Resultat {
  scoreGlobal: number;
  themes: ScoreTheme[];
  bloquants: Question[];
  aRenforcer: Question[];
  verdict: Verdict;
  couverture: number; // % de questions répondues
}

/**
 * Le score n'est pas une moyenne simple : les questions de poids 3 pèsent
 * trois fois plus, car ce sont celles qui font échouer une évaluation
 * fournisseur même lorsque le reste du dossier est bon.
 */
export function calculer(questions: Question[], reponses: Reponses): Resultat {
  let pointsObtenus = 0;
  let pointsPossibles = 0;
  let repondues = 0;

  const parTheme = new Map<string, { obtenus: number; possibles: number; rep: number; total: number; bloq: number }>();

  for (const q of questions) {
    const entry = parTheme.get(q.theme) ?? { obtenus: 0, possibles: 0, rep: 0, total: 0, bloq: 0 };
    entry.total += 1;

    const niveau = reponses[q.id];
    if (niveau) {
      repondues += 1;
      entry.rep += 1;
      const p = POINTS[niveau];
      if (p !== null) {
        pointsObtenus += p * q.poids;
        pointsPossibles += q.poids;
        entry.obtenus += p * q.poids;
        entry.possibles += q.poids;
      }
      if (niveau === "non_conforme" && q.poids === 3) entry.bloq += 1;
    }
    parTheme.set(q.theme, entry);
  }

  const scoreGlobal = pointsPossibles > 0 ? Math.round((pointsObtenus / pointsPossibles) * 100) : 0;

  const themes: ScoreTheme[] = THEMES.filter((t) => parTheme.has(t.id)).map((t) => {
    const e = parTheme.get(t.id)!;
    return {
      themeId: t.id,
      titre: t.titre,
      score: e.possibles > 0 ? Math.round((e.obtenus / e.possibles) * 100) : 0,
      repondues: e.rep,
      total: e.total,
      bloquants: e.bloq,
    };
  });

  const bloquants = questions.filter((q) => q.poids === 3 && reponses[q.id] === "non_conforme");
  const aRenforcer = questions.filter(
    (q) => reponses[q.id] === "partiel" || (q.poids === 2 && reponses[q.id] === "non_conforme"),
  );

  return {
    scoreGlobal,
    themes,
    bloquants,
    aRenforcer,
    verdict: verdictPour(scoreGlobal, bloquants.length),
    couverture: questions.length > 0 ? Math.round((repondues / questions.length) * 100) : 0,
  };
}

/**
 * Le verdict est dicté en priorité par le nombre de points bloquants, pas par
 * le score : trois écarts majeurs suffisent à faire recaler un dossier même
 * avec une moyenne flatteuse.
 */
function verdictPour(score: number, nbBloquants: number): Verdict {
  if (nbBloquants >= 3 || score < 40) {
    return {
      niveau: "critique",
      titre: "Dossier non présentable en l'état",
      message:
        "Plusieurs exigences considérées comme éliminatoires par les donneurs d'ordre ne sont pas satisfaites. Envoyer le questionnaire tel quel expose à un refus de référencement ou à un plan de mise en conformité imposé sous contrainte de délai. La bonne nouvelle : les écarts majeurs se corrigent presque toujours en quelques jours et à coût quasi nul.",
    };
  }
  if (nbBloquants >= 1 || score < 65) {
    return {
      niveau: "fragile",
      titre: "Dossier recevable mais exposé",
      message:
        "Le socle existe, mais il reste au moins un écart majeur qui sera relevé par un évaluateur attentif. À ce niveau, le dossier passe chez les clients peu exigeants et bloque chez les grands comptes. Traiter les points majeurs avant l'envoi change le résultat.",
    };
  }
  if (score < 85) {
    return {
      niveau: "acceptable",
      titre: "Dossier solide, perfectible sur la preuve",
      message:
        "Les mesures essentielles sont en place. Ce qui manque relève surtout de la formalisation : ce sont les preuves écrites et datées, plus que les mesures techniques, qui font la différence sur un questionnaire fournisseur.",
    };
  }
  return {
    niveau: "solide",
    titre: "Dossier différenciant",
    message:
      "Votre niveau est supérieur à celui de la majorité des PME évaluées sur ces mêmes critères. C'est un argument commercial à faire valoir activement : formalisez-le en dossier réutilisable et mettez-le en avant dès la réponse aux appels d'offres, au lieu d'attendre qu'on vous le demande.",
  };
}

export interface ActionPlan {
  question: Question;
  priorite: 1 | 2 | 3;
  jours: number;
}

const ORDRE_EFFORT = (effort: string): number => {
  const m = effort.match(/([\d.]+)\s*(h|j)/);
  if (!m) return 5;
  const n = parseFloat(m[1].replace(",", "."));
  return m[2] === "h" ? n / 8 : n;
};

/**
 * Plan d'action trié pour être actionnable : d'abord ce qui débloque
 * (poids 3), et à poids égal ce qui coûte le moins d'effort, pour
 * accumuler des victoires rapides plutôt que de s'enliser.
 */
export function planDAction(questions: Question[], reponses: Reponses): ActionPlan[] {
  return questions
    .filter((q) => {
      const n = reponses[q.id];
      return n === "non_conforme" || n === "partiel";
    })
    .map((q) => ({
      question: q,
      priorite: (reponses[q.id] === "non_conforme" ? q.poids : Math.max(1, q.poids - 1)) as 1 | 2 | 3,
      jours: ORDRE_EFFORT(q.remediation.effort),
    }))
    .sort((a, b) => b.priorite - a.priorite || a.jours - b.jours);
}

export const LIBELLE_NIVEAU: Record<Niveau, string> = {
  conforme: "En place et documenté",
  partiel: "Partiellement en place",
  non_conforme: "Pas en place",
  non_applicable: "Sans objet",
};
