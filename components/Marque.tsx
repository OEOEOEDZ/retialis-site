/**
 * LA MARQUE RETIALIS
 *
 * Un filet, tiré du nom : « rete » en latin, le filet du retiarius, le
 * gladiateur qui protégeait au lieu d'attaquer. Le logo raconte donc le nom,
 * ce qui donne une phrase à dire en rendez-vous.
 *
 * Dessiné en SVG pur, sans image à charger. Deux variantes :
 *   `Marque`      le sceau plein, pour le logo et le favicon
 *   `MarqueTrait` le filet seul, sans fond, pour les usages décoratifs en grand
 *
 * Contrainte de lisibilité : les traits restent épais et le nœud central est
 * ambre, de façon à rester identifiable à 24 px dans un onglet.
 */

/** Les cinq sommets du filet, plus le nœud central. */
const SOMMETS = [
  [60, 20],
  [96, 46],
  [82, 89],
  [38, 89],
  [24, 46],
] as const;

const NOEUD = [60, 56] as const;

function Filet({ couleur, epaisseur }: { couleur: string; epaisseur: number }) {
  const contour = SOMMETS.map(([x, y]) => `${x} ${y}`).join(" L ");
  return (
    <g stroke={couleur} strokeWidth={epaisseur} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M ${contour} Z`} />
      {SOMMETS.map(([x, y], i) => (
        <path key={i} d={`M ${NOEUD[0]} ${NOEUD[1]} L ${x} ${y}`} />
      ))}
    </g>
  );
}

/** Logo principal : filet blanc sur pastille bleue, nœud ambre. */
export function Marque({ taille = 40, className = "" }: { taille?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={taille}
      height={taille}
      className={className}
      role="img"
      aria-label="Retialis"
    >
      <rect x="0" y="0" width="120" height="120" rx="30" fill="var(--primary)" />
      <Filet couleur="#fff" epaisseur={7} />
      <circle cx={NOEUD[0]} cy={NOEUD[1]} r="11" fill="var(--ambre)" stroke="#fff" strokeWidth="5" />
    </svg>
  );
}

/** Filet seul, sans fond : pour les grandes tailles décoratives. */
export function MarqueTrait({
  taille = 200,
  couleur = "var(--primary)",
  className = "",
}: {
  taille?: number;
  couleur?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={taille}
      height={taille}
      className={`marque-trait ${className}`}
      aria-hidden
    >
      <Filet couleur={couleur} epaisseur={5} />
      <circle cx={NOEUD[0]} cy={NOEUD[1]} r="10" fill="var(--ambre)" stroke={couleur} strokeWidth="4" />
      {SOMMETS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.5" fill={couleur} />
      ))}
    </svg>
  );
}
