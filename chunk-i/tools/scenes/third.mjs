// I04 (53.1–86.8): board lights card 6 → PART 6 · LIGHTS IN THE DARK; the three rescuers with name cards (real spellings); the CITROËN HALF-TRACK
//   blueprint (rear caterpillar tracks, front steering wheels, sled of fuel & supplies); then the night drive past red trail flags under one headlight cone —
//   it stops, and E. J. "Pete" Demas kneels by the hood chipping ice out of the fuel line, then it rolls on.
// VO (local = abs − 53.1): "Part six. (0.22) Lights in the dark. (1.48–2.48) [+0.6] On the third try, (3.66) three men made it work: (5.00–6.32) Doctor Thomas
//   Polter, (6.76–7.96) a tractor driver and mechanic (8.37) named E. J. 'Pete' Deemas, (11.33–12.67) and radio operator Amory 'Bud' Waite. (12.98–15.19)
//   Their machine was a Citroen half-track — (15.67–17.59) tracks at the back, (18.12) wheels at the front — (19.42) loaded with fuel and supplies.
//   (20.87–22.63) They navigated by compass and by the old trail flags, (23.28–26.35) creeping south through the polar night, (26.85–28.69) stopping again
//   and again (29.17) to chip ice out of the fuel lines. (31.08–32.88)"
import { C, r1, filters, rigInit, scene, life, snow } from "../lib.mjs";
import { KIT_CSS, tag, hide, cite } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, halftrack } from "./e3.mjs";
import { crew } from "./b3.mjs";
import { board, MX } from "./e5.mjs";
import { SPECS } from "./h8.mjs";

const GY = 640, BK = 2.0, BX = 900, BY = 700, DK = 1.1, DX = 640;
// supply sled towed behind (to the left of) a half-track whose rear is at local x = 6
const sled = (s) => `<g><line x1="-36" y1="-20" x2="6" y2="-20" stroke="#57534E" stroke-width="5"/>
  <path d="M-250 -4 L-40 -4 Q-26 -4 -26 -18" fill="none" stroke="#A8A29E" stroke-width="5"/><rect x="-240" y="-26" width="200" height="16" rx="3" fill="#78350F"/>
  ${[0, 1, 2].map((i) => `<rect x="${-232 + i * 64}" y="-70" width="56" height="44" rx="3" fill="#B45309" stroke="#451A03" stroke-width="3"/><line x1="${-232 + i * 64}" y1="-48" x2="${-176 + i * 64}" y2="-48" stroke="#451A03" stroke-width="2"/>`).join("")}</g>`;
