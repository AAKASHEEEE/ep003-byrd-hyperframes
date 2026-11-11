// K01 (0–25.0): hard cut from J's last frame → the board lights the final card 7 (amber) → PART 7 · WHAT 136 DAYS ALONE DID TO HIM; Byrd in his navy coat
//   with the buried hut as a faint shadow behind him and a dimmed heart line (HEALTH NEVER QUITE THE SAME); then a generic navy clothbound book
//   (not the real cover) under PUBLISHED 1938, gold-foil title ALONE / RICHARD E. BYRD.
// VO (abs): "Part seven. (0.21) What one hundred thirty-six days alone did to him. (1.53–4.27) Byrd survived. (5.01) But he never fully forgot that winter.
//   (6.50–8.46) People who knew him said his health was never quite the same afterward. (9.03–12.37) For a few years, (13.00) he barely spoke about what had
//   really happened at Advance Base. (14.23–17.36) In nineteen thirty-eight, (17.83) he finally told the whole story in a book. (19.32–21.49) He called it,
//   (22.09) simply, (23.10) Alone. (24.02–24.59)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, badge, tag, hide, bridge } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, room, byrd } from "./e3.mjs";
import { board, MX } from "./e5.mjs";

const AMB = "#FF7A00";
export function build() {
  const s = "sv", p = "sv-by";
  const book = `<div id="${s}-book" class="ui" style="left:760px; top:250px; width:400px; height:560px; border-radius:8px 16px 16px 8px; background:linear-gradient(90deg,#0F1B3D 0,#1E2E5C 8%,#1A2950 100%); box-shadow:0 30px 80px rgba(0,0,0,.6), inset 10px 0 0 #0B142E; border:3px solid #0B142E;">
      <div style="position:absolute; inset:22px 22px 22px 34px; border:3px solid rgba(212,160,23,.55); border-radius:6px;"></div>
      <div id="${s}-auth" style="position:absolute; left:34px; right:22px; top:330px; text-align:center; font-family:Georgia, 'Times New Roman', serif; font-size:30px; letter-spacing:.14em; color:#D4A017;">RICHARD E. BYRD</div>
      <div id="${s}-ttl" style="position:absolute; left:34px; right:22px; top:150px; text-align:center; font-family:Georgia, 'Times New Roman', serif; font-weight:700; font-size:96px; letter-spacing:.08em; color:#E8C252; text-shadow:0 2px 0 #7A5A0C;">ALONE</div>
      <div id="${s}-glint" style="position:absolute; left:0; top:0; width:120px; height:100%; background:linear-gradient(90deg, rgba(255,240,200,0), rgba(255,240,200,.35), rgba(255,240,200,0)); transform:skewX(-18deg);"></div></div>`;
  const body = `
    <div id="${s}-B" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">${board(s, 6)}</div>
    <div id="${s}-S" style="position:absolute; inset:0; background:${C.navy};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect y="900" width="1920" height="180" fill="#0B1222"/>
      <g id="${s}-ghost" opacity=".14"><g transform="translate(980 300) scale(1.6)">${room(s + "G", { pipeTop: 0 })}</g></g>
      <g transform="translate(${560 - 100 * 1.6} ${r1(900 - 265 * 1.6)}) scale(1.6)">${byrd(p, s, { outfit: "navy" })}</g>
      <g id="${s}-hrt" opacity="0"><path d="M1500 520 C1500 470 1440 450 1420 495 C1400 450 1340 470 1340 520 C1340 570 1420 620 1420 640 C1420 620 1500 570 1500 520 Z" fill="#7F1D1D" stroke="#FCA5A5" stroke-width="4"/>
        <polyline id="${s}-ecg" points="1300,700 1360,700 1380,690 1400,712 1420,670 1440,716 1460,700 1540,700" fill="none" stroke="#FCA5A5" stroke-width="5" stroke-linejoin="round" opacity=".7"/></g></svg>
      ${tag(s + "-t1", "BYRD SURVIVED", 192, 196)}${tag(s + "-t2", "HE NEVER FULLY FORGOT THAT WINTER", 192, 266)}
      ${tag(s + "-hlt", "HEALTH NEVER QUITE THE SAME", 1260, 740)}${tag(s + "-t3", "FOR A FEW YEARS: HE BARELY SPOKE ABOUT ADVANCE BASE", 192, 336)}</div>
    <div id="${s}-dim" style="position:absolute; inset:0; background:rgba(2,4,10,.7);"></div>
    ${book}
    ${badge(s + "-pub", "PUBLISHED", "1938", { fs: 52 })}
    <div id="${s}-dock" class="ui k-dock"><span class="n" style="background:${AMB};">PART 7</span>WHAT 136 DAYS ALONE DID TO HIM</div>
    ${bridge(s, "j-last.png")}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 5.0, 25.0, { every: 3.2 })}
    tl.set("#${s}-bridge", { opacity: 0, visibility: "hidden" }, 0.2);
    tl.set("#${s}-S", { autoAlpha: 0 }, 0);
    ${hide(s + "-dock", s + "-t1", s + "-t2", s + "-t3", s + "-hlt", s + "-dim", s + "-book", s + "-pub", s + "-auth", s + "-ttl")}
    // card 7, amber
    tl.to("#${s}-m6", { color: "${AMB}", borderColor: "${AMB}", boxShadow: "0 0 50px ${AMB}", duration: .15 }, 0.25);
    tl.to("#${s}-m6", { scale: 1.25, duration: .25, ease: "back.out(2)" }, 0.4);
    tl.to("#${s}-m6", { x: ${-MX(6) - 60}, y: -330, scale: .25, opacity: 0, duration: .45, ease: "power3.in" }, 1.1);
    tl.fromTo("#${s}-dock", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1.08, x: 0, duration: .17, ease: "power2.out", immediateRender: false }, 1.55);
    tl.to("#${s}-dock", { scale: 1, duration: .1 }, 1.72);
    // the man who came back
    tl.set("#${s}-S", { autoAlpha: 1 }, 4.9); tl.set("#${s}-B", { autoAlpha: 0 }, 4.9);
    tl.fromTo("#${s}-t1", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 5.05);
    tl.fromTo("#${s}-t2", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 6.55);
    tl.fromTo("#${s}-ghost", { opacity: 0 }, { opacity: .14, duration: 1.2, immediateRender: false }, 6.5);
    tl.to("#${s}-hrt", { opacity: 1, duration: .4 }, 9.05);
    tl.fromTo("#${s}-hlt", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 9.1);
    ${[0, 1, 2, 3].map((i) => `tl.to("#${s}-hrt", { scale: ${i % 2 ? 1 : 1.06}, svgOrigin: "1420 540", duration: .45, ease: "sine.inOut" }, ${r1(9.5 + i * 0.5)});`).join("\n    ")}
    tl.fromTo("#${s}-t3", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 13.05);
    tl.to("#${p}-head", { rotation: -10, svgOrigin: "100 96", duration: .6 }, 13.2);
    tl.set("#${p}-lids", { scaleY: .45 }, 13.4);
    // 1938: the book
    tl.fromTo("#${s}-pub", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 17.85);
    tl.to(["#${s}-t1", "#${s}-t2", "#${s}-t3", "#${s}-hlt"], { opacity: 0, duration: .4 }, 18.5);
    tl.to("#${s}-dim", { opacity: 1, duration: .4 }, 19.2);
    tl.fromTo("#${s}-book", { opacity: 0, y: 160, scale: .8, rotation: -6 }, { opacity: 1, y: 0, scale: 1, rotation: 0, duration: .55, ease: "power3.out", immediateRender: false }, 19.3);
    tl.fromTo("#${s}-auth", { opacity: 0 }, { opacity: 1, duration: .5, immediateRender: false }, 20.0);
    tl.fromTo("#${s}-ttl", { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: .45, ease: "power2.out", immediateRender: false }, 24.0);
    tl.set("#${s}-glint", { opacity: 0 }, 0); tl.set("#${s}-glint", { opacity: 1 }, 24.2);
    tl.fromTo("#${s}-glint", { x: -160 }, { x: 460, duration: .8, ease: "power1.inOut", immediateRender: false }, 24.2);`;

  return { id: "seven", html: scene("seven", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
