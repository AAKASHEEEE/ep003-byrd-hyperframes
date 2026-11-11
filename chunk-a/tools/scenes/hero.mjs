// A03 (28.0–53.7): Admiral Richard E. Byrd — 1930s press flashback (navy coat) -> snow-gust wipe -> alone at Advance Base (anorak) -> 3 stamps.
// VO (local = abs − 28.0): "His name was Richard Evelyn Byrd. (0.28) He was a United States Navy admiral, (2.82) one of the most famous explorers
//   alive, (5.18) the man newspapers called the hero of both Poles. (7.65–10.46) And in the winter of 1934, (11.15) he chose to live completely
//   alone, (13.64) buried in the ice, (16.09) in the coldest, (17.65) darkest place on Earth. (18.86–20.24) He wasn't stranded. (20.84) Nobody
//   abandoned him. (22.27–23.48) [1 s] He volunteered. (24.47–25.42)"
import { C, r1, filters, rigInit, scene, life, snow2 } from "../lib.mjs";
import { KIT_CSS, pill, cite, tag, box, hide, breath } from "./kit.mjs";
import { E, E3_CSS, cutaway, byrd, antarctica } from "./e3.mjs";

const G = 660;
export function build() {
  const s = "hr", pN = "hr-nv", pA = "hr-an";
  const lines = Array.from({ length: 16 }, (_, i) => `<line x1="0" y1="${40 + i * 68}" x2="1920" y2="${40 + i * 68}" stroke="#3A2D20" stroke-width="2"/>`).join("");
  const col = (x, y, n) => Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * 22}" width="${i % 5 === 4 ? 110 : 160}" height="9" fill="#9C8F7A"/>`).join("");
  const plane = `<g transform="translate(1340 520)"><rect x="-90" y="-8" width="180" height="16" rx="8" fill="#3F3A33"/><rect x="-14" y="-40" width="10" height="80" fill="#3F3A33"/><rect x="72" y="-28" width="8" height="56" fill="#3F3A33"/>
      <circle cx="-94" cy="0" r="10" fill="#3F3A33"/><circle cx="-40" cy="-24" r="8" fill="#3F3A33"/><circle cx="-40" cy="24" r="8" fill="#3F3A33"/></g>`;
  const paper = `<g transform="rotate(3 1340 520)"><g id="${s}-paper">
      <rect x="1040" y="210" width="600" height="620" fill="#EDE4D3"/><rect x="1040" y="210" width="600" height="620" fill="none" stroke="#B9AC94" stroke-width="4"/>
      <text x="1340" y="270" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="40" fill="#2B2118">THE DAILY NEWS · 1930</text>
      <rect x="1064" y="288" width="552" height="5" fill="#2B2118"/><rect x="1064" y="298" width="552" height="2" fill="#2B2118"/>
      <g id="${s}-head"><text x="1340" y="372" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="44" fill="#7F1D1D">HERO OF BOTH POLES</text></g>
      <rect x="1180" y="412" width="320" height="200" fill="#CFC3AC"/><rect x="1180" y="560" width="320" height="52" fill="#E8EEF5"/>${plane}
      ${col(1072, 412, 9)}${col(1516, 412, 9)}${col(1072, 640, 7)}${col(1260, 640, 7)}${col(1448, 640, 7)}</g></g>`;
  const ant = antarctica(820, 1300, 330);
  const order = { side: "R", svg: `<g id="${pA}-doc"><rect x="146" y="150" width="46" height="58" rx="3" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2" transform="rotate(-12 169 179)"/>
      <line x1="152" y1="170" x2="184" y2="164" stroke="#94A3B8" stroke-width="3"/><line x1="154" y1="182" x2="186" y2="176" stroke="#94A3B8" stroke-width="3"/><path d="M156 196 q8 -8 14 0 t14 -2" fill="none" stroke="#1E3A8A" stroke-width="3"/></g>` };
  const sn = snow2(s, 14.7, { far: 60, near: 18, seed: 9 });
  const stamp = (id, text, color, top, strike) => `<div id="${id}" class="e-stamp" style="left:1090px; top:${top}px; font-size:46px; padding:10px 28px; background:#0B101E; color:${color}; border-color:${color};">${text}
      ${strike ? `<div id="${id}-x" style="position:absolute; left:20px; right:20px; top:50%; height:8px; margin-top:-4px; background:${color}; border-radius:4px;"></div>` : ""}</div>`;
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect width="1920" height="1080" fill="#2B2118"/>${lines}
      <circle cx="520" cy="560" r="420" fill="#F59E0B" opacity=".14" filter="url(#${s}-bloom)"/>
      <rect y="900" width="1920" height="180" fill="#1F1710"/><rect y="900" width="1920" height="4" fill="#5C4A36"/>
      ${paper}
      <g transform="translate(330 396.5) scale(1.9)">${byrd(pN, s, { outfit: "navy" })}</g>
    </svg>
    ${tag(s + "-np", "NORTH POLE FLIGHT · 1926", 1100, 690)}${tag(s + "-sp", "SOUTH POLE FLIGHT · 1929", 1100, 770)}
    <div id="${s}-flash" style="position:absolute; inset:0; background:#FFF7E0;"></div></div>
    <div id="${s}-S2" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "2")}${sn.defs}</defs>
      <rect width="1920" height="1080" fill="${E.night}"/>
      ${Array.from({ length: 70 }, (_, i) => `<circle cx="${(i * 461) % 1920}" cy="${(i * 173) % 640}" r="${1 + (i % 3) * 0.5}" fill="#E2E8F0" opacity=".45"/>`).join("")}
      <g id="${s}-ant"><path d="${ant.coast}" fill="#0B1428" stroke="#1E3A5F" stroke-width="3"/></g>
      <g id="${s}-antglow" opacity="0"><path d="${ant.coast}" fill="none" stroke="${C.ice}" stroke-width="4" opacity=".7"/></g>
      <g transform="translate(0 340)">${cutaway(s + "2", 320, { rx: 1000, seed: 5, noSky: true })}</g>
      <g transform="translate(${900 - 130} ${r1(G - 265 * 1.3)}) scale(1.3)">${byrd(pA, s + "2", { outfit: "anorak", props: [order] })}</g>
      ${sn.far}${sn.near}
    </svg>
    ${tag(s + "-alone", "COMPLETELY ALONE", 300, 230)}${tag(s + "-buried", "BURIED IN THE ICE", 1560, 760)}
    ${box(s + "-cold", `<span style="color:${C.ice};">COLDEST</span> · DARKEST PLACE ON EARTH`, 120)}
    ${stamp(s + "-st1", "⊘ STRANDED", "#EF4444", 112, true)}${stamp(s + "-st2", "⊘ ABANDONED", "#EF4444", 214, true)}${stamp(s + "-st3", "✓ HE VOLUNTEERED", E.green, 316, false)}</div>
    <div id="${s}-wipe" style="position:absolute; left:0; top:0; width:2700px; height:1080px; background:linear-gradient(90deg, rgba(226,232,240,0) 0, #E2E8F0 300px, #CBD5E1 50%, #E2E8F0 2400px, rgba(226,232,240,0) 2700px);"></div>
    <div id="${s}-whip" style="position:absolute; inset:0; background:repeating-linear-gradient(0deg, rgba(248,250,252,.0) 0 18px, rgba(248,250,252,.35) 18px 22px);"></div>
    ${pill(s + "-id", "ADM. RICHARD E. BYRD · U.S. NAVY")}
    ${cite(s + "-src", "U.S. Navy / 1930s press archives")}`;

  const js = `
    ${rigInit(pN)}${"\n    "}${rigInit(pA)}
    ${life(pN, 0.5, 11.0, { every: 3.1 })}
    ${life(pA, 11.6, 25.7, { every: 3.4 })}
    ${hide(s + "-S2", s + "-np", s + "-sp", s + "-head", s + "-id", s + "-src", s + "-alone", s + "-buried", s + "-cold", s + "-st1", s + "-st2", s + "-st3", s + "-st1-x", s + "-st2-x", s + "-flash", pA + "-doc")}
    tl.set("#${s}-wipe", { x: -2800 }, 0);
    ${sn.js}
    // whip-pan in (no cross-dissolve): the archive stage slams in from the right under streaks
    tl.fromTo("#${s}-S1", { x: 760 }, { x: 0, duration: .22, ease: "power3.out", immediateRender: false }, 0);
    tl.fromTo("#${s}-whip", { opacity: 1, x: 300 }, { opacity: 0, x: 0, duration: .22, ease: "power2.out", immediateRender: false }, 0);
    // flashbulb on "His name was Richard Evelyn Byrd"
    tl.fromTo("#${s}-flash", { opacity: .85 }, { opacity: 0, duration: .35, ease: "power2.out", immediateRender: false }, 0.3);
    tl.fromTo("#${s}-id", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 0.5);
    // "Navy admiral": the front page spins in
    tl.fromTo("#${s}-paper", { opacity: 0, scale: .15, rotation: -540, svgOrigin: "1340 520" }, { opacity: 1, scale: 1, rotation: 0, svgOrigin: "1340 520", duration: .7, ease: "power3.out", immediateRender: false }, 2.85);
    tl.fromTo("#${s}-src", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 4.0);
    // "the hero of both Poles"
    tl.fromTo("#${s}-head", { opacity: 0, scale: 1.4, svgOrigin: "1340 352" }, { opacity: 1, scale: 1, svgOrigin: "1340 352", duration: .2, ease: "power2.out", immediateRender: false }, 8.3);
    tl.fromTo("#${s}-flash", { opacity: .6 }, { opacity: 0, duration: .3, immediateRender: false }, 8.3);
    tl.fromTo("#${s}-np", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 9.0);
    tl.fromTo("#${s}-sp", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 9.6);
    // "And in the winter of 1934": snow-gust wipe — the press stage is swapped out while the gust fully covers the frame
    tl.to("#${s}-wipe", { x: 1920, duration: .7, ease: "none" }, 10.95);
    tl.set(["#${s}-S1", "#${s}-id", "#${s}-src", "#${s}-np", "#${s}-sp"], { opacity: 0 }, 11.28);
    tl.set("#${s}-S2", { opacity: 1 }, 11.28);
    ${breath(pA, 11.8, 25.5)}
    tl.fromTo("#${s}-alone", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 13.7);
    tl.to("#${s}-alone", { opacity: 0, duration: .2 }, 16.0);
    // "buried in the ice": the snow turns to glass, revealing the hut beneath his boots
    tl.to("#${s}2-snowcover", { opacity: .14, duration: .8, ease: "power1.in" }, 16.1);
    tl.fromTo("#${s}-buried", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 16.4);
    // "in the coldest, darkest place on Earth"
    tl.to("#${s}-antglow", { opacity: 1, duration: .4 }, 17.6);
    tl.fromTo("#${s}-cold", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 17.7);
    tl.to(["#${s}-cold", "#${s}-buried"], { opacity: 0, duration: .2 }, 20.5);
    tl.to(["#${s}-ant", "#${s}-antglow"], { opacity: .15, duration: .4 }, 20.5);
    // three stamps
    tl.fromTo("#${s}-st1", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: .14, ease: "power2.in", immediateRender: false }, 20.85);
    tl.fromTo("#${s}-st1-x", { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: .2, ease: "power2.out", immediateRender: false }, 21.3);
    tl.fromTo("#${s}-st2", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: .14, ease: "power2.in", immediateRender: false }, 22.3);
    tl.fromTo("#${s}-st2-x", { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: .2, ease: "power2.out", immediateRender: false }, 22.9);
    tl.to(["#${s}-st1", "#${s}-st2"], { opacity: .45, duration: .3 }, 23.6);
    // "He volunteered": he raises the signed expedition order; green stamp
    tl.set("#${pA}-doc", { opacity: 1 }, 24.1);
    tl.to("#${pA}-armR", { rotation: -125, duration: .35, ease: "back.out(1.4)" }, 24.1);
    tl.to("#${pA}-foreR", { rotation: -30, duration: .35 }, 24.1);
    tl.fromTo("#${s}-st3", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: .14, ease: "power2.in", immediateRender: false }, 24.5);`;

  return { id: "hero", html: scene("hero", { css: KIT_CSS + E3_CSS, body, js, bg: "#2B2118" }) };
}
