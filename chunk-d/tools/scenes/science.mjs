// D02 (11.5–26.2): Byrd's job was science — 3 gauges (temperature, pressure, wind); macro of the barograph drum: gears jam, the ink nib freezes;
//   a mitten comes off and a bare, frost-nipped 5-finger hand works the icy brass gear loose.
// VO (local = abs − 11.5): "Byrd's job was science. (0.29–1.74) Several times a day he read the temperature, (2.19) the air pressure, (4.64) and the wind.
//   (5.76–6.41) Some instruments recorded automatically, (6.87) but they jammed, (9.18) and their ink froze, (10.31) so he spent hours fixing them with
//   bare fingers. (11.68–14.27)"
import { C, r1, filters, scene } from "../lib.mjs";
import { KIT_CSS, box, hide } from "./kit.mjs";
import { E, E3_CSS } from "./e3.mjs";

const DX = [420, 960, 1500], DY = 560;
export function build() {
  const s = "sc";
  const ticks = (cx, cy) => Array.from({ length: 11 }, (_, i) => { const a = (-210 + i * 24) * Math.PI / 180; return `<line x1="${r1(cx + 130 * Math.cos(a))}" y1="${r1(cy + 130 * Math.sin(a))}" x2="${r1(cx + 150 * Math.cos(a))}" y2="${r1(cy + 150 * Math.sin(a))}" stroke="#94A3B8" stroke-width="5"/>`; }).join("");
  const dial = (i, inner, label) => `<g id="${s}-d${i}"><circle cx="${DX[i]}" cy="${DY}" r="172" fill="#0B1222" stroke="#B08D3C" stroke-width="12"/>${ticks(DX[i], DY)}${inner}
      <text x="${DX[i]}" y="${DY + 240}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="34" fill="#fff">${label}</text></g>`;
  const needle = (id, cx, cy) => `<g id="${id}"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 120}" stroke="${E.warn}" stroke-width="7" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="14" fill="#B08D3C"/></g>`;
  const d1 = dial(0, `${needle(s + "-n1", DX[0], DY)}<text x="${DX[0]}" y="${DY + 70}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="30" fill="#7DD3FC">°F</text>`, "1. TEMPERATURE");
  const d2 = dial(1, `<rect x="${DX[1] - 90}" y="${DY - 60}" width="180" height="120" rx="20" fill="#F8FAFC"/><g id="${s}-paper">${Array.from({ length: 10 }, (_, i) => `<line x1="${DX[1] - 90 + i * 22}" y1="${DY - 60}" x2="${DX[1] - 90 + i * 22}" y2="${DY + 60}" stroke="#CBD5E1" stroke-width="2"/>`).join("")}</g>
      <path d="M${DX[1] - 90} ${DY + 10} q30 -30 60 -6 t60 4 t60 -14" fill="none" stroke="#7C3AED" stroke-width="4"/>`, "2. AIR PRESSURE");
  const d3 = dial(2, `<g id="${s}-cups"><line x1="${DX[2] - 60}" y1="${DY}" x2="${DX[2] + 60}" y2="${DY}" stroke="#CBD5E1" stroke-width="6"/><line x1="${DX[2]}" y1="${DY - 60}" x2="${DX[2]}" y2="${DY + 60}" stroke="#CBD5E1" stroke-width="6"/>
      ${[[-60, 0], [60, 0], [0, -60], [0, 60]].map(([x, y]) => `<circle cx="${DX[2] + x}" cy="${DY + y}" r="16" fill="#E2E8F0"/>`).join("")}</g>`, "3. WIND");
  // macro barograph: paper drum, pen arm + nib, two brass gears
  const gear = (id, cx, cy, r, n) => `<g id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#B08D3C" stroke="#7A5F27" stroke-width="5"/>${Array.from({ length: n }, (_, i) => { const a = (i * 360) / n; return `<rect x="${cx - 8}" y="${cy - r - 14}" width="16" height="20" fill="#B08D3C" stroke="#7A5F27" stroke-width="3" transform="rotate(${a} ${cx} ${cy})"/>`; }).join("")}<circle cx="${cx}" cy="${cy}" r="${r * 0.3}" fill="#7A5F27"/></g>`;
  const crystals = Array.from({ length: 14 }, (_, i) => { const x = 420 + ((i * 97) % 380), y = 640 + ((i * 61) % 240); return `<polygon points="${x},${y - 22} ${x + 9},${y} ${x},${y + 22} ${x - 9},${y}" fill="#BAE6FD" stroke="#E0F2FE" stroke-width="2"/>`; }).join("");
  const hand = `<g id="${s}-hand"><rect x="1400" y="830" width="260" height="120" rx="40" fill="#334155" transform="rotate(28 1400 890)"/><rect x="1392" y="826" width="40" height="128" rx="18" fill="#475569" transform="rotate(28 1400 890)"/>
      <ellipse cx="1360" cy="830" rx="92" ry="70" fill="#D6B49A" stroke="#8C6A4A" stroke-width="4"/>
      ${[[1306, 744, -12], [1338, 732, -4], [1370, 732, 4], [1400, 744, 12]].map(([x, y, a]) => `<rect x="${x - 12}" y="${y - 56}" width="24" height="90" rx="12" fill="#D6B49A" stroke="#8C6A4A" stroke-width="4" transform="rotate(${a} ${x} ${y + 30})"/><circle cx="${x}" cy="${y - 48}" r="9" fill="#93C5FD" opacity=".55" transform="rotate(${a} ${x} ${y + 30})"/>`).join("")}
      <rect x="1262" y="800" width="28" height="64" rx="14" fill="#D6B49A" stroke="#8C6A4A" stroke-width="4" transform="rotate(-48 1290 850)"/><rect x="1232" y="772" width="24" height="52" rx="12" fill="#D6B49A" stroke="#8C6A4A" stroke-width="4" transform="rotate(-20 1250 800)"/></g>
    <g id="${s}-mitt"><path d="M1270 760 q-40 60 0 140 l160 40 q60 -70 20 -170 z" fill="#5C3A21" stroke="#2B1A0C" stroke-width="5"/><rect x="1300" y="900" width="170" height="40" rx="12" fill="#D4A373"/></g>`;
  const body = `
    <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}<clipPath id="${s}-drum"><rect x="565" y="305" width="790" height="290" rx="36"/></clipPath></defs>
      <rect width="1920" height="1080" fill="#2B1A0C"/>${Array.from({ length: 16 }, (_, i) => `<line x1="0" y1="${40 + i * 68}" x2="1920" y2="${40 + i * 68}" stroke="#1C1209" stroke-width="5"/>`).join("")}
      <g id="${s}-S1">${d1}${d2}${d3}</g>
      <g id="${s}-S2">
        <rect x="340" y="250" width="1240" height="790" fill="#1C1209"/>
        <rect x="560" y="300" width="800" height="300" rx="40" fill="#F8FAFC" stroke="#B08D3C" stroke-width="10"/>
        <g clip-path="url(#${s}-drum)"><g id="${s}-grid">${Array.from({ length: 22 }, (_, i) => `<line x1="${560 + i * 40}" y1="300" x2="${560 + i * 40}" y2="600" stroke="#CBD5E1" stroke-width="3"/>`).join("")}</g></g>
        <path d="M570 470 q60 -50 120 -10 t120 20 t120 -30 t120 0 t120 30 t70 -20" fill="none" stroke="#7C3AED" stroke-width="6"/>
        <line x1="1520" y1="250" x2="1100" y2="452" stroke="#94A3B8" stroke-width="10" stroke-linecap="round"/>
        <polygon id="${s}-nib" points="1100,442 1086,470 1112,462" fill="#7C3AED"/>
        <g id="${s}-icicle" opacity="0"><polygon points="1090,450 1112,452 1098,520" fill="#93C5FD" stroke="#E0F2FE" stroke-width="3"/></g>
        ${gear(s + "-g1", 560, 760, 90, 12)}${gear(s + "-g2", 760, 860, 70, 10)}
        <g id="${s}-ice" opacity="0">${crystals}</g>
        ${hand}
      </g>
    </svg>
    ${box(s + "-job", `BYRD'S JOB: <span style="color:${C.cyan};">SCIENCE</span>`, 130)}
    <div id="${s}-warn" class="ui" style="left:0; right:0; top:140px; display:flex; justify-content:center;"><div class="ui-warn">⚠ GEARS JAMMED · INK FROZEN SOLID</div></div>`;

  const js = `
    ${hide(s + "-job", s + "-d0", s + "-d1", s + "-d2", s + "-S2", s + "-warn")}
    tl.fromTo("#${s}-job", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 0.3);
    // three gauges, each animating as he names it
    ${[[0, 2.25], [1, 4.65], [2, 5.8]].map(([i, t]) => `tl.fromTo("#${s}-d${i}", { opacity: 0, scale: .6, svgOrigin: "${DX[i]} ${DY}" }, { opacity: 1, scale: 1, svgOrigin: "${DX[i]} ${DY}", duration: .25, ease: "back.out(1.6)", immediateRender: false }, ${t});`).join("\n    ")}
    tl.fromTo("#${s}-n1", { rotation: 40, svgOrigin: "${DX[0]} ${DY}" }, { rotation: -95, svgOrigin: "${DX[0]} ${DY}", duration: 3.6, ease: "power2.inOut", immediateRender: false }, 2.5);
    tl.fromTo("#${s}-paper", { x: 0 }, { x: -44, duration: 2.0, ease: "none", immediateRender: false }, 4.8);
    tl.to("#${s}-cups", { rotation: 720, svgOrigin: "${DX[2]} ${DY}", duration: 1.2, ease: "none" }, 5.9);
    // macro: the recording drum turns, then jams and the ink freezes
    tl.to("#${s}-job", { opacity: 0, duration: .2 }, 6.8);
    tl.set("#${s}-S1", { opacity: 0 }, 6.9);
    tl.set("#${s}-S2", { opacity: 1 }, 6.9);
    tl.set(["#${s}-hand", "#${s}-mitt"], { x: 700, y: 400 }, 0);
    tl.fromTo("#${s}-grid", { x: 0 }, { x: -120, duration: 2.3, ease: "none", immediateRender: false }, 6.9);
    tl.to("#${s}-g1", { rotation: 90, svgOrigin: "560 760", duration: 2.3, ease: "none" }, 6.9);
    tl.to("#${s}-g2", { rotation: -116, svgOrigin: "760 860", duration: 2.3, ease: "none" }, 6.9);
    tl.to("#${s}-g1", { rotation: 96, svgOrigin: "560 760", duration: .15, ease: "power4.out" }, 9.2);
    tl.to("#${s}-ice", { opacity: 1, duration: .35 }, 9.25);
    tl.to("#${s}-icicle", { opacity: 1, duration: .3 }, 10.35);
    tl.to("#${s}-nib", { opacity: 0, duration: .2 }, 10.4);
    tl.fromTo("#${s}-warn", { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: .18, ease: "power2.in", immediateRender: false }, 10.4);
    // the mitten comes off; bare fingers work the gear loose, trembling
    tl.to(["#${s}-hand", "#${s}-mitt"], { x: 0, y: 0, duration: .5, ease: "power2.out" }, 11.6);
    tl.to("#${s}-mitt", { x: 300, y: 230, opacity: 0, duration: .5, ease: "power2.in" }, 12.2);
    tl.to("#${s}-hand", { x: -620, y: -60, duration: .6, ease: "power2.inOut" }, 12.4);
    ${Array.from({ length: 12 }, (_, i) => `tl.to("#${s}-hand", { x: ${-620 + (i % 2 ? 4 : -4)}, y: ${-60 + (i % 3 ? 2 : -2)}, duration: .1, ease: "none" }, ${r1(13.0 + i * 0.12)});`).join("\n    ")}
    ${Array.from({ length: 6 }, (_, i) => `tl.to("#${s}-hand", { rotation: ${i % 2 ? -5 : 5}, svgOrigin: "740 770", duration: .2, ease: "sine.inOut" }, ${r1(13.0 + i * 0.22)});`).join(" ")}
    tl.to("#${s}-ice", { opacity: .35, duration: 1.2 }, 13.2);`;

  return { id: "science", html: scene("science", { css: KIT_CSS + E3_CSS, body, js, bg: "#2B1A0C" }) };
}
