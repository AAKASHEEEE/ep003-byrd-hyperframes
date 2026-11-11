// I03 (35.5–53.1): the dark, frost-lined hut — gaunt Byrd in his fur bag on the bunk, staring at the radio's green dial; radio scraps BROKE DOWN ·
//   TURNED BACK · TRYING AGAIN; then two bars race toward him: 1. THE TRACTOR (amber) vs 2. THE END (crimson).
// VO (local = abs − 35.5): "Now imagine being Byrd during those weeks. (0.30–2.66) Too weak to walk far. (3.06–4.28) Lying in the cold dark, (4.98–6.30)
//   listening on the radio as the men who are coming for you (6.73–10.17) break down, turn back, and try again. (10.62–12.13) Wondering which will reach
//   you first. (12.71–14.49) The tractor. (14.85–15.51) Or the end. (15.91–16.58) [+0.7]"
import { C, r1, filters, rigInit, scene, shiver } from "../lib.mjs";
import { KIT_CSS, pill, tag, hide } from "./kit.mjs";
import { E, E3_CSS, room, byrd } from "./e3.mjs";

const RS = 2.6, RXs = 279, RYs = 40;
export function build() {
  const s = "wt", p = "wt-by";
  const sx = (x) => r1(x * RS + RXs), sy = (y) => r1(y * RS + RYs);
  const frost = Array.from({ length: 34 }, (_, i) => `<path d="M${(i * 61) % 520} ${8 + ((i * 37) % 200)} l5 9 l5 -9 l-5 -7 z" fill="#E0F2FE" opacity=".7"/>`).join("");
  const bunk = `<g transform="translate(200 222) rotate(-90) scale(.52) translate(-100 -265)">${byrd(p, s, { outfit: "sweater", gaunt: true })}</g>
      <rect x="106" y="204" width="96" height="34" rx="14" fill="#A47148" stroke="#8C6A4A" stroke-width="2"/><path d="M114 210 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0" fill="none" stroke="#D4A373" stroke-width="2"/>`;
  const bar = (id, col, label, side, top) => `<div id="${id}" class="ui" style="${side}:0; top:${top}px; width:0; height:64px; background:${col}; border-radius:${side === "left" ? "0 32px 32px 0" : "32px 0 0 32px"}; overflow:hidden;">
      <div id="${id}-t" style="position:absolute; ${side}:40px; top:14px; white-space:nowrap; font-family:'Archivo Black', sans-serif; font-size:30px; color:#111827;">${label}</div></div>`;
  const body = `
    <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect width="1920" height="1080" fill="${E.night}"/>
      <g transform="translate(${RXs} ${RYs}) scale(${RS})">${room(s, { pipeTop: 0 })}<g opacity=".8">${frost}</g>${bunk}
        <rect x="246" y="250" width="32" height="22" rx="3" fill="#1F2937"/></g>
      <rect width="1920" height="1080" fill="#000" opacity=".62"/>
      <circle id="${s}-glow" cx="${sx(372)}" cy="${sy(222)}" r="120" fill="#22C55E" opacity=".35" filter="url(#${s}-bloom)"/>
      <circle cx="${sx(372)}" cy="${sy(222)}" r="24" fill="#22C55E" opacity=".9"/>
    </svg>
    ${pill(s + "-weak", "TOO WEAK TO WALK FAR")}
    ${tag(s + "-cold", "COLD · DARK · FROST ON THE WALLS", 192, 196)}
    ${tag(s + "-lis", "LISTENING ON THE RADIO", sx(330), sy(120))}
    ${["BROKE DOWN", "TURNED BACK", "TRYING AGAIN"].map((t, i) => `<div id="${s}-m${i}" class="ui" style="left:${sx(420)}px; top:${sy(150) - 140 + i * 70}px; padding:10px 22px; border-radius:24px; background:#052E16; border:3px solid #22C55E; font-family:'JetBrains Mono', monospace; font-size:30px; color:#86EFAC;">${t}</div>`).join("")}
    ${bar(s + "-b1", E.lamp, "1. THE TRACTOR (123 MILES AWAY)", "left", 880)}${bar(s + "-b2", E.warn, "2. THE END (FREEZING & POISON)", "right", 964)}`;

  const js = `
    ${rigInit(p)}
    ${hide(s + "-weak", s + "-cold", s + "-lis", s + "-m0", s + "-m1", s + "-m2", s + "-b1-t", s + "-b2-t")}
    tl.set("#${p}-lids", { scaleY: .3 }, 0.02);
    tl.set("#${p}-pupils", { y: 2 }, 0.02);
    ${shiver(p, 0.1, 17.6, 1.5)}
    ${Array.from({ length: 9 }, (_, i) => `tl.to("#${s}-glow", { opacity: ${i % 2 ? 0.35 : 0.55}, duration: .9, ease: "sine.inOut" }, ${r1(i * 1.0)});`).join("\n    ")}
    tl.fromTo("#${s}-weak", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 3.1);
    tl.fromTo("#${s}-cold", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 5.0);
    tl.fromTo("#${s}-lis", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 6.8);
    ${[[0, 10.65], [1, 11.15], [2, 11.65]].map(([i, t]) => `tl.fromTo("#${s}-m${i}", { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .2, ease: "back.out(2)", immediateRender: false }, ${t});`).join("\n    ")}
    tl.to("#${s}-lis", { opacity: 0, duration: .2 }, 10.4);
    tl.to(["#${s}-m0", "#${s}-m1", "#${s}-m2", "#${s}-cold"], { opacity: 0, duration: .3 }, 12.5);
    // which reaches him first?
    tl.to("#${s}-b1", { width: 900, duration: 2.0, ease: "power2.out" }, 12.7);
    tl.to("#${s}-b2", { width: 900, duration: 2.0, ease: "power2.out" }, 12.7);
    tl.fromTo("#${s}-b1-t", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 14.85);
    tl.fromTo("#${s}-b2-t", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 15.9);
    tl.to("#${s}-glow", { opacity: .15, duration: .4 }, 15.9);`;

  return { id: "wait", html: scene("wait", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
