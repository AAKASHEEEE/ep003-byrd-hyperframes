// Chunk J shared: camera helper, signal fire + magnesium flare on a pole, steaming soup bowl prop, 1930s ski-equipped high-wing monoplane.
import { r1 } from "../lib.mjs";
import { E } from "./e3.mjs";

export const cam = (sc, wx, wy, cx = 960, cy = 540) => ({ scale: sc, x: r1(cx - wx * sc), y: r1(cy - wy * sc) });

// Fire in a fuel canister standing on the snow at (fx, G). Ids: s-fire, s-flame.
export const signal = (s, G, fx) => `
  <g id="${s}-fire" opacity="0"><rect x="${fx - 16}" y="${G - 30}" width="32" height="30" rx="3" fill="#475569" stroke="#1F2937" stroke-width="3"/><rect x="${fx - 18}" y="${G - 33}" width="36" height="6" rx="2" fill="#64748B"/>
    <circle cx="${fx}" cy="${G - 52}" r="60" fill="${E.lamp}" opacity=".35" filter="url(#${s}-bloom)"/>
    <path id="${s}-flame" d="M${fx - 16} ${G - 32} Q${fx - 20} ${G - 60} ${fx - 4} ${G - 82} Q${fx} ${G - 62} ${fx + 6} ${G - 74} Q${fx + 20} ${G - 54} ${fx + 16} ${G - 32} Z" fill="#F97316"/>
    <path d="M${fx - 8} ${G - 32} Q${fx - 8} ${G - 50} ${fx} ${G - 62} Q${fx + 8} ${G - 48} ${fx + 8} ${G - 32} Z" fill="#FDE68A"/></g>`;

// Magnesium hand flare held in the left hand (rig prop): stick + crimson burst. Ids: p-flare, p-fglow.
export const handFlare = (p, s) => ({ side: "L", svg: `<g id="${p}-flare" opacity="0"><line x1="44" y1="182" x2="36" y2="132" stroke="#7F1D1D" stroke-width="7" stroke-linecap="round"/>
  <circle id="${p}-fglow" cx="35" cy="124" r="60" fill="#EF4444" opacity=".6" filter="url(#${s}-bloom)" style="mix-blend-mode:screen"/><circle cx="35" cy="124" r="11" fill="#FECACA"/><circle cx="35" cy="124" r="6" fill="#fff"/></g>` });

// Steaming tin bowl held in the right hand (rig prop).
export const bowl = (p) => ({ side: "R", svg: `<g id="${p}-bowl" opacity="0"><path d="M140 172 L176 172 Q174 192 158 192 Q142 192 140 172 Z" fill="#CBD5E1" stroke="#64748B" stroke-width="2.5"/>
  <ellipse cx="158" cy="172" rx="18" ry="4" fill="#B45309"/><g id="${p}-steam" fill="none" stroke="#F8FAFC" stroke-width="2.5" stroke-linecap="round" opacity=".8">
  <path d="M150 166 q-5 -8 0 -16 q5 -8 0 -16"/><path d="M160 166 q-5 -8 0 -16 q5 -8 0 -16"/><path d="M170 166 q-5 -8 0 -16 q5 -8 0 -16"/></g></g>` });

// High-wing ski monoplane (Pilgrim-style), nose toward +x (cone + spinning prop disc), skis resting on y = 0.
export function plane(id) {
  return `<g id="${id}">
    <path d="M6 -70 L24 -118 L46 -118 L56 -74 Z" fill="#B91C1C" stroke="#450A0A" stroke-width="3"/>
    <path d="M10 -62 Q14 -84 60 -86 L214 -90 Q240 -90 252 -76 L262 -66 Q258 -48 232 -44 L60 -42 Q16 -42 10 -62 Z" fill="#E5E7EB" stroke="#334155" stroke-width="3"/>
    <path d="M252 -76 Q276 -70 280 -64 Q276 -58 262 -54 L250 -50 Z" fill="#94A3B8" stroke="#334155" stroke-width="3"/><circle cx="281" cy="-64" r="5" fill="#1F2937"/>
    <ellipse id="${id}-prop" cx="284" cy="-64" rx="5" ry="40" fill="#CBD5E1" opacity=".55" stroke="#64748B" stroke-width="2"/>
    ${[96, 130, 164].map((x) => `<rect x="${x}" y="-80" width="24" height="18" rx="3" fill="#7DD3FC" stroke="#1E293B" stroke-width="2"/>`).join("")}
    <rect x="80" y="-110" width="150" height="14" rx="6" fill="#B91C1C" stroke="#450A0A" stroke-width="3"/>
    <line x1="120" y1="-96" x2="132" y2="-84" stroke="#334155" stroke-width="4"/><line x1="200" y1="-96" x2="190" y2="-86" stroke="#334155" stroke-width="4"/>
    <line x1="140" y1="-44" x2="128" y2="-8" stroke="#334155" stroke-width="5"/><line x1="196" y1="-44" x2="206" y2="-8" stroke="#334155" stroke-width="5"/>
    <path d="M102 -6 L226 -6 Q242 -6 246 -16" fill="none" stroke="#1F2937" stroke-width="7" stroke-linecap="round"/>
    <path d="M22 -44 L28 -8 M10 -6 L48 -6" fill="none" stroke="#1F2937" stroke-width="5" stroke-linecap="round"/>
  </g>`;
}
