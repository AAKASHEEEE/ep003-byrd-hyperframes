// Chunk E artwork: revenue cutter, reindeer icon, gold medal, qulliq lamp, heater, furnace flame, pickaxe, route sampling.
import { C, r1 } from "../lib.mjs";

// USRC-style steam cutter, ~520 wide, waterline at y 0.
export function cutter() {
  return `<g>
    <path d="M0 -20 H500 L470 40 H40 Z" fill="#111827" stroke="#0B101E" stroke-width="4"/>
    <rect x="20" y="-28" width="470" height="10" fill="#F8FAFC"/>
    <rect x="170" y="-80" width="160" height="54" fill="#F8FAFC" stroke="#0B101E" stroke-width="3"/>
    <g fill="#1E3A5F">${[0, 1, 2, 3].map((i) => `<rect x="${184 + i * 36}" y="-66" width="22" height="16"/>`).join("")}</g>
    <rect x="240" y="-150" width="34" height="72" fill="#D4A373" stroke="#0B101E" stroke-width="3"/><rect x="240" y="-150" width="34" height="12" fill="#0B101E"/>
    <g stroke="#3A2410" stroke-width="5"><line x1="110" y1="-24" x2="110" y2="-210"/><line x1="400" y1="-24" x2="400" y2="-200"/></g>
    <g stroke="#94A3B8" stroke-width="2"><line x1="110" y1="-210" x2="10" y2="-22"/><line x1="110" y1="-210" x2="400" y2="-200"/><line x1="400" y1="-200" x2="496" y2="-22"/></g>
    <path d="M110 -150 H70 M110 -110 H60" stroke="#3A2410" stroke-width="4"/>
  </g>`;
}

// Reindeer icon drawn at the origin (body centre), facing right.
export function deer(fill = "#F8FAFC", stroke = fill) {
  return `<g fill="${fill}" stroke="${stroke}" stroke-linecap="round">
    <ellipse cx="0" cy="0" rx="34" ry="15"/>
    <path d="M26 -6 L44 -28 L56 -26 L50 -18 L34 -4 Z"/>
    <g stroke-width="4" fill="none"><path d="M46 -28 L40 -50 L32 -60 M40 -50 L50 -60 M44 -40 L56 -46"/><path d="M50 -27 L52 -48 L62 -56"/></g>
    <g stroke-width="5"><line x1="-24" y1="8" x2="-28" y2="34"/><line x1="-12" y1="10" x2="-8" y2="34"/><line x1="16" y1="10" x2="12" y2="34"/><line x1="26" y1="8" x2="30" y2="34"/></g>
  </g>`;
}

export function medal(s) {
  return `<g>
    <path d="M-50 -230 L-10 -90 H10 L50 -230 Z" fill="#1E3A8A"/><path d="M-18 -230 L-2 -90 H2 L18 -230 Z" fill="${C.red}"/>
    <circle r="110" fill="${C.gold}" stroke="#92400E" stroke-width="8" filter="url(#${s}-glow)"/>
    <circle r="84" fill="none" stroke="#FDE68A" stroke-width="5"/>
    <path d="M0 -52 L14 -16 L52 -16 L22 8 L32 46 L0 24 L-32 46 L-22 8 L-52 -16 L-14 -16 Z" fill="#FDE68A" stroke="#92400E" stroke-width="3"/>
  </g>`;
}

// Stone qulliq lamp: half-moon dish, wick edge along the straight side (y 0), width 300.
export function qulliq(id) {
  const flames = [-110, -66, -22, 22, 66, 110].map((x, i) => `<g transform="translate(${x} -4)"><g id="${id}-f${i}"><path d="M0 0 C-16 -14 -10 -40 0 -62 C10 -40 16 -14 0 0 Z" fill="${C.amber}"/><path d="M0 0 C-8 -10 -5 -24 0 -36 C5 -24 8 -10 0 0 Z" fill="${C.lamp}"/></g></g>`).join("");
  return `<g>
    <path d="M-150 0 H150 Q140 70 0 80 Q-140 70 -150 0 Z" fill="#78716C" stroke="#292524" stroke-width="5"/>
    <path d="M-136 4 H136 Q120 30 0 34 Q-120 30 -136 4 Z" fill="#CA8A04" opacity=".8"/>
    ${flames}
  </g>`;
}

export function heater(id, s, w = 320, h = 220) {
  const fins = Array.from({ length: 7 }, (_, i) => `<rect x="${r1(18 + i * ((w - 36) / 7))}" y="26" width="${r1((w - 36) / 7 - 10)}" height="${h - 52}" rx="10" fill="#C2410C"/>`).join("");
  return `<g>
    <rect id="${id}-glow" x="-40" y="-40" width="${w + 80}" height="${h + 80}" rx="40" fill="${C.amber}" opacity=".0" filter="url(#${s}-bloom)"/>
    <rect width="${w}" height="${h}" rx="18" fill="${C.amber}" stroke="#0B101E" stroke-width="5"/>${fins}
    <rect x="12" y="${h}" width="24" height="18" fill="#334155"/><rect x="${w - 36}" y="${h}" width="24" height="18" fill="#334155"/>
  </g>`;
}

export function flame(sc = 1) {
  return `<g transform="scale(${sc})"><path d="M0 0 C-22 -18 -14 -54 0 -84 C14 -54 22 -18 0 0 Z" fill="${C.amber}"/><path d="M0 0 C-10 -12 -7 -30 0 -46 C7 -30 10 -12 0 0 Z" fill="${C.lamp}"/></g>`;
}

export function valve(id) {
  return `<g transform="translate(0 0)"><g id="${id}"><circle r="34" fill="none" stroke="${C.red}" stroke-width="8"/>
    <line x1="-34" y1="0" x2="34" y2="0" stroke="${C.red}" stroke-width="6"/><line x1="0" y1="-34" x2="0" y2="34" stroke="${C.red}" stroke-width="6"/><circle r="8" fill="#0B101E"/></g></g>`;
}

// Pickaxe prop held in the right hand of the Scout rig (hand at 156,178), handle pointing up.
export const PICK = { side: "R", svg: `<g><line x1="156" y1="196" x2="156" y2="60" stroke="#7C4A1E" stroke-width="8" stroke-linecap="round"/>
  <path d="M112 74 Q156 46 204 74 L198 82 Q156 62 116 82 Z" fill="#94A3B8" stroke="#0B101E" stroke-width="3"/></g>` };

// Points along a polyline at fraction f of its length.
export function along(pts, f) {
  const seg = []; let L = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let t = Math.max(0, Math.min(1, f)) * L;
  for (let i = 0; i < seg.length; i++) {
    if (t <= seg[i] || i === seg.length - 1) { const k = seg[i] ? t / seg[i] : 0; return [r1(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k), r1(pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k)]; }
    t -= seg[i];
  }
}

export const NT_CSS = `
  .nt { position: absolute; width: 420px; padding: 10px 0 12px; border-radius: 12px; background: rgba(17,24,39,.94); border-top: 6px solid ${C.amber};
    text-align: center; font-family: "Archivo Black", sans-serif; font-size: 28px; color: #fff; white-space: nowrap; box-shadow: 0 10px 30px rgba(0,0,0,.45); }
  .nt small { display: block; font-family: Inter, sans-serif; font-weight: 800; font-size: 28px; letter-spacing: .06em; color: ${C.cyan}; }`;
