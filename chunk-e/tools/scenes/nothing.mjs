// E02 (12.6–30.4): the white nothing — no trees, no hills, no landmarks (ghost wireframes X'd out), then Byrd takes 5 steps from the hatch and
//   the hut disappears behind drifting snow.
// VO (local = abs − 12.6): "The darkness changed everything. (0.16) A simple walk around the hut became a risk. (2.31–4.66) Out on the flat ice there are
//   (5.26) no trees, (7.62) no hills, (8.56) no landmarks — just the same white nothing (9.85) in every direction. (12.64–13.31) In the dark, with drifting snow,
//   (13.66) you can lose the hut after a few steps. (15.22–17.37)"
import { C, r1, filters, rigInit, scene, life, walk, snow2 } from "../lib.mjs";
import { KIT_CSS, tag, box, hide, breath } from "./kit.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";

const G = 660;
export function build() {
  const s = "wn", p = "wn-by";
  const sn = snow2(s, 17.8, { far: 120, near: 40, seed: 71, dx: 900 });
  const pine = (x) => `<path d="M${x} ${G} v-30 M${x - 60} ${G - 30} L${x} ${G - 200} L${x + 60} ${G - 30} Z M${x - 45} ${G - 90} L${x} ${G - 230} L${x + 45} ${G - 90}" fill="none" stroke="${C.cyan}" stroke-width="4" stroke-dasharray="8 8"/>`;
  const stamp = (id, x, y) => `<g id="${id}" opacity="0"><circle cx="${x}" cy="${y}" r="52" fill="none" stroke="${E.warn}" stroke-width="9"/><line x1="${x - 36}" y1="${y + 36}" x2="${x + 36}" y2="${y - 36}" stroke="${E.warn}" stroke-width="9"/></g>`;
  const body = `
    <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}${sn.defs}</defs>
      <rect width="1920" height="${G}" fill="#030508"/>${Array.from({ length: 60 }, (_, i) => `<circle cx="${(i * 409) % 1920}" cy="${(i * 137) % (G - 80)}" r="${1 + (i % 3) * 0.5}" fill="#E2E8F0" opacity=".45"/>`).join("")}
      <rect y="${G}" width="1920" height="${1080 - G}" fill="#334155"/><line x1="0" y1="${G}" x2="1920" y2="${G}" stroke="#94A3B8" stroke-width="3"/>
      <g id="${s}-hut"><line x1="140" y1="${G}" x2="140" y2="${G - 240}" stroke="#94A3B8" stroke-width="6"/><line x1="360" y1="${G}" x2="360" y2="${G - 240}" stroke="#94A3B8" stroke-width="6"/>
        <path d="M140 ${G - 236} Q250 ${G - 205} 360 ${G - 236}" fill="none" stroke="#CBD5E1" stroke-width="2"/>
        <rect x="250" y="${G - 6}" width="70" height="10" rx="2" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="2"/><ellipse cx="285" cy="${G - 4}" rx="80" ry="16" fill="${E.lamp}" opacity=".35" filter="url(#${s}-soft)"/>
        <rect x="420" y="${G - 46}" width="12" height="46" fill="#94A3B8"/></g>
      <g id="${s}-trees" opacity="0">${pine(1150)}${pine(1290)}${pine(1430)}</g>${stamp(s + "-x1", 1290, G - 120)}
      <g id="${s}-hills" opacity="0"><polyline points="1000,${G} 1150,${G - 170} 1260,${G - 90} 1400,${G - 230} 1560,${G - 60} 1700,${G}" fill="none" stroke="${C.cyan}" stroke-width="4" stroke-dasharray="8 8"/></g>${stamp(s + "-x2", 1400, G - 140)}
      <g id="${s}-rose" opacity="0"><circle cx="1350" cy="${G - 200}" r="90" fill="none" stroke="${C.cyan}" stroke-width="4" stroke-dasharray="8 8"/>
        <g id="${s}-needle"><polygon points="1350,${G - 300} 1366,${G - 200} 1350,${G - 100} 1334,${G - 200}" fill="none" stroke="${C.cyan}" stroke-width="4"/></g>
        ${[[0, -130], [130, 0], [0, 130], [-130, 0]].map(([x, y]) => `<text x="${1350 + x}" y="${G - 200 + y + 14}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="40" fill="${C.cyan}">?</text>`).join("")}</g>
      <g id="${s}-bpos"><g transform="translate(${-100 * 1.1} ${-265 * 1.1}) scale(1.1)">${byrd(p, s, { outfit: "anorak" })}</g></g>
      <linearGradient id="${s}-fg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#64748B" stop-opacity=".95"/><stop offset=".7" stop-color="#64748B" stop-opacity=".6"/><stop offset="1" stop-color="#64748B" stop-opacity="0"/></linearGradient>
      <g id="${s}-fog" opacity="0"><rect width="900" height="${G + 60}" fill="url(#${s}-fg)"/></g>
      ${sn.far}<g id="${s}-heavy" opacity=".35">${sn.near}</g>
    </svg>
    ${box(s + "-risk", `A SIMPLE WALK = <span style="color:${E.warn};">A RISK</span>`, 130)}
    ${tag(s + "-t1", "⊘ NO TREES", 1200, 190)}${tag(s + "-t2", "⊘ NO HILLS", 1200, 190)}${tag(s + "-t3", "⊘ NO LANDMARKS", 1200, 190)}
    ${tag(s + "-white", "WHITE NOTHING IN EVERY DIRECTION", 940, 190)}
    ${tag(s + "-step", "STEP 1", 760, 300)}
    <div id="${s}-lost" class="ui" style="left:0; right:0; top:150px; display:flex; justify-content:center;"><div class="ui-warn">⚠ HUT LOST AFTER A FEW STEPS</div></div>`;

  const steps = [0, 1, 2, 3, 4].map((i) => r1(13.8 + i * 0.62));
  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 17.8, { every: 3.0 })}
    ${breath(p, 0.5, 17.6)}
    ${sn.js}
    ${hide(s + "-risk", s + "-t1", s + "-t2", s + "-t3", s + "-white", s + "-step", s + "-lost")}
    tl.set("#${s}-bpos", { x: 470, y: ${G} }, 0);
    tl.fromTo("#${s}-risk", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 2.4);
    tl.to("#${s}-risk", { opacity: 0, duration: .2 }, 5.2);
    // no trees · no hills · no landmarks: ghosts pop, get stamped and blown away
    tl.fromTo("#${s}-trees", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 6.9);
    tl.fromTo("#${s}-x1", { opacity: 0, scale: 1.5, svgOrigin: "1290 ${G - 120}" }, { opacity: 1, scale: 1, svgOrigin: "1290 ${G - 120}", duration: .15, immediateRender: false }, 7.6);
    tl.fromTo("#${s}-t1", { opacity: 0 }, { opacity: 1, duration: .15, immediateRender: false }, 7.6);
    tl.to(["#${s}-trees", "#${s}-x1", "#${s}-t1"], { opacity: 0, x: 200, duration: .35, ease: "power2.in" }, 8.2);
    tl.fromTo("#${s}-hills", { opacity: 0 }, { opacity: 1, duration: .15, immediateRender: false }, 8.3);
    tl.fromTo("#${s}-x2", { opacity: 0, scale: 1.5, svgOrigin: "1400 ${G - 140}" }, { opacity: 1, scale: 1, svgOrigin: "1400 ${G - 140}", duration: .15, immediateRender: false }, 8.6);
    tl.fromTo("#${s}-t2", { opacity: 0 }, { opacity: 1, duration: .15, immediateRender: false }, 8.6);
    tl.to("#${s}-hills", { scaleY: .02, svgOrigin: "1350 ${G}", duration: .4, ease: "power2.in" }, 9.0);
    tl.to(["#${s}-hills", "#${s}-x2", "#${s}-t2"], { opacity: 0, duration: .2 }, 9.4);
    tl.fromTo("#${s}-rose", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 9.8);
    tl.fromTo("#${s}-t3", { opacity: 0 }, { opacity: 1, duration: .15, immediateRender: false }, 9.9);
    tl.to("#${s}-needle", { rotation: 900, svgOrigin: "1350 ${G - 200}", duration: 3.4, ease: "power1.inOut" }, 9.9);
    tl.set("#${s}-t3", { opacity: 0 }, 11.2);
    tl.fromTo("#${s}-white", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 11.2);
    tl.to(["#${s}-rose", "#${s}-white"], { opacity: 0, duration: .3 }, 13.4);
    // five steps out, and the hut is gone behind the snow
    ${steps.map((t, i) => `tl.to("#${s}-bpos", { x: ${470 + (i + 1) * 70}, duration: .55, ease: "power1.inOut" }, ${t});
    tl.set("#${s}-step", { opacity: 1 }, ${t}); tl.call(() => { document.getElementById("${s}-step").textContent = "STEP ${i + 1}"; }, null, ${t});`).join("\n    ")}
    ${walk(p, 13.8, 16.9, 0.31, 16)}
    tl.to("#${s}-heavy", { opacity: 1, duration: 1.5 }, 14.4);
    tl.to("#${s}-fog", { opacity: 1, duration: 1.6 }, 14.8);
    tl.to("#${s}-hut", { opacity: 0, duration: 1.6, ease: "power1.in" }, 15.0);
    tl.to("#${s}-step", { opacity: 0, duration: .2 }, 17.0);
    tl.fromTo("#${s}-lost", { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: .18, ease: "power2.in", immediateRender: false }, 15.9);`;

  return { id: "nothing", html: scene("nothing", { css: KIT_CSS + E3_CSS, body, js, bg: "#030508" }) };
}
