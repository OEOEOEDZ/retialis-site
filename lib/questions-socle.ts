import type { Question } from "./referentiel";

/**
 * SOCLE COMMUN, questions posées à toute PME sous-traitante,
 * quel que soit son secteur. Couvre les 10 mesures de l'article 21(2) NIS2.
 */
export const QUESTIONS_SOCLE: Question[] = [
  // ---------------------------------------------------------------- GOUVERNANCE
  {
    id: "gov-01",
    theme: "gouvernance",
    question:
      "Avez-vous désigné une personne responsable de la sécurité des systèmes d'information, et pouvez-vous fournir son nom et ses coordonnées ?",
    clair: "Qui, chez vous, est officiellement en charge de l'informatique et de la sécurité ?",
    enjeu:
      "Sans nom, le donneur d'ordre n'a personne à appeler à 22 h un vendredi. C'est la première question de tous les questionnaires et une absence de réponse décrédibilise tout le reste.",
    nis2: ["a", "i"],
    poids: 3,
    preuve:
      "Lettre de désignation signée par la direction (1 page) mentionnant nom, fonction, e-mail et téléphone direct.",
    reponseType:
      "Oui. M./Mme [Nom], [fonction], est désigné(e) responsable de la sécurité des systèmes d'information par décision de la direction du [date]. Contact : [e-mail] / [téléphone]. Un suppléant est désigné en son absence : [Nom].",
    remediation: {
      action:
        "Rédiger et faire signer une lettre de désignation. Le rôle peut être porté à temps partiel par le dirigeant, le responsable administratif ou le référent informatique, l'essentiel est qu'il soit nommé et joignable.",
      effort: "1 h",
      cout: "0 €",
      formulationInterim:
        "La désignation formelle est en cours de signature ; le point de contact opérationnel est d'ores et déjà [Nom] / [contact].",
    },
  },
  {
    id: "gov-02",
    theme: "gouvernance",
    question:
      "Disposez-vous d'une politique de sécurité des systèmes d'information formalisée et validée par la direction ?",
    clair: "Avez-vous un document écrit qui fixe les règles informatiques de l'entreprise ?",
    enjeu:
      "Le client doit démontrer à son propre auditeur que ses fournisseurs sont encadrés. Un document même court, daté et signé, suffit à cocher la case.",
    nis2: ["a"],
    poids: 2,
    preuve:
      "PSSI ou charte informatique datée, validée par la direction, avec date de dernière revue de moins de 24 mois.",
    reponseType:
      "Oui. Notre politique de sécurité des systèmes d'information a été validée par la direction le [date] et fait l'objet d'une revue annuelle. Dernière revue : [date]. Elle est diffusée à l'ensemble des collaborateurs et annexée au règlement intérieur.",
    remediation: {
      action:
        "Partir d'une trame de 6 à 8 pages couvrant : usage des équipements, mots de passe, messagerie, télétravail, incidents, sanctions. Faire valider en réunion de direction et annexer au règlement intérieur.",
      effort: "0,5 j",
      cout: "0 €",
    },
  },
  {
    id: "gov-03",
    theme: "gouvernance",
    question:
      "Une analyse de risques cyber a-t-elle été conduite sur votre système d'information, et à quelle date ?",
    clair: "Avez-vous déjà listé par écrit ce qui pourrait mal tourner et ce que ça coûterait ?",
    enjeu:
      "C'est la mesure a) de NIS2. Les grands donneurs d'ordre français attendent souvent une référence explicite à EBIOS Risk Manager, la méthode de l'ANSSI.",
    nis2: ["a", "f"],
    poids: 2,
    preuve:
      "Synthèse d'analyse de risques (2 à 4 pages) : actifs essentiels, scénarios redoutés, niveau de risque, décisions de traitement.",
    reponseType:
      "Oui. Une analyse de risques a été conduite le [date] selon une approche dérivée d'EBIOS Risk Manager (ANSSI), couvrant nos actifs essentiels et nos scénarios stratégiques. Elle est révisée annuellement et après tout changement majeur du SI. Une synthèse peut être communiquée sous accord de confidentialité.",
    remediation: {
      action:
        "Conduire un atelier de 3 h : lister les 5 actifs qui arrêteraient la production s'ils tombaient, les 4 scénarios les plus probables (rançongiciel, fraude au virement, vol de compte, défaillance prestataire), coter impact et vraisemblance, décider du traitement.",
      effort: "1 j",
      cout: "0 €",
      formulationInterim:
        "Une analyse de risques formalisée est planifiée pour le [date]. Les scénarios majeurs ont d'ores et déjà été identifiés et traités en priorité.",
    },
  },
  {
    id: "gov-04",
    theme: "gouvernance",
    question: "Disposez-vous d'une assurance couvrant le risque cyber, et quel en est le plafond ?",
    clair: "Êtes-vous assuré en cas de cyberattaque ?",
    enjeu:
      "Le donneur d'ordre évalue votre capacité à absorber un sinistre sans mettre la relation commerciale en péril, et sans se retourner contre lui.",
    nis2: ["c"],
    poids: 1,
    preuve:
      "Attestation d'assurance en cours de validité mentionnant la garantie cyber et le plafond.",
    reponseType:
      "Oui. Nous disposons d'une garantie cyber souscrite auprès de [assureur], police n° [réf.], plafond [montant] € par sinistre, incluant frais de reconstitution de données, pertes d'exploitation et assistance à la gestion de crise. Attestation jointe.",
    remediation: {
      action:
        "Demander un devis cyber à votre courtier actuel. Attention : la plupart des assureurs exigent désormais MFA et sauvegardes testées pour accepter le risque, traiter ces deux points d'abord fait baisser la prime.",
      effort: "2 h",
      cout: "à partir de ~1 000 €/an pour une PME",
    },
  },

  // ---------------------------------------------------------------------- ACCÈS
  {
    id: "acc-01",
    theme: "acces",
    question:
      "L'authentification multifacteur (MFA) est-elle déployée sur les accès distants, la messagerie et les comptes d'administration ?",
    clair:
      "Faut-il un deuxième code (téléphone, application) en plus du mot de passe pour accéder aux e-mails et aux accès à distance ?",
    enjeu:
      "C'est la mesure j), citée explicitement par NIS2, et la question la plus éliminatoire du questionnaire. Une réponse « non » entraîne fréquemment un plan d'action imposé sous 90 jours, voire la suspension de la relation.",
    nis2: ["j", "i"],
    poids: 3,
    preuve:
      "Capture d'écran de la politique d'accès conditionnel (Microsoft Entra, Google Workspace) ou de la configuration MFA du VPN, avec le taux de couverture des comptes.",
    reponseType:
      "Oui. L'authentification multifacteur est active sur 100 % des comptes de messagerie, sur les accès VPN et sur l'ensemble des comptes à privilèges. Elle est imposée par politique d'accès conditionnel et ne peut pas être désactivée par l'utilisateur.",
    remediation: {
      action:
        "Activer le MFA dans la console Microsoft 365 ou Google Workspace : commencer par les comptes administrateurs et la direction, puis généraliser par vagues de service. Prévoir des codes de secours et une procédure pour les collaborateurs sans smartphone professionnel.",
      effort: "1 à 2 j selon l'effectif",
      cout: "0 € (inclus dans Microsoft 365 et Google Workspace)",
      formulationInterim:
        "Le MFA est actif sur les comptes à privilèges et la direction. Le déploiement à l'ensemble des utilisateurs est planifié et sera achevé le [date].",
    },
  },
  {
    id: "acc-02",
    theme: "acces",
    question: "Comment les comptes à privilèges (administrateurs) sont-ils gérés, recensés et revus ?",
    clair: "Qui a les pleins pouvoirs sur votre informatique, et le vérifiez-vous régulièrement ?",
    enjeu:
      "Un compte administrateur oublié, souvent celui d'un ancien prestataire, est le scénario d'intrusion le plus banal. Le client veut la preuve d'une revue périodique.",
    nis2: ["i"],
    poids: 3,
    preuve:
      "Liste nominative des comptes à privilèges avec date de dernière revue (tableau daté et signé).",
    reponseType:
      "Les comptes à privilèges sont nominatifs, recensés dans un registre tenu à jour et revus semestriellement par le responsable SSI. Ils sont distincts des comptes bureautiques courants et protégés par MFA. Les comptes génériques d'administration ont été supprimés ou, à défaut, leurs secrets sont conservés en coffre-fort numérique avec traçabilité des accès.",
    remediation: {
      action:
        "Exporter la liste des administrateurs (Active Directory et consoles cloud), supprimer les comptes inactifs et ceux d'anciens prestataires, rendre les comptes restants nominatifs, poser une revue semestrielle dans l'agenda.",
      effort: "0,5 j",
      cout: "0 €",
    },
  },
  {
    id: "acc-03",
    theme: "acces",
    question:
      "Existe-t-il une procédure formalisée de gestion des arrivées, mobilités et départs de collaborateurs (création et révocation des accès) ?",
    clair: "Quand quelqu'un quitte l'entreprise, ses accès sont-ils coupés, et en combien de temps ?",
    enjeu:
      "Le délai de révocation est quantifié dans la plupart des questionnaires. Au-delà de 24 h, c'est relevé comme un écart.",
    nis2: ["i"],
    poids: 3,
    preuve:
      "Procédure écrite arrivée/départ + extrait du registre des dernières révocations avec horodatage.",
    reponseType:
      "Oui. Une procédure conjointe RH / informatique encadre les arrivées, mobilités et départs. La révocation de l'ensemble des accès (messagerie, VPN, applications métier, badge) intervient au plus tard le jour du départ effectif, et immédiatement en cas de départ conflictuel. Chaque opération est tracée dans un registre.",
    remediation: {
      action:
        "Écrire une checklist d'une page (comptes à créer / à couper, matériel à restituer) et l'intégrer au processus RH existant. Rapprocher une fois par an la liste des comptes actifs et le registre du personnel.",
      effort: "3 h",
      cout: "0 €",
    },
  },
  {
    id: "acc-04",
    theme: "acces",
    question:
      "Quelle est votre politique de mots de passe et comment les secrets partagés sont-ils stockés ?",
    clair:
      "Quelles règles pour les mots de passe, et où sont notés ceux qui sont partagés entre plusieurs personnes ?",
    enjeu:
      "Les mots de passe dans un fichier Excel ou sur un post-it sont un motif d'écart classique, facile à corriger et très visible.",
    nis2: ["i", "h"],
    poids: 2,
    preuve: "Extrait de la politique de mot de passe + nom de la solution de coffre-fort utilisée.",
    reponseType:
      "Notre politique impose des mots de passe d'au moins 12 caractères, uniques par service, sans rotation arbitraire, conformément aux recommandations de l'ANSSI. Les secrets partagés sont conservés dans un gestionnaire de mots de passe d'entreprise avec partage par groupe et traçabilité. Aucun secret n'est stocké en clair dans un fichier bureautique.",
    remediation: {
      action:
        "Déployer un gestionnaire de mots de passe d'entreprise, y migrer les secrets partagés, puis supprimer les fichiers et documents qui les contenaient.",
      effort: "0,5 j",
      cout: "~3 à 5 €/utilisateur/mois",
    },
  },
  {
    id: "acc-05",
    theme: "acces",
    question:
      "Les droits d'accès aux applications et aux partages de fichiers sont-ils attribués selon le principe du moindre privilège et revus périodiquement ?",
    clair: "Chacun n'a-t-il accès qu'aux dossiers dont il a besoin, et le revérifiez-vous ?",
    enjeu:
      "Un partage réseau ouvert à tous transforme la compromission d'un seul poste en fuite totale, y compris des données du donneur d'ordre.",
    nis2: ["i"],
    poids: 2,
    preuve: "Matrice des droits par groupe métier + compte rendu de la dernière revue annuelle.",
    reponseType:
      "Les droits sont attribués par groupe métier selon le principe du moindre privilège, et non individuellement. Une revue annuelle est conduite avec les responsables de service ; les écarts constatés sont corrigés sous 30 jours. Les données relatives à nos clients font l'objet d'un cloisonnement dédié.",
    remediation: {
      action:
        "Identifier les partages ouverts à « Tout le monde » ou « Utilisateurs authentifiés » et les restreindre par groupe. Créer un dossier cloisonné par client sensible.",
      effort: "1 j",
      cout: "0 €",
    },
  },

  // --------------------------------------------------------------- SAUVEGARDES
  {
    id: "sau-01",
    theme: "sauvegardes",
    question:
      "Décrivez votre dispositif de sauvegarde : périmètre, fréquence, rétention et externalisation.",
    clair: "Que sauvegardez-vous, à quelle fréquence, et où sont rangées les copies ?",
    enjeu:
      "Le client cherche la règle 3-2-1 et surtout une copie hors ligne ou immuable : sans elle, un rançongiciel chiffre aussi les sauvegardes.",
    nis2: ["c"],
    poids: 3,
    preuve:
      "Description du plan de sauvegarde + capture du tableau de bord de l'outil montrant les succès des 30 derniers jours.",
    reponseType:
      "Nos données et systèmes critiques sont sauvegardés quotidiennement selon la règle 3-2-1 : trois copies, sur deux supports distincts, dont une externalisée. Une copie est immuable ou déconnectée, donc non altérable par un rançongiciel. La rétention est de [X] jours en quotidien et [Y] mois en mensuel. Les succès et échecs de sauvegarde sont supervisés et alertés.",
    remediation: {
      action:
        "Ajouter une copie hors site immuable (stockage objet avec verrouillage, ou disque externe tournant déconnecté). C'est la mesure au meilleur rapport coût/bénéfice de tout le référentiel.",
      effort: "1 j",
      cout: "~20 à 80 €/mois selon le volume",
    },
  },
  {
    id: "sau-02",
    theme: "sauvegardes",
    question:
      "À quelle date la dernière restauration de test a-t-elle été réalisée, et quel en a été le résultat ?",
    clair: "Avez-vous déjà vérifié que vos sauvegardes se remettent vraiment en marche ?",
    enjeu:
      "C'est la question piège du bloc. Beaucoup de PME sauvegardent ; très peu testent. Une date précise et récente vous distingue immédiatement des concurrents évalués en même temps que vous.",
    nis2: ["c", "f"],
    poids: 3,
    preuve: "Compte rendu de test de restauration daté : périmètre restauré, durée, écarts, actions.",
    reponseType:
      "Un test de restauration est conduit au moins semestriellement. Le dernier a été réalisé le [date] sur [périmètre] ; les données ont été restaurées en [durée], conforme à notre objectif de reprise. Le compte rendu est archivé et les écarts éventuels suivis jusqu'à clôture.",
    remediation: {
      action:
        "Restaurer un serveur ou un dossier volumineux dans un environnement isolé, chronométrer, écrire une page de compte rendu daté. Planifier l'exercice deux fois par an dans l'agenda.",
      effort: "0,5 j",
      cout: "0 €",
      formulationInterim:
        "Un test de restauration complet est programmé le [date]. Des restaurations unitaires sont réalisées régulièrement à la demande des utilisateurs et documentées.",
    },
  },
  {
    id: "sau-03",
    theme: "sauvegardes",
    question:
      "Quels sont vos objectifs de reprise (RTO) et de perte de données maximale admissible (RPO) pour les activités nous concernant ?",
    clair:
      "En combien de temps redémarrez-vous après un sinistre, et combien d'heures de travail perdriez-vous ?",
    enjeu:
      "Le donneur d'ordre traduit directement votre RTO en jours d'arrêt de sa propre chaîne. Un chiffre assumé vaut mieux qu'une absence de réponse.",
    nis2: ["c"],
    poids: 2,
    preuve: "Tableau RTO/RPO par processus critique, validé par la direction.",
    reponseType:
      "Pour les processus concourant à vos commandes, notre objectif de reprise (RTO) est de [X] heures et notre perte de données maximale admissible (RPO) de [Y] heures. Ces objectifs sont documentés, vérifiés lors des tests de restauration et révisés annuellement.",
    remediation: {
      action:
        "Lister 4 à 5 processus critiques, fixer pour chacun un délai de reprise tenable au vu du dispositif actuel, faire valider par la direction. Annoncer un chiffre réaliste : il sera vérifié.",
      effort: "3 h",
      cout: "0 €",
    },
  },
  {
    id: "sau-04",
    theme: "sauvegardes",
    question:
      "Disposez-vous d'un plan de continuité ou de reprise d'activité formalisé, et a-t-il été testé ?",
    clair: "Avez-vous un mode dégradé écrit pour continuer à livrer si l'informatique tombe ?",
    enjeu:
      "Le client veut savoir si vous savez continuer à produire et expédier en mode papier pendant 48 h plutôt que de vous arrêter net.",
    nis2: ["c"],
    poids: 2,
    preuve: "PCA/PRA synthétique + compte rendu du dernier exercice.",
    reponseType:
      "Oui. Un plan de continuité et de reprise est formalisé, incluant un mode de fonctionnement dégradé permettant d'assurer la production et la relation client pendant l'indisponibilité du SI. Il identifie les rôles de crise, les moyens de communication de repli et les seuils de déclenchement. Dernier exercice réalisé le [date].",
    remediation: {
      action:
        "Rédiger un plan de 4 pages : qui décide, qui prévient les clients, comment on travaille sans l'ERP, quels contacts d'urgence. Tester en exercice sur table d'une heure.",
      effort: "1 j",
      cout: "0 €",
    },
  },

  // --------------------------------------------------------------------- POSTES
  {
    id: "pos-01",
    theme: "postes",
    question:
      "Quelle solution de protection est déployée sur les postes de travail et les serveurs, et son déploiement est-il supervisé de façon centralisée ?",
    clair: "Quel antivirus avez-vous, et savez-vous s'il est actif sur toutes les machines ?",
    enjeu:
      "Le client ne cherche pas la marque mais la couverture : un parc protégé à 80 % signifie que 20 % des machines sont des angles morts.",
    nis2: ["g", "e"],
    poids: 3,
    preuve:
      "Capture de la console d'administration montrant le nombre de postes gérés et le taux de couverture.",
    reponseType:
      "L'ensemble des postes de travail et serveurs est équipé d'une solution [EDR/antivirus nouvelle génération] administrée de façon centralisée. Le taux de couverture est de 100 %, contrôlé mensuellement. Les alertes sont supervisées et traitées selon notre procédure de gestion des incidents.",
    remediation: {
      action:
        "Rapprocher l'inventaire du parc et la liste des machines remontant dans la console. Traiter les écarts. Si aucune console centrale n'existe, Microsoft Defender for Business est une option économique pour une PME.",
      effort: "1 j",
      cout: "0 à ~3 €/poste/mois",
    },
  },
  {
    id: "pos-02",
    theme: "postes",
    question:
      "Les disques des ordinateurs portables sont-ils chiffrés ? Quelle solution et quel taux de couverture ?",
    clair: "Si un portable est volé, les données dessus sont-elles illisibles ?",
    enjeu:
      "Question systématique dès que vous détenez des plans, des tarifs ou des données personnelles. Le chiffrement est aussi ce qui évite une notification CNIL en cas de perte de matériel.",
    nis2: ["h"],
    poids: 2,
    preuve: "Rapport de conformité du chiffrement (BitLocker / FileVault) avec taux de couverture.",
    reponseType:
      "Oui. L'ensemble des postes nomades est chiffré au repos via [BitLocker / FileVault], avec séquestre centralisé des clés de récupération. Le taux de couverture est de 100 %, vérifié par rapport mensuel. Les supports amovibles autorisés sont également chiffrés.",
    remediation: {
      action:
        "Activer BitLocker sur les portables Windows Pro avec séquestre des clés dans Entra ID ou l'Active Directory. Opération transparente pour l'utilisateur, sans coût de licence supplémentaire.",
      effort: "0,5 j",
      cout: "0 €",
    },
  },
  {
    id: "pos-03",
    theme: "postes",
    question:
      "Les utilisateurs disposent-ils des droits d'administrateur local sur leur poste de travail ?",
    clair: "Vos salariés peuvent-ils installer n'importe quel logiciel sur leur ordinateur ?",
    enjeu:
      "Répondre « oui, tout le monde est administrateur » est un écart majeur : cela suffit à transformer une pièce jointe piégée en compromission complète du poste.",
    nis2: ["i", "g"],
    poids: 2,
    preuve: "Politique de gestion des droits locaux + liste des exceptions justifiées.",
    reponseType:
      "Non. Les utilisateurs travaillent avec des comptes standards. Les droits d'administrateur local sont retirés par défaut ; les exceptions nécessaires au métier sont recensées, justifiées et revues annuellement. Les installations de logiciels passent par un catalogue validé.",
    remediation: {
      action:
        "Retirer les droits administrateur par vagues, en commençant par les profils bureautiques. Recenser au préalable les logiciels métier qui exigent des droits élevés pour éviter les blocages.",
      effort: "2 j",
      cout: "0 €",
      formulationInterim:
        "Le retrait des droits d'administrateur local est engagé ; il est effectif sur [X] % du parc et sera généralisé d'ici le [date].",
    },
  },

  // -------------------------------------------------------------- VULNÉRABILITÉS
  {
    id: "vul-01",
    theme: "vulnerabilites",
    question:
      "Quel est votre processus de déploiement des correctifs de sécurité, et sous quel délai les vulnérabilités critiques sont-elles corrigées ?",
    clair: "Qui installe les mises à jour de sécurité, et en combien de temps après leur sortie ?",
    enjeu:
      "Le client attend un délai chiffré. « Dès que possible » est compté comme une non-réponse ; un engagement à 15 ou 30 jours est accepté.",
    nis2: ["e", "g"],
    poids: 3,
    preuve:
      "Procédure de gestion des correctifs + rapport de conformité du parc (pourcentage de machines à jour).",
    reponseType:
      "Les correctifs de sécurité sont déployés de façon centralisée. Les vulnérabilités critiques et activement exploitées sont corrigées sous 15 jours, les vulnérabilités élevées sous 30 jours, les autres au rythme mensuel. Le taux de conformité du parc est mesuré mensuellement et s'établit à [X] %.",
    remediation: {
      action:
        "Activer les mises à jour automatiques via Windows Update for Business ou Intune, définir des fenêtres de maintenance, et produire un rapport mensuel de conformité.",
      effort: "1 j",
      cout: "0 €",
    },
  },
  {
    id: "vul-02",
    theme: "vulnerabilites",
    question:
      "Disposez-vous d'un inventaire à jour de vos actifs informatiques (matériels, logiciels, services cloud) ?",
    clair: "Avez-vous la liste de tout ce qui est branché sur votre réseau et de tous vos abonnements ?",
    enjeu:
      "On ne protège pas ce qu'on ne connaît pas. L'inventaire conditionne la crédibilité de toutes les autres réponses du questionnaire.",
    nis2: ["i", "e"],
    poids: 2,
    preuve: "Extrait de l'inventaire avec date de dernière mise à jour.",
    reponseType:
      "Oui. Un inventaire des actifs est tenu à jour : postes, serveurs, équipements réseau, applications métier et services cloud, avec pour chacun un propriétaire, une criticité et une date de fin de support. Il est revu trimestriellement et à chaque entrée ou sortie de matériel.",
    remediation: {
      action:
        "Commencer par un simple tableur à 8 colonnes plutôt qu'un outil. Croiser les factures du prestataire informatique, les abonnements sur le relevé bancaire et un scan réseau pour ne rien oublier.",
      effort: "1 j",
      cout: "0 €",
    },
  },
  {
    id: "vul-03",
    theme: "vulnerabilites",
    question:
      "Exploitez-vous des systèmes ou logiciels en fin de support éditeur ? Si oui, lesquels et quelles mesures compensatoires ?",
    clair: "Avez-vous encore de vieux Windows ou de vieux logiciels qui ne reçoivent plus de mises à jour ?",
    enjeu:
      "Très fréquent en PME, notamment sur les machines pilotant un équipement de production ou un logiciel métier ancien. Ce n'est pas rédhibitoire si c'est déclaré et compensé, c'est rédhibitoire si c'est découvert lors d'un audit.",
    nis2: ["e"],
    poids: 2,
    preuve: "Liste des systèmes obsolètes, justification métier, mesures compensatoires, échéance de sortie.",
    reponseType:
      "Nous exploitons [X] système(s) en fin de support, exclusivement pour [usage métier]. Ils sont isolés sur un segment réseau dédié, sans accès Internet direct, avec accès restreint et journalisé. Un plan de migration est engagé, échéance [date].",
    remediation: {
      action:
        "Plutôt que de nier, isoler : placer les machines obsolètes sur un VLAN séparé sans accès Internet, restreindre les accès, documenter. Un écart déclaré et maîtrisé est bien mieux noté qu'un écart caché.",
      effort: "1 j",
      cout: "0 €",
    },
  },
  {
    id: "vul-04",
    theme: "vulnerabilites",
    question:
      "Réalisez-vous des tests d'intrusion ou des scans de vulnérabilités, et à quelle fréquence ?",
    clair: "Faites-vous vérifier de l'extérieur que votre informatique n'est pas attaquable ?",
    enjeu:
      "Non attendu de toutes les PME, mais un scan externe régulier vous place immédiatement au-dessus de la moyenne de votre secteur.",
    nis2: ["f", "e"],
    poids: 1,
    preuve: "Rapport de scan ou synthèse de test d'intrusion (sans les détails techniques exploitables).",
    reponseType:
      "Un scan de vulnérabilités de notre surface exposée sur Internet est réalisé [trimestriellement]. Les vulnérabilités identifiées sont suivies jusqu'à correction selon les délais de notre politique. Une synthèse des résultats et du plan de remédiation peut être communiquée sous accord de confidentialité.",
    remediation: {
      action:
        "Commencer par un scan externe de vos IP publiques et de vos noms de domaine. Documenter les résultats et les corrections apportées : c'est le livrable qui compte, pas l'outil.",
      effort: "0,5 j par campagne",
      cout: "0 € en outillage libre",
    },
  },

  // --------------------------------------------------------------------- RÉSEAU
  {
    id: "res-01",
    theme: "reseau",
    question:
      "Comment les accès distants (télétravail, prestataires) sont-ils sécurisés ?",
    clair: "Comment vos équipes et vos prestataires se connectent-ils à distance à votre réseau ?",
    enjeu:
      "Les accès distants exposés sans MFA (bureau à distance ouvert sur Internet, VPN sans second facteur) sont la porte d'entrée la plus exploitée par les rançongiciels.",
    nis2: ["j", "i"],
    poids: 3,
    preuve: "Schéma d'architecture des accès distants + preuve d'activation du MFA sur le VPN.",
    reponseType:
      "Les accès distants transitent exclusivement par un VPN d'entreprise avec authentification multifacteur et chiffrement. Aucun service d'administration ou de bureau à distance n'est exposé directement sur Internet. Les accès prestataires sont nominatifs, limités dans le temps, restreints au périmètre strictement nécessaire et journalisés.",
    remediation: {
      action:
        "Vérifier en priorité qu'aucun port de bureau à distance n'est ouvert sur Internet ; si c'est le cas, le fermer immédiatement et le placer derrière le VPN. Activer ensuite le MFA sur le VPN.",
      effort: "0,5 j",
      cout: "0 €",
    },
  },
  {
    id: "res-02",
    theme: "reseau",
    question:
      "Votre réseau est-il segmenté (bureautique, production, invités, équipements connectés) ?",
    clair:
      "Vos machines de production, le wifi des visiteurs et les ordinateurs de bureau sont-ils sur des réseaux séparés ?",
    enjeu:
      "Sans segmentation, une infection sur un poste comptable peut atteindre l'atelier ou le serveur de fichiers. Le client mesure ici votre capacité à contenir un incident.",
    nis2: ["a", "e"],
    poids: 2,
    preuve: "Schéma réseau simplifié montrant les segments et les règles de filtrage entre eux.",
    reponseType:
      "Oui. Le réseau est segmenté en zones distinctes (bureautique, production/industriel, invités, équipements connectés), séparées par des règles de filtrage explicites. Le wifi invité est totalement isolé du réseau interne. Les flux entre segments sont limités au strict nécessaire.",
    remediation: {
      action:
        "Commencer par le plus rentable : isoler le wifi invité et sortir les équipements connectés (imprimantes, caméras, automates) du réseau bureautique via des VLAN.",
      effort: "1 à 2 j",
      cout: "0 € si les équipements gèrent les VLAN",
    },
  },
  {
    id: "res-03",
    theme: "reseau",
    question:
      "Quels services exposez-vous sur Internet, et comment cette exposition est-elle maîtrisée ?",
    clair: "Qu'est-ce qui, chez vous, est accessible depuis Internet ?",
    enjeu:
      "Le donneur d'ordre peut vérifier cette réponse lui-même en quelques minutes depuis l'extérieur. Une réponse fausse ou incomplète détruit la confiance sur l'ensemble du questionnaire.",
    nis2: ["e", "a"],
    poids: 2,
    preuve: "Liste des services exposés avec justification, et date du dernier contrôle d'exposition.",
    reponseType:
      "Notre exposition Internet est limitée à [site web, passerelle de messagerie, VPN]. Elle est recensée et contrôlée [trimestriellement]. Aucun service d'administration n'est accessible publiquement. Les services exposés sont maintenus à jour et protégés par filtrage.",
    remediation: {
      action:
        "Inventorier vos IP publiques et scanner vos ports ouverts depuis l'extérieur. Fermer tout ce qui n'a pas de justification écrite. Refaire le contrôle tous les trimestres.",
      effort: "0,5 j",
      cout: "0 €",
    },
  },

  // ----------------------------------------------------------------- MESSAGERIE
  {
    id: "mes-01",
    theme: "messagerie",
    question:
      "Votre domaine de messagerie est-il protégé par SPF, DKIM et DMARC, et quelle est la politique DMARC appliquée ?",
    clair: "Un escroc peut-il envoyer un e-mail qui semble venir de votre entreprise ?",
    enjeu:
      "C'est la question la plus directement liée au risque du client : l'usurpation de votre domaine sert à lui adresser de faux ordres de virement. Elle est vérifiable publiquement en trente secondes.",
    nis2: ["j", "g"],
    poids: 3,
    preuve: "Enregistrements DNS SPF, DKIM et DMARC de votre domaine + rapports DMARC agrégés.",
    reponseType:
      "Oui. Notre domaine est protégé par SPF (politique stricte), DKIM (signature de l'ensemble des flux sortants) et DMARC en politique de rejet (p=reject). Les rapports agrégés sont supervisés afin de détecter toute tentative d'usurpation.",
    remediation: {
      action:
        "Publier SPF et DKIM, puis DMARC en observation (p=none) le temps d'analyser les rapports, et durcir progressivement vers quarantine puis reject. Gain de crédibilité immédiat pour un coût nul.",
      effort: "0,5 j + 4 semaines d'observation",
      cout: "0 €",
      formulationInterim:
        "SPF et DKIM sont en place. DMARC est déployé en phase d'observation ; le passage en politique de rejet est prévu le [date].",
    },
  },
  {
    id: "mes-02",
    theme: "messagerie",
    question:
      "Disposez-vous d'une protection anti-hameçonnage et d'un filtrage des pièces jointes et liens malveillants ?",
    clair: "Vos e-mails sont-ils filtrés contre les arnaques et les pièces jointes piégées ?",
    enjeu:
      "Attendu comme un minimum. L'important est de citer la fonction activée plutôt que le nom du produit.",
    nis2: ["g"],
    poids: 2,
    preuve: "Capture de la configuration anti-hameçonnage + statistiques mensuelles de blocage.",
    reponseType:
      "Oui. Notre messagerie bénéficie d'un filtrage anti-pourriel et anti-hameçonnage, d'une analyse des pièces jointes et d'une réécriture des liens avec vérification au clic. Les messages externes sont signalés visuellement aux utilisateurs.",
    remediation: {
      action:
        "Activer les politiques anti-hameçonnage incluses dans Microsoft 365 ou Google Workspace et le bandeau d'avertissement sur les e-mails externes. Fonctions déjà payées dans la plupart des abonnements.",
      effort: "3 h",
      cout: "0 €",
    },
  },
  {
    id: "mes-03",
    theme: "messagerie",
    question:
      "Vos collaborateurs sont-ils sensibilisés à la cybersécurité ? Précisez la fréquence, le format et le taux de participation.",
    clair: "Formez-vous vos équipes à repérer les arnaques, et gardez-vous une trace de qui a suivi ?",
    enjeu:
      "C'est la mesure g) de NIS2, obligatoire et facile à documenter. Le client attend un taux de participation chiffré, pas une intention.",
    nis2: ["g"],
    poids: 3,
    preuve: "Feuilles d'émargement ou export de la plateforme de formation + taux de participation.",
    reponseType:
      "Oui. Une sensibilisation est dispensée à l'embauche puis annuellement à l'ensemble des collaborateurs, complétée par des rappels ciblés. Le taux de participation de la dernière campagne est de [X] %. Des campagnes de faux hameçonnage sont conduites [semestriellement] ; le taux de clic est suivi dans le temps.",
    remediation: {
      action:
        "Organiser une session d'une heure en présentiel, émarger, et l'inscrire au plan de formation annuel. Les supports gratuits de l'ANSSI et de Cybermalveillance.gouv.fr suffisent pour démarrer.",
      effort: "0,5 j par campagne",
      cout: "0 €",
    },
  },
  {
    id: "mes-04",
    theme: "messagerie",
    question:
      "Disposez-vous d'une procédure de vérification des changements de coordonnées bancaires (lutte contre la fraude au virement) ?",
    clair:
      "Si un fournisseur vous écrit pour changer son RIB, quelqu'un décroche-t-il le téléphone pour vérifier ?",
    enjeu:
      "Question de plus en plus systématique dans l'industrie et le BTP. Elle protège le client autant que vous : la fraude au président et la fraude au faux fournisseur transitent par les sous-traitants.",
    nis2: ["b", "g"],
    poids: 2,
    preuve: "Procédure écrite de validation des changements de coordonnées bancaires.",
    reponseType:
      "Oui. Tout changement de coordonnées bancaires fait l'objet d'une vérification par rappel téléphonique sur un numéro connu et préalablement enregistré, jamais sur un numéro figurant dans la demande. La validation requiert une double signature au-delà de [montant] €. Les collaborateurs concernés sont spécifiquement sensibilisés.",
    remediation: {
      action:
        "Écrire une demi-page de procédure et la faire signer par la comptabilité. Coût nul, et c'est l'une des mesures qui évite le plus de sinistres réels.",
      effort: "2 h",
      cout: "0 €",
    },
  },

  // ------------------------------------------------------------------ INCIDENTS
  {
    id: "inc-01",
    theme: "incidents",
    question:
      "Disposez-vous d'une procédure de gestion des incidents de sécurité, et sous quel délai vous engagez-vous à nous notifier un incident nous concernant ?",
    clair: "Que faites-vous en cas d'attaque, et en combien de temps nous prévenez-vous ?",
    enjeu:
      "Point central : votre client a lui-même une obligation d'alerte sous 24 h et de notification sous 72 h auprès de l'ANSSI. Si vous le prévenez trop tard, il est en faute. Un engagement de notification sous 24 h est le standard attendu et devient une clause contractuelle.",
    nis2: ["b"],
    poids: 3,
    preuve:
      "Procédure de gestion des incidents + fiche de contacts d'urgence + engagement de délai de notification.",
    reponseType:
      "Oui. Notre procédure de gestion des incidents définit la détection, la qualification, le confinement, la communication et le retour d'expérience. Nous nous engageons à notifier sans délai injustifié, et au plus tard sous 24 heures, tout incident de sécurité susceptible d'affecter vos données, vos systèmes ou la continuité de nos prestations. Contact d'astreinte : [nom / e-mail / téléphone].",
    remediation: {
      action:
        "Rédiger une fiche réflexe d'une page : qui alerter en interne, qui décide d'isoler, qui prévient les clients et sous quel délai, quels numéros externes (assureur, prestataire, cybermalveillance.gouv.fr, dépôt de plainte). L'afficher physiquement, en crise, l'intranet peut être inaccessible.",
      effort: "3 h",
      cout: "0 €",
    },
  },
  {
    id: "inc-02",
    theme: "incidents",
    question:
      "Les journaux d'événements sont-ils collectés et conservés ? Quelle durée de rétention ?",
    clair: "Gardez-vous une trace de ce qui se passe sur vos systèmes, et pendant combien de temps ?",
    enjeu:
      "Sans journaux, il est impossible de dire après une attaque si les données du client ont été consultées. Le client se retrouve alors contraint de supposer le pire et de le déclarer.",
    nis2: ["b", "f"],
    poids: 2,
    preuve: "Description du dispositif de journalisation avec périmètre et durée de rétention.",
    reponseType:
      "Les journaux des systèmes critiques (authentification, accès distants, pare-feu, messagerie, serveurs de fichiers) sont collectés de façon centralisée et conservés [X] mois, conformément aux recommandations de l'ANSSI. Ils sont protégés contre la modification et exploitables en cas d'investigation.",
    remediation: {
      action:
        "Commencer par centraliser les journaux d'authentification et de pare-feu, et porter la rétention à 6 mois minimum. Les journaux d'audit Microsoft 365 et Google Workspace s'activent sans surcoût.",
      effort: "1 j",
      cout: "0 à ~50 €/mois",
    },
  },
  {
    id: "inc-03",
    theme: "incidents",
    question:
      "Avez-vous subi un incident de sécurité significatif au cours des 24 derniers mois ? Si oui, décrivez-en les conséquences et les mesures prises.",
    clair: "Avez-vous déjà été attaqué récemment, et qu'en avez-vous tiré ?",
    enjeu:
      "Répondre « oui » n'est pas éliminatoire, le mensonge, lui, l'est. Un incident bien géré et documenté est souvent mieux noté qu'une absence d'historique, car il prouve que le dispositif fonctionne.",
    nis2: ["b", "f"],
    poids: 1,
    preuve: "Retour d'expérience anonymisé : nature, impact, mesures correctives, date de clôture.",
    reponseType:
      "[Si aucun incident] Aucun incident de sécurité significatif n'a été constaté sur les 24 derniers mois. Nos dispositifs de détection et de journalisation sont opérationnels et supervisés. [Si incident] Un incident de type [nature] est survenu le [date]. Il a été confiné en [durée], sans impact sur vos données ni sur nos prestations. Les mesures correctives suivantes ont été mises en œuvre : [liste]. Un retour d'expérience peut vous être présenté.",
    remediation: {
      action:
        "Préparer à l'avance la formulation factuelle d'un éventuel incident passé, sans dramatiser ni minimiser, en insistant sur la détection, le délai de confinement et les mesures correctives.",
      effort: "1 h",
      cout: "0 €",
    },
  },

  // --------------------------------------------------------------- FOURNISSEURS
  {
    id: "four-01",
    theme: "fournisseurs",
    question:
      "Tenez-vous un inventaire de vos propres prestataires ayant accès à vos systèmes ou aux données que nous vous confions ?",
    clair: "Qui, en dehors de vos salariés, peut accéder à vos systèmes et aux données de vos clients ?",
    enjeu:
      "C'est la mesure d) de NIS2, celle qui fait remonter toute la chaîne. Votre client doit savoir si ses données finissent chez un quatrième acteur qu'il n'a jamais validé.",
    nis2: ["d"],
    poids: 3,
    preuve:
      "Registre des prestataires : nom, prestation, nature des accès, données concernées, criticité.",
    reponseType:
      "Oui. Nous tenons un registre de nos prestataires ayant accès à nos systèmes ou aux données de nos clients, précisant la nature de la prestation, les accès accordés, les données concernées et le niveau de criticité. Il est revu annuellement. Aucun accès n'est accordé sans engagement contractuel de confidentialité et de sécurité.",
    remediation: {
      action:
        "Lister les prestataires informatiques, éditeurs de logiciels métier, hébergeurs, cabinet comptable et sociétés de maintenance. Préciser pour chacun ce à quoi il accède réellement.",
      effort: "0,5 j",
      cout: "0 €",
    },
  },
  {
    id: "four-02",
    theme: "fournisseurs",
    question:
      "Vos contrats de sous-traitance comportent-ils des clauses de sécurité et de notification d'incident ?",
    clair: "Vos propres contrats obligent-ils vos prestataires à vous prévenir s'ils se font pirater ?",
    enjeu:
      "Le donneur d'ordre vérifie que l'exigence qu'il vous impose est bien répercutée en aval. C'est exactement ce que NIS2 attend de la chaîne d'approvisionnement.",
    nis2: ["d"],
    poids: 2,
    preuve: "Modèle de clause cyber intégré aux contrats et conditions d'achat.",
    reponseType:
      "Oui. Nos contrats et conditions générales d'achat intègrent des clauses de confidentialité, d'exigences de sécurité, de notification d'incident sous 24 heures et de réversibilité. Elles sont systématiquement appliquées aux nouveaux contrats et déployées progressivement lors du renouvellement des contrats existants.",
    remediation: {
      action:
        "Rédiger une clause cyber type d'une page et l'annexer aux conditions générales d'achat. La faire signer lors de chaque renouvellement plutôt que de rouvrir tous les contrats.",
      effort: "0,5 j",
      cout: "0 €",
    },
  },
  {
    id: "four-03",
    theme: "fournisseurs",
    question:
      "Où sont hébergées les données que nous vous confions, et sous quelle juridiction ?",
    clair: "Dans quel pays sont stockées les données de vos clients ?",
    enjeu:
      "Enjeu majeur pour la défense, la santé, l'énergie et le secteur public, où l'hébergement hors Union européenne peut être rédhibitoire. Un hébergement français est un argument commercial en soi.",
    nis2: ["d", "h"],
    poids: 2,
    preuve: "Liste des hébergeurs avec localisation des centres de données et juridiction applicable.",
    reponseType:
      "Les données que vous nous confiez sont hébergées [chez nous / chez l'hébergeur X] dans des centres de données situés en [France / Union européenne], sous juridiction européenne. Aucun transfert hors Union européenne n'est réalisé sans encadrement contractuel approprié et information préalable.",
    remediation: {
      action:
        "Vérifier la région d'hébergement réelle de vos outils SaaS (beaucoup sont paramétrés aux États-Unis par défaut). Le documenter précisément, y compris les sauvegardes.",
      effort: "3 h",
      cout: "0 €",
    },
  },

  // -------------------------------------------------------------------- DONNÉES
  {
    id: "don-01",
    theme: "donnees",
    question:
      "Tenez-vous un registre des traitements de données personnelles et avez-vous désigné un référent RGPD ou un DPO ?",
    clair: "Êtes-vous en règle sur le RGPD, et qui s'en occupe ?",
    enjeu:
      "Souvent intégré au même questionnaire. Le client engage sa propre responsabilité de responsable de traitement en vous confiant des données.",
    nis2: ["a"],
    poids: 2,
    preuve: "Registre des traitements à jour + coordonnées du référent RGPD ou du DPO.",
    reponseType:
      "Oui. Nous tenons un registre des traitements conformément à l'article 30 du RGPD, revu annuellement. [M./Mme Nom] assure la fonction de [DPO / référent RGPD] ; contact : [e-mail]. Les durées de conservation sont définies par catégorie de données et les droits des personnes sont traités selon une procédure établie.",
    remediation: {
      action:
        "Utiliser le modèle de registre simplifié de la CNIL, destiné aux organismes de moins de 250 salariés. Une demi-journée suffit pour une PME.",
      effort: "0,5 j",
      cout: "0 €",
    },
  },
  {
    id: "don-02",
    theme: "donnees",
    question:
      "Comment les données sensibles sont-elles protégées en transit et au repos ?",
    clair: "Les documents confidentiels sont-ils protégés quand ils circulent et quand ils sont stockés ?",
    enjeu:
      "Concerne directement vos livrables : plans, chiffrages, données de production, documents d'étude.",
    nis2: ["h"],
    poids: 2,
    preuve: "Politique de chiffrement précisant les protocoles et les usages.",
    reponseType:
      "Les échanges avec l'extérieur sont chiffrés en transit (TLS 1.2 minimum, SFTP pour les transferts de fichiers). Les données au repos sont chiffrées sur les postes nomades et sur les espaces de stockage cloud. Les documents sensibles sont échangés via un espace de partage authentifié plutôt qu'en pièce jointe, avec date d'expiration des liens.",
    remediation: {
      action:
        "Bannir l'envoi de documents confidentiels en pièce jointe non protégée et les remplacer par des liens de partage authentifiés et expirants, fonction déjà incluse dans SharePoint et Google Drive.",
      effort: "3 h",
      cout: "0 €",
    },
  },
  {
    id: "don-03",
    theme: "donnees",
    question:
      "Quelle est votre procédure de restitution et d'effacement des données en fin de contrat ?",
    clair: "Que deviennent les données de votre client quand vous arrêtez de travailler ensemble ?",
    enjeu:
      "Question de fin de questionnaire, souvent oubliée, et qui se traite en quelques lignes. Y répondre proprement laisse une bonne dernière impression à l'évaluateur.",
    nis2: ["d", "i"],
    poids: 1,
    preuve: "Procédure de réversibilité et modèle d'attestation de destruction.",
    reponseType:
      "En fin de contrat, les données sont restituées dans un format exploitable convenu, puis effacées de nos systèmes actifs et de nos sauvegardes à l'expiration des durées de rétention. Une attestation de destruction est remise sur demande. Les supports physiques réformés font l'objet d'un effacement sécurisé ou d'une destruction certifiée.",
    remediation: {
      action:
        "Rédiger une demi-page de procédure et un modèle d'attestation de destruction. À faire une fois, réutilisable pour tous les clients.",
      effort: "2 h",
      cout: "0 €",
    },
  },
];
