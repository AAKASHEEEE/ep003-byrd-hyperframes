// B02 (19.9–46.6): Byrd looks inland -> map: the coast is known, the interior winter is a mystery -> the bold original plan: 400 miles south, 3 men.
// VO (local = abs − 19.9): "But Byrd wanted something nobody had really done before. (0.12) He wanted weather readings from far inland, (3.71)
//   all through the winter. (6.45) Back then, (7.93) almost everything scientists knew about Antarctic weather came from the coast. (8.86–13.20)
//   What happened deeper in, (13.68) during the long night, (15.24) was a mystery. (16.68–17.44) So the original plan was bold. (18.36–20.51)
//   Build a weather station about four hundred miles south, (21.01) and leave three men there for the winter. (24.12–26.01)"
import { C, r1, filters, rigInit, scene, life, snow2 } from "../lib.mjs";
import { KIT_CSS, pill, tag, box, hide, breath, count } from "./kit.mjs";
import { E, E3_CSS, byrd, antarctica, LITTLE_AMERICA } from "./e3.mjs";
import { avatar } from "./b3.mjs";

const G = 800;
export function build() {
  const s = "in", p = "in-by";
  const ant = antarctica(2000, 900, 300);
  const [lx, ly] = ant.pt(...LITTLE_AMERICA), [tx, ty] = ant.pt(196.2, 84.3);
  const vanes = [[170, 71.4], [240, 73.8], [150, 67.6], [270, 72.5], LITTLE_AMERICA].map(([lo, la]) => ant.pt(lo, la));
  const vane = (x, y, i) => `<g id="${s}-v${i}"><circle cx="${x}" cy="${y}" r="26" fill="#052e16" stroke="#22C55E" stroke-width="4"/>
      <line x1="${x - 13}" y1="${y}" x2="${x + 13}" y2="${y}" stroke="#86EFAC" stroke-width="4"/><polygon points="${x + 13},${y - 7} ${x + 21},${y} ${x + 13},${y + 7}" fill="#86EFAC"/><polygon points="${x - 13},${y - 9} ${x - 5},${y} ${x - 13},${y + 9}" fill="#86EFAC"/></g>`;
  const scope = `<g><line x1="114" y1="63" x2="200" y2="52" stroke="#B08D3C" stroke-width="13" stroke-linecap="round"/><line x1="186" y1="54" x2="214" y2="50" stroke="#8A6D2F" stroke-width="18" stroke-linecap="round"/><circle cx="114" cy="63" r="8" fill="#8A6D2F"/></g>`;
  const sn = snow2(s, 8, { far: 50, near: 14, seed: 21 });
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}${sn.defs}
      <linearGradient id="${s}-sky" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3B5578"/><stop offset=".45" stop-color="#1E293B"/><stop offset="1" stop-color="#050811"/></linearGradient></defs>
      <rect width="1920" height="${G}" fill="url(#${s}-sky)"/>
      ${Array.from({ length: 40 }, (_, i) => `<circle cx="${900 + (i * 233) % 1020}" cy="${(i * 97) % 700}" r="${1 + (i % 3) * 0.5}" fill="#E2E8F0" opacity=".5"/>`).join("")}
      <rect y="${G}" width="1920" height="${1080 - G}" fill="#CBD5E1"/><rect y="${G}" width="1920" height="6" fill="#F8FAFC"/>
      <rect x="900" y="${G}" width="1020" height="${1080 - G}" fill="#475569" opacity=".55"/>
      <g transform="translate(${430 - 100 * 1.5} ${G - 265 * 1.5}) scale(1.5)">${byrd(p, s, { outfit: "anorak", front: scope })}</g>
      ${sn.far}${sn.near}
    </svg>${tag(s + "-t1", "WEATHER READINGS · FAR INLAND", 1060, 430)}${tag(s + "-t2", "ALL THROUGH THE WINTER", 1060, 520)}</div>
    <div id="${s}-S2" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "2")}
      <radialGradient id="${s}-fog"><stop offset="0" stop-color="#050811" stop-opacity=".95"/><stop offset=".7" stop-color="#050811" stop-opacity=".85"/><stop offset="1" stop-color="#050811" stop-opacity="0"/></radialGradient></defs>
      <rect width="1920" height="1080" fill="${C.navy}"/>
      ${Array.from({ length: 17 }, (_, i) => `<line x1="${i * 120}" y1="0" x2="${i * 120}" y2="1080" stroke="#00F5D4" stroke-opacity=".06" stroke-width="2"/>`).join("")}
      <path d="${ant.coast}" fill="#CBD5E1"/><path d="${ant.shelf}" fill="#93C5FD" opacity=".8"/>
      <g id="${s}-ring" opacity="0"><path d="${ant.coast}" fill="none" stroke="#22C55E" stroke-width="8" filter="url(#${s}2-glow)"/></g>
      ${vanes.map(([x, y], i) => vane(x, y, i)).join("")}
      <g id="${s}-fogG" opacity="0"><circle cx="900" cy="300" r="420" fill="url(#${s}-fog)"/>
        ${[[820, 250], [960, 330], [880, 420]].map(([x, y], i) => `<text id="${s}-q${i}" x="${x}" y="${y}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="110" fill="${C.cyan}" opacity=".9">?</text>`).join("")}</g>
      <g id="${s}-line"><line x1="${lx}" y1="${ly}" x2="${tx}" y2="${ty}" stroke="${C.cyan}" stroke-width="8" stroke-dasharray="20 12" filter="url(#${s}2-glow)"/></g>
      <circle cx="${lx}" cy="${ly}" r="13" fill="${C.amber}" stroke="#fff" stroke-width="4"/>
      <g id="${s}-pin"><circle cx="${tx}" cy="${ty}" r="30" fill="${C.cyan}" opacity=".3" filter="url(#${s}2-glowBig)"/><circle cx="${tx}" cy="${ty}" r="14" fill="${C.cyan}" stroke="#fff" stroke-width="4"/></g>
    </svg>
      ${tag(s + "-la", "LITTLE AMERICA (COAST)", r1(lx + 30), r1(ly + 10))}
      ${tag(s + "-tgt", "PLAN: 400 MI SOUTH", r1(tx + 40), r1(ty - 30))}
      <div id="${s}-card" style="position:absolute; left:1380px; top:300px; width:400px; height:440px; border-radius:22px; background:rgba(11,16,30,.96); border:4px solid ${C.cyan};">
        <div style="margin:22px 0 0; text-align:center; font-family:Inter, sans-serif; font-weight:800; font-size:28px; letter-spacing:.14em; color:${C.cyan};">THE ORIGINAL PLAN</div>
        <svg width="400" height="250" viewBox="0 0 400 250" style="position:absolute; left:0; top:80px;">
          <rect x="70" y="30" width="260" height="110" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="4"/><polygon points="60,32 200,-6 340,32" fill="#7A4E2D"/><rect x="180" y="80" width="40" height="60" fill="#2B1A0C"/>
          <rect x="0" y="140" width="400" height="10" fill="#CBD5E1"/>
          ${avatar(s + "-a0", 120, 175, "#5C4033")}${avatar(s + "-a1", 200, 175, "#4A5568")}${avatar(s + "-a2", 280, 175, "#78350F")}</svg>
        <div id="${s}-ok" style="position:absolute; left:20px; right:20px; bottom:22px; padding:12px 0; border-radius:14px; background:#15803D; text-align:center; font-family:'Archivo Black', sans-serif; font-size:32px; color:#fff;">400 MI · 3 MEN</div></div>
      ${tag(s + "-known", "✓ COASTAL WEATHER: KNOWN", 192, 196)}
      ${tag(s + "-unk", "? INLAND WINTER WEATHER: UNKNOWN ?", 192, 280)}</div>
    ${box(s + "-goal", `SOMETHING <span style="color:${C.gold};">NOBODY</span> HAD DONE BEFORE`, 150)}
    ${pill(s + "-dist", "DISTANCE INLAND", "0 MI")}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.5, 7.9, { every: 2.9 })}
    tl.set("#${p}-armR", { rotation: -120 }, 0.01); tl.set("#${p}-foreR", { rotation: 0 }, 0.01);
    ${breath(p, 0.6, 7.6)}
    ${sn.js}
    ${hide(s + "-S2", s + "-t1", s + "-t2", s + "-goal", s + "-dist", s + "-ring", s + "-fogG", s + "-line", s + "-pin", s + "-la", s + "-tgt", s + "-card", s + "-known", s + "-unk", ...[0, 1, 2, 3, 4].map((i) => `${s}-v${i}`), s + "-a0", s + "-a1", s + "-a2", s + "-ok")}
    tl.fromTo("#${s}-goal", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 0.4);
    tl.to("#${s}-goal", { opacity: 0, duration: .2 }, 3.5);
    tl.fromTo("#${s}-S1", { scale: 1 }, { scale: 1.06, transformOrigin: "30% 70%", duration: 7.9, ease: "sine.inOut", immediateRender: false }, 0);
    tl.fromTo("#${s}-t1", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 3.8);
    tl.fromTo("#${s}-t2", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 6.5);
    // map: the coast is known…
    tl.set("#${s}-S2", { opacity: 1 }, 7.9);
    tl.set("#${s}-S1", { opacity: 0 }, 7.9);
    tl.fromTo("#${s}-S2", { scale: 1.3 }, { scale: 1, transformOrigin: "47% 40%", duration: .8, ease: "power3.out", immediateRender: false }, 7.9);
    tl.to("#${s}-ring", { opacity: 1, duration: .5 }, 8.9);
    ${[0, 1, 2, 3, 4].map((i) => `tl.fromTo("#${s}-v${i}", { opacity: 0, scale: .4, svgOrigin: "${vanes[i][0]} ${vanes[i][1]}" }, { opacity: 1, scale: 1, svgOrigin: "${vanes[i][0]} ${vanes[i][1]}", duration: .2, ease: "back.out(2)", immediateRender: false }, ${r1(9.2 + i * 0.35)});`).join("\n    ")}
    tl.fromTo("#${s}-known", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 11.4);
    // …the interior winter is a mystery
    tl.to("#${s}-fogG", { opacity: 1, duration: .6 }, 13.7);
    ${[0, 1, 2].map((i) => `tl.to("#${s}-q${i}", { opacity: .35, duration: .5, yoyo: true, repeat: 7, ease: "sine.inOut" }, ${r1(14.2 + i * 0.3)});`).join("\n    ")}
    tl.fromTo("#${s}-unk", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 15.3);
    // the bold plan: a station 400 miles south, three men
    tl.to("#${s}-fogG", { opacity: .45, duration: .5 }, 18.9);
    tl.fromTo("#${s}-la", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 19.2);
    tl.fromTo("#${s}-dist", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 20.9);
    tl.fromTo("#${s}-line", { opacity: 1, scaleY: 0, svgOrigin: "${lx} ${ly}" }, { scaleY: 1, svgOrigin: "${lx} ${ly}", duration: 1.6, ease: "power2.inOut", immediateRender: false }, 21.1);
    ${count(s + "-dist-n", 0, 400, 21.1, 1.6, "Math.round(v) + ' MI'")}
    tl.fromTo("#${s}-pin", { opacity: 0, scale: 2, svgOrigin: "${tx} ${ty}" }, { opacity: 1, scale: 1, svgOrigin: "${tx} ${ty}", duration: .25, ease: "power2.in", immediateRender: false }, 22.7);
    tl.fromTo("#${s}-tgt", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 22.9);
    tl.fromTo("#${s}-card", { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.5)", immediateRender: false }, 24.1);
    ${[0, 1, 2].map((i) => `tl.fromTo("#${s}-a${i}", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .2, ease: "back.out(2)", immediateRender: false }, ${r1(24.4 + i * 0.3)});`).join("\n    ")}
    tl.fromTo("#${s}-ok", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .2, immediateRender: false }, 25.4);`;

  return { id: "inland", html: scene("inland", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
