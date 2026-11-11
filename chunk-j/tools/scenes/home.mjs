// J03 (64.3–94.2): TOTAL TIME ALONE: 136 DAYS (MAR 28 – AUG 10) locks; ⚠ TOO WEAK FOR THE 123-MILE TRACTOR RIDE BACK; X-ray of the tiny hut with all four
//   men shoulder to shoulder (+2 MONTHS TOGETHER · AUG – OCT) while the sun returns over the horizon; OCTOBER 12, 1934 daylight: a ski plane
//   (PILOT: WILLIAM BOWLIN) lands by the antenna poles and flies Byrd & Poulter out; Demas & Waite drive the half-track home.
// VO (local = abs − 64.3): "Byrd was alone for one hundred thirty-six days. (0.24–3.12) But the rescue didn't end the story. (3.57–5.37) He was far too weak
//   to ride a tractor one hundred twenty-three miles back. (5.89–9.95) So the four of them stayed together in that tiny hut — (10.63–13.41) for another two
//   months — (13.94) until the sun came back (15.60–16.96) and a plane could finally fly in. (17.35–19.20) On October twelfth, nineteen thirty-four, (19.64)
//   pilot William Bowlin landed beside the hut (22.21–24.62) and flew Byrd and Polter out. (25.04–26.70) Deemas and Waite drove the tractor home. (27.28–29.32)"
import { C, r1, filters, rigInit, scene, life, shiver } from "../lib.mjs";
import { KIT_CSS, badge, tag, hide, count } from "./kit.mjs";
import { E, E3_CSS, cutaway, byrd, halftrack } from "./e3.mjs";
import { crew } from "./b3.mjs";
import { SPECS } from "./h8.mjs";
import { cam, plane } from "./j10.mjs";

