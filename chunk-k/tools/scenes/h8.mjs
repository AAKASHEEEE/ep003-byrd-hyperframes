// Chunk H shared: Little America radio shack (screen coords, floor y = 860), headphones + spectacles headwear, Byrd-at-the-key inset.
import { r1 } from "../lib.mjs";
import { E, room, byrd } from "./e3.mjs";

// Headphones over a fur hood (inside the head group, so they follow the head).
export const PHONES = `<path d="M52 60 A48 48 0 0 1 148 60" fill="none" stroke="#1F2937" stroke-width="7" stroke-linecap="round"/>
  <rect x="44" y="50" width="14" height="26" rx="6" fill="#334155" stroke="#0B0F17" stroke-width="2.5"/><rect x="142" y="50" width="14" height="26" rx="6" fill="#334155" stroke="#0B0F17" stroke-width="2.5"/>`;
// Wire spectacles around the white eyes.
export const SPECS = `<g fill="none" stroke="#E5E7EB" stroke-width="2.6"><circle cx="88" cy="62" r="13"/><circle cx="112" cy="62" r="13"/><path d="M101 60 Q100 57 99 60"/><line x1="75" y1="60" x2="62" y2="56"/><line x1="125" y1="60" x2="138" y2="56"/></g>`;

// Little America radio shack: warm plank wall, shelf, hanging lamp, long table (top y 760) with a big receiver (x 660–900).
export function shack(s, o = {}) {
  const x0 = o.x0 ?? 0, w = o.w ?? 1100;
  const planks = Array.from({ length: 10 }, (_, i) => `<line x1="${x0}" y1="${170 + i * 70}" x2="${x0 + w}" y2="${170 + i * 70}" stroke="#7A4A22" stroke-width="3"/>`).join("");
  return `<g id="${s}-shack">
    <rect x="${x0}" y="100" width="${w}" height="760" fill="#9A6331"/>${planks}
    <rect x="${x0}" y="860" width="${w}" height="220" fill="#5B3A1E"/><rect x="${x0}" y="856" width="${w}" height="8" fill="#3F2814"/>
    <g id="${s}-lamp"><line x1="${x0 + 300}" y1="100" x2="${x0 + 300}" y2="220" stroke="#1F2937" stroke-width="4"/>
      <circle id="${s}-lglow" cx="${x0 + 300}" cy="250" r="190" fill="${E.lamp}" opacity=".28" filter="url(#${s}-bloom)"/>
      <path d="M${x0 + 270} 250 L${x0 + 330} 250 L${x0 + 316} 220 L${x0 + 284} 220 Z" fill="#1F2937"/><circle cx="${x0 + 300}" cy="254" r="10" fill="#FDE68A"/></g>
    <rect x="${x0 + 640}" y="300" width="300" height="12" fill="#5B3A1E"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${x0 + 660 + i * 34}" y="${248 + (i % 2) * 8}" width="26" height="${52 - (i % 2) * 8}" fill="${["#7F1D1D", "#1E3A8A", "#14532D", "#78350F", "#334155"][i]}"/>`).join("")}
    <rect x="${x0 + 600}" y="760" width="440" height="16" fill="#5B3A1E"/><rect x="${x0 + 612}" y="776" width="12" height="84" fill="#3F2814"/><rect x="${x0 + 1016}" y="776" width="12" height="84" fill="#3F2814"/>
    <g id="${s}-rx"><rect x="${x0 + 660}" y="612" width="240" height="148" rx="8" fill="#1F2937" stroke="#0B0F17" stroke-width="4"/>
      <rect x="${x0 + 678}" y="630" width="96" height="56" rx="4" fill="#052E2B"/><path id="${s}-wave" d="M${x0 + 682} 658 q8 -14 16 0 q8 14 16 0 q8 -14 16 0 q8 14 16 0 q8 -14 16 0 q8 14 16 0" fill="none" stroke="#22D3EE" stroke-width="3"/>
      ${[0, 1, 2].map((i) => `<circle cx="${x0 + 800 + i * 34}" cy="660" r="12" fill="#94A3B8" stroke="#0B0F17" stroke-width="3"/>`).join("")}
      ${Array.from({ length: 5 }, (_, i) => `<line x1="${x0 + 690}" y1="${704 + i * 10}" x2="${x0 + 880}" y2="${704 + i * 10}" stroke="#374151" stroke-width="4"/>`).join("")}</g>
    <rect x="${x0 + 930}" y="736" width="44" height="12" rx="3" fill="#B08D3C"/><line x1="${x0 + 936}" y1="734" x2="${x0 + 966}" y2="726" stroke="#8A6D2F" stroke-width="5" stroke-linecap="round"/>
  </g>`;
}

// Advance Base inset: room close on the radio table, Byrd (gaunt) at the key. Returns svg markup in room coords; place with a transform.
export const keyRoom = (s, p, o = {}) => `${room(s, { pipeTop: 0 })}<g transform="translate(${300 - 100 * 0.78} ${r1(320 - 265 * 0.78)}) scale(.78)">${byrd(p, s, { outfit: "sweater", gaunt: true, ...o })}</g>`;
