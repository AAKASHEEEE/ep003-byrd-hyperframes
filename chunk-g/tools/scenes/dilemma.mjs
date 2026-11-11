// G03 (35.4–62.6): where that leaves you — 123 miles from help, polar night, both machines poisoning him; split: RUN THE STOVE (CO builds, lethal) vs
//   TURN IT OFF (−40°F inside, frost on the walls); banner THE CHOICE: FREEZE — OR BREATHE POISON.
// VO (local = abs − 35.4): "Now imagine where that leaves you. (0.23–2.00) You're 123 miles from help. (2.64–4.96) It's the middle of the polar night. (5.43–6.95)
//   You've just figured out that the machine powering your radio (7.38) and the stove keeping you alive (9.94) are both poisoning you. (11.97–13.22) If you run the
//   stove, the fumes build up. (14.46–17.13) If you turn it off, the temperature inside the hut falls far below freezing. (17.49–21.80) You have to choose. (22.35)
//   Freeze, (23.89) or breathe poison. (24.97–26.05) [+0.7]"
import { C, r1, filters, rigInit, scene, life, shiver } from "../lib.mjs";
import { KIT_CSS, pill, tag, hide } from "./kit.mjs";
import { E, E3_CSS, cutaway, room, byrd } from "./e3.mjs";
import { haze } from "./g7.mjs";