const G = 620, RX = 700, TK = 1.1, G2 = 540;
export function build() {
  const s = "hm", pa = "hm-a", pb = "hm-b";
  const CK = 0.9;
  const at = (q, x, outfit, o = {}) => `<g transform="translate(${r1(x - 100 * CK)} ${r1(G - 265 * CK)}) scale(${CK})">${o.byrd ? byrd(q, s, { outfit: "anorak", gaunt: true }) : crew(q, s, outfit, o)}</g>`;
  // in-room crew of four (room coords, floor y = 320)
  const RK = 0.62, four = [["byrd", 140], ["crew1", 205], ["crew2", 330], ["crew3", 395]].map(([o, x], i) => `<g transform="translate(${r1(x - 100 * RK)} ${r1(320 - 265 * RK)}) scale(${RK})">${o === "byrd" ? byrd(`${s}-f${i}`, s + "H", { outfit: "sweater", gaunt: true }) : crew(`${s}-f${i}`, s + "H", o, o === "crew1" ? { headwear: SPECS } : {})}</g>`).join("");
  const daySky = (id, op) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38BDF8"/><stop offset="1" stop-color="#FEF08A"/></linearGradient></defs><rect id="${id}-r" width="1920" height="${G2}" fill="url(#${id})" opacity="${op}"/>`;
  const body = `
    <div id="${s}-A" style="position:absolute; inset:0; background:${E.night}; overflow:hidden;">
      <div style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0; transform:matrix(1.2,0,0,1.2,${cam(1.2, 1060, 500).x},${cam(1.2, 1060, 500).y});"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
        ${cutaway(s, G, { rx: RX, seed: 93 })}
        <rect x="${RX + 12}" y="${G - 5}" width="62" height="9" fill="#0B0F17"/><g transform="rotate(-110 ${RX + 12} ${G})"><rect x="${RX + 12}" y="${G - 7}" width="62" height="11" rx="2" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="3"/></g>
        <g transform="translate(1660 ${G}) scale(${-TK} ${TK})">${halftrack(s + "-ht", s, { crew: 0 })}</g>
        ${at(pa, 820, "", { byrd: true })}${at(s + "-a1", 1020, "crew1", { headwear: SPECS })}${at(s + "-a2", 1100, "crew2")}${at(s + "-a3", 1180, "crew3")}</svg></div>
      <div id="${s}-cnt" class="ui" style="left:192px; top:108px; display:flex; align-items:center; gap:16px; height:74px; padding:0 30px; border-radius:16px; background:rgba(17,24,39,.95); border:3px solid ${C.gold}; font-family:'Archivo Black', sans-serif; font-size:32px; color:#fff;">
        <span style="color:${C.gold};">●</span>TOTAL TIME ALONE: <span id="${s}-n" style="color:${C.gold};">0</span>&nbsp;DAYS <span style="font-family:Inter, sans-serif; font-weight:800; font-size:28px; color:#CBD5E1;">(MAR 28 – AUG 10)</span></div>
      ${tag(s + "-end", "THE RESCUE DIDN'T END THE STORY", 192, 206)}
      <div id="${s}-weak" class="ui" style="left:0; right:0; top:880px; display:flex; justify-content:center;"><div class="ui-warn">⚠ TOO WEAK FOR THE 123-MILE TRACTOR RIDE BACK</div></div></div>
    <div id="${s}-H" style="position:absolute; inset:0; background:${E.night}; overflow:hidden;">
      <div style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0; transform:matrix(1.5,0,0,1.5,${cam(1.5, 960, 560).x},${cam(1.5, 960, 560).y});"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "H")}</defs>
        <rect x="-3000" width="7920" height="${G2}" fill="${E.night}"/>${Array.from({ length: 60 }, (_, i) => `<circle cx="${(i * 331) % 1920}" cy="${(i * 97) % (G2 - 30)}" r="${1 + (i % 3) * 0.6}" fill="#E2E8F0" opacity=".6"/>`).join("")}
        ${daySky(s + "-sky", 0)}
        <g id="${s}-sun"><circle cx="1420" cy="${G2 + 60}" r="90" fill="#FDE68A" opacity=".5" filter="url(#${s}H-bloom)"/><circle cx="1420" cy="${G2 + 60}" r="44" fill="#FACC15"/></g>
        ${cutaway(s + "H", G2, { rx: RX, inRoom: four, seed: 95, noSky: true })}
        <rect x="-3000" y="${G2}" width="7920" height="18" fill="${E.glacial}"/>
        <line x1="300" y1="${G2}" x2="1700" y2="${G2}" stroke="#F8FAFC" stroke-width="2" stroke-dasharray="10 8" opacity=".5"/>
        <g id="${s}-fly" opacity="0"><g transform="translate(1600 330) scale(-.35 .35)">${plane(s + "-pl0")}</g></g></svg></div>
      ${tag(s + "-two", "+2 MONTHS TOGETHER IN THE HUT · AUG – OCT", 192, 196)}${tag(s + "-sunT", "THE SUN COMES BACK", 192, 266)}
      <div class="ui" style="left:1260px; top:690px; font-family:Inter, sans-serif; font-weight:800; font-size:28px; color:#CBD5E1;">9 × 13 FT HUT · 4 MEN</div></div>
    <div id="${s}-D" style="position:absolute; inset:0; overflow:hidden;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "D")}
        <linearGradient id="${s}-dsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38BDF8"/><stop offset="1" stop-color="#E0F2FE"/></linearGradient></defs>
      <rect width="1920" height="${G}" fill="url(#${s}-dsk)"/>
      ${cutaway(s + "D", G, { rx: RX, noSky: true, seed: 97 })}
      <rect x="${RX + 12}" y="${G - 5}" width="62" height="9" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="2"/>
      <g id="${s}-trk"><g transform="translate(560 ${G}) scale(${-TK} ${TK})">${halftrack(s + "-ht2", s + "D", { crew: 2, light: false })}</g></g>
      <g id="${s}-gB">${at(pb, 650, "", { byrd: true })}</g>
      <g id="${s}-gP">${at(s + "-dp", 745, "crew1", { headwear: SPECS })}</g>
      <g id="${s}-pmv"><g transform="scale(1.4)">${plane(s + "-pl")}</g></g></svg>
      ${tag(s + "-pil", "PILOT: WILLIAM BOWLIN", 1180, 262)}${tag(s + "-out", "BYRD & POULTER — FLOWN OUT ↑", 1180, 322)}${tag(s + "-drv", "← DEMAS & WAITE DROVE THE TRACTOR HOME", 1060, 382)}
      ${badge(s + "-b", "OCTOBER 12, 1934", "FLOWN OUT", { fs: 40, w: 440, left: 1288 })}</div>`;

  const js = `
    ${rigInit(pa)}${"\n    "}${rigInit(pb)}${"\n    "}${rigInit(s + "-dp")}
    ${[1, 2, 3].map((i) => rigInit(`${s}-a${i}`)).join("\n    ")}${"\n    "}${[0, 1, 2, 3].map((i) => rigInit(`${s}-f${i}`)).join("\n    ")}
    ${shiver(pa, 0.1, 10.5, 1.5)}${"\n    "}${shiver(pb, 19.5, 25.0, 1.5)}
    ${[1, 2, 3].map((i) => life(`${s}-a${i}`, 0.3, 10.5, { every: 2.6 + i * 0.3 })).join("\n    ")}
    ${[0, 1, 2, 3].map((i) => life(`${s}-f${i}`, 10.6, 19.5, { every: 2.4 + i * 0.35 })).join("\n    ")}
    tl.set(["#${s}-H", "#${s}-D"], { autoAlpha: 0 }, 0);
    ${hide(s + "-cnt", s + "-end", s + "-weak", s + "-two", s + "-sunT", s + "-pil", s + "-out", s + "-drv", s + "-b")}
    // 136 days alone
    tl.fromTo("#${s}-cnt", { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.7)", immediateRender: false }, 0.25);
    ${count(s + "-n", 0, 136, 0.4, 2.4, "Math.round(v)")}
    tl.to("#${s}-cnt", { boxShadow: "0 0 40px ${C.gold}", duration: .25, yoyo: true, repeat: 1 }, 2.9);
    tl.fromTo("#${s}-end", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 3.6);
    tl.to("#${pa}", { rotation: -4, svgOrigin: "100 265", duration: .6, yoyo: true, repeat: 5, ease: "sine.inOut" }, 5.9);
    tl.fromTo("#${s}-weak", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 5.95);
    // two more months, four men in the tiny hut; the sun comes back
    tl.set("#${s}-H", { autoAlpha: 1 }, 10.5); tl.set("#${s}-A", { autoAlpha: 0 }, 10.5);
    tl.set("#${s}H-snowcover", { opacity: .12 }, 0);
    tl.fromTo("#${s}-two", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 13.95);
    tl.to("#${s}-sky-r", { opacity: 1, duration: 2.6, ease: "power1.inOut" }, 15.0);
    tl.fromTo("#${s}-sun", { y: 0 }, { y: -190, duration: 3.0, ease: "power1.out", immediateRender: false }, 15.4);
    tl.fromTo("#${s}-sunT", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 15.65);
    tl.fromTo("#${s}-fly", { opacity: 0, x: 0 }, { opacity: 1, x: -200, duration: 2.0, ease: "none", immediateRender: false }, 17.4);
    // October 12, 1934: the plane lands beside the hut
    tl.set("#${s}-D", { autoAlpha: 1 }, 19.5); tl.set("#${s}-H", { autoAlpha: 0 }, 19.5);
    tl.fromTo("#${s}-b", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 19.65);
    tl.set("#${s}-pmv", { x: -600, y: 220, rotation: 0 }, 0);
    tl.to("#${s}-pmv", { x: 900, duration: 2.6, ease: "power2.out" }, 19.7); tl.to("#${s}-pmv", { y: ${G}, duration: 2.6, ease: "power1.in" }, 19.7);
    tl.to("#${s}-pmv", { x: 1100, duration: 1.2, ease: "power2.out" }, 22.3);
    ${Array.from({ length: 50 }, (_, i) => `tl.to("#${s}-pl-prop", { scaleY: ${i % 2 ? 1 : 0.2}, svgOrigin: "284 -64", duration: .06, ease: "none" }, ${r1(19.7 + i * 0.07)});`).join("\n    ")}
    tl.fromTo("#${s}-pil", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 22.25);
    // Byrd and Poulter board; it takes off
    tl.to(["#${s}-gB", "#${s}-gP"], { x: 470, duration: 1.0, ease: "power1.in" }, 23.9);
    tl.set(["#${s}-gB", "#${s}-gP"], { opacity: 0 }, 24.9);
    ${Array.from({ length: 50 }, (_, i) => `tl.to("#${s}-pl-prop", { scaleY: ${i % 2 ? 1 : 0.2}, svgOrigin: "284 -64", duration: .05, ease: "none" }, ${r1(25.0 + i * 0.06)});`).join("\n    ")}
    tl.to("#${s}-pmv", { x: 2300, duration: 3.6, ease: "power1.in" }, 25.0);
    tl.to("#${s}-pmv", { y: 140, rotation: -12, svgOrigin: "0 0", duration: 2.6, ease: "power1.in" }, 25.8);
    tl.fromTo("#${s}-out", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 25.1);
    // Demas and Waite drive the tractor home
    tl.to("#${s}-trk", { x: -900, duration: 2.6, ease: "power1.in" }, 27.3);
    tl.fromTo("#${s}-drv", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 27.35);`;

  return { id: "home", html: scene("home", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
