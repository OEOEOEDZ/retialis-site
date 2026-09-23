import type { Metadata } from "next";
import { HEBERGEUR, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergeur, propriété intellectuelle et traitement des données personnelles.",
  robots: { index: false, follow: true },
};

/**
 * ⚠️ TRAME À COMPLÉTER ET À FAIRE RELIRE AVANT MISE EN LIGNE.
 * Les mentions légales sont obligatoires (article 6-III de la LCEN du 21/06/2004).
 * Les champs « à compléter » doivent être renseignés dès l'immatriculation.
 */
export default function MentionsLegales() {
  const Bloc = ({ titre, children }: { titre: string; children: React.ReactNode }) => (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">{titre}</h2>
      <div className="mt-4 space-y-3 leading-relaxed text-[var(--ink-2)]">{children}</div>
    </section>
  );

  return (
    <div className="wrap pt-14 pb-20 sm:pt-20">
      <div className="texte">
        <h1 className="text-4xl">Mentions légales</h1>
        <p className="mt-5 text-[var(--ink-3)]">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>

        <div className="mt-8 rounded-sm border-l-2 border-[var(--signal)] bg-[var(--signal-soft)] p-5 text-sm leading-relaxed">
          <strong>Note à l&apos;éditeur du site.</strong> Cette page est une trame. Les informations
          d&apos;immatriculation doivent être renseignées et l&apos;ensemble relu avant toute mise en ligne
          publique, les mentions légales sont une obligation prévue par la loi pour la confiance dans
          l&apos;économie numérique. Cette note est à supprimer une fois la page complétée.
        </div>

        <Bloc titre="Éditeur du site">
          <p>
            {SITE.nom}
            <br />
            Entrepreneur individuel
            <br />
            {SITE.ville}, France
            <br />
            SIRET : {SITE.siret}
            <br />
            Numéro de TVA intracommunautaire : à compléter
          </p>
          <p>
            Contact :{" "}
            <a href={`mailto:${SITE.email}`} className="text-[var(--primary)] hover:underline">
              {SITE.email}
            </a>
          </p>
          <p>Directeur de la publication : le représentant légal, joignable à l&apos;adresse ci-dessus.</p>
        </Bloc>

        <Bloc titre="Hébergement">
          <p>
            {HEBERGEUR.nom}
            <br />
            {HEBERGEUR.ville}, {HEBERGEUR.pays}
          </p>
          <p>
            Le site est statique : il ne collecte ni ne stocke aucune donnée personnelle côté serveur. Aucun
            formulaire ne transmet de données, aucun cookie n&apos;est déposé, aucun script tiers n&apos;est
            chargé.
          </p>
          {HEBERGEUR.souverain ? (
            <p>
              Aucune donnée n&apos;est hébergée en dehors de l&apos;Union européenne, et aucune infrastructure
              soumise à une législation extraterritoriale n&apos;intervient dans la chaîne.
            </p>
          ) : (
            <p>
              L&apos;hébergeur du site est une société de droit américain. Le site étant entièrement statique et
              ne collectant aucune donnée, aucune information vous concernant n&apos;y transite. Les documents
              que vous nous transmettez par courrier électronique ne sont jamais déposés sur cette
              infrastructure.
            </p>
          )}
        </Bloc>

        <Bloc titre="Données personnelles">
          <p>
            <strong>Aucun formulaire de ce site ne transmet de données à un serveur.</strong> Le formulaire de la
            page « Faire analyser votre questionnaire » se contente de préparer un message dans votre propre
            messagerie : les informations saisies ne quittent votre appareil que si vous décidez vous-même
            d&apos;envoyer cet e-mail.
          </p>
          <p>
            Les données que vous transmettez par e-mail, y compris le questionnaire joint, sont utilisées
            uniquement pour produire l&apos;analyse demandée et répondre à votre sollicitation. Elles ne font
            l&apos;objet d&apos;aucune cession, d&apos;aucun partage avec un tiers et d&apos;aucun dépôt sur un
            service externe non validé.
          </p>
          <p>
            Base légale : votre consentement et l&apos;exécution de mesures précontractuelles. Durée de
            conservation : la durée de la relation, puis trois ans à compter du dernier contact, ou immédiatement
            sur demande de suppression.
          </p>
          <p>
            Conformément au règlement (UE) 2016/679 et à la loi Informatique et Libertés, vous disposez d&apos;un
            droit d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition. Pour
            l&apos;exercer, écrivez à{" "}
            <a href={`mailto:${SITE.email}`} className="text-[var(--primary)] hover:underline">
              {SITE.email}
            </a>
            . Vous pouvez introduire une réclamation auprès de la CNIL.
          </p>
        </Bloc>

        <Bloc titre="Cookies et mesure d'audience">
          <p>
            Ce site ne dépose <strong>aucun cookie</strong> et n&apos;utilise aucun outil de mesure d&apos;audience
            ni de traçage publicitaire. Aucune bannière de consentement n&apos;est donc nécessaire.
          </p>
        </Bloc>

        <Bloc titre="Propriété intellectuelle">
          <p>
            L&apos;ensemble des contenus de ce site, textes, référentiel de questions, réponses types,
            méthodologie et éléments graphiques, est protégé par le droit d&apos;auteur et demeure la propriété
            exclusive de l&apos;éditeur. Toute reproduction ou réutilisation, totale ou partielle, sans
            autorisation écrite préalable est interdite.
          </p>
        </Bloc>

        <Bloc titre="Nature du service et limites">
          <p>
            {SITE.nom} est un service privé et indépendant. Il n&apos;entretient aucun lien avec l&apos;ANSSI,
            Cybermalveillance.gouv.fr ou toute autre autorité publique, et ne bénéficie d&apos;aucun agrément ou
            label délivré par elles.
          </p>
          <p>
            Les références à la directive (UE) 2022/2555 dite NIS2, au Référentiel Cyber France, aux guides de
            l&apos;ANSSI et à la méthode EBIOS Risk Manager sont faites à titre informatif et ne constituent ni un
            conseil juridique, ni une interprétation officielle de ces textes.
          </p>
          <p>
            <strong>
              La prestation consiste à constituer un dossier de réponse documenté et un plan d&apos;action. Elle ne
              constitue ni une certification, ni une attestation de conformité, ni une garantie de résultat auprès
              d&apos;un donneur d&apos;ordre ou d&apos;une autorité de contrôle.
            </strong>{" "}
            L&apos;exactitude des éléments déclarés dans le dossier relève de la responsabilité du client, qui
            valide chaque réponse avant transmission.
          </p>
        </Bloc>

        <Bloc titre="Droit applicable">
          <p>
            Les présentes mentions sont soumises au droit français. Tout litige relève de la compétence des
            tribunaux français.
          </p>
        </Bloc>
      </div>
    </div>
  );
}
