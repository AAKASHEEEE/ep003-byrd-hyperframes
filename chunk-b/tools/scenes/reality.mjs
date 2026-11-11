// B03 (46.6–65.2): "Then reality hit" — the half-track strains with an overloaded sled across bridged crevasses (late, winter coming, load limit),
//   then the map: 400 miles shrinks to 123, and three men become one.
// VO (local = abs − 46.6): "Then, (0.38) reality hit. (1.09–1.95) The expedition arrived late. (2.46) Winter was closing in. (4.38–5.62) The tractors
//   could only haul so much fuel and food across the crevassed ice. (6.09–10.04) A station four hundred miles out (10.63) became a station (12.98)
//   one hundred twenty-three miles out. (14.19–15.95) And three men became one. (16.53–18.19)"
import { C, r1, filters, scene, snow2 } from "../lib.mjs";
import { KIT_CSS, pill, tag, box, hide, count } from "./kit.mjs";
import { E, E3_CSS, halftrack, antarctica, LITTLE_AMERICA, ADVANCE_BASE } from "./e3.mjs";
import { avatar } from "./b3.mjs";

const G = 780;
export function build() {
  const s = "re";
  const ant = antarctica(2000, 900, 300);
  const [lx, ly] = ant.pt(...LITTLE_AMERICA), [tx, ty] = ant.pt(196.2, 84.3), [ax, ay] = ant.pt(...ADVANCE_BASE);
  const sn = snow2(s, 10.6, { far: 70, near: 24, seed: 33, dx: -700 });
  const crevs = [300, 1000, 1700, 2400].map((x, i) => `<polygon points="${x - 60},${G} ${x - 16},${G + 130} ${x + 6},${G + 60} ${x + 26},${G + 160} ${x + 64},${G}" fill="#050811" stroke="#3B82F6" stroke-width="3" stroke-opacity=".6"/>
      <rect x="${x - 78}" y="${G - 6}" width="156" height="14" rx="3" fill="#78350F" stroke="#451A03" stroke-width="3"/><rect x="${x - 78}" y="${G - 12}" width="156" height="7" rx="3" fill="#E2E8F0" opacity=".85"/>`).join("")
    + [600, 1350, 2050].map((x) => `<line x1="${x}" y1="${G}" x2="${x}" y2="${G - 70}" stroke="#A16207" stroke-width="4"/><rect x="${x}" y="${G - 70}" width="26" height="16" fill="${E.warn}" opacity=".85"/>`).join("");
  const sled = `<g id="${s}-sled"><line x1="560" y1="${G - 50}" x2="690" y2="${G - 40}" stroke="#94A3B8" stroke-width="4"/>
      <rect x="230" y="${G - 22}" width="340" height="12" rx="6" fill="#64748B"/><path d="M226 ${G - 10} Q216 ${G - 30} 236 ${G - 34}" fill="none" stroke="#64748B" stroke-width="6"/>
      ${[[250, "FUEL"], [360, "FOOD"], [470, "FUEL"]].map(([x, l]) => `<g><rect x="${x}" y="${G - 112}" width="96" height="90" fill="#78350F" stroke="${E.pineDk}" stroke-width="4"/>
        <text x="${x + 48}" y="${G - 58}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="26" fill="#FDE68A">${l}</text></g>`).join("")}
      <g id="${s}-sledTop"><rect x="300" y="${G - 172}" width="96" height="60" fill="#78350F" stroke="${E.pineDk}" stroke-width="4"/><rect x="410" y="${G - 172}" width="96" height="60" fill="#78350F" stroke="${E.pineDk}" stroke-width="4"/></g>
      <g id="${s}-red" opacity="0"><rect x="244" y="${G - 178}" width="330" height="166" fill="${E.warn}" opacity=".45"/></g></g>`;
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}${sn.defs}
      <linearGradient id="${s}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E293B"/><stop offset="1" stop-color="#475569"/></linearGradient>
      <linearGradient id="${s}-night" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#050811" stop-opacity="0"/><stop offset=".25" stop-color="#050811" stop-opacity=".95"/><stop offset="1" stop-color="#050811"/></linearGradient></defs>
      <rect width="1920" height="${G}" fill="url(#${s}-sky)"/>
      <g id="${s}-curtain"><rect x="1920" y="0" width="2400" height="${G}" fill="url(#${s}-night)"/></g>
      <rect y="${G}" width="1920" height="${1080 - G}" fill="#1E293B"/><rect y="${G}" width="1920" height="8" fill="${E.glacial}"/>
      <g id="${s}-scroll">${crevs}</g>
      ${sled}
      <g transform="translate(690 ${G}) scale(1.3)"><g id="${s}-trk">${halftrack(s + "-ht", s, { light: false })}</g></g>
      ${sn.far}${sn.near}
    </svg>
      ${tag(s + "-g1", "1. ARRIVED LATE", 192, 250)}${tag(s + "-g2", "2. WINTER CLOSING IN", 700, 250)}${tag(s + "-g3", "3. LIMITED TRACTOR CAPACITY", 1180, 250)}
      ${tag(s + "-max", "⚠ MAX LOAD", 300, 520)}</div>
    <div id="${s}-banner" class="ui" style="left:0; right:0; top:110px; display:flex; justify-content:center;"><div style="padding:16px 46px; border-radius:16px; background:${E.warn}; font-family:'Archivo Black', sans-serif; font-size:56px; color:#fff; box-shadow:0 14px 40px rgba(0,0,0,.5);">⚠ THEN REALITY HIT</div></div>
    <div id="${s}-S2" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "2")}</defs>
      <rect width="1920" height="1080" fill="${C.navy}"/>
      ${Array.from({ length: 17 }, (_, i) => `<line x1="${i * 120}" y1="0" x2="${i * 120}" y2="1080" stroke="#00F5D4" stroke-opacity=".06" stroke-width="2"/>`).join("")}
      <path d="${ant.coast}" fill="#CBD5E1"/><path d="${ant.shelf}" fill="#93C5FD" opacity=".8"/>
      <g id="${s}-line"><line x1="${lx}" y1="${ly}" x2="${tx}" y2="${ty}" stroke="${C.cyan}" stroke-width="8" stroke-dasharray="20 12"/></g>
      <circle cx="${lx}" cy="${ly}" r="13" fill="${C.amber}" stroke="#fff" stroke-width="4"/>
      <g id="${s}-pin"><circle cx="${tx}" cy="${ty}" r="16" fill="${E.warn}" stroke="#fff" stroke-width="4"/></g>
    </svg>
      <div id="${s}-l400" class="ui tag" style="left:${r1(tx + 40)}px; top:${r1(ty - 30)}px;">400 MILES<div id="${s}-slash" style="position:absolute; left:10px; right:10px; top:26px; height:8px; background:${E.warn}; border-radius:4px;"></div></div>
      ${tag(s + "-l123", "ADVANCE BASE · 123 MILES", r1(ax + 40), r1(ay - 30))}
      <div id="${s}-card" style="position:absolute; left:1380px; top:350px; width:400px; height:440px; border-radius:22px; background:rgba(11,16,30,.96); border:4px solid ${C.cyan};">
        <div style="margin:22px 0 0; text-align:center; font-family:Inter, sans-serif; font-weight:800; font-size:28px; letter-spacing:.14em; color:${C.cyan};">THE CREW</div>
        <svg width="400" height="250" viewBox="0 0 400 250" style="position:absolute; left:0; top:80px;">
          <rect x="70" y="30" width="260" height="110" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="4"/><polygon points="60,32 200,-6 340,32" fill="#7A4E2D"/><rect x="180" y="80" width="40" height="60" fill="#2B1A0C"/>
          <rect x="0" y="140" width="400" height="10" fill="#CBD5E1"/>
          ${avatar(s + "-a0", 200, 175, "#C87D32")}${avatar(s + "-a1", 120, 175, "#4A5568")}${avatar(s + "-a2", 280, 175, "#78350F")}
          ${[120, 280].map((x, i) => `<g id="${s}-x${i}"><path d="M${x - 26} 140 L${x + 26} 210 M${x + 26} 140 L${x - 26} 210" stroke="${E.warn}" stroke-width="10" stroke-linecap="round"/></g>`).join("")}</svg>
        <div id="${s}-b3" style="position:absolute; left:20px; right:20px; bottom:22px; padding:12px 0; border-radius:14px; background:#15803D; text-align:center; font-family:'Archivo Black', sans-serif; font-size:32px; color:#fff;">400 MI · 3 MEN</div>
        <div id="${s}-b1" style="position:absolute; left:20px; right:20px; bottom:22px; padding:12px 0; border-radius:14px; background:${C.amber}; text-align:center; font-family:'Archivo Black', sans-serif; font-size:32px; color:#fff;">123 MI · 1 MAN</div></div>
      ${box(s + "-cmp", `PLAN: <s style="color:#94A3B8;">400 MI · 3 MEN</s> → REALITY: <span style="color:${C.amber};">123 MI · 1 MAN</span>`, 220)}</div>
    ${pill(s + "-dist", "STATION DISTANCE", "400 MI")}`;

  const js = `
    ${sn.js}
    ${hide(s + "-S2", s + "-banner", s + "-g1", s + "-g2", s + "-g3", s + "-max", s + "-dist", s + "-l123", s + "-slash", s + "-b1", s + "-x0", s + "-x1", s + "-cmp")}
    // the tractor grinds forward: ground scrolls past, the rig pitches and strains
    tl.fromTo("#${s}-scroll", { x: 0 }, { x: -700, duration: 10.6, ease: "none", immediateRender: false }, 0);
    ${Array.from({ length: 26 }, (_, i) => `tl.to("#${s}-trk", { rotation: ${i % 2 ? -1.6 : 0.6}, y: ${i % 2 ? -3 : 0}, svgOrigin: "150 0", duration: .2, ease: "sine.inOut" }, ${r1(i * 0.4)});`).join("\n    ")}
    ${Array.from({ length: 26 }, (_, i) => `tl.to("#${s}-sled", { y: ${i % 2 ? -2 : 0}, duration: .2, ease: "sine.inOut" }, ${r1(0.1 + i * 0.4)});`).join("\n    ")}
    // "Then, reality hit": the banner slams, the frame shakes
    tl.fromTo("#${s}-banner", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: .14, ease: "power2.in", immediateRender: false }, 1.1);
    ${[8, -7, 5, -3, 0].map((x, i) => `tl.to("#${s}-S1", { x: ${x}, y: ${i % 2 ? 4 : -4}, duration: .04, ease: "none" }, ${r1(1.24 + i * 0.04)});`).join("\n    ")}
    tl.to("#${s}-S1", { y: 0, duration: .05 }, 1.45);
    tl.fromTo("#${s}-g1", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 2.5);
    tl.fromTo("#${s}-g2", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 4.4);
    tl.to("#${s}-curtain", { x: -2600, duration: 5.0, ease: "power1.inOut" }, 4.4);
    tl.fromTo("#${s}-g3", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 6.1);
    tl.to("#${s}-red", { opacity: 1, duration: .2, yoyo: true, repeat: 7, ease: "none" }, 6.3);
    tl.fromTo("#${s}-max", { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .2, ease: "back.out(2)", immediateRender: false }, 6.4);
    // the map: 400 miles becomes 123
    tl.set("#${s}-S2", { opacity: 1 }, 10.6);
    tl.set(["#${s}-S1", "#${s}-banner"], { opacity: 0 }, 10.6);
    tl.fromTo("#${s}-dist", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 10.8);
    tl.fromTo("#${s}-slash", { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: .25, ease: "power2.out", immediateRender: false }, 12.9);
    tl.to("#${s}-l400", { opacity: .35, duration: .3 }, 13.4);
    tl.to("#${s}-pin", { x: ${r1(ax - tx)}, y: ${r1(ay - ty)}, duration: 1.8, ease: "power2.inOut" }, 13.6);
    tl.to("#${s}-line", { scaleY: ${r1((ly - ay) / (ly - ty))}, svgOrigin: "${lx} ${ly}", duration: 1.8, ease: "power2.inOut" }, 13.6);
    ${count(s + "-dist-n", 400, 123, 13.6, 1.8, "Math.round(v) + ' MI'")}
    tl.set("#${s}-l400", { opacity: 0 }, 15.3);
    tl.fromTo("#${s}-l123", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 15.4);
    // "And three men became one"
    tl.fromTo("#${s}-cmp", { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 16.0);
    tl.set("#${s}-x0", { opacity: 1 }, 16.9); tl.to("#${s}-a1", { opacity: .2, duration: .3 }, 17.0);
    tl.set("#${s}-x1", { opacity: 1 }, 17.4); tl.to("#${s}-a2", { opacity: .2, duration: .3 }, 17.5);
    tl.set("#${s}-b3", { opacity: 0 }, 17.45);
    tl.fromTo("#${s}-b1", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .2, immediateRender: false }, 17.45);`;

  return { id: "reality", html: scene("reality", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
