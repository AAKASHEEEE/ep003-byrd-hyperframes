// J02 (25.6–64.3): the half-track pulls up beside the antenna poles, its single headlight cone on the hatch; Poulter, Demas and Waite step down; gaunt
//   Byrd climbs up out of the snow. The Chunk A padlock flies to centre and clicks open; the redacted quote is revealed line by line while Byrd holds out a
//   steaming bowl; then 4+ MONTHS ALONE · NEARLY POISONED TO DEATH · HALF-STARVED → ✓ PLAYS THE HOST.
// VO (local = abs − 25.6): "They pulled up beside the antenna poles. (0.26–2.26) Out of the snow, (2.89) a thin, (4.14) hollow-faced man climbed up to meet
//   them. (4.92–7.23) He had lost a lot of weight. (7.81) His face was gaunt. (9.73) He was very clearly sick. (11.85–13.62) And then came the line I promised
//   you at the start. (14.17–16.43) According to the men who were there, (16.93) Byrd greeted them as if they'd just dropped by for dinner. (18.89–21.56)
//   [+1.2 quiet] Hello, fellows, he said. (23.25–24.79) Come on below. (25.23) I have a bowl of hot soup waiting for you. (26.50–28.40) Now imagine that.
//   (29.01) More than four months alone. (30.68) Nearly poisoned to death. (32.69) Half-starved. (34.63) And the first thing he does is play the host. (35.99–38.29)"
import { C, r1, filters, rigInit, scene, life, shiver, walk } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { E, E3_CSS, cutaway, byrd, halftrack } from "./e3.mjs";
import { crew } from "./b3.mjs";
import { SPECS } from "./h8.mjs";
import { cam, bowl } from "./j10.mjs";

