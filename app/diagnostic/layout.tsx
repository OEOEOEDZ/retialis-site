import type { Metadata } from "next";

/**
 * La page du diagnostic est un composant client (elle tient un état de
 * réponses), et un composant client ne peut pas exporter `metadata`. Sans ce
 * layout, elle hérite du titre et de la description de l'accueil : deux URL
 * indexables portant le même titre, ce que les moteurs traitent comme du
 * contenu dupliqué.
 */
export const metadata: Metadata = {
  title: "Auto-diagnostic de sécurité",
  description:
    "Quarante questions, dix minutes, un score par thème et le plan d'action daté. Sans inscription : vos réponses ne quittent pas votre navigateur.",
};

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
