/**
 * RÉFÉRENTIEL RETIALIS v1
 * ------------------------
 * Base de connaissance qui permet à une PME sous-traitante de répondre au
 * questionnaire de sécurité envoyé par un donneur d'ordre soumis à NIS2.
 *
 * Chaque item est ancré sur les 10 mesures de l'article 21(2) de la directive
 * NIS2 (UE) 2022/2555, référence stable et vérifiable. L'alignement fin avec
 * le ReCyF de l'ANSSI (v2.5 du 17/03/2026, 20 objectifs de sécurité) est indiqué
 * par thème ; les identifiants exacts d'objectifs ReCyF sont à recaler sur la
 * version publiée avant tout usage contractuel.
 */

export type Niveau = "conforme" | "partiel" | "non_conforme" | "non_applicable";

/** Mesures de l'article 21(2) NIS2, telles que rédigées dans la directive. */
export const NIS2_MESURES = {
  a: "Politiques d'analyse des risques et de sécurité des systèmes d'information",
  b: "Gestion des incidents",
  c: "Continuité d'activité : sauvegardes, reprise après sinistre, gestion de crise",
  d: "Sécurité de la chaîne d'approvisionnement",
  e: "Sécurité de l'acquisition, du développement et de la maintenance, y compris la gestion des vulnérabilités",
  f: "Politiques d'évaluation de l'efficacité des mesures de gestion des risques",
  g: "Pratiques d'hygiène informatique de base et formation à la cybersécurité",
  h: "Politiques relatives à l'usage de la cryptographie et du chiffrement",
  i: "Sécurité des ressources humaines, contrôle d'accès et gestion des actifs",
  j: "Authentification multifacteur et communications sécurisées",
} as const;

export type MesureNis2 = keyof typeof NIS2_MESURES;

export interface Theme {
  id: string;
  titre: string;
  /** Ce que le donneur d'ordre cherche vraiment à savoir dans ce bloc. */
  intention: string;
}

export const THEMES: Theme[] = [
  {
    id: "gouvernance",
    titre: "Gouvernance & organisation",
    intention:
      "Vérifier qu'il existe un responsable identifié et joignable, et que la sécurité n'est pas laissée au hasard ou au prestataire informatique seul.",
  },
  {
    id: "acces",
    titre: "Identités & contrôle d'accès",
    intention:
      "C'est le bloc le plus discriminant : un accès mal fermé chez vous devient une porte d'entrée chez votre client.",
  },
  {
    id: "sauvegardes",
    titre: "Sauvegardes & continuité",
    intention:
      "Mesurer en combien de temps vous repartez après un rançongiciel, donc combien de temps votre client est privé de vos livraisons.",
  },
  {
    id: "postes",
    titre: "Postes de travail & serveurs",
    intention:
      "Savoir si une compromission d'un poste serait détectée, et si un ordinateur volé exposerait les données du client.",
  },
  {
    id: "vulnerabilites",
    titre: "Mises à jour & vulnérabilités",
    intention:
      "Identifier les systèmes obsolètes ou non corrigés, première cause d'intrusion réelle constatée.",
  },
  {
    id: "reseau",
    titre: "Réseau & accès distants",
    intention:
      "Contrôler votre surface d'exposition sur Internet et la façon dont vos équipes et prestataires entrent dans votre réseau.",
  },
  {
    id: "messagerie",
    titre: "Messagerie & sensibilisation",
    intention:
      "La messagerie est le vecteur n°1. Le client veut savoir si un faux ordre de virement ou un faux e-mail à son nom est possible depuis chez vous.",
  },
  {
    id: "incidents",
    titre: "Gestion des incidents & journalisation",
    intention:
      "Le donneur d'ordre a une obligation de notification en 24 h / 72 h. Il a besoin que vous l'alertiez assez vite pour qu'il tienne ce délai.",
  },
  {
    id: "fournisseurs",
    titre: "Sous-traitants & chaîne d'approvisionnement",
    intention:
      "Vérifier que la chaîne ne se casse pas au maillon suivant : vos propres prestataires deviennent un risque pour votre client.",
  },
  {
    id: "donnees",
    titre: "Données, RGPD & confidentialité",
    intention:
      "Savoir où vivent les données confiées (plans, tarifs, données personnelles), qui peut y accéder et sous quelle juridiction.",
  },
];

export interface Remediation {
  action: string;
  effort: string;
  cout: string;
  /** Ce qu'on peut écrire au client pendant que la mesure est en cours. */
  formulationInterim?: string;
}

export interface Question {
  id: string;
  theme: string;
  /** Formulation proche de celle des questionnaires réels des donneurs d'ordre. */
  question: string;
  /** Traduction en français courant pour un dirigeant non technique. */
  clair: string;
  /** Pourquoi le client pose cette question, sert d'argumentaire de vente. */
  enjeu: string;
  nis2: MesureNis2[];
  /** 3 = souvent éliminatoire, 2 = fortement regardé, 1 = complément. */
  poids: 1 | 2 | 3;
  /** Document à joindre au dossier ; c'est ce qui transforme une affirmation en preuve. */
  preuve: string;
  /** Réponse modèle à recopier lorsque la mesure est en place. */
  reponseType: string;
  remediation: Remediation;
}