const G = 620, RX = 700, K = 0.9, CK = 0.9, TK = 1.1;
const LOCK = (id, w) => `<svg width="${w}" height="${w * 1.15}" viewBox="0 0 40 46" style="overflow:visible;"><g id="${id}"><path d="M10 20 V13 a10 10 0 0 1 20 0 V20" fill="none" stroke="${C.gold}" stroke-width="5"/></g><rect x="4" y="20" width="32" height="24" rx="5" fill="${C.gold}"/><circle cx="20" cy="31" r="3.5" fill="#111827"/></svg>`;
export function build() {
  const s = "sp", p = "sp-by", r = ["sp-r0", "sp-r1", "sp-r2"];
  const me = `<g id="${s}-bpos"><g transform="translate(${r1(-100 * K)} ${r1(-265 * K)}) scale(${K})">${byrd(p, s, { outfit: "anorak", gaunt: true, props: [bowl(p)] })}</g></g>`;
  const men = [["crew1", { headwear: SPECS }], ["crew2", {}], ["crew3", {}]].map(([o, x], i) => `<g id="${s}-rp${i}"><g transform="translate(${r1(-100 * CK)} ${r1(-265 * CK)}) scale(${CK})">${crew(r[i], s, o, x)}</g></g>`).join("");
  const line = (i, t) => `<div style="position:relative; margin:${i ? 14 : 0}px auto 0; width:fit-content; font-family:'Archivo Black', sans-serif; font-size:44px; line-height:1.12; color:#FDE68A;">${t}<div id="${s}-red${i}" style="position:absolute; inset:-4px -10px; border-radius:8px; background:#EA580C;"></div></div>`;
  const pillX = (id, t, x, y, gold) => `<div id="${id}" class="ui" style="left:${x}px; top:${y}px; padding:14px 30px; border-radius:40px; background:${gold ? C.gold : "rgba(11,16,30,.95)"}; border:3px solid ${gold ? "#FDE68A" : E.warn}; font-family:'Archivo Black', sans-serif; font-size:${gold ? 44 : 34}px; color:${gold ? "#111827" : "#FCA5A5"};">${t}</div>`;
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0; background:${E.night}; overflow:hidden;">
      <div id="${s}-cam" style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
        ${cutaway(s, G, { rx: RX, inRoom: me, seed: 93 })}
        <rect x="${RX + 12}" y="${G - 5}" width="62" height="9" fill="#0B0F17"/>
        <g transform="rotate(-110 ${RX + 12} ${G})"><rect x="${RX + 12}" y="${G - 7}" width="62" height="11" rx="2" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="3"/></g>
        <g id="${s}-trk"><g transform="translate(1660 ${G}) scale(${-TK} ${TK})">${halftrack(s + "-ht", s, { crew: 0 })}</g></g>
        ${men}</svg></div>
      ${tag(s + "-t1", "LOST A LOT OF WEIGHT", 192, 196)}${tag(s + "-t2", "FACE GAUNT", 192, 266)}${tag(s + "-t3", "VERY CLEARLY SICK", 192, 336)}</div>
    <div id="${s}-dim" style="position:absolute; inset:0; background:rgba(2,4,10,.42);"></div>
    <div id="${s}-lock" class="ui" style="left:192px; top:108px; display:flex; align-items:center; gap:14px; height:66px; padding:0 26px 0 18px; border-radius:14px; background:rgba(17,24,39,.94); border:3px solid ${C.gold}; font-family:'Archivo Black', sans-serif; font-size:28px; color:#fff; transform-origin:0 50%;">${LOCK(s + "-shk", 26)}LOCKED UNTIL PART 6: HIS FIRST WORDS</div>
    <div id="${s}-card" class="ui" style="left:310px; top:92px; width:1300px; padding:28px 0 26px; border-radius:26px; background:rgba(17,24,39,.97); border:5px solid ${C.gold}; box-shadow:0 0 70px rgba(245,158,11,.35); text-align:center;">
      ${line(0, "\"Hello, fellows.")}${line(1, "Come on below.")}${line(2, "I have a bowl of hot soup waiting for you.\"")}
      <div id="${s}-src" style="margin-top:16px; font-family:Inter, sans-serif; font-weight:800; font-size:28px; color:#CBD5E1;">— according to the rescuers at Advance Base, Aug 10, 1934</div></div>
    ${pillX(s + "-p0", "4+ MONTHS ALONE", 220, 200)}${pillX(s + "-p1", "NEARLY POISONED TO DEATH", 700, 200)}${pillX(s + "-p2", "HALF-STARVED", 1360, 200)}
    <div id="${s}-host" class="ui" style="left:0; right:0; top:320px; display:flex; justify-content:center;">${pillX(s + "-hp", "✓ PLAYS THE HOST", 0, 0, true).replace('class="ui" style="left:0px; top:0px;', 'style="position:relative;')}</div>`;

  const js = `
    ${rigInit(p)}${"\n    "}${r.map((q) => rigInit(q)).join("\n    ")}
    ${shiver(p, 0.2, 38.7, 1.5)}
    ${r.map((q, i) => life(q, 2.4, 38.7, { every: 2.6 + i * 0.3 })).join("\n    ")}
    ${hide(s + "-t1", s + "-t2", s + "-t3", s + "-dim", s + "-lock", s + "-card", s + "-src", s + "-p0", s + "-p1", s + "-p2", s + "-host")}
    tl.set("#${s}-cam", { ...${JSON.stringify(cam(1.2, 1060, 500))}, transformOrigin: "0 0" }, 0);
    tl.set("#${s}-bpos", { x: 33, y: 220 }, 0); tl.set("#${s}-trk", { x: 700 }, 0);
    ${[0, 1, 2].map((i) => `tl.set("#${s}-rp${i}", { x: ${1330 + i * 20}, y: ${G}, opacity: 0 }, 0);`).join("\n    ")}
    // they pull up beside the antenna poles; the men step down into the headlight
    tl.to("#${s}-trk", { x: 0, duration: 2.2, ease: "power2.out" }, 0.0);
    ${[0, 1, 2].map((i) => { const t = r1(2.2 + i * 0.35); return `tl.set("#${s}-rp${i}", { opacity: 1 }, ${t});
    tl.to("#${s}-rp${i}", { x: ${1020 + i * 80}, duration: 1.3, ease: "power1.inOut" }, ${t});
    ${walk(r[i], t, t + 1.3, 0.27, 14)}`; }).join("\n    ")}
    // out of the snow, a thin, hollow-faced man climbs up
    tl.set("#${p}-armL", { rotation: 150 }, 2.8); tl.set("#${p}-armR", { rotation: -150 }, 2.8);
    ${Array.from({ length: 4 }, (_, i) => { const t = r1(2.9 + i * 0.7), y = r1(220 - (236 * (i + 1)) / 4); return `tl.to("#${s}-bpos", { y: ${y}, duration: .6, ease: "power1.inOut" }, ${t});
    tl.to("#${p}-armL", { rotation: ${i % 2 ? 140 : 168}, duration: .3 }, ${t}); tl.to("#${p}-armR", { rotation: ${i % 2 ? -168 : -140}, duration: .3 }, ${t});`; }).join("\n    ")}
    tl.to(["#${p}-armL", "#${p}-armR"], { rotation: 0, duration: .3 }, 5.7);
    tl.to("#${s}-bpos", { x: 120, duration: 1.0, ease: "power1.inOut" }, 6.0);
    ${walk(p, 6.0, 7.0, 0.25, 12)}
    tl.set("#${p}-lids", { scaleY: .3 }, 7.0);
    ${[[1, 7.85], [2, 9.75], [3, 11.9]].map(([i, t]) => `tl.fromTo("#${s}-t${i}", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, ${t});`).join("\n    ")}
    tl.to(["#${s}-t1", "#${s}-t2", "#${s}-t3"], { opacity: 0, duration: .25 }, 14.0);
    // the promised line: the Chunk A padlock flies to centre and clicks open
    tl.to("#${s}-dim", { opacity: 1, duration: .4 }, 14.1);
    tl.fromTo("#${s}-lock", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .2, immediateRender: false }, 14.2);
    tl.to("#${s}-lock", { x: 520, y: 140, scale: 1.4, duration: .6, ease: "power2.inOut" }, 14.8);
    tl.to("#${s}-shk", { y: -7, rotation: -28, svgOrigin: "30 20", duration: .25, ease: "back.out(2)" }, 16.9);
    tl.to("#${s}-lock", { opacity: 0, scale: 1.7, duration: .3 }, 17.3);
    tl.fromTo("#${s}-card", { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: .35, ease: "back.out(1.4)", immediateRender: false }, 17.4);
    // he holds out a bowl of hot soup
    tl.set("#${p}-bowl", { opacity: 1 }, 19.0);
    tl.to("#${p}-armR", { rotation: -55, duration: .5, ease: "power2.out" }, 19.0);
    ${Array.from({ length: 10 }, (_, i) => `tl.fromTo("#${p}-steam", { y: 0, opacity: .8 }, { y: -10, opacity: .2, duration: 1.0, ease: "none", immediateRender: false }, ${r1(19.0 + i * 1.0)});`).join("\n    ")}
    // the redaction lifts, line by line
    ${[[0, 23.25], [1, 25.23], [2, 26.5]].map(([i, t]) => `tl.to("#${s}-red${i}", { opacity: 0, duration: .35 }, ${t});`).join("\n    ")}
    tl.fromTo("#${s}-src", { opacity: 0 }, { opacity: 1, duration: .4, immediateRender: false }, 26.6);
    // and the first thing he does is play the host
    tl.to(["#${s}-card", "#${s}-dim"], { opacity: 0, duration: .3 }, 29.3);
    ${[[0, 30.7], [1, 32.7], [2, 34.65]].map(([i, t]) => `tl.fromTo("#${s}-p${i}", { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .22, ease: "back.out(2)", immediateRender: false }, ${t});`).join("\n    ")}
    tl.to(["#${s}-p0", "#${s}-p1", "#${s}-p2"], { opacity: .35, duration: .3 }, 35.9);
    tl.fromTo("#${s}-host", { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .3, ease: "back.out(1.8)", immediateRender: false }, 36.0);`;

  return { id: "soup", html: scene("soup", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
