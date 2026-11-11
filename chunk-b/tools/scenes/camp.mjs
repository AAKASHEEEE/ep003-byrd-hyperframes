// B01 (0–19.9): Part 1 card hand-off (hard cut from Chunk A's zoomed card) -> Little America cutaway -> Ross Ice Shelf ≈ size of France.
// VO (abs): "Part one. (0.23) The plan that shrank to one man. (1.50–3.75) In 1933, (4.03) Byrd led his second expedition to Antarctica. (5.82–8.59)
//   His main camp was called (8.94) Little America — (10.59) a small town of huts and tunnels (11.97) dug into the Ross Ice Shelf, (14.21)
//   a slab of floating ice about the size of France. (16.31–19.14)"
import { C, r1, filters, rigInit, scene, life, snow2 } from "../lib.mjs";
import { KIT_CSS, badge, pill, tag, hide, bridge, bridgeJs } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, byrd, antarctica } from "./e3.mjs";
import { ship, biplane, tower, hut, france, crew } from "./b3.mjs";

const G = 480, WY = G + 34;
const HUTS = [[650, "MESS HALL"], [950, "RADIO SHACK"], [1250, "BUNKHOUSE"], [1550, "GARAGE"]];
const LOCK = `<svg width="26" height="30" viewBox="0 0 40 46"><path d="M10 20 V13 a10 10 0 0 1 20 0 V20" fill="none" stroke="${C.gold}" stroke-width="5"/><rect x="4" y="20" width="32" height="24" rx="5" fill="${C.gold}"/><circle cx="20" cy="31" r="3.5" fill="#111827"/></svg>`;
export function build() {
  const s = "cp";
  // Ross Ice Shelf map, zoomed so the shelf sits right of centre
  const a0 = antarctica(2400, 0, 0), [rx0, ry0] = a0.pt(185, 81.6);
  const ant = antarctica(2400, r1(1180 - rx0), r1(600 - ry0));
  const fr = france(1180, 600, 330);
  const people = [["cp-c1", "crew1", 860], ["cp-by", "anorak", 1010], ["cp-c2", "crew2", 1150], ["cp-c3", "crew3", 1290], ["cp-c4", "crew2", 1430]];
  const sn = snow2(s, 16, { far: 40, near: 10, seed: 12, dx: 300 });
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">
      <div id="${s}-mono" class="e-mono" style="left:870px; top:350px; color:${C.cyan}; border-color:${C.cyan}; box-shadow:0 0 40px ${C.cyan};">1</div>
      <div id="${s}-lock" class="ui" style="left:192px; top:108px; display:flex; align-items:center; gap:14px; height:66px; padding:0 26px 0 18px; border-radius:14px; background:rgba(17,24,39,.94); border:3px solid ${C.gold}; font-family:'Archivo Black', sans-serif; font-size:28px; color:#fff;">${LOCK}LOCKED UNTIL PART 6: HIS FIRST WORDS</div>
    </div>
    <div id="${s}-S2" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}${sn.defs}
      <filter id="lamp-bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
      <linearGradient id="${s}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0F1E3D"/><stop offset="1" stop-color="#3B5578"/></linearGradient></defs>
      <rect width="1920" height="${G}" fill="url(#${s}-sky)"/>
      <rect x="0" y="${WY}" width="1920" height="${1080 - WY}" fill="#0B1A33"/>
      <rect x="340" y="${G}" width="1580" height="${1080 - G}" fill="${E.ice}"/><polygon points="340,${G} 360,${G} 352,1080 330,1080" fill="#94A3B8"/>
      ${ship(40, WY)}
      <rect x="0" y="${WY + 8}" width="340" height="${1080 - WY}" fill="#0B1A33" opacity=".75"/>
      <rect x="600" y="${G + 150}" width="1260" height="70" fill="${E.pit}"/>
      ${HUTS.map(([x]) => `<rect x="${x - 20}" y="${G + 46}" width="280" height="190" rx="10" fill="${E.pit}"/>${hut(x, G + 66)}`).join("")}
      <g id="${s}-cover"><rect x="356" y="${G + 18}" width="1564" height="${1080 - G}" fill="#8193AD"/>
        ${Array.from({ length: 9 }, (_, i) => `<path d="M356 ${G + 60 + i * 70} Q1100 ${G + 50 + i * 70} 1920 ${G + 60 + i * 70}" fill="none" stroke="#9AAAC2" stroke-width="3"/>`).join("")}</g>
      <rect x="340" y="${G}" width="1580" height="18" fill="${E.glacial}"/><rect x="340" y="${G}" width="1580" height="4" fill="#F8FAFC"/>
      ${HUTS.map(([x]) => `<rect x="${x + 100}" y="${G - 22}" width="40" height="24" fill="#475569"/><rect x="${x + 112}" y="${G - 44}" width="12" height="24" fill="#94A3B8"/>`).join("")}
      ${biplane(470, G)}
      ${tower(1620, G, 300)}${tower(1820, G, 300)}<path d="M1620 ${G - 300} Q1720 ${G - 270} 1820 ${G - 300}" fill="none" stroke="#CBD5E1" stroke-width="2"/>
      ${people.map(([id, o, x], i) => `<g transform="translate(${x - 100 * 0.75} ${r1(G - 265 * 0.75)}) scale(.75)">${id === "cp-by" ? byrd(id, s, { outfit: "anorak" }) : crew(id, s, o)}</g>`).join("")}
      ${sn.far}${sn.near}
    </svg>
      ${HUTS.map(([x, l], i) => `<div id="${s}-l${i}" class="ui k-lab" style="left:${x - 40}px; width:320px; top:${G + 250}px;"><div style="background:rgba(17,24,39,.92); font-size:28px; padding:10px 22px;">${l}</div></div>`).join("")}
      ${tag(s + "-ross", "ROSS ICE SHELF · FLOATING ICE", 400, 900)}</div>
    <div id="${s}-S3" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "3")}</defs>
      <rect width="1920" height="1080" fill="${C.navy}"/>
      ${Array.from({ length: 17 }, (_, i) => `<line x1="${i * 120}" y1="0" x2="${i * 120}" y2="1080" stroke="#00F5D4" stroke-opacity=".06" stroke-width="2"/>`).join("")}
      <path d="${ant.coast}" fill="#E2E8F0"/>
      <g id="${s}-shelf"><path d="${ant.shelf}" fill="#7DD3FC" stroke="#E0F2FE" stroke-width="4"/></g>
      <g id="${s}-fr"><path d="${fr.d}" fill="${C.cyan}" fill-opacity=".14" stroke="${C.cyan}" stroke-width="5" stroke-linejoin="round" filter="url(#${s}3-glow)"/><path d="${fr.cor}" fill="none" stroke="${C.cyan}" stroke-width="4"/></g>
    </svg>${tag(s + "-tros", "ROSS ICE SHELF", 1300, 820)}${tag(s + "-tfr", "FRANCE (OVERLAID)", 820, 330)}</div>
    <div id="${s}-dock" class="ui k-dock"><span class="n">PART 1</span>THE PLAN THAT SHRANK TO ONE MAN</div>
    ${badge(s + "-b", "1933 – 1934", "2ND EXPEDITION", { fs: 36, w: 420, left: 1308 })}
    ${pill(s + "-pill", "MAIN CAMP: LITTLE AMERICA", "", { top: 196, left: 1060 })}
    ${pill(s + "-pf", "FLOATING ICE SLAB ≈ SIZE OF FRANCE", "", { top: 196 })}
    ${bridge(s, "a-last.png")}`;

  const js = `
    ${people.map(([id]) => rigInit(id)).join("\n    ")}
    ${people.map(([id], i) => life(id, 4.2 + i * 0.15, 19.9, { every: 2.8 + i * 0.3 })).join("\n    ")}
    ${hide(s + "-S2", s + "-S3", s + "-dock", s + "-b", s + "-pill", s + "-pf", s + "-ross", s + "-tros", s + "-tfr", ...HUTS.map((_, i) => `${s}-l${i}`))}
    ${bridgeJs(s)}
    ${sn.js}
    // hard cut from Chunk A's zoomed Part-1 card: it settles, then docks top-left as the chapter header
    tl.set("#${s}-mono", { scale: 7.5 }, 0);
    tl.to("#${s}-mono", { scale: 1, duration: .6, ease: "power3.out" }, 0.2);
    tl.to("#${s}-lock", { opacity: 0, x: -30, duration: .25 }, 0.25);
    tl.to("#${s}-mono", { x: -760, y: -270, scale: .25, opacity: 0, duration: .45, ease: "power3.in" }, 1.5);
    tl.fromTo("#${s}-dock", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1.08, x: 0, duration: .17, ease: "power2.out", immediateRender: false }, 1.9);
    tl.to("#${s}-dock", { scale: 1, duration: .1 }, 2.07);
    // "In 1933": whip into Little America
    tl.set("#${s}-S2", { opacity: 1 }, 3.95);
    tl.fromTo("#${s}-S2", { x: 900 }, { x: 0, duration: .22, ease: "power3.out", immediateRender: false }, 3.95);
    tl.set("#${s}-S1", { opacity: 0 }, 4.17);
    tl.fromTo("#${s}-b", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 4.1);
    tl.fromTo("#${s}-S2", { scale: 1 }, { scale: 1.04, transformOrigin: "60% 45%", duration: 7.5, ease: "sine.inOut", immediateRender: false }, 4.2);
    tl.to("#${s}-b", { opacity: 0, y: -30, duration: .25 }, 9.0);
    tl.fromTo("#${s}-pill", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 10.6);
    // "a small town of huts and tunnels": the snow turns to glass
    tl.to("#${s}-cover", { opacity: .1, duration: .8, ease: "power1.in" }, 12.0);
    ${HUTS.map((_, i) => `tl.fromTo("#${s}-l${i}", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, ${r1(12.4 + i * 0.35)});`).join("\n    ")}
    tl.fromTo("#${s}-ross", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 14.3);
    // "about the size of France": top-down map, France slides in beside the shelf
    tl.set("#${s}-S3", { opacity: 1 }, 16.3);
    tl.set(["#${s}-S2", "#${s}-pill", "#${s}-b", "#${s}-l0", "#${s}-l1", "#${s}-l2", "#${s}-l3", "#${s}-ross"], { opacity: 0 }, 16.3);
    tl.fromTo("#${s}-S3", { scale: 1.6 }, { scale: 1, transformOrigin: "62% 56%", duration: 1.0, ease: "power3.out", immediateRender: false }, 16.3);
    tl.fromTo("#${s}-tros", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 16.9);
    tl.to("#${s}-shelf", { opacity: .55, duration: .4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 16.9);
    tl.fromTo("#${s}-fr", { x: -1300, opacity: 0 }, { x: 0, opacity: 1, duration: .9, ease: "power3.out", immediateRender: false }, 17.2);
    tl.fromTo("#${s}-tfr", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 17.9);
    tl.fromTo("#${s}-pf", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 18.0);`;

  return { id: "camp", html: scene("camp", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
