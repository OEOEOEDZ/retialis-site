import type { Metadata } from "next";
import { FormulaireEnvoi } from "@/components/FormulaireEnvoi";
import { OFFRE, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Faire analyser votre questionnaire de sécurité",
  description:
    "Envoyez le questionnaire reçu de votre client. Réponse sous 24 heures : ce qui bloque, ce qui est éliminatoire, et ce que ça coûte. Gratuit, sans engagement.",
};

const CE_QUON_RENVOIE = [
  {
    titre: "Le nombre de questions à problème",
    texte: "Sur les quatre-vingts lignes du fichier, combien vous exposent réellement, et lesquelles.",
  },
  {
    titre: "Les points éliminatoires",
    texte:
      "Ceux sur lesquels un évaluateur ne transige jamais. Il y en a rarement plus de cinq, et ils se corrigent presque toujours en quelques jours.",
  },
  {
    titre: "Le coût réel de la remise à niveau",
    texte:
      "En jours de travail et en euros. Une bonne partie des corrections attendues ne coûte rien, encore faut-il savoir lesquelles.",
  },
  {
    titre: "Ce que vous pouvez répondre dès maintenant",
    texte:
      "La formulation honnête à utiliser quand une mesure est en cours et pas encore terminée. C'est ce qui sauve la plupart des dossiers.",
  },
];

export default function Questionnaire() {
  return (
    <>
      <section className="wrap pt-14 pb-12 sm:pt-20">
        <div className="texte">
          <p className="text-[13px] font-semibold text-[var(--signal)]">Gratuit · sans engagement</p>
          <h1 className="mt-5 text-4xl sm:text-5xl">Envoyez-nous le questionnaire que vous avez reçu</h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--ink-2)]">
            Nous vous répondons sous {OFFRE.delaiReponseGratuite} avec une analyse écrite que vous pourrez utiliser même
            si nous n&apos;allons pas plus loin. C&apos;est aussi la meilleure façon de juger si nous connaissons le sujet
            avant de nous payer quoi que ce soit.
          </p>
        </div>
      </section>

      <section className="wrap pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <FormulaireEnvoi />

          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-semibold">Ce que vous recevez en retour</h2>
              <dl className="mt-5 space-y-5">
                {CE_QUON_RENVOIE.map((c) => (
                  <div key={c.titre} className="border-l-2 border-[var(--border-fort)] pl-4">
                    <dt className="font-medium">{c.titre}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-[var(--ink-2)]">{c.texte}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="text-base font-semibold">Ce que nous faisons de votre fichier</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--ink-2)]">
                <li>
                  Il sert <strong>uniquement</strong> à produire votre analyse. Il n&apos;est ni revendu, ni
                  partagé, ni déposé sur un service tiers.
                </li>
                <li>
                  Il est conservé le temps de l&apos;échange, puis supprimé sur simple demande de votre part.
                </li>
                <li>
                  Le nom de votre donneur d&apos;ordre ne nous intéresse pas : vous pouvez le masquer avant
                  envoi, l&apos;analyse reste identique.
                </li>
                <li>
                  Si vous êtes soumis à un accord de confidentialité, dites-le : nous signons un engagement avant que
                  vous n&apos;envoyiez quoi que ce soit.
                </li>
              </ul>
            </div>

            <div className="rounded-sm border border-[var(--border)] bg-[var(--surface-2)] p-6">
              <h2 className="text-base font-semibold">Vous n&apos;avez pas encore reçu de questionnaire ?</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-2)]">
                C&apos;est la meilleure position : vous avez le temps de vous préparer au lieu de subir un délai de
                trois semaines. Faites l&apos;auto-diagnostic, il vous situe en douze minutes.
              </p>
              <a href="/diagnostic" className="btn btn-contour mt-5 !py-2.5 text-sm">
                Faire l&apos;auto-diagnostic
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-14">
        <div className="wrap texte">
          <h2 className="text-xl font-semibold">Et si vous préférez simplement écrire</h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-2)]">
            Joignez le fichier reçu à un e-mail adressé à{" "}
            <a href={`mailto:${SITE.email}`} className="font-medium text-[var(--primary)] hover:underline">
              {SITE.email}
            </a>{" "}
            en précisant votre secteur, votre effectif et la date de retour attendue par votre client. C&apos;est
            tout ce dont nous avons besoin.
          </p>
        </div>
      </section>
    </>
  );
}
