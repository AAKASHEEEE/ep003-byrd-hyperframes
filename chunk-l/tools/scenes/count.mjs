// L03 (37.4–50.5): COUNT IT UP — five columns snap open left to right on the beats: 9 × 13 FT HUT · 123 MILES FROM HELP · MONTHS WITHOUT A SUNRISE ·
//   2 FAILED RESCUE ATTEMPTS · (amber) 136 DAYS → 4+ MONTHS ALONE.
// VO (local = abs − 37.4): "Count it up. (0.12–0.78) A hut nine feet by thirteen. (1.22–3.23) One hundred twenty-three miles from help. (3.70–5.81)
//   Months without a sunrise. (6.28–7.76) Two rescue attempts that failed. (8.18–9.87) And more than four months alone. (10.27–11.86) [+0.7]"
import { C, r1, scene } from "../lib.mjs";
import { KIT_CSS, hide, count } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS } from "./e3.mjs";

const CW = 330, CX = (i) => 99 + i * 348, CY = 250, CH = 600, AMB = "#FF7A00";
export function build() {
  const s = "ct";
  const icons = [
    `<g><path d="M60 110 L165 60 L270 110 L165 160 Z" fill="#B98A5A" stroke="#5C3A21" stroke-width="4"/><path d="M60 110 L60 170 L165 220 L165 160 Z" fill="#8C6A4A" stroke="#5C3A21" stroke-width="4"/><path d="M270 110 L270 170 L165 220 L165 160 Z" fill="#6B4226" stroke="#5C3A21" stroke-width="4"/></g>`,
    `<g><circle cx="50" cy="140" r="16" fill="${E.lamp}"/><circle cx="280" cy="140" r="16" fill="${C.cyan}"/><path d="M70 140 L262 140" stroke="#94A3B8" stroke-width="8" stroke-dasharray="18 12"/></g>`,
    `<g><circle cx="165" cy="140" r="46" fill="#FACC15" opacity=".35"/>${Array.from({ length: 8 }, (_, i) => `<line x1="165" y1="140" x2="${r1(165 + 74 * Math.cos((i * Math.PI) / 4))}" y2="${r1(140 + 74 * Math.sin((i * Math.PI) / 4))}" stroke="#FACC15" stroke-width="5" opacity=".35"/>`).join("")}<circle cx="165" cy="140" r="82" fill="none" stroke="${E.warn}" stroke-width="10"/><line x1="107" y1="198" x2="223" y2="82" stroke="${E.warn}" stroke-width="10"/></g>`,
    `<g>${[100, 230].map((x) => `<g><rect x="${x - 48}" y="110" width="96" height="44" rx="6" fill="#57534E"/><rect x="${x - 20}" y="86" width="40" height="28" rx="4" fill="#78716C"/><circle cx="${x - 26}" cy="160" r="12" fill="#1C1917"/><circle cx="${x + 28}" cy="160" r="14" fill="#1C1917"/><path d="M${x - 30} 70 l60 60 M${x + 30} 70 l-60 60" stroke="${E.warn}" stroke-width="9" stroke-linecap="round"/></g>`).join("")}</g>`,
    `<g><text id="${s}-n" x="165" y="170" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="110" fill="${AMB}">0</text><text x="165" y="215" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="34" fill="#FDBA74">DAYS</text></g>`,
  ];
  const labels = [["9 × 13 FT", "THE HUT"], ["123 MILES", "FROM HELP"], ["MONTHS", "WITHOUT A SUNRISE"], ["2 FAILED", "RESCUE ATTEMPTS"], ["4+ MONTHS", "ALONE"]];
  const col = (i) => `<div id="${s}-c${i}" class="ui" style="left:${CX(i)}px; top:${CY}px; width:${CW}px; height:${CH}px; border-radius:20px; background:rgba(11,16,30,.95); border:${i === 4 ? 5 : 3}px solid ${i === 4 ? AMB : "#334155"}; overflow:hidden;${i === 4 ? ` box-shadow:0 0 50px rgba(255,122,0,.35);` : ""}">
      <div style="position:absolute; left:24px; top:20px; font-family:Inter, sans-serif; font-weight:800; font-size:28px; color:#64748B;">${i + 1}</div>
      <svg width="${CW}" height="260" viewBox="0 0 330 260" style="position:absolute; left:0; top:60px;">${icons[i]}</svg>
      <div style="position:absolute; left:24px; right:24px; top:360px; text-align:center; white-space:normal; font-family:'Archivo Black', sans-serif; font-size:44px; line-height:1.1; color:${i === 4 ? "#FDBA74" : "#fff"};">${labels[i][0]}</div>
      <div style="position:absolute; left:24px; right:24px; top:470px; text-align:center; white-space:normal; font-family:Inter, sans-serif; font-weight:800; font-size:30px; line-height:1.2; color:#94A3B8;">${labels[i][1]}</div></div>`;
  const body = `
    <div style="position:absolute; inset:0; ${BLUEPRINT_CSS}"></div>
    <div id="${s}-h" class="ui" style="left:0; right:0; top:120px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:60px; color:#fff;">COUNT IT UP</div>
    ${[0, 1, 2, 3, 4].map(col).join("")}`;

  const js = `
    ${hide(s + "-h", s + "-c0", s + "-c1", s + "-c2", s + "-c3", s + "-c4")}
    tl.fromTo("#${s}-h", { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.8)", immediateRender: false }, 0.12);
    ${[[0, 1.22], [1, 3.7], [2, 6.28], [3, 8.18], [4, 10.27]].map(([i, t]) => `tl.fromTo("#${s}-c${i}", { opacity: 0, scaleX: .2, transformOrigin: "0% 50%" }, { opacity: 1, scaleX: 1, duration: .3, ease: "back.out(1.5)", immediateRender: false }, ${t});`).join("\n    ")}
    ${count(s + "-n", 0, 136, 10.4, 1.6, "Math.round(v)")}
    tl.to("#${s}-c4", { scale: 1.05, duration: .2, yoyo: true, repeat: 1 }, 12.0);`;

  return { id: "count", html: scene("count", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
