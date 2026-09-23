import type { Question } from "./referentiel";

export interface Secteur {
  id: string;
  titre: string;
  /** Position de l'entreprise vis-à-vis de NIS2, argument d'accroche commercial. */
  positionNis2: string;
  /** Qui envoie les questionnaires dans ce secteur. */
  donneursDOrdre: string;
  /** Le déclencheur d'achat concret. */
  declencheur: string;
}

export const SECTEURS: Secteur[] = [
  {
    id: "it",
    titre: "IT / ESN / infogérance / éditeurs",
    positionNis2:
      "Souvent concerné DIRECTEMENT et pas seulement par ricochet : les fournisseurs de services informatiques gérés et de services de sécurité gérés figurent parmi les entités visées par NIS2 dès 10 salariés ou 2 M€ de chiffre d'affaires. Un prestataire informatique peut donc être lui-même entité importante, tout en recevant les questionnaires de tous ses clients.",
    donneursDOrdre:
      "Tous les clients à la fois : industriels, collectivités, santé, banque. Un infogéreur de 25 personnes peut recevoir 15 à 40 questionnaires par an.",
    declencheur:
      "Un appel d'offres perdu ou bloqué faute de dossier sécurité, ou un client grand compte qui exige une attestation avant renouvellement.",
  },
  {
    id: "btp",
    titre: "BTP / construction / ingénierie",
    positionNis2:
      "Rarement concerné directement, mais massivement par ricochet : les maîtres d'ouvrage publics, hôpitaux, opérateurs d'énergie, de transport et d'eau sont des entités essentielles qui doivent sécuriser leur chaîne d'approvisionnement. La clause cyber entre dans les marchés et dans les contrats de sous-traitance.",
    donneursDOrdre:
      "Majors du BTP, bailleurs sociaux, collectivités, CHU et GHT, opérateurs d'infrastructures, industriels donneurs d'ordre.",
    declencheur:
      "Un questionnaire reçu avec un dossier de consultation, ou une clause cyber ajoutée au contrat-cadre lors du renouvellement.",
  },
  {
    id: "conseil",
    titre: "Conseil / ingénierie / bureaux d'études",
    positionNis2:
      "Concerné par ricochet, mais avec un niveau d'exigence élevé car vous détenez de l'information stratégique : études, chiffrages, données financières, données personnelles de salariés du client.",
    donneursDOrdre:
      "Grands comptes, groupes industriels, secteur public, établissements financiers. L'exigence vient souvent des achats ou de la direction des risques.",
    declencheur:
      "Un référencement fournisseur à renouveler, ou l'entrée sur un compte grand groupe qui impose une évaluation tierce avant le premier bon de commande.",
  },
  {
    id: "autre",
    titre: "Autre secteur",
    positionNis2:
      "Concerné par ricochet dès lors que vous fournissez une entité essentielle ou importante au sens de NIS2 : industrie, agroalimentaire, transport, santé, énergie, eau, déchets, services postaux, espace, administration publique.",
    donneursDOrdre: "Tout client lui-même soumis à NIS2 dans les 18 secteurs couverts.",
    declencheur: "Un questionnaire de sécurité reçu d'un client, avec une date de retour.",
  },
];

/**
 * Questions additionnelles propres à chaque secteur.
 * Elles s'ajoutent au socle commun et sont celles qui font la différence
 * face à un évaluateur qui connaît le métier.
 */
