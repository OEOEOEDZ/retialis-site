/**
 * Constantes du site. Source unique : un prix, une promesse ou un délai ne doit
 * jamais être écrit en dur dans une page.
 *
 * Règles de rédaction appliquées partout :
 *   1. « nous », jamais « je »
 *   2. aucun nom de personne affiché
 *   3. aucun tiret long à l'intérieur d'une phrase
 *
 * ⚠️ Les valeurs marquées à compléter sont des emplacements réservés.
 */

export const SITE = {
  nom: "Retialis",
  baseline: "Le questionnaire de votre client, rempli et prouvé.",
  promesse: "Rempli. Prouvé. Renvoyé.",
  ville: "Vitry-sur-Seine",
  region: "Île-de-France",
  // À compléter avant mise en ligne
  email: "contact@retialis.eu",
  telephone: "00 00 00 00 00",
  siret: "à compléter",
  domaine: "retialis.eu",
} as const;

/**
 * Prise de rendez-vous.
 *
 * `url` reçoit le lien de la « plage de rendez-vous » créée dans Google
 * Agenda. Tant qu'il est vide, la page /rendez-vous bascule automatiquement
 * sur la prise de contact par e-mail : aucun lien mort ne s'affiche.
 *
 * Pour l'obtenir : Google Agenda → Créer → Plage de rendez-vous → régler la
 * durée et les disponibilités → activer « Ajouter une visioconférence Google
 * Meet » → Ouvrir la page de réservation → copier l'adresse.
 */
export const RDV = {
  url: "",
  duree: "30 minutes",
  outil: "Google Meet",
} as const;

export const OFFRE = {
  prixDossier: 1490,
  prixMaintien: 149,
  delaiJours: 10,
  dureeAtelier: "2 heures",
  delaiReponseGratuite: "24 heures",
} as const;

export const euro = (n: number) => n.toLocaleString("fr-FR") + " €";

/**
 * Le comparatif. Chaque ligne s'appuie sur un prix relevé publiquement en
 * septembre 2026 ; le détail sourcé est dans content/concurrence.md.
 * Ne jamais modifier un chiffre ici sans mettre à jour ce document.
 */
export const ALTERNATIVES = [
  {
    quoi: "Un scan de sécurité en ligne",
    cout: "0 à 9 € par mois",
    obtient: "Une note et cinq recommandations",
    probleme: "Ne remplit rien. Le lendemain, vous êtes au même point.",
  },
  {
    quoi: "Un cabinet de conseil",
    cout: "15 000 à 40 000 €",
    obtient: "Une mission sur mesure de 3 à 6 semaines",
    probleme: "Hors budget, et plus long que le délai que votre client vous laisse.",
  },
  {
    quoi: "Un audit flash",
    cout: "800 à 2 000 €",
    obtient: "Un rapport de constats et de recommandations",
    probleme: "Vous devrez encore traduire ce rapport en réponses, seul.",
  },
  {
    quoi: "Une plateforme de conformité",
    cout: "50 à 500 € par mois",
    obtient: "Un outil d'auto-évaluation",
    probleme: "C'est vous qui faites le travail. Le problème était justement de ne pas savoir le faire.",
  },
  {
    quoi: "Votre prestataire informatique",
    cout: "Inclus, quand il peut",
    obtient: "La partie technique, souvent bien faite",
    probleme: "La moitié du questionnaire est organisationnelle. Ce n'est ni son métier ni son mandat.",
  },
  {
    quoi: "Retialis",
    cout: "1 490 € affichés",
    obtient: "Le questionnaire rempli, argumenté, avec ses preuves",
    probleme: "Aucun, sauf si vous cherchiez un logiciel. Nous n'en vendons pas.",
    nous: true,
  },
] as const;

/**
 * Engagements sur les données. Chaque ligne doit rester VÉRIFIABLE.
 *
 * ⚠️ L'engagement d'hébergement n'est tenu que si le site et la messagerie
 * tournent réellement chez un prestataire européen. Tant que le déploiement
 * est sur Vercel (société américaine, soumise au CLOUD Act), cette ligne est
 * fausse. Voir la section « Souveraineté » du CLAUDE.md.
 */
/**
 * ⚠️ INTERRUPTEUR DE VÉRITÉ.
 *
 * Tant que `souverain` vaut false, l'engagement d'hébergement n'est PAS affiché
 * sur le site et les mentions légales nomment l'hébergeur réel. Le site ne peut
 * donc pas prétendre à une souveraineté qu'il n'a pas.
 *
 * Passer à true UNIQUEMENT le jour où le déploiement tourne réellement chez un
 * prestataire européen. Vercel est une société américaine soumise au CLOUD Act :
 * avec Vercel, cette valeur doit rester false.
 */
export const HEBERGEUR = {
  souverain: false,
  nom: "Vercel Inc.",
  pays: "États-Unis",
  ville: "Walnut, Californie",
  // À utiliser une fois la migration faite
  cible: { nom: "OVHcloud", pays: "France", ville: "Roubaix" },
} as const;

