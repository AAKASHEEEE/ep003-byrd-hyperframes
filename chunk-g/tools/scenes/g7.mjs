// Chunk G shared: hut interior framing + a jiggling copy of the floor generator (with a red kill switch) + CO haze.
import { r1 } from "../lib.mjs";
import { E } from "./e3.mjs";
export const RS = 2.2, RXs = 388, RYs = 188;
export const sx = (x) => r1(x * RS + RXs), sy = (y) => r1(y * RS + RYs);
// room-local generator copy (same footprint as room()'s) + kill switch; wrap in a group you can jiggle
export const gen = (s) => `<g id="${s}-gen"><rect x="462" y="280" width="52" height="40" rx="4" fill="#475569" stroke="#1F2937" stroke-width="3"/><circle cx="480" cy="300" r="13" fill="#334155" stroke="#1F2937" stroke-width="3"/>
  <rect x="500" y="262" width="7" height="20" fill="#64748B"/><g id="${s}-sw"><rect x="498" y="290" width="6" height="16" rx="2" fill="${E.warn}"/></g></g>`;
export const haze = (s, n = 7) => Array.from({ length: n }, (_, i) => `<circle class="${s}-hz" cx="${200 + ((i * 97) % 300)}" cy="${120 + ((i * 53) % 160)}" r="${60 + (i % 3) * 20}" fill="${i % 2 ? E.haze : E.co}" opacity=".45" filter="url(#${s}-soft)"/>`).join("");
