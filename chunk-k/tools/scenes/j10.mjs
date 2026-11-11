// Chunk J shared: camera helper, signal fire + magnesium flare on a pole, steaming soup bowl prop, 1930s ski-equipped high-wing monoplane.
import { r1 } from "../lib.mjs";
import { E } from "./e3.mjs";

export const cam = (sc, wx, wy, cx = 960, cy = 540) => ({ scale: sc, x: r1(cx - wx * sc), y: r1(cy - wy * sc) });

// Fire canister at (fx, G) and a crimson flare atop a pole at (px, G). Ids: s-fire, s-flare, s-fglow.
export const signal = (s, G, fx, px) => `
  <g id="${s}-fire" opacity="0"><rect x="${fx - 16}" y="${G - 30}" width="32" height="30" rx="3" fill="#475569" stroke="#1F2937" stroke-width="3"/>
    <circle cx="${fx}" cy="${G - 52}" r="60" fill="${E.lamp}" opacity=".35" filter="url(#${s}-bloom)"/>
    <path id="${s}-flame" d="M${fx - 16} ${G - 30} Q${fx - 20} ${G - 60} ${fx - 4} ${G - 82} Q${fx} ${G - 62} ${fx + 6} ${G - 74} Q${fx + 20} ${G - 54} ${fx + 16} ${G - 30} Z" fill="#F97316"/>
    <path d="M${fx - 8} ${G - 30} Q${fx - 8} ${G - 50} ${fx} ${G - 62} Q${fx + 8} ${G - 48} ${fx + 8} ${G - 30} Z" fill="#FDE68A"/></g>
  <line x1="${px}" y1="${G}" x2="${px}" y2="${G - 170}" stroke="#94A3B8" stroke-width="6"/>
  <g id="${s}-flare" opacity="0"><circle id="${s}-fglow" cx="${px}" cy="${G - 180}" r="120" fill="#EF4444" opacity=".55" filter="url(#${s}-bloom)" style="mix-blend-mode:screen"/>
    <circle cx="${px}" cy="${G - 180}" r="16" fill="#FECACA"/><circle cx="${px}" cy="${G - 180}" r="9" fill="#fff"/></g>`;

// Steaming tin bowl held in the right hand (rig prop).
export const bowl = (p) => ({ side: "R", svg: `<g id="${p}-bowl" opacity="0"><path d="M140 172 L176 172 Q174 192 158 192 Q142 192 140 172 Z" fill="#CBD5E1" stroke="#64748B" stroke-width="2.5"/>
  <ellipse cx="158" cy="172" rx="18" ry="4" fill="#B45309"/><g id="${p}-steam" fill="none" stroke="#F8FAFC" stroke-width="2.5" stroke-linecap="round" opacity=".8">
  <path d="M150 166 q-5 -8 0 -16 q5 -8 0 -16"/><path d="M160 166 q-5 -8 0 -16 q5 -8 0 -16"/><path d="M170 166 q-5 -8 0 -16 q5 -8 0 -16"/></g></g>` });

// High-wing ski monoplane (Pilgrim-style), nose toward +x, skis on y = 0. Optional cabin heads.
export function plane(id, o = {}) {
  const heads = (o.heads || 0) ? [96, 124].slice(0, o.heads).map((x) => `<circle cx="${x}" cy="-58" r="9" fill="#14171F"/><ellipse cx="${x - 3}" cy="-60" rx="2" ry="3" fill="#fff"/><ellipse cx="${x + 3}" cy="-60" rx="2" ry="3" fill="#fff"/>`).join("") : "";
  return `<g id="${id}"><g transform="translate(0 5)">
    <path d="M10 -62 L30 -110 L48 -110 L52 -66 Z" fill="#B91C1C" stroke="#450A0A" stroke-width="3"/>
    <path d="M14 -50 Q16 -74 60 -76 L210 -82 Q236 -82 240 -64 Q238 -40 210 -38 L60 -36 Q20 -36 14 -50 Z" fill="#E5E7EB" stroke="#334155" stroke-width="3"/>
    <rect x="80" y="-74" width="64" height="24" rx="4" fill="#1E293B"/>${heads}
    <rect x="70" y="-98" width="150" height="14" rx="6" fill="#B91C1C" stroke="#450A0A" stroke-width="3"/>
    <line x1="110" y1="-84" x2="128" y2="-66" stroke="#334155" stroke-width="4"/><line x1="190" y1="-84" x2="170" y2="-62" stroke="#334155" stroke-width="4"/>
    <circle cx="238" cy="-60" r="14" fill="#334155"/><g id="${id}-prop"><rect x="246" y="-96" width="7" height="72" rx="3" fill="#1F2937"/></g>
    <line x1="140" y1="-38" x2="126" y2="-8" stroke="#334155" stroke-width="5"/><line x1="190" y1="-38" x2="200" y2="-8" stroke="#334155" stroke-width="5"/>
    <path d="M100 -8 L222 -8 Q236 -8 238 -18" fill="none" stroke="#1F2937" stroke-width="7" stroke-linecap="round"/>
    <path d="M20 -38 L26 -8 M10 -8 L46 -8" fill="none" stroke="#1F2937" stroke-width="5" stroke-linecap="round"/>
  </g></g>`;
}