export const ENGAGEMENTS = [
  {
    titre: "Ce site ne collecte rien",
    texte:
      "Aucun formulaire n'envoie quoi que ce soit à un serveur. Aucun cookie, aucun traceur, aucune mesure d'audience. Le formulaire prépare simplement un e-mail dans votre messagerie : vous décidez de l'envoyer ou non.",
    verifiable: "Ouvrez les outils de développement de votre navigateur, onglet Réseau. Vous ne verrez aucun appel sortant.",
  },
  {
    titre: "Votre questionnaire ne part nulle part ailleurs",
    texte:
      "Le fichier que vous nous envoyez sert uniquement à produire votre analyse. Il n'est jamais déposé sur un service tiers, jamais soumis à un outil d'intelligence artificielle grand public, jamais transmis à un sous-traitant.",
    verifiable: "C'est écrit dans nos conditions, et nous signons un engagement de confidentialité avant l'envoi si vous le demandez.",
  },
  {
    titre: "Hébergement et messagerie en France",
    texte:
      "Le site et les échanges sont hébergés en France, chez un prestataire de droit français. Aucune donnée ne transite par une infrastructure soumise à une législation extraterritoriale.",
    verifiable: "L'hébergeur est nommé dans nos mentions légales, vous pouvez le vérifier.",
    exigeSouverainete: true,
  },
  {
    titre: "Effacement sur simple demande",
    texte:
      "Votre fichier et son analyse sont supprimés dès que vous le demandez, sans justification à fournir, et de toute façon à la fin de la mission si vous le souhaitez.",
    verifiable: "Un e-mail suffit. Nous confirmons la suppression par écrit.",
  },
] as const;

/** Les objections réelles, dans l'ordre où elles arrivent en rendez-vous. */
export const FAQ = [
  {
    q: "J'ai trouvé un outil qui fait un diagnostic à 9 € par mois. Pourquoi 1 490 € ?",
    r: "Parce que ce n'est pas le même travail, et ces outils sont très bien pour ce qu'ils font. Essayez-les, c'est gratuit. Un scan vous donne une note et cinq recommandations. Il ne lit pas le questionnaire de votre client, ne rédige pas vos procédures, ne rassemble pas vos preuves et ne remplit aucune case. Le jour où vous devez renvoyer le fichier, vous êtes au même point. Nous, nous vous rendons le fichier rempli.",
  },
  {
    q: "L'ANSSI propose MonAideCyber gratuitement. Pourquoi payer ?",
    r: "Faites-le, sincèrement. C'est un excellent diagnostic d'une heure et demie, gratuit, et nous vous y encourageons. Mais il vous donne des recommandations d'amélioration. Il ne remplit pas le questionnaire de votre client, ne rédige pas vos procédures et ne produit pas le dossier de preuves qu'on vous réclame. C'est complémentaire, pas concurrent.",
  },
  {
    q: "On a déjà un prestataire informatique. Il ne peut pas le faire ?",
    r: "Sur la partie technique, si, et mieux que nous sur son périmètre. Mais la moitié du questionnaire est organisationnelle : politique validée par la direction, procédure d'arrivée et de départ, analyse de risques, clauses dans vos contrats de sous-traitance, registre de vos propres sous-traitants. Ce n'est ni son métier ni son mandat. En pratique, nous travaillons avec lui, pas à sa place.",
  },
  {
    q: "Est-ce qu'on peut se contenter de cocher « oui » partout ?",
    r: "Non, et c'est le meilleur moyen de perdre le client. Les évaluateurs demandent les preuves sur les points sensibles, et certaines réponses se vérifient publiquement en trente secondes. La configuration anti-usurpation de votre domaine, par exemple, ou les services que vous exposez sur Internet. Une déclaration fausse découverte en audit est bien plus grave qu'un écart assumé accompagné d'un plan d'action daté.",
  },
  {
    q: "Et si on est vraiment très en retard ?",
    r: "C'est le cas le plus fréquent, et ce n'est pas bloquant. Un écart déclaré, avec une échéance et un responsable, se défend très bien. Ce qui ne se défend pas, c'est l'absence de réponse ou une réponse évasive. La plupart des écarts majeurs se corrigent en quelques jours et à coût quasi nul.",
  },
  {
    q: "Vous êtes agréés par l'ANSSI ?",
    r: "Non, et personne ne l'est pour ce type de prestation : il n'existe pas d'agrément ANSSI pour la réponse aux questionnaires fournisseurs. Nous nous appuyons sur les référentiels publics, l'article 21 de la directive NIS2, le ReCyF, les guides d'hygiène de l'ANSSI et la méthode EBIOS Risk Manager. Et nous vous disons toujours ce qui relève du texte et ce qui relève de notre interprétation.",
  },
  {
    q: "Vous avez des références ?",
    r: "Pas encore de référence publique, et nous préférons le dire que de l'inventer. C'est précisément pour ça que l'analyse de votre questionnaire est gratuite et sans engagement. Jugez la qualité du travail avant de payer quoi que ce soit. Si nous vous convenons, nous vous demanderons en retour l'autorisation de vous citer.",
  },
] as const;