export const QUESTIONS_SECTEUR: Record<string, Question[]> = {
  // ================================================================= IT / ESN
  it: [
    {
      id: "it-01",
      theme: "acces",
      question:
        "Comment cloisonnez-vous les accès à vos différents clients ? Un de vos administrateurs peut-il accéder aux systèmes de plusieurs clients avec le même compte ?",
      clair: "Vos techniciens ont-ils un compte différent pour chaque client ?",
      enjeu:
        "C'est LA question qui décide d'un contrat d'infogérance. Un compte unique donnant accès à plusieurs clients signifie qu'une compromission chez vous contamine tout votre portefeuille, le scénario de l'attaque en chaîne que NIS2 vise explicitement.",
      nis2: ["d", "i", "j"],
      poids: 3,
      preuve:
        "Schéma du modèle d'administration montrant le cloisonnement par client + politique de comptes d'administration.",
      reponseType:
        "Les accès aux environnements de nos clients sont strictement cloisonnés : comptes nominatifs et distincts par client, absence de compte d'administration transverse, MFA obligatoire, et administration réalisée depuis des postes d'administration dédiés et durcis. Les accès sont accordés au juste besoin, limités dans le temps et intégralement journalisés.",
      remediation: {
        action:
          "Supprimer tout compte d'administration partagé entre clients, imposer des comptes nominatifs par environnement, et isoler l'administration sur un poste dédié. C'est l'investissement le plus rentable pour un infogéreur : il débloque les appels d'offres grands comptes.",
        effort: "3 à 5 j",
        cout: "0 à ~1 000 € (poste d'administration dédié)",
        formulationInterim:
          "Le cloisonnement nominatif par client est effectif sur [X] % de notre portefeuille ; la généralisation est planifiée pour le [date].",
      },
    },
    {
      id: "it-02",
      theme: "fournisseurs",
      question:
        "Êtes-vous vous-même une entité concernée par NIS2 ? Avez-vous procédé à votre enregistrement auprès de l'ANSSI ?",
      clair: "Êtes-vous directement soumis à la réglementation, et vous êtes-vous déclaré ?",
      enjeu:
        "Les prestataires de services informatiques gérés sont visés par NIS2. Un client averti pose la question. Répondre « nous ne sommes pas concernés » sans l'avoir vérifié est un signal très négatif, et potentiellement une infraction.",
      nis2: ["a"],
      poids: 3,
      preuve:
        "Analyse d'applicabilité NIS2 datée, et le cas échéant accusé d'enregistrement sur la plateforme MonEspaceNIS2 de l'ANSSI.",
      reponseType:
        "Nous avons conduit une analyse d'applicabilité de NIS2 à notre activité, formalisée le [date]. [Si concerné] Nous relevons de la catégorie « entité importante » au titre de nos activités de services informatiques gérés et avons procédé à notre enregistrement auprès de l'ANSSI le [date]. [Si non concerné] Nous ne franchissons pas les seuils d'assujettissement ; notre analyse est révisée annuellement et à chaque évolution significative de notre activité.",
      remediation: {
        action:
          "Vérifier les seuils (effectif, chiffre d'affaires) et la nature exacte des services rendus, formaliser l'analyse par écrit, et procéder à l'enregistrement sur la plateforme de l'ANSSI si vous êtes dans le périmètre.",
        effort: "0,5 j",
        cout: "0 €",
      },
    },
    {
      id: "it-03",
      theme: "vulnerabilites",
      question:
        "Si vous développez ou maintenez des logiciels, quelles pratiques de développement sécurisé appliquez-vous ?",
      clair: "Comment vous assurez-vous que le code que vous livrez n'introduit pas de failles ?",
      enjeu:
        "Mesure e) de NIS2. Avec le Cyber Resilience Act qui monte en charge, cette question devient centrale pour tout éditeur vendant en Europe.",
      nis2: ["e"],
      poids: 2,
      preuve:
        "Description du cycle de développement : revue de code, analyse des dépendances, gestion des secrets, tests de sécurité.",
      reponseType:
        "Notre cycle de développement intègre la revue de code obligatoire avant fusion, l'analyse automatisée des dépendances et des vulnérabilités connues, l'interdiction des secrets en clair dans le code, la séparation stricte des environnements de développement, de recette et de production, et des tests de sécurité avant mise en production. Les vulnérabilités signalées font l'objet d'un processus de traitement et de publication de correctifs.",
      remediation: {
        action:
          "Activer l'analyse automatique des dépendances et la détection de secrets sur vos dépôts (fonctions gratuites sur GitHub et GitLab), et rendre la revue de code obligatoire avant fusion.",
        effort: "1 j",
        cout: "0 €",
      },
    },
    {
      id: "it-04",
      theme: "sauvegardes",
      question:
        "Pour les sauvegardes que vous réalisez pour le compte de vos clients : où sont-elles stockées, sont-elles immuables, et leur restauration est-elle testée client par client ?",
      clair: "Les sauvegardes de vos clients sont-elles vraiment restaurables, et l'avez-vous vérifié pour chacun ?",
      enjeu:
        "Le client vous confie sa survie. Un test global ne suffit pas : l'évaluateur attend une preuve de test sur SON périmètre.",
      nis2: ["c", "d"],
      poids: 3,
      preuve: "Calendrier des tests de restauration par client + dernier compte rendu daté pour le client concerné.",
      reponseType:
        "Les sauvegardes de nos clients sont cloisonnées par client, stockées sur une infrastructure distincte de l'environnement de production, avec au moins une copie immuable non altérable par un rançongiciel. Un test de restauration est réalisé au minimum semestriellement pour chaque client, avec compte rendu daté et communicable. Dernier test sur votre périmètre : [date], durée de restauration [X].",
      remediation: {
        action:
          "Mettre en place un calendrier tournant de tests de restauration couvrant tous les clients sur six mois, et produire un compte rendu par client. Livrable directement valorisable commercialement.",
        effort: "2 j de mise en place, puis 2 h par client",
        cout: "0 €",
      },
    },
  ],

  // ======================================================================= BTP
  btp: [
    {
      id: "btp-01",
      theme: "donnees",
      question:
        "Comment protégez-vous les plans, maquettes numériques et documents d'exécution que nous vous transmettons, y compris sur les terminaux mobiles utilisés sur chantier ?",
      clair: "Les plans du projet sont-ils protégés, y compris sur les tablettes et téléphones du chantier ?",
      enjeu:
        "Les plans d'un hôpital, d'un site industriel ou d'un bâtiment public sont des informations sensibles. Le client craint la fuite via une tablette de chantier perdue ou un partage WhatsApp.",
      nis2: ["h", "i"],
      poids: 3,
      preuve:
        "Politique de gestion des terminaux mobiles + preuve de chiffrement et d'effacement à distance sur le parc mobile.",
      reponseType:
        "Les documents de projet sont hébergés sur une plateforme collaborative authentifiée, avec droits par lot et par intervenant, et non diffusés par messagerie personnelle ou messagerie instantanée grand public. Les terminaux mobiles utilisés sur chantier sont enrôlés dans une solution de gestion de flotte, chiffrés, protégés par code, et effaçables à distance en cas de perte ou de vol.",
      remediation: {
        action:
          "Interdire par écrit le partage de plans via messageries personnelles, enrôler les tablettes de chantier dans Microsoft Intune ou Google Endpoint Management, activer le chiffrement et l'effacement à distance.",
        effort: "2 j",
        cout: "~2 à 6 €/appareil/mois",
      },
    },
    {
      id: "btp-02",
      theme: "fournisseurs",
      question:
        "Répercutez-vous les exigences de sécurité sur vos sous-traitants de rang 2 et 3, et sur vos intérimaires ?",
      clair:
        "Vos propres sous-traitants et les intérimaires sont-ils soumis aux mêmes règles que vous ?",
      enjeu:
        "Le BTP fonctionne en cascade sur trois ou quatre rangs. Le donneur d'ordre sait que le maillon faible est en bas de chaîne et veut la preuve que l'exigence descend.",
      nis2: ["d", "i"],
      poids: 3,
      preuve:
        "Clause cyber type dans les contrats de sous-traitance + procédure d'accès pour intérimaires et sous-traitants.",
      reponseType:
        "Oui. Nos contrats de sous-traitance intègrent des clauses de confidentialité, de sécurité et de notification d'incident, répercutées à chaque rang. Les intérimaires et personnels de sous-traitants disposent de comptes nominatifs, à durée limitée alignée sur la durée de mission, révoqués automatiquement à son terme, et sont sensibilisés à l'accueil sécurité au même titre que nos salariés.",
      remediation: {
        action:
          "Ajouter une clause cyber d'une page aux contrats de sous-traitance et lier la date d'expiration des comptes à la date de fin de mission déclarée aux RH.",
        effort: "0,5 j",
        cout: "0 €",
      },
    },
    {
      id: "btp-03",
      theme: "reseau",
      question:
        "Les équipements connectés de chantier et les systèmes techniques (automates, GTB, télésurveillance, bases vie) sont-ils isolés de votre réseau bureautique ?",
      clair:
        "Les caméras, automates et équipements connectés du chantier sont-ils sur un réseau séparé ?",
      enjeu:
        "Ces équipements sont rarement mis à jour et souvent livrés avec un mot de passe par défaut. S'ils sont sur le même réseau que la comptabilité, ils deviennent un point d'entrée.",
      nis2: ["a", "e"],
      poids: 2,
      preuve: "Schéma réseau montrant la séparation des systèmes techniques et de la bureautique.",
      reponseType:
        "Les systèmes techniques et équipements connectés sont placés sur des segments réseau dédiés, sans accès direct à Internet ni au réseau bureautique. Les mots de passe par défaut sont systématiquement modifiés à l'installation et recensés en coffre-fort. Les accès de télémaintenance des constructeurs sont nominatifs, ouverts à la demande et journalisés.",
      remediation: {
        action:
          "Recenser les équipements connectés, changer les mots de passe par défaut (cause de la majorité des compromissions de ce type), et les basculer sur un VLAN dédié.",
        effort: "1 à 2 j",
        cout: "0 €",
      },
    },
    {
      id: "btp-04",
      theme: "messagerie",
      question:
        "Quelles mesures appliquez-vous contre la fraude aux situations de travaux et aux changements de coordonnées bancaires ?",
      clair:
        "Comment évitez-vous de payer une fausse facture ou un faux RIB de sous-traitant ?",
      enjeu:
        "Le BTP est l'un des secteurs les plus touchés par la fraude au faux fournisseur : montants élevés, nombreux intervenants, échanges par e-mail. Le donneur d'ordre veut être certain que sa chaîne de paiement n'est pas détournée.",
      nis2: ["b", "g"],
      poids: 3,
      preuve:
        "Procédure de validation des coordonnées bancaires et des situations de travaux, avec seuils de double validation.",
      reponseType:
        "Tout changement de coordonnées bancaires fait l'objet d'un rappel téléphonique sur un numéro préalablement enregistré au contrat, jamais sur celui figurant dans la demande. Les situations de travaux et factures au-delà de [montant] € requièrent une double validation. Les équipes comptables et travaux sont spécifiquement sensibilisées à ce risque.",
      remediation: {
        action:
          "Formaliser la procédure sur une page, la faire signer par la comptabilité et les conducteurs de travaux, et enregistrer au contrat les numéros de rappel de chaque sous-traitant.",
        effort: "3 h",
        cout: "0 €",
      },
    },
  ],

  // =================================================================== CONSEIL
  conseil: [
    {
      id: "cons-01",
      theme: "donnees",
      question:
        "Comment garantissez-vous le cloisonnement des informations entre vos différentes missions et vos différents clients, notamment lorsqu'ils sont concurrents ?",
      clair:
        "Vos consultants qui travaillent pour un concurrent de votre client peuvent-ils voir ses documents ?",
      enjeu:
        "C'est la question décisive du conseil. Le client redoute que ses données stratégiques soient visibles par une équipe travaillant pour son concurrent. Une réponse faible sur ce point fait perdre la mission, quel que soit le reste du questionnaire.",
      nis2: ["i", "d"],
      poids: 3,
      preuve:
        "Politique de cloisonnement par mission + capture de la structure des droits montrant l'étanchéité entre espaces clients.",
      reponseType:
        "Chaque mission dispose d'un espace de travail cloisonné, accessible uniquement aux consultants qui lui sont affectés, selon le principe du besoin d'en connaître. Les droits sont ouverts à l'affectation et révoqués à la clôture de la mission. Des procédures de gestion des conflits d'intérêts et des murailles de Chine sont appliquées lorsque des clients sont en situation de concurrence. Les accès sont journalisés et auditables.",
      remediation: {
        action:
          "Créer un espace cloisonné par mission plutôt qu'un lecteur partagé commun, associer les droits à l'affectation, et poser une revue à chaque clôture de mission.",
        effort: "2 j",
        cout: "0 €",
      },
    },
    {
      id: "cons-02",
      theme: "postes",
      question:
        "Vos consultants utilisent-ils des équipements personnels (BYOD) pour accéder aux données de nos missions ? Si oui, comment sont-ils encadrés ?",
      clair:
        "Vos consultants travaillent-ils parfois sur leur ordinateur personnel avec les documents du client ?",
      enjeu:
        "Le recours aux indépendants et aux équipements personnels est structurel dans le conseil. Non encadré, c'est un écart majeur : le client perd toute maîtrise de la localisation de ses données.",
      nis2: ["i", "h"],
      poids: 3,
      preuve:
        "Politique BYOD + preuve de séparation des données professionnelles sur les appareils personnels.",
      reponseType:
        "Les missions sont réalisées sur des équipements fournis et administrés par nos soins, chiffrés et supervisés. Lorsqu'un équipement personnel est exceptionnellement utilisé, il est encadré par une politique dédiée imposant un conteneur professionnel séparé, le chiffrement, l'interdiction de stockage local des documents client et l'effacement à distance des données professionnelles.",
      remediation: {
        action:
          "Soit fournir le matériel, soit imposer un accès en bureau virtuel sans stockage local. Écrire la politique BYOD et la faire signer à chaque consultant et indépendant.",
        effort: "1 à 3 j selon l'option retenue",
        cout: "0 € (politique) à ~25 €/utilisateur/mois (bureau virtuel)",
      },
    },
    {
      id: "cons-03",
      theme: "fournisseurs",
      question:
        "Faites-vous appel à des consultants indépendants ou à de la sous-traitance sur nos missions ? Sont-ils soumis aux mêmes exigences que vos salariés ?",
      clair: "Des freelances travaillent-ils sur le dossier du client, et sont-ils encadrés ?",
      enjeu:
        "Le client veut savoir qui accède réellement à ses données. Une sous-traitance non déclarée découverte en cours de mission est un motif fréquent de rupture.",
      nis2: ["d", "i"],
      poids: 3,
      preuve:
        "Registre des intervenants par mission + modèle de contrat indépendant incluant les clauses de sécurité et de confidentialité.",
      reponseType:
        "Le recours à des intervenants externes est soumis à votre information préalable. Ces intervenants signent un engagement de confidentialité et des clauses de sécurité identiques à celles applicables à nos salariés, travaillent sur nos environnements administrés, disposent de comptes nominatifs à durée limitée et sont sensibilisés préalablement à toute intervention. Un registre des intervenants par mission est tenu à jour et communicable.",
      remediation: {
        action:
          "Créer un contrat-cadre indépendant intégrant confidentialité, sécurité, interdiction de re-sous-traitance et restitution des données, et tenir le registre des intervenants par mission.",
        effort: "0,5 j",
        cout: "0 €",
      },
    },
    {
      id: "cons-04",
      theme: "donnees",
      question:
        "Utilisez-vous des services d'intelligence artificielle générative dans le cadre de nos missions ? Si oui, quelles garanties sur la confidentialité de nos données ?",
      clair:
        "Vos consultants mettent-ils les documents du client dans ChatGPT ou un outil équivalent ?",
      enjeu:
        "Question apparue récemment et désormais présente dans la majorité des questionnaires du conseil. L'absence de politique écrite est de plus en plus relevée comme un écart, car elle signifie que la donnée du client peut partir vers un tiers non validé.",
      nis2: ["d", "h", "g"],
      poids: 2,
      preuve:
        "Charte d'usage de l'IA générative signée par les collaborateurs + liste des outils autorisés et de leur mode d'hébergement.",
      reponseType:
        "L'usage de l'IA générative est encadré par une charte interne. Seuls des services validés, souscrits en version professionnelle excluant contractuellement la réutilisation des données pour l'entraînement des modèles, sont autorisés. La saisie de données confidentielles client, de données personnelles ou d'éléments couverts par le secret des affaires dans un service grand public est interdite. Les collaborateurs sont formés à cette règle et la charte est signée.",
      remediation: {
        action:
          "Écrire une charte d'une page : outils autorisés, catégories de données interdites, règle d'anonymisation préalable. La faire signer. Mesure à coût nul qui rassure fortement les directions des risques.",
        effort: "3 h",
        cout: "0 €",
      },
    },
  ],

  autre: [],
};
