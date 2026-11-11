// H01 (0–33.9): callback on G's last frame → board lights card 5 → PART 5 · THE MESSAGE HE DIDN'T SEND; Byrd's mental projection of a winter rescue:
//   a Citroën half-track crawling over snow-bridged crevasses in the dark, fuel line freezing, stopping at a crevasse lip; then his men inside a gold shield,
//   Byrd shaking his head: NOT GOING TO BE THE REASON THEY DIED.
// VO (abs): "And then he made the decision we started this video with. (0.23–2.79) Part five. (3.42) The message he didn't send. (4.71–6.14) Byrd knew exactly
//   what would happen if he told Little America the truth. (6.92–10.56) His men would come for him. (11.12–12.43) And the only way to come was by tractor,
//   (13.05) across one hundred twenty-three miles of crevassed ice, (15.63–18.71) in total darkness, (19.05) at temperatures that froze fuel lines solid.
//   (20.50–22.93) In his mind, (23.50) a rescue in the middle of winter could kill the rescuers. (24.59–27.32) He had brought these men to Antarctica.
//   (27.88–29.75) He was not going to be the reason they died out there. (30.34–32.95) [+0.6]"
import { C, r1, filters, rigInit, scene, life, snow } from "../lib.mjs";
import { KIT_CSS, pill, tag, hide, bridge, bridgeJs } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, byrd, halftrack } from "./e3.mjs";
import { crew } from "./b3.mjs";
import { board, MX } from "./e5.mjs";