export function build() {
  const s = "th", p1 = "th-po", p2 = "th-de", p3 = "th-wa", pd = "th-dk";
  const sn = snow(s + "-sn", 70, 11, { dx: -500, dy: 140, seed: 61 });
  const stars = Array.from({ length: 50 }, (_, i) => `<circle cx="${(i * 389) % 1920}" cy="${(i * 113) % 560}" r="${1 + (i % 3) * 0.6}" fill="#E2E8F0" opacity="${0.3 + (i % 4) * 0.15}"/>`).join("");
  const night = (id, extra) => `<rect width="1920" height="1080" fill="${E.night}"/>${stars}<rect x="0" y="${GY}" width="1920" height="${1080 - GY}" fill="#1E293B"/><rect x="0" y="${GY - 3}" width="1920" height="6" fill="#94A3B8"/>${extra}`;
  const man = (p, outfit, x, o = {}) => `<g transform="translate(${r1(x - 100 * 1.2)} ${r1(GY - 265 * 1.2)}) scale(1.2)">${crew(p, s, outfit, o)}</g>`;
  const card = (i, name, role, cx) => `<div id="${s}-c${i}" class="ui" style="left:${cx - 205}px; top:190px; width:410px; padding:14px 0 16px; border-radius:16px; background:rgba(11,16,30,.95); border:3px solid ${C.cyan}; text-align:center;">
      <div style="font-family:'Archivo Black', sans-serif; font-size:28px; line-height:1.15; color:#fff;">${name}</div><div style="margin-top:6px; font-family:Inter, sans-serif; font-weight:800; font-size:28px; color:${C.cyan};">${role}</div></div>`;
  const flags = Array.from({ length: 9 }, (_, i) => `<g><line x1="${i * 420}" y1="${GY}" x2="${i * 420}" y2="${GY - 90}" stroke="#94A3B8" stroke-width="5"/><path d="M${i * 420} ${GY - 90} l34 10 l-34 10 z" fill="${E.warn}"/></g>`).join("");
  const fuel = (id) => `<g><path d="M200 -78 L286 -78" fill="none" stroke="#64748B" stroke-width="5" stroke-linecap="round"/>
      <g id="${id}" opacity="0"><path d="M206 -78 L280 -78" stroke="#7DD3FC" stroke-width="10" stroke-linecap="round"/>${[216, 240, 264].map((x) => `<polygon points="${x},-90 ${x + 5},-78 ${x},-66 ${x - 5},-78" fill="#E0F2FE"/>`).join("")}</g></g>`;
  const chips = [0, 1, 2, 3, 4].map((i) => `<g transform="translate(${246 + i * 6} -78)"><polygon class="${s}-ch" points="0,-6 5,0 0,6 -5,0" fill="#BAE6FD" opacity="0"/></g>`).join("");
  const wrench = { side: "R", svg: `<g><rect x="150" y="174" width="30" height="7" rx="3" fill="#94A3B8" stroke="#334155" stroke-width="1.5"/><path d="M180 171 l8 0 l0 13 l-8 0" fill="none" stroke="#94A3B8" stroke-width="4"/></g>` };
  const body = `
    <div id="${s}-B" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">${board(s, 5)}</div>
    <div id="${s}-M" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      ${night(s + "-n1", `<circle cx="960" cy="${GY - 40}" r="420" fill="${E.lamp}" opacity=".08" filter="url(#${s}-bloom)"/>${man(p1, "crew1", 520, { headwear: SPECS })}${man(p2, "crew2", 960)}${man(p3, "crew3", 1400)}`)}</svg>
      ${card(0, "1. DR. THOMAS POULTER", "LEADER & SCIENTIST", 520)}${card(1, "2. E. J. \"PETE\" DEMAS", "DRIVER & MECHANIC", 960)}${card(2, "3. AMORY \"BUD\" WAITE", "RADIO OPERATOR", 1400)}
      <div id="${s}-three" class="ui" style="left:0; right:0; top:860px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:44px; color:#fff;">THE THIRD TRY · THREE MEN</div></div>
    <div id="${s}-P" style="position:absolute; inset:0; ${BLUEPRINT_CSS}"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "P")}</defs>
      <line x1="120" y1="${BY}" x2="1800" y2="${BY}" stroke="${C.cyan}" stroke-width="3" stroke-dasharray="14 10" opacity=".6"/>
      <g transform="translate(${BX} ${BY}) scale(${BK})">${sled(s)}${halftrack(s + "-bp", s + "P", { light: false, crew: 0 })}</g>
      <g id="${s}-k1" fill="none" stroke="${C.cyan}" stroke-width="4"><path d="M${BX + 20 * BK} ${BY + 26} L${BX + 20 * BK} ${BY + 46} L${BX + 144 * BK} ${BY + 46} L${BX + 144 * BK} ${BY + 26}"/></g>
      <g id="${s}-k2" fill="none" stroke="${C.cyan}" stroke-width="4"><circle cx="${BX + 252 * BK}" cy="${BY - 26 * BK}" r="${30 * BK}"/></g>
      <g id="${s}-k3" fill="none" stroke="${C.cyan}" stroke-width="4"><path d="M${BX - 240 * BK} ${BY - 84 * BK} L${BX - 240 * BK} ${BY - 100 * BK} L${BX - 40 * BK} ${BY - 100 * BK} L${BX - 40 * BK} ${BY - 84 * BK}"/></g></svg>
      <div class="ui" style="left:0; right:0; top:196px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:56px; color:#fff;">CITROËN HALF-TRACK</div>
      ${tag(s + "-l1", "REAR: CATERPILLAR TRACKS", BX - 220, BY + 70)}${tag(s + "-l2", "FRONT: STEERING WHEELS", BX + 400, BY + 70)}${tag(s + "-l3", "SLED: FUEL & SUPPLIES", BX - 480, BY - 290)}
      ${cite(s + "-cite", 'Richard E. Byrd, "Alone" (1938)')}</div>
    <div id="${s}-D" style="position:absolute; inset:0; overflow:hidden;"><div id="${s}-cam" style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "D")}</defs>
      ${night(s + "-n2", `<g id="${s}-flags">${flags}</g>`)}
      <g transform="translate(${DX} ${GY}) scale(${DK})"><g id="${s}-tr"><g id="${s}-bob">${sled(s)}${halftrack(s + "-ht", s + "D", { crew: 2 })}${fuel(s + "-ice")}${chips}</g></g>
        <g id="${s}-dem" opacity="0"><g transform="translate(${236 - 100 * 0.55} ${r1(-265 * 0.55)}) scale(.55)">${crew(pd, s + "D", "crew2", { props: [wrench] })}</g></g></g>
      <g>${sn.svg}</g></svg></div>
      ${tag(s + "-nav", "NAVIGATING BY COMPASS + THE OLD TRAIL FLAGS", 192, 196)}${tag(s + "-south", "CREEPING SOUTH THROUGH THE POLAR NIGHT", 192, 266)}
      ${tag(s + "-chip", "STOPPING AGAIN AND AGAIN: CHIPPING ICE OUT OF THE FUEL LINE", 192, 336)}</div>
    <div id="${s}-dock" class="ui k-dock"><span class="n">PART 6</span>LIGHTS IN THE DARK</div>`;

  const js = `
    ${[p1, p2, p3, pd].map((p) => rigInit(p)).join("\n    ")}
    ${life(p1, 3.6, 15.6, { every: 3.1 })}${"\n    "}${life(p2, 3.8, 15.6, { every: 2.7 })}${"\n    "}${life(p3, 4.0, 15.6, { every: 2.9 })}
    ${hide(s + "-M", s + "-P", s + "-D", s + "-dock", s + "-c0", s + "-c1", s + "-c2", s + "-three", s + "-l1", s + "-l2", s + "-l3", s + "-k1", s + "-k2", s + "-k3", s + "-cite", s + "-nav", s + "-south", s + "-chip")}
    // Part six: card 6 lights and docks
    tl.to("#${s}-m5", { color: "${C.cyan}", borderColor: "${C.cyan}", boxShadow: "0 0 40px ${C.cyan}", duration: .15 }, 0.2);
    tl.to("#${s}-m5", { scale: 1.25, duration: .25, ease: "back.out(2)" }, 0.35);
    tl.to("#${s}-m5", { x: ${-MX(5) - 60}, y: -330, scale: .25, opacity: 0, duration: .45, ease: "power3.in" }, 1.05);
    tl.fromTo("#${s}-dock", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1.08, x: 0, duration: .17, ease: "power2.out", immediateRender: false }, 1.48);
    tl.to("#${s}-dock", { scale: 1, duration: .1 }, 1.65);
    // the three men
    tl.set("#${s}-M", { opacity: 1 }, 3.6); tl.set("#${s}-B", { opacity: 0 }, 3.6);
    tl.fromTo("#${s}-three", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 5.0);
    ${[[0, 6.8], [1, 11.35], [2, 13.0]].map(([i, t]) => `tl.fromTo("#${s}-c${i}", { opacity: 0, scale: .6, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: .25, ease: "back.out(1.7)", immediateRender: false }, ${t});`).join("\n    ")}
    tl.to("#${p1}-armR", { rotation: -40, duration: .3, yoyo: true, repeat: 1 }, 6.9);
    tl.to("#${p2}-armR", { rotation: -40, duration: .3, yoyo: true, repeat: 1 }, 11.4);
    tl.to("#${p3}-armR", { rotation: -40, duration: .3, yoyo: true, repeat: 1 }, 13.05);
    // the machine
    tl.set("#${s}-P", { opacity: 1 }, 15.6); tl.set("#${s}-M", { opacity: 0 }, 15.6);
    tl.fromTo("#${s}-k1", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 18.1);
    tl.fromTo("#${s}-l1", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 18.15);
    tl.fromTo("#${s}-k2", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 19.4);
    tl.fromTo("#${s}-l2", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 19.45);
    tl.fromTo("#${s}-k3", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 20.9);
    tl.fromTo("#${s}-l3", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 20.95);
    tl.fromTo("#${s}-cite", { opacity: 0 }, { opacity: 1, duration: .3, immediateRender: false }, 21.2);
    // the night drive: flags slide past, one headlight cone
    tl.set("#${s}-D", { opacity: 1 }, 23.2); tl.set("#${s}-P", { opacity: 0 }, 23.2);
    ${sn.js.replace(/, 0\);/g, ", 23.2);")}
    tl.fromTo("#${s}-flags", { x: 1800 }, { x: 400, duration: 5.9, ease: "none", immediateRender: false }, 23.2);
    tl.to("#${s}-flags", { x: 160, duration: 1.0, ease: "power2.out" }, 29.1);
    ${Array.from({ length: 28 }, (_, i) => `tl.to("#${s}-bob", { y: ${i % 2 ? 0 : -2.5}, duration: .1, ease: "none" }, ${r1(23.2 + i * 0.21)});`).join("\n    ")}
    tl.fromTo("#${s}-nav", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 23.3);
    tl.fromTo("#${s}-south", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 26.9);
    // stop: ice in the fuel line; Demas kneels at the hood and chips it out
    tl.to("#${s}-ice", { opacity: 1, duration: .3 }, 29.3);
    tl.set("#${s}-dem", { opacity: 1 }, 30.0);
    tl.set("#${pd}", { rotation: 14, svgOrigin: "100 265" }, 30.0);
    tl.set("#${pd}-armR", { rotation: -100 }, 30.0);
    tl.set("#${s}-cam", { scale: 1, x: 0, y: 0, transformOrigin: "0 0" }, 0);
    tl.to("#${s}-cam", { scale: 2.2, x: ${r1(960 - (DX + 250 * DK) * 2.2)}, y: ${r1(560 - (GY - 70 * DK) * 2.2)}, duration: .9, ease: "power2.inOut" }, 29.2);
    tl.to("#${s}-cam", { scale: 1, x: 0, y: 0, duration: .7, ease: "power2.inOut" }, 32.9);
    ${Array.from({ length: 12 }, (_, i) => `tl.to("#${pd}-foreR", { rotation: ${i % 2 ? 0 : -24}, svgOrigin: "142 147", duration: .11, ease: "power1.in" }, ${r1(30.2 + i * 0.22)});`).join("\n    ")}
    tl.fromTo(".${s}-ch", { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: (i) => [-18, 10, -6, 16, -12][i], y: -30, duration: .4, stagger: .35, immediateRender: false }, 30.4);
    tl.to("#${s}-ice", { opacity: 0, duration: 1.6 }, 30.6);
    tl.fromTo("#${s}-chip", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 29.2);
    tl.to(".${s}-ch", { opacity: 0, duration: .3 }, 32.4);
    // and on again
    tl.set("#${s}-dem", { opacity: 0 }, 33.0);
    tl.to("#${s}-flags", { x: -60, duration: 0.8, ease: "power1.in" }, 32.9);`;

  return { id: "third", html: scene("third", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
