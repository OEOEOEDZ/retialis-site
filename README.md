# Retialis, le site

Site vitrine d'un service de réponse aux questionnaires de sécurité que les
donneurs d'ordre soumis à la directive NIS2 envoient à leurs sous-traitants.

Next.js 15, App Router, TypeScript, Tailwind CSS v4. Entièrement statique :
15 pages prérendues, aucun serveur, aucune base de données, aucun appel réseau
sortant à l'exécution.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production, 15 pages statiques
```

## Ce que contient ce dépôt

```
app/                     Les pages, le layout, robots.ts et sitemap.ts
components/              Marque, animations, démonstration, comparateur
lib/site.ts              Nom, contact, prix, FAQ : source unique de vérité
lib/referentiel.ts       Thèmes et mesures de l'article 21(2) de NIS2
lib/questions-socle.ts   36 questions communes à tous les secteurs
lib/questions-secteur.ts 12 questions sectorielles, 4 par verticale
lib/scoring.ts           Score pondéré, verdict, plan d'action priorisé
```

L'outillage interne (mappeur de questionnaires, pré-audit de posture publique,
lexique des tournures de donneurs d'ordre) et les contenus commerciaux vivent
dans un dépôt privé distinct.

## Parti pris techniques

**Aucune donnée ne transite.** `components/FormulaireEnvoi.tsx` compose un
`mailto:` plutôt que de poster vers un serveur. Le site reste statique, la
surface d'attaque est nulle, et le visiteur peut joindre son questionnaire,
ce qu'aucun formulaire web simple ne permet proprement.

**Identité assumée en clair.** `color-scheme: light` est déclaré sur `:root`
et il n'existe pas de palette sombre. Le jeton `--ink` sert à la fois d'encre
et de fond, donc toute palette sombre qui l'inverse rend le pied de page
illisible. Mesuré à 1,06:1 avant correction.

**Cibles tactiles à 44 px.** Le pied de page utilise `LIEN_PIED` dans
`app/layout.tsx` : 44 px au doigt, interligne serré à partir de 640 px.

**En-têtes de sécurité servis par `next.config.mjs`** : politique de sécurité
de contenu avec `frame-ancestors 'none'`, HSTS deux ans avec `preload`,
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, et
`poweredByHeader` désactivé.

## Déployer

```bash
npm i -g vercel
vercel           # première fois : crée le projet
vercel --prod    # met en production
```

Le plan Hobby suffit, le site étant statique.

## Avertissement

Ce service n'a aucun lien avec l'ANSSI ni avec aucune autorité publique. Les
références à NIS2 et au Référentiel Cyber France sont fournies à titre
informatif et ne constituent pas un conseil juridique. Le service accompagne
la constitution d'un dossier recevable et ne délivre aucune attestation de
conformité.
