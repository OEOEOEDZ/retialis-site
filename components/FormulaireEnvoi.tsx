"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

/**
 * Le formulaire compose un e-mail pré-rempli dans le client de messagerie du
 * visiteur, plutôt que de poster vers un serveur.
 *
 * C'est un choix délibéré et pas un pis-aller : le site reste entièrement
 * statique (donc gratuit à héberger et sans surface d'attaque), aucune donnée
 * de prospect ne transite par un tiers, et surtout le visiteur peut joindre son
 * questionnaire, ce qu'aucun formulaire web simple ne permet proprement.
 */

const SECTEURS = [
  { v: "Informatique / ESN / infogérance", l: "Informatique, ESN, infogérance" },
  { v: "BTP / construction", l: "BTP, construction, ingénierie" },
  { v: "Conseil / bureau d'études", l: "Conseil, bureau d'études" },
  { v: "Autre", l: "Autre secteur" },
];

const DELAIS = [
  "Moins d'une semaine",
  "Une à deux semaines",
  "Trois à quatre semaines",
  "Plus d'un mois",
  "Aucune date imposée pour l'instant",
];

/* min-h-11 : 44 px, la cible tactile minimale. Sans elle, les listes
   déroulantes tombaient à 43 px sur mobile. */
const champ =
  "w-full min-h-11 rounded-lg border border-[var(--border-fort)] bg-[var(--surface)] px-3.5 py-2.5 text-[15px] outline-none transition-colors focus:border-[var(--primary)]";
const etiquette = "block text-sm font-medium";

export function FormulaireEnvoi() {
  const [entreprise, setEntreprise] = useState("");
  const [contact, setContact] = useState("");
  const [secteur, setSecteur] = useState(SECTEURS[0].v);
  const [effectif, setEffectif] = useState("");
  const [delai, setDelai] = useState(DELAIS[1]);
  const [donneur, setDonneur] = useState("");
  const [precisions, setPrecisions] = useState("");
  const [envoye, setEnvoye] = useState(false);

  const pret = entreprise.trim() !== "" && contact.trim() !== "";

  const composer = () => {
    const corps = [
      "Bonjour,",
      "",
      "Nous souhaitons faire analyser le questionnaire de sécurité reçu de notre client.",
      "",
      `Entreprise : ${entreprise}`,
      `Contact : ${contact}`,
      `Secteur : ${secteur}`,
      effectif ? `Effectif : ${effectif}` : null,
      `Délai de retour : ${delai}`,
      donneur ? `Donneur d'ordre : ${donneur}` : null,
      "",
      precisions ? `Précisions :\n${precisions}` : null,
      precisions ? "" : null,
      "⚠️ N'oubliez pas de JOINDRE le questionnaire à cet e-mail avant de l'envoyer.",
      "Formats acceptés : Excel, Word, PDF.",
      "",
      "Cordialement,",
    ]
      .filter((l) => l !== null)
      .join("\n");

    const url = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Analyse de questionnaire, ${entreprise}`,
    )}&body=${encodeURIComponent(corps)}`;

    window.location.href = url;
    setEnvoye(true);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        composer();
      }}
      className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
    >
      <h2 className="text-xl font-semibold">Préparer votre envoi</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-3)]">
        Ces quelques champs préparent un e-mail dans votre messagerie. Vous y joindrez le fichier et vous
        garderez une copie de votre envoi.
      </p>

      <div className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="entreprise" className={etiquette}>
              Votre entreprise <span className="text-[var(--signal)]">*</span>
            </label>
            <input
              id="entreprise"
              required
              value={entreprise}
              onChange={(e) => setEntreprise(e.target.value)}
              className={`${champ} mt-1.5`}
              placeholder="Dupont TP"
            />
          </div>
          <div>
            <label htmlFor="contact" className={etiquette}>
              Vous êtes <span className="text-[var(--signal)]">*</span>
            </label>
            <input
              id="contact"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={`${champ} mt-1.5`}
              placeholder="Prénom Nom, fonction"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="secteur" className={etiquette}>
              Votre secteur
            </label>
            <select
              id="secteur"
              value={secteur}
              onChange={(e) => setSecteur(e.target.value)}
              className={`${champ} mt-1.5`}
            >
              {SECTEURS.map((s) => (
                <option key={s.v} value={s.v}>
                  {s.l}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="effectif" className={etiquette}>
              Effectif <span className="font-normal text-[var(--ink-3)]">(facultatif)</span>
            </label>
            <input
              id="effectif"
              value={effectif}
              onChange={(e) => setEffectif(e.target.value)}
              className={`${champ} mt-1.5`}
              placeholder="42 salariés"
            />
          </div>
        </div>

        <div>
          <label htmlFor="delai" className={etiquette}>
            Quand votre client attend-il la réponse ?
          </label>
          <select id="delai" value={delai} onChange={(e) => setDelai(e.target.value)} className={`${champ} mt-1.5`}>
            {DELAIS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="donneur" className={etiquette}>
            Qui vous l&apos;a envoyé ? <span className="font-normal text-[var(--ink-3)]">(facultatif)</span>
          </label>
          <input
            id="donneur"
            value={donneur}
            onChange={(e) => setDonneur(e.target.value)}
            className={`${champ} mt-1.5`}
            placeholder="Laissez vide si vous préférez ne pas le dire"
          />
          <p className="mt-1.5 text-xs text-[var(--ink-3)]">
            Ce n&apos;est pas nécessaire à l&apos;analyse. Masquez-le si vous le souhaitez.
          </p>
        </div>

        <div>
          <label htmlFor="precisions" className={etiquette}>
            Autre chose que nous devrions savoir ?{" "}
            <span className="font-normal text-[var(--ink-3)]">(facultatif)</span>
          </label>
          <textarea
            id="precisions"
            rows={3}
            value={precisions}
            onChange={(e) => setPrecisions(e.target.value)}
            className={`${champ} mt-1.5 resize-y`}
            placeholder="Un point qui vous inquiète, un accord de confidentialité à signer d'abord…"
          />
        </div>
      </div>

      <button type="submit" disabled={!pret} className="btn btn-action mt-7 w-full disabled:opacity-40">
        Préparer l&apos;e-mail
      </button>

      {envoye ? (
        <p className="mt-4 rounded-lg border border-[var(--ok)] bg-[var(--ok-soft)] p-4 text-sm leading-relaxed">
          Votre messagerie devrait s&apos;être ouverte avec l&apos;e-mail pré-rempli.{" "}
          <strong>Joignez-y le questionnaire avant de l&apos;envoyer.</strong> Si rien ne s&apos;est passé, écrivez
          directement à{" "}
          <a href={`mailto:${SITE.email}`} className="font-medium text-[var(--primary)] hover:underline">
            {SITE.email}
          </a>
          .
        </p>
      ) : (
        <p className="mt-4 text-xs leading-relaxed text-[var(--ink-3)]">
          Aucune donnée n&apos;est transmise depuis cette page : tout se passe dans votre propre messagerie.
        </p>
      )}
    </form>
  );
}
