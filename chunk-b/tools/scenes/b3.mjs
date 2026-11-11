// Chunk B props: Little America (ship, Curtiss Condor biplane, radio towers, underground huts + tunnels), France outline, crew avatars.
import { C, r1, scout } from "../lib.mjs";
import { E } from "./e3.mjs";

// Wooden barquentine with a funnel (Bear of Oakland style), waterline at y = wy, bow toward +x.
export function ship(x, wy) {
  return `<g transform="translate(${x} ${wy})">
    <path d="M0 -40 L250 -40 L290 -62 L276 -20 Q250 18 30 18 Q8 10 0 -40 Z" fill="#3B2414" stroke="#1C1209" stroke-width="3"/>
    <rect x="4" y="-46" width="270" height="8" fill="#5C3A21"/><line x1="10" y1="-22" x2="270" y2="-22" stroke="#CBD5E1" stroke-width="3" opacity=".7"/>
    <rect x="128" y="-96" width="22" height="50" fill="#111827"/><rect x="126" y="-100" width="26" height="8" fill="#DC2626"/>
    ${[[60, 200], [190, 220], [250, 170]].map(([mx, h]) => `<line x1="${mx}" y1="-46" x2="${mx}" y2="${-46 - h}" stroke="#2B1A0C" stroke-width="5"/>
      <line x1="${mx - 40}" y1="${-46 - h * 0.7}" x2="${mx + 40}" y2="${-46 - h * 0.7}" stroke="#2B1A0C" stroke-width="4"/><rect x="${mx - 36}" y="${-46 - h * 0.7}" width="72" height="9" rx="4" fill="#D6CBB5"/>
      <line x1="${mx - 30}" y1="${-46 - h * 0.4}" x2="${mx + 30}" y2="${-46 - h * 0.4}" stroke="#2B1A0C" stroke-width="4"/><rect x="${mx - 27}" y="${-46 - h * 0.4}" width="54" height="8" rx="4" fill="#D6CBB5"/>`).join("")}
    <path d="M250 -216 L290 -62" stroke="#2B1A0C" stroke-width="2"/></g>`;
}
// Curtiss Condor biplane on skis, nose toward +x, skis on y = g.
export function biplane(x, g) {
  return `<g transform="translate(${x} ${g})">
    <rect x="0" y="-26" width="18" height="8" rx="3" fill="#94A3B8"/><rect x="200" y="-26" width="22" height="8" rx="3" fill="#94A3B8"/>
    <line x1="10" y1="-18" x2="10" y2="-60" stroke="#334155" stroke-width="4"/><line x1="210" y1="-18" x2="210" y2="-56" stroke="#334155" stroke-width="4"/>
    <path d="M-20 -78 Q100 -100 250 -84 L262 -66 L250 -50 Q100 -44 -20 -62 Z" fill="#F59E0B" stroke="#7A4E05" stroke-width="3"/>
    <path d="M-60 -82 L-20 -78 L-20 -62 L-56 -66 Z" fill="#F59E0B"/><polygon points="-70,-120 -42,-82 -64,-82" fill="#F59E0B" stroke="#7A4E05" stroke-width="2"/>
    <rect x="40" y="-130" width="190" height="10" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/><rect x="30" y="-58" width="200" height="9" rx="4" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
    <line x1="70" y1="-120" x2="70" y2="-58" stroke="#475569" stroke-width="3"/><line x1="200" y1="-120" x2="200" y2="-58" stroke="#475569" stroke-width="3"/>
    <rect x="186" y="-98" width="16" height="24" rx="5" fill="#334155"/><rect x="186" y="-60" width="16" height="22" rx="5" fill="#334155"/>
    <circle cx="262" cy="-66" r="9" fill="#334155"/><rect x="258" y="-96" width="7" height="60" rx="3" fill="#475569" opacity=".6"/>
    ${[110, 136, 162].map((wx) => `<rect x="${wx}" y="-86" width="16" height="12" rx="2" fill="#1E3A5F"/>`).join("")}</g>`;
}
// Lattice radio tower, base on y = g.
export function tower(x, g, h = 300) {
  const rungs = Array.from({ length: Math.floor(h / 30) }, (_, i) => { const y = g - 30 - i * 30, w = 24 * (1 - (i * 30) / h) + 4; return `<line x1="${r1(x - w)}" y1="${y}" x2="${r1(x + w)}" y2="${y - 30}" stroke="#94A3B8" stroke-width="2"/>`; }).join("");
  return `<g><line x1="${x - 28}" y1="${g}" x2="${x - 3}" y2="${g - h}" stroke="#CBD5E1" stroke-width="4"/><line x1="${x + 28}" y1="${g}" x2="${x + 3}" y2="${g - h}" stroke="#CBD5E1" stroke-width="4"/>${rungs}
    <circle cx="${x}" cy="${g - h - 4}" r="5" fill="#DC2626"/></g>`;
}
// Underground hut (pine) with lit windows; top-left at (x, y).
export function hut(x, y, w = 240, h = 140) {
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="4"/>
    ${[1, 2, 3].map((i) => `<line x1="${x}" y1="${y + (h / 4) * i}" x2="${x + w}" y2="${y + (h / 4) * i}" stroke="${E.pineDk}" stroke-width="2"/>`).join("")}
    <rect x="${x + 24}" y="${y + 40}" width="44" height="34" fill="${E.lamp}"/><rect x="${x + w - 68}" y="${y + 40}" width="44" height="34" fill="${E.lamp}"/>
    <rect x="${x + w / 2 - 20}" y="${y + h - 70}" width="40" height="70" fill="#2B1A0C"/>
    <circle cx="${x + w / 2}" cy="${y + h / 2}" r="${w * 0.6}" fill="${E.lamp}" opacity=".18" filter="url(#lamp-bloom)"/></g>`;
}
// Simplified France hexagon (Brittany west, Corsica SE), centred on (cx, cy), height hpx.
export function france(cx, cy, hpx) {
  const P = [[-0.08, -0.5], [0.12, -0.44], [0.3, -0.33], [0.46, -0.2], [0.44, -0.02], [0.4, 0.12], [0.48, 0.3], [0.3, 0.42], [0.14, 0.38], [0.02, 0.5],
    [-0.2, 0.44], [-0.3, 0.3], [-0.32, 0.08], [-0.42, -0.04], [-0.56, -0.12], [-0.4, -0.2], [-0.26, -0.26], [-0.2, -0.4]];
  const d = "M" + P.map(([x, y]) => `${r1(cx + x * hpx)} ${r1(cy + y * hpx)}`).join(" L") + "Z";
  const cor = `M${r1(cx + 0.6 * hpx)} ${r1(cy + 0.38 * hpx)} l${r1(0.04 * hpx)} ${r1(0.05 * hpx)} l${r1(-0.01 * hpx)} ${r1(0.1 * hpx)} l${r1(-0.04 * hpx)} ${r1(-0.06 * hpx)} Z`;
  return { d, cor };
}
// Small explorer avatar (head + eyes + parka torso) for map callouts, 0..1 scale box ~ 60 x 90.
export function avatar(id, x, y, coat) {
  return `<g transform="translate(${x} ${y})"><g id="${id}"><rect x="-22" y="0" width="44" height="50" rx="16" fill="${coat}" stroke="#14171F" stroke-width="3"/>
    <circle cx="0" cy="-16" r="22" fill="#A47148"/><circle cx="0" cy="-16" r="17" fill="#14171F"/>
    <ellipse cx="-6" cy="-18" rx="4" ry="5.5" fill="#fff"/><ellipse cx="6" cy="-18" rx="4" ry="5.5" fill="#fff"/></g></g>`;
}
export const crew = (p, s, outfit, o = {}) => scout(p, s, { outfit, noWatch: true, hand: "#3B2414", facing: "front", front: o.front, props: o.props });