const GY = 700, TX = 520, TK = 1.3, CRV = [980, 1640, 2300], LAST = 2960, SCROLL = -2010;
export function build() {
  const s = "ms", p = "ms-by";
  const sn = snow(s + "-sn", 70, 21, { dx: -700, dy: 160, seed: 41 });
  const stars = Array.from({ length: 60 }, (_, i) => `<circle cx="${(i * 331) % 1920}" cy="${(i * 97) % 600}" r="${1 + (i % 3) * 0.6}" fill="#E2E8F0" opacity="${0.3 + (i % 4) * 0.15}"/>`).join("");
  const chasm = (x, w = 130) => `<polygon points="${x},${GY} ${x + w},${GY} ${x + w * 0.62},${GY + 330} ${x + w * 0.4},${GY + 330}" fill="url(#${s}-deep)"/>`;
  const bridgeSlab = (x, w = 130) => `<path d="M${x - 16} ${GY + 2} Q${x + w / 2} ${GY - 6} ${x + w + 16} ${GY + 2} L${x + w + 16} ${GY + 16} Q${x + w / 2} ${GY + 26} ${x - 16} ${GY + 16} Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>`;
  const world = `<g id="${s}-world">
      <rect x="-200" y="${GY}" width="4200" height="400" fill="#1E293B"/><rect x="-200" y="${GY - 3}" width="4200" height="6" fill="#94A3B8"/>
      ${CRV.map((x) => chasm(x) + bridgeSlab(x)).join("")}${chasm(LAST, 220)}
      <path d="M${LAST - 30} ${GY} L${LAST} ${GY} L${LAST + 8} ${GY + 26} L${LAST - 30} ${GY + 22} Z" fill="#CBD5E1"/>
      ${[400, 1300, 1950, 2620].map((x) => `<g><line x1="${x}" y1="${GY}" x2="${x}" y2="${GY - 70}" stroke="#94A3B8" stroke-width="4"/><path d="M${x} ${GY - 70} l26 8 l-26 8 z" fill="${E.warn}"/></g>`).join("")}
    </g>`;
  const fuel = `<g id="${s}-fuel"><path d="M120 -66 L196 -66 Q214 -66 220 -80" fill="none" stroke="#64748B" stroke-width="5" stroke-linecap="round"/>
      <path id="${s}-ice" d="M120 -66 L196 -66 Q214 -66 220 -80" fill="none" stroke="#7DD3FC" stroke-width="9" stroke-linecap="round" opacity="0" filter="url(#${s}-glow)"/>
      ${[132, 156, 180, 204].map((x) => `<polygon class="${s}-xt" points="${x},-76 ${x + 5},-66 ${x},-56 ${x - 5},-66" fill="#E0F2FE" opacity="0"/>`).join("")}</g>`;
  const shield = `<path d="M960 230 L1600 230 Q1620 230 1620 250 L1620 640 Q1620 820 1290 930 Q960 820 960 640 L960 250 Q960 230 980 230 Z" fill="rgba(245,158,11,.08)" stroke="#F59E0B" stroke-width="8" stroke-linejoin="round"/>`;
  const men = [["crew1", 1130], ["crew2", 1290], ["crew3", 1450]].map(([o, x], i) => `<g transform="translate(${x - 100} ${800 - 265})">${crew(`${s}-c${i}`, s, o)}</g>`).join("");
  const body = `
    ${bridge(s, "g-last.png")}
    <div id="${s}-B" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">${board(s, 4)}</div>
    <div id="${s}-P" style="position:absolute; inset:0; background:${E.night};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}
        <linearGradient id="${s}-deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0C4A6E"/><stop offset="1" stop-color="#020617"/></linearGradient></defs>
      <g>${stars}</g>${world}
      <g transform="translate(${TX} ${GY}) scale(${TK})"><g id="${s}-tr"><g id="${s}-bob">${halftrack(s + "-ht", s)}${fuel}</g></g></g>
      <g>${sn.svg}</g><rect id="${s}-dark" width="1920" height="1080" fill="#000" opacity="0"/>
    </svg>
    <div id="${s}-mind" class="ui" style="left:192px; top:196px; font-family:'Archivo Black', sans-serif; font-size:28px; letter-spacing:.06em; color:#94A3B8;">IN BYRD'S MIND: A WINTER RESCUE</div>
    ${tag(s + "-t1", "THE ONLY WAY: BY TRACTOR", 1160, 300)}${tag(s + "-t2", "123 MILES OF CREVASSED ICE", 1160, 370)}${tag(s + "-t3", "TOTAL DARKNESS", 1160, 440)}
    ${tag(s + "-t4", "FUEL LINES FROZEN SOLID", 540, 480)}
    <div id="${s}-warn" class="ui e-stamp" style="left:560px; top:860px; color:#FCA5A5; border-color:${E.warn}; background:rgba(11,16,30,.92); font-size:40px;">⚠ WINTER RESCUE = RESCUERS COULD DIE</div></div>
    <div id="${s}-S" style="position:absolute; inset:0; background:${C.navy};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "S")}</defs>
      <rect x="0" y="860" width="1920" height="220" fill="#111A2E"/>
      <g transform="translate(${520 - 100 * 1.5} ${r1(860 - 265 * 1.5)}) scale(1.5)">${byrd(p, s + "S", { outfit: "sweater" })}</g>
      <g id="${s}-sh">${shield}${men}</g></svg>
      <div id="${s}-his" class="ui" style="left:960px; width:660px; top:160px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:38px; color:#FBBF24;">HIS MEN</div>
      <div id="${s}-ban" class="ui k-lab" style="left:260px; width:1400px; top:960px;"><div style="background:rgba(11,16,30,.95); border:3px solid #F59E0B; font-size:40px;">"NOT GOING TO BE THE REASON THEY DIED"</div></div></div>
    <div id="${s}-dock" class="ui k-dock"><span class="n">PART 5</span>THE MESSAGE HE DIDN'T SEND</div>
    ${pill(s + "-dec", "HIS DECISION: NO CALL FOR HELP", "", { top: 196 })}`;

  const js = `
    ${rigInit(p)}
    ${[0, 1, 2].map((i) => rigInit(`${s}-c${i}`)).join("\n    ")}
    ${life(p, 27.9, 33.9, { every: 2.6 })}
    tl.set("#${s}-bridge", { opacity: 0, visibility: "hidden" }, 3.3);
    ${hide(s + "-B", s + "-P", s + "-S", s + "-dock", s + "-mind", s + "-t1", s + "-t2", s + "-t3", s + "-t4", s + "-warn", s + "-his", s + "-ban")}
    tl.set("#${s}-dec", { opacity: 0 }, 0);
    // callback: the decision we started with (G's last frame underneath)
    tl.set("#${s}-B", { opacity: 1 }, 3.3);
    tl.fromTo("#${s}-dec", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 0.6);
    // Part five: card 5 lights and docks
    tl.to("#${s}-m4", { color: "${C.cyan}", borderColor: "${C.cyan}", boxShadow: "0 0 40px ${C.cyan}", duration: .15 }, 3.4);
    tl.to("#${s}-m4", { scale: 1.25, duration: .25, ease: "back.out(2)" }, 3.55);
    tl.to("#${s}-dec", { opacity: 0, duration: .2 }, 3.4);
    tl.to("#${s}-m4", { x: ${-MX(4) - 60}, y: -330, scale: .25, opacity: 0, duration: .45, ease: "power3.in" }, 4.3);
    tl.fromTo("#${s}-dock", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1.08, x: 0, duration: .17, ease: "power2.out", immediateRender: false }, 4.7);
    tl.to("#${s}-dock", { scale: 1, duration: .1 }, 4.87);
    // the projection: a half-track crossing snow-bridged crevasses at night
    tl.set("#${s}-P", { opacity: 1 }, 6.9); tl.set("#${s}-B", { opacity: 0 }, 6.9);
    tl.fromTo("#${s}-mind", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 7.0);
    ${sn.js.replace(/, 0\);/g, ", 6.9);")}
    tl.fromTo("#${s}-world", { x: 0 }, { x: ${SCROLL}, duration: 14.6, ease: "power1.inOut", immediateRender: false }, 7.0);
    ${Array.from({ length: 70 }, (_, i) => `tl.to("#${s}-bob", { y: ${i % 2 ? 0 : -2.5}, duration: .1, ease: "none" }, ${r1(7.0 + i * 0.21)});`).join("\n    ")}
    tl.fromTo("#${s}-t1", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 13.1);
    tl.fromTo("#${s}-t2", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 15.7);
    tl.fromTo("#${s}-t3", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 19.1);
    tl.to("#${s}-dark", { opacity: .4, duration: 1.2 }, 19.1);
    // the fuel line freezes; it stops at the crevasse lip
    tl.to("#${s}-ice", { opacity: 1, duration: .5 }, 20.6);
    tl.to(".${s}-xt", { opacity: 1, duration: .3, stagger: .12 }, 21.0);
    tl.fromTo("#${s}-t4", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 21.2);
    tl.to("#${s}-ht-beam", { opacity: .35, duration: .2, yoyo: true, repeat: 3 }, 21.6);
    tl.to("#${s}-tr", { rotation: 2.5, svgOrigin: "250 0", duration: .5, ease: "power2.out" }, 22.0);
    tl.to(["#${s}-t1", "#${s}-t2", "#${s}-t3"], { opacity: 0, duration: .25 }, 24.4);
    tl.fromTo("#${s}-warn", { opacity: 0, scale: 1.6, rotation: -6 }, { opacity: 1, scale: 1, rotation: -3, duration: .2, ease: "power3.in", immediateRender: false }, 25.6);
    // his men, shielded; Byrd shakes his head
    tl.set("#${s}-S", { opacity: 1 }, 27.85); tl.set("#${s}-P", { opacity: 0 }, 27.85);
    tl.fromTo("#${s}-sh", { opacity: 0, scale: .85, svgOrigin: "1290 580" }, { opacity: 1, scale: 1, svgOrigin: "1290 580", duration: .35, ease: "back.out(1.5)", immediateRender: false }, 28.0);
    tl.fromTo("#${s}-his", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 28.3);
    ${[9, -9, 9, -9, 9, 0].map((r, i) => `tl.to("#${p}-head", { rotation: ${r}, svgOrigin: "100 96", duration: .2, ease: "sine.inOut" }, ${r1(30.4 + i * 0.2)});`).join(" ")}
    tl.fromTo("#${s}-ban", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 30.6);`;

  return { id: "message", html: scene("message", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
