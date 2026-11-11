// Chunk E props: bamboo trail stick, ghost wireframes, 7-part board.
import { C, r1 } from "../lib.mjs";
// Segmented bamboo stick with a cloth flag; base sunk 15 px below y = g.
export const bamboo = (id, x, g, h = 150) => `<g id="${id}"><rect x="${x - 5}" y="${g - h}" width="10" height="${h + 15}" rx="4" fill="#D97706" stroke="#92400E" stroke-width="2"/>
  ${[0.25, 0.5, 0.75].map((f) => `<line x1="${x - 6}" y1="${r1(g - h + h * f)}" x2="${x + 6}" y2="${r1(g - h + h * f)}" stroke="#92400E" stroke-width="3"/>`).join("")}
  <path d="M${x + 5} ${g - h + 4} l34 8 l-34 10 z" fill="#EA580C"/></g>`;
export const MX = (i) => 192 + i * 226;
// 7-part board (cards 1..lit cyan); returns body html.
export const board = (s, lit) => `<svg class="stage" viewBox="0 0 1920 1080"><line x1="${MX(0) + 90}" y1="590" x2="${MX(6) + 90}" y2="590" stroke="#475569" stroke-width="6" stroke-dasharray="18 14"/></svg>
  ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<div id="${s}-m${i}" class="e-mono" style="left:${MX(i)}px; top:400px;${i < lit ? ` color:${C.cyan}; border-color:${C.cyan};` : ""}">${i + 1}</div>`).join("")}`;
// Legs-only walk (keeps whatever the arms are holding — torches stay aimed).
export function legs(p, t0, t1, sp = 0.27, swing = 16) {
  const out = [];
  let i = 0;
  for (let t = t0; t < t1 - 0.05; t += sp, i++) {
    const sg = i % 2 ? 1 : -1;
    out.push(`tl.to("#${p}-legL", { rotation: ${sg * swing}, duration: ${sp}, ease: "sine.inOut" }, ${r1(t)});`);
    out.push(`tl.to("#${p}-legR", { rotation: ${-sg * swing}, duration: ${sp}, ease: "sine.inOut" }, ${r1(t)});`);
  }
  out.push(`tl.to(["#${p}-legL", "#${p}-legR"], { rotation: 0, duration: 0.2 }, ${r1(t1)});`);
  return out.join("\n    ");
}