const G = 300, RX = 700, RY = G + 16, PW = 752, PH = 600, PY = 300;
export function build() {
  const s = "dl", pL = "dl-bl", pR = "dl-br";
  const hz = (id, x, y) => `<g id="${id}" opacity="0"><polygon points="${x},${y - 40} ${x + 36},${y + 24} ${x - 36},${y + 24}" fill="${E.warn}" stroke="#FEE2E2" stroke-width="4" stroke-linejoin="round"/><rect x="${x - 4}" y="${y - 18}" width="8" height="24" rx="3" fill="#fff"/><circle cx="${x}" cy="${y + 14}" r="4.5" fill="#fff"/></g>`;
  const panelRoom = (p, extra) => `<g transform="translate(-12 -40) scale(1.5)">${room(s + p, { pipeTop: 0 })}<g transform="translate(${300 - 100 * 0.78} ${r1(320 - 265 * 0.78)}) scale(.78)">${byrd(p === "L" ? pL : pR, s + p, { outfit: "sweater" })}</g>${extra}</g>`;
  const frost = Array.from({ length: 22 }, (_, i) => `<path d="M${(i * 47) % 520} ${10 + ((i * 29) % 300)} l6 10 l6 -10 l-6 -8 z" fill="#E0F2FE" opacity=".85"/>`).join("");
  const panel = (id, x, border, head, inner) => `<div id="${id}" style="position:absolute; left:${x}px; top:${PY}px; width:${PW}px; height:${PH}px; border-radius:20px; overflow:hidden; border:4px solid ${border};">
      <svg width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}" style="position:absolute; left:0; top:0;"><defs>${filters(s + id.slice(-1))}</defs>${inner}</svg>
      <div class="tag" style="position:absolute; left:24px; top:22px; border-left-color:${border};">${head}</div></div>`;
  const note = (id, text, color, x) => `<div id="${id}" class="ui" style="left:${x + 24}px; width:${PW - 48}px; top:${PY + PH - 84}px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:32px; color:${color}; background:rgba(11,16,30,.9); border-radius:14px; padding:10px 0;">${text}</div>`;
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0; background:${E.night};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <g transform="translate(240 160) scale(.75)">${cutaway(s, G, { rx: RX, seed: 33 })}${hz(s + "-h1", RX + 488, RY + 250)}${hz(s + "-h2", RX + 262, RY + 190)}</g>
    </svg>${tag(s + "-night", "MIDDLE OF THE POLAR NIGHT", 1200, 180)}${tag(s + "-t1", "⚠ POISON SOURCE: RADIO GENERATOR", 1080, 760)}${tag(s + "-t2", "⚠ POISON SOURCE: THE STOVE", 300, 760)}</div>
    ${panel(s + "-L", 192, E.warn, "OPTION 1: RUN THE STOVE", panelRoom("L", `<g id="${s}-co" opacity="0">${haze(s + "L", 6)}</g>`))}
    ${panel(s + "-R", 976, "#0284C7", "OPTION 2: TURN THE STOVE OFF", panelRoom("R", `<rect x="246" y="250" width="32" height="22" rx="3" fill="#1F2937"/><g id="${s}-frost" opacity="0">${frost}</g><rect id="${s}-cold" width="520" height="320" fill="#0284C7" opacity="0"/>`))}
    ${note(s + "-nL", "CO FUMES BUILD UP → LETHAL", "#FCA5A5", 192)}${note(s + "-nR", "−40°F INSIDE · FAR BELOW FREEZING", "#7DD3FC", 976)}
    <div id="${s}-ban" class="ui k-lab" style="left:360px; width:1200px; top:190px;"><div style="background:rgba(11,16,30,.95); border:3px solid #F8FAFC; font-size:40px;">THE CHOICE: <span id="${s}-fz" style="color:#7DD3FC;">FREEZE</span> — OR <span id="${s}-po" style="color:#C4B5FD;">BREATHE POISON</span></div></div>
    ${pill(s + "-123", "123 MILES FROM HELP")}`;

  const js = `
    ${rigInit(pL)}${"\n    "}${rigInit(pR)}
    ${life(pL, 14.5, 27.2, { every: 2.8 })}
    ${hide(s + "-L", s + "-R", s + "-nL", s + "-nR", s + "-ban", s + "-123", s + "-night", s + "-t1", s + "-t2", s + "-h1", s + "-h2")}
    tl.set("#${s}-snowcover", { opacity: .12 }, 0);
    tl.fromTo("#${s}-S1", { scale: 1.05 }, { scale: 1, transformOrigin: "50% 50%", duration: 14, ease: "sine.out", immediateRender: false }, 0);
    tl.fromTo("#${s}-123", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 2.7);
    tl.fromTo("#${s}-night", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 5.5);
    // both machines are poisoning him
    tl.fromTo("#${s}-h1", { opacity: 0, scale: 2, svgOrigin: "${RX + 488} ${RY + 250}" }, { opacity: 1, scale: 1, svgOrigin: "${RX + 488} ${RY + 250}", duration: .2, immediateRender: false }, 8.0);
    tl.fromTo("#${s}-t1", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 8.1);
    tl.fromTo("#${s}-h2", { opacity: 0, scale: 2, svgOrigin: "${RX + 262} ${RY + 190}" }, { opacity: 1, scale: 1, svgOrigin: "${RX + 262} ${RY + 190}", duration: .2, immediateRender: false }, 10.0);
    tl.fromTo("#${s}-t2", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 10.1);
    tl.to(["#${s}-h1", "#${s}-h2"], { opacity: .4, duration: .3, yoyo: true, repeat: 5, ease: "none" }, 11.0);
    // split: run the stove vs turn it off
    tl.set("#${s}-S1", { opacity: 0 }, 14.4);
    tl.set(["#${s}-123", "#${s}-night", "#${s}-t1", "#${s}-t2"], { opacity: 0 }, 14.4);
    tl.fromTo("#${s}-L", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: .3, ease: "power2.out", immediateRender: false }, 14.45);
    tl.to("#${s}L-stoveglow", { opacity: .7, duration: .4, yoyo: true, repeat: 15, ease: "sine.inOut" }, 14.5);
    tl.to("#${s}-co", { opacity: 1, duration: 3.0 }, 15.0);
    ${shiver(pL, 16.2, 17.2, 1.5)}
    tl.fromTo("#${s}-nL", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 16.0);
    tl.fromTo("#${s}-R", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: .3, ease: "power2.out", immediateRender: false }, 17.5);
    tl.set("#${s}R-stoveglow", { opacity: 0 }, 0);
    tl.to("#${s}-frost", { opacity: 1, duration: 2.2 }, 18.4);
    tl.to("#${s}-cold", { opacity: .18, duration: 2.2 }, 18.4);
    ${shiver(pR, 18.6, 27.0, 2.5)}
    tl.fromTo("#${s}-nR", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 19.6);
    // the choice
    tl.fromTo("#${s}-ban", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 22.4);
    tl.fromTo("#${s}-fz", { scale: 1 }, { scale: 1.15, duration: .2, yoyo: true, repeat: 1, immediateRender: false }, 23.9);
    tl.fromTo("#${s}-po", { scale: 1 }, { scale: 1.15, duration: .2, yoyo: true, repeat: 1, immediateRender: false }, 25.0);`;

  return { id: "dilemma", html: scene("dilemma", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
