// E04 (41.2–69.6): too far — side view: Byrd walks past the last stick, turns, and the sticks are gone; then a pure TOP-DOWN map: wrong guesses,
//   the centre marker, and three widening circles until his boot finds the last bamboo stick and the trail lights up home.
// VO (local = abs − 41.2): "One day, (0.22) it nearly wasn't enough. (1.33–2.69) He walked too far, (3.22) turned around, (4.75) and couldn't find the sticks.
//   (5.90–7.30) Nothing but darkness. (7.82–8.95) [+0.8] He knew that if he guessed wrong, (10.25) he would walk straight out onto the ice shelf and freeze.
//   (12.09–14.86) So he did the only thing that made sense. (15.34–17.53) He stopped. (17.94) He marked the spot. (19.04–20.08) And he walked out in careful
//   circles, (20.74) wider and wider, (23.12) until his boot finally found a bamboo stick. (24.74–27.24) [+0.7]"
import { C, r1, filters, rigInit, scene, life, walk } from "../lib.mjs";
import { KIT_CSS, tag, hide, breath } from "./kit.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";
import { bamboo, legs } from "./e5.mjs";

const G = 660, CX = 960, CY = 560, RR = [90, 180, 270];
export function build() {
  const s = "sr", p = "sr-by";
  const torchR = { side: "R", svg: `<g id="${p}-tR"><rect x="150" y="172" width="14" height="22" rx="3" fill="#475569" transform="rotate(-24 157 183)"/><polygon points="160,192 330,440 210,470" fill="#FDE68A" opacity=".38"/></g>` };
  const torchL = { side: "L", svg: `<g id="${p}-tL" opacity="0"><rect x="36" y="172" width="14" height="22" rx="3" fill="#475569" transform="rotate(24 43 183)"/><polygon points="40,192 -130,440 -10,470" fill="#FDE68A" opacity=".38"/></g>` };
  // top-down: the line of sticks runs west from the 9-o'clock point of circle 3 back to the hut
  const STX = [CX - 270, CX - 350, CX - 430, CX - 510, CX - 590, CX - 670];
  const avatar = (id, x, y) => `<g id="${id}"><circle cx="${x}" cy="${y}" r="26" fill="#D4A373" stroke="#8C6A4A" stroke-width="3"/><circle cx="${x}" cy="${y}" r="17" fill="#14171F"/>
      <polygon points="${x - 8},${y + 22} ${x + 8},${y + 22} ${x + 30},${y + 110} ${x - 30},${y + 110}" fill="#FDE68A" opacity=".35"/></g>`;
  const orbit = (i) => `<g id="${s}-orb${i}" opacity="0">${avatar(`${s}-av${i}`, CX + RR[i], CY)}</g>`;
  const ring = (i) => `<circle id="${s}-c${i}" cx="${CX}" cy="${CY}" r="${RR[i]}" fill="none" stroke="${C.cyan}" stroke-width="5" stroke-dasharray="14 10" opacity="0"/>`;
  const arrow = (i, x2, y2) => `<g id="${s}-a${i}" opacity="0"><line x1="${CX}" y1="${CY}" x2="${x2}" y2="${y2}" stroke="${E.warn}" stroke-width="6" stroke-dasharray="16 10"/>
      <text x="${x2 + (x2 > CX ? 34 : 0)}" y="${y2 + (y2 > CY ? 50 : y2 < CY ? -16 : 14)}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="44" fill="${E.warn}">?</text></g>`;
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect width="1920" height="${G}" fill="#030508"/>${Array.from({ length: 50 }, (_, i) => `<circle cx="${(i * 409) % 1920}" cy="${(i * 137) % (G - 80)}" r="${1 + (i % 3) * 0.5}" fill="#E2E8F0" opacity=".35"/>`).join("")}
      <rect y="${G}" width="1920" height="${1080 - G}" fill="#334155"/><line x1="0" y1="${G}" x2="1920" y2="${G}" stroke="#94A3B8" stroke-width="3"/>
      <g id="${s}-sticks">${[160, 340, 520, 700, 880, 1060].map((x, i) => bamboo(`${s}-k${i}`, x, G)).join("")}</g>
      <g id="${s}-bpos"><g transform="translate(-100 -265)">${byrd(p, s, { outfit: "anorak", props: [torchR, torchL] })}</g></g>
      <rect id="${s}-void" width="1920" height="1080" fill="#030508" opacity="0"/>
    </svg></div>
    <div id="${s}-S2" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "2")}</defs>
      <rect width="1920" height="1080" fill="#070B14"/>
      ${Array.from({ length: 17 }, (_, i) => `<line x1="${i * 120}" y1="0" x2="${i * 120}" y2="1080" stroke="#1E293B" stroke-width="2"/>`).join("")}${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 120}" x2="1920" y2="${i * 120}" stroke="#1E293B" stroke-width="2"/>`).join("")}
      <g id="${s}-trail" opacity=".15"><line x1="${STX[0]}" y1="${CY}" x2="${STX[5] - 60}" y2="${CY}" stroke="#22C55E" stroke-width="5" stroke-dasharray="14 10"/>
        ${STX.map((x) => `<circle cx="${x}" cy="${CY}" r="11" fill="#D97706" stroke="#FDE68A" stroke-width="2"/>`).join("")}
        <rect x="${STX[5] - 104}" y="${CY - 22}" width="44" height="44" rx="6" fill="${E.pine}" stroke="${E.lamp}" stroke-width="3"/></g>
      ${arrow(0, CX, CY - 380)}${arrow(1, CX + 420, CY)}${arrow(2, CX, CY + 400)}
      ${RR.map((_, i) => ring(i)).join("")}
      <g id="${s}-mark" opacity="0"><path d="M${CX - 18} ${CY - 18} L${CX + 18} ${CY + 18} M${CX + 18} ${CY - 18} L${CX - 18} ${CY + 18}" stroke="${C.cyan}" stroke-width="7" stroke-linecap="round"/></g>
      <g id="${s}-me">${avatar(s + "-av", CX, CY)}</g>
      ${RR.map((_, i) => orbit(i)).join("")}
      <g id="${s}-hit" opacity="0"><circle cx="${STX[0]}" cy="${CY}" r="34" fill="none" stroke="#22C55E" stroke-width="6"/></g>
    </svg>
      ${tag(s + "-guess", "? GUESS WRONG = FREEZE", 1100, 300)}${tag(s + "-cm", "✕ CENTER MARKER", 1010, 600)}
      ${tag(s + "-n1", "CIRCLE 1", 1080, 470)}${tag(s + "-n2", "CIRCLE 2", 1170, 380)}${tag(s + "-n3", "CIRCLE 3", 1260, 290)}
      ${tag(s + "-hut", "HUT", r1(STX[5] - 150), 610)}</div>
    <div id="${s}-lost" class="ui" style="left:0; right:0; top:150px; display:flex; justify-content:center;"><div class="ui-warn">⚠ LIFELINE LOST · NOTHING BUT DARKNESS</div></div>
    <div id="${s}-found" class="ui k-lab" style="left:460px; width:1000px; top:150px;"><div class="k-ok">✓ BAMBOO STICK FOUND · THE WAY HOME</div></div>`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 10.0, { every: 3.0 })}
    ${breath(p, 0.4, 9.8)}
    ${hide(s + "-S2", s + "-lost", s + "-found", s + "-guess", s + "-cm", s + "-n1", s + "-n2", s + "-n3", s + "-hut")}
    tl.set("#${s}-bpos", { x: 880, y: ${G} }, 0);
    tl.set("#${p}-armR", { rotation: -92 }, 0.02);
    // too far: past the last stick into the black
    tl.to("#${s}-bpos", { x: 1560, duration: 1.6, ease: "power1.inOut" }, 3.2);
    ${legs(p, 3.2, 4.8, 0.27, 16)}
    tl.to("#${s}-void", { opacity: .55, duration: 1.4 }, 3.4);
    // he turns around: the torch swings back, the sticks are gone
    tl.set("#${p}-tR", { opacity: 0 }, 4.8); tl.set("#${p}-tL", { opacity: 1 }, 4.8);
    tl.to("#${p}-armR", { rotation: 0, duration: .25 }, 4.8); tl.to("#${p}-armL", { rotation: 92, duration: .25 }, 4.8);
    tl.to("#${s}-sticks", { opacity: 0, duration: .9 }, 5.4);
    tl.to("#${s}-void", { opacity: .8, duration: .8 }, 5.4);
    tl.fromTo("#${s}-lost", { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: .18, ease: "power2.in", immediateRender: false }, 7.85);
    // top-down only from here
    tl.set("#${s}-S2", { opacity: 1 }, 9.9);
    tl.set(["#${s}-S1", "#${s}-lost"], { opacity: 0 }, 9.9);
    ${[0, 1, 2].map((i) => `tl.fromTo("#${s}-a${i}", { opacity: 0, scale: 0, svgOrigin: "${CX} ${CY}" }, { opacity: 1, scale: 1, svgOrigin: "${CX} ${CY}", duration: .35, ease: "power2.out", immediateRender: false }, ${r1(10.3 + i * 0.4)});`).join("\n    ")}
    tl.fromTo("#${s}-guess", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 12.1);
    ${[0, 1, 2, 3, 4, 5].map((i) => `tl.to("#${s}-av", { rotation: ${[-70, 60, 170, -120, 20, 0][i]}, svgOrigin: "${CX} ${CY}", duration: .8, ease: "sine.inOut" }, ${r1(12.6 + i * 0.85)});`).join(" ")}
    tl.to(["#${s}-a0", "#${s}-a1", "#${s}-a2"], { opacity: .4, duration: .4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 13.0);
    tl.to(["#${s}-a0", "#${s}-a1", "#${s}-a2", "#${s}-guess"], { opacity: 0, duration: .3 }, 17.8);
    // he stops, marks the spot
    tl.fromTo("#${s}-mark", { opacity: 0, scale: 2, svgOrigin: "${CX} ${CY}" }, { opacity: 1, scale: 1, svgOrigin: "${CX} ${CY}", duration: .2, ease: "power2.in", immediateRender: false }, 19.1);
    tl.fromTo("#${s}-cm", { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 19.3);
    tl.to("#${s}-cm", { opacity: 0, duration: .2 }, 20.6);
    // three widening circles; the third finds the last stick at 9 o'clock
    tl.set("#${s}-me", { opacity: 0 }, 20.75);
    ${[[0, 20.8, 1.8, 360], [1, 22.8, 1.8, 360], [2, 24.8, 1.1, 180]].map(([i, t, d, deg]) => `tl.set("#${s}-orb${i}", { opacity: 1 }, ${t});
    tl.fromTo("#${s}-c${i}", { opacity: 0, scale: .2, svgOrigin: "${CX} ${CY}" }, { opacity: 1, scale: 1, svgOrigin: "${CX} ${CY}", duration: .35, ease: "back.out(1.4)", immediateRender: false }, ${t});
    tl.to("#${s}-orb${i}", { rotation: ${deg}, svgOrigin: "${CX} ${CY}", duration: ${d}, ease: "none" }, ${t});
    tl.fromTo("#${s}-n${i + 1}", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, ${t});
    ${i < 2 ? `tl.set("#${s}-orb${i}", { opacity: 0 }, ${r1(t + d)});` : ""}`).join("\n    ")}
    tl.to("#${s}-hit", { opacity: 1, duration: .1 }, 25.9);
    tl.to("#${s}-hit", { scale: 1.5, opacity: 0, svgOrigin: "${STX[0]} ${CY}", duration: .6 }, 26.0);
    tl.to("#${s}-trail", { opacity: 1, duration: .5 }, 26.0);
    tl.fromTo("#${s}-hut", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 26.4);
    tl.fromTo("#${s}-found", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 26.0);`;

  return { id: "search", html: scene("search", { css: KIT_CSS + E3_CSS, body, js, bg: "#030508" }) };
}
