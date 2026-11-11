// A05 (71.1–93.6): the story roadmap — Antarctica map + 136-day counter, then three panels: 9 x 13 ft buried box at −60°F,
//   the poisoning stove, and (full screen) the Citroën-Kégresse half-track crossing the polar night.
// VO (local = abs − 71.1): "This is the story of how one man survived 136 days alone in Antarctica. (0.20–5.63) How he lived in a box the size of a
//   small bedroom, (6.09) at temperatures far below zero. (9.61–11.57) How he slowly figured out that the thing keeping him warm (12.12) was
//   poisoning him. (15.31–16.33) And how three men finally drove a tractor through the polar night (16.79) to find out what had happened to him. (20.41–21.94)"
import { C, r1, filters, rigInit, scene, life, snow2 } from "../lib.mjs";
import { KIT_CSS, pill, tag, hide, count } from "./kit.mjs";
import { E, E3_CSS, byrd, antarctica, halftrack, ADVANCE_BASE } from "./e3.mjs";

const PX = [192, 712, 1232], PY = 300, PW = 496, PH = 560, G3 = 770;
export function build() {
  const s = "rm", p = "rm-by";
  const ant = antarctica(980, 960, 590);
  const [bx, by] = ant.pt(...ADVANCE_BASE);
  const grid = Array.from({ length: 17 }, (_, i) => `<line x1="${i * 120}" y1="0" x2="${i * 120}" y2="1080" stroke="#00F5D4" stroke-opacity=".06" stroke-width="2"/>`).join("")
    + Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 120}" x2="1920" y2="${i * 120}" stroke="#00F5D4" stroke-opacity=".06" stroke-width="2"/>`).join("");
  const panel = (i, head, inner) => `<div id="${s}-p${i}" style="position:absolute; left:${PX[i]}px; top:${PY}px; width:${PW}px; height:${PH}px; border-radius:20px; overflow:hidden; background:#0B1222; border:3px solid #334155;">
      <svg width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}" style="position:absolute; left:0; top:0;">${inner}</svg>
      <div class="tag" style="position:absolute; left:16px; top:16px;">${head}</div></div>`;
  // Panel 1: isometric 9 x 13 ft box with tape-measure dimensions + plunging thermometer.
  const p1 = `<defs>${filters(s + "1")}</defs><rect width="${PW}" height="${PH}" fill="#0B1222"/>
      <g transform="translate(-10 40)">
      <polygon points="40,330 300,330 410,266 150,266" fill="#CBD5E1" opacity=".18"/>
      <polygon points="300,410 410,346 410,186 300,250" fill="${E.pineDk}"/><polygon points="40,250 300,250 410,186 150,186" fill="#7A4E2D"/>
      <rect x="40" y="250" width="260" height="160" fill="${E.pine}"/>${[282, 314, 346, 378].map((y) => `<line x1="40" y1="${y}" x2="300" y2="${y}" stroke="${E.pineDk}" stroke-width="3"/>`).join("")}
      <g id="${s}-dim1"><line x1="40" y1="440" x2="300" y2="440" stroke="${C.gold}" stroke-width="4"/><line x1="40" y1="428" x2="40" y2="452" stroke="${C.gold}" stroke-width="4"/><line x1="300" y1="428" x2="300" y2="452" stroke="${C.gold}" stroke-width="4"/>
        <text x="170" y="484" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="32" fill="#fff">13 FT</text></g>
      <g id="${s}-dim2"><line x1="318" y1="428" x2="428" y2="364" stroke="${C.gold}" stroke-width="4"/>
        <text x="352" y="472" font-family="Archivo Black, sans-serif" font-size="32" fill="#fff">9 FT</text></g></g>
      <g transform="translate(468 120)"><rect x="-12" y="0" width="24" height="300" rx="12" fill="#1E293B" stroke="#94A3B8" stroke-width="3"/><circle cx="0" cy="318" r="24" fill="${E.warn}"/>
        <rect id="${s}-merc" x="-6" y="40" width="12" height="270" fill="${E.warn}"/></g>
      <text id="${s}-tmp" x="300" y="150" text-anchor="end" font-family="Archivo Black, sans-serif" font-size="44" fill="${C.ice}">−60°F</text>`;
  // Panel 2: Byrd holding his aching head beside the glowing stove, CO haze leaking.
  const p2 = `<defs>${filters(s + "2")}</defs><rect width="${PW}" height="${PH}" fill="${E.pine}"/>
      ${[100, 160, 220, 280, 340, 400].map((y) => `<line x1="0" y1="${y}" x2="${PW}" y2="${y}" stroke="${E.pineDk}" stroke-width="3"/>`).join("")}
      <rect y="480" width="${PW}" height="80" fill="${E.pineDk}"/>
      <rect x="352" y="80" width="18" height="290" fill="#94A3B8"/><rect x="316" y="362" width="92" height="14" fill="#111827"/>
      <rect x="322" y="374" width="80" height="104" rx="8" fill="#1F2937" stroke="#0B0F17" stroke-width="4"/><rect x="340" y="400" width="44" height="30" rx="4" fill="${E.lamp}"/>
      <circle id="${s}-sg" cx="362" cy="420" r="70" fill="${E.lamp}" opacity=".3" filter="url(#${s}2-bloom)"/>
      <g transform="translate(${150 - 100 * 1.45} ${r1(480 - 265 * 1.45)}) scale(1.45)">${byrd(p, s + "2", { outfit: "sweater" })}</g>
      ${[[0, 0, 34], [30, -26, 28], [-26, -18, 26], [52, 14, 22]].map(([x, y, r], i) => `<circle id="${s}-co${i}" cx="${361 + x}" cy="${180 + y}" r="${r}" fill="${i % 2 ? E.haze : E.co}" opacity=".4" filter="url(#${s}2-soft)"/>`).join("")}
      <text x="361" y="196" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="40" fill="#E9D5FF">CO</text>`;
  // Panel 3 (full-frame art, revealed through the panel window): polar night, crevasses, the half-track with three rescuers.
  const sn = snow2(s, 22.5, { far: 70, near: 24, seed: 4 });
  const crev = [520, 980, 1450].map((x, i) => `<polygon points="${x - 60},${G3} ${x - 14},${G3 + 120 + i * 20} ${x + 8},${G3 + 50} ${x + 26},${G3 + 150} ${x + 64},${G3}" fill="#050811" stroke="#3B82F6" stroke-width="3" stroke-opacity=".6"/>
      <rect x="${x - 78}" y="${G3 - 6}" width="156" height="14" rx="3" fill="#78350F" stroke="#451A03" stroke-width="3"/>${[-52, -18, 16, 50].map((d) => `<line x1="${x + d}" y1="${G3 - 6}" x2="${x + d}" y2="${G3 + 8}" stroke="#451A03" stroke-width="3"/>`).join("")}
      <rect x="${x - 78}" y="${G3 - 12}" width="156" height="7" rx="3" fill="#E2E8F0" opacity=".85"/>`).join("");
  const flags = [300, 760, 1220, 1680].map((x) => `<line x1="${x}" y1="${G3}" x2="${x}" y2="${G3 - 70}" stroke="#A16207" stroke-width="4"/><rect x="${x}" y="${G3 - 70}" width="26" height="16" fill="${E.warn}" opacity=".85"/>`).join("");
  const full = `<defs>${filters(s + "3")}${sn.defs}</defs><rect width="1920" height="1080" fill="${E.night}"/>
      ${Array.from({ length: 60 }, (_, i) => `<circle cx="${(i * 379) % 1920}" cy="${(i * 149) % 700}" r="${1 + (i % 3) * 0.6}" fill="#E2E8F0" opacity=".5"/>`).join("")}
      <rect y="${G3}" width="1920" height="${1080 - G3}" fill="#1E293B"/><rect y="${G3}" width="1920" height="8" fill="${E.glacial}"/>${crev}${flags}${sn.far}
      <g transform="translate(-520 ${G3}) scale(1.5)"><g id="${s}-trk">${halftrack(s + "-ht", s + "3")}</g></g>${sn.near}`;
  const body = `
    <div id="${s}-map" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect width="1920" height="1080" fill="${E.night}"/>${grid}
      <g id="${s}-ant"><path d="${ant.coast}" fill="#E2E8F0"/><path d="${ant.shelf}" fill="#BAE6FD" opacity=".9"/>
        <g id="${s}-pin"><circle cx="${bx}" cy="${by}" r="34" fill="${E.warn}" opacity=".3" filter="url(#${s}-glowBig)"/><circle cx="${bx}" cy="${by}" r="13" fill="${E.warn}" stroke="#fff" stroke-width="4"/></g></g>
    </svg>${tag(s + "-ross", "ROSS ICE SHELF", r1(bx + 40), r1(by - 30))}</div>
    ${panel(0, "9 × 13 FT BURIED BOX", p1)}${panel(1, "THE POISONING STOVE", p2)}
    <div id="${s}-p2" style="position:absolute; inset:0; clip-path:inset(${PY}px ${1920 - PX[2] - PW}px ${1080 - PY - PH}px ${PX[2]}px round 20px);">
      <svg id="${s}-full" class="stage" viewBox="0 0 1920 1080">${full}</svg></div>
    <div id="${s}-p2b" style="position:absolute; left:${PX[2]}px; top:${PY}px; width:${PW}px; height:${PH}px; border-radius:20px; border:3px solid #334155;"></div>
    ${tag(s + "-h3", "THE POLAR NIGHT RESCUE", 1248, 316)}
    ${tag(s + "-h3b", "THE POLAR NIGHT RESCUE", 192, 210)}${tag(s + "-crew", "3 MEN · CITROËN HALF-TRACK", 192, 290)}
    ${pill(s + "-pill", "ALONE · MAR 28 – AUG 10, 1934", "0 DAYS")}`;

  const js = `
    ${rigInit(p)}
    tl.set("#${p}-lids", { scaleY: .4 }, 0.01);
    tl.set("#${p}-ache", { opacity: 0 }, 0);
    tl.set("#${p}-armL", { rotation: 150 }, 0.01); tl.set("#${p}-foreL", { rotation: 40 }, 0.01);
    ${life(p, 12.2, 16.8, { noBlink: true })}
    ${hide(s + "-p0", s + "-p1", s + "-p2", s + "-p2b", s + "-h3", s + "-h3b", s + "-crew", s + "-pill", s + "-ross", s + "-pin", s + "-tmp", s + "-dim1", s + "-dim2")}
    ${sn.js}
    // map: fast zoom to the Ross Ice Shelf, counter 0 -> 136 days
    tl.fromTo("#${s}-ant", { scale: .55, svgOrigin: "${bx} ${by}" }, { scale: 1.12, svgOrigin: "${bx} ${by}", duration: 2.6, ease: "power3.out", immediateRender: false }, 0.1);
    tl.fromTo("#${s}-pin", { opacity: 0, scale: 2, svgOrigin: "${bx} ${by}" }, { opacity: 1, scale: 1, svgOrigin: "${bx} ${by}", duration: .25, ease: "power2.in", immediateRender: false }, 1.6);
    tl.fromTo("#${s}-ross", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 1.9);
    tl.fromTo("#${s}-pill", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 0.4);
    ${count(s + "-pill-n", 0, 136, 0.5, 3.2, "Math.round(v) + ' DAYS'")}
    // three panels
    tl.to("#${s}-map", { opacity: .3, duration: .3 }, 5.9);
    tl.set("#${s}-ross", { opacity: 0 }, 5.9);
    tl.fromTo("#${s}-p0", { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.5)", immediateRender: false }, 6.1);
    tl.fromTo("#${s}-dim1", { opacity: 0, scaleX: 0, svgOrigin: "40 440" }, { opacity: 1, scaleX: 1, svgOrigin: "40 440", duration: .35, immediateRender: false }, 6.6);
    tl.fromTo("#${s}-dim2", { opacity: 0 }, { opacity: 1, duration: .25, immediateRender: false }, 7.2);
    tl.to("#${s}-merc", { attr: { y: 290, height: 20 }, duration: 1.4, ease: "power2.in" }, 9.6);
    tl.fromTo("#${s}-tmp", { opacity: 0, scale: 1.5, svgOrigin: "250 140" }, { opacity: 1, scale: 1, svgOrigin: "250 140", duration: .2, immediateRender: false }, 10.6);
    tl.fromTo("#${s}-p1", { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.5)", immediateRender: false }, 12.15);
    tl.to("#${p}-ache", { opacity: 1, duration: .2 }, 13.0);
    ${[0, 1, 2, 3, 4, 5].map((i) => `tl.to("#${p}-ache", { scale: ${i % 2 ? 1 : 1.12}, svgOrigin: "100 56", duration: .38, ease: "sine.inOut" }, ${r1(13.2 + i * 0.4)});`).join("\n    ")}
    ${[0, 1, 2, 3].map((i) => `tl.fromTo("#${s}-co${i}", { opacity: 0, x: 0, y: 0 }, { opacity: .45, x: ${[-40, 10, -70, 20][i]}, y: ${[40, 70, 20, 90][i]}, duration: 3.5, ease: "sine.out", immediateRender: false }, ${r1(12.6 + i * 0.3)});`).join("\n    ")}
    // panel 3 opens and expands to full screen
    tl.to(["#${s}-p2", "#${s}-p2b"], { opacity: 1, duration: .15 }, 16.8);
    tl.fromTo("#${s}-h3", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 16.9);
    tl.to("#${s}-h3", { opacity: 0, duration: .15 }, 17.3);
    tl.set("#${s}-p2b", { opacity: 0 }, 17.4);
    tl.fromTo("#${s}-p2", { clipPath: "inset(${PY}px ${1920 - PX[2] - PW}px ${1080 - PY - PH}px ${PX[2]}px round 20px)" }, { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: .55, ease: "power3.inOut", immediateRender: false }, 17.4);
    tl.set(["#${s}-p0", "#${s}-p1", "#${s}-map"], { opacity: 0 }, 17.95);
    tl.fromTo("#${s}-h3b", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 18.0);
    tl.fromTo("#${s}-crew", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 18.4);
    // the half-track rumbles left to right across the crevassed ice (ground locked at G3)
    tl.fromTo("#${s}-trk", { x: 0 }, { x: 1180, duration: 5.6, ease: "none", immediateRender: false }, 16.9);
    ${Array.from({ length: 28 }, (_, i) => `tl.to("#${s}-trk", { y: ${i % 2 ? 0 : -2.5}, duration: .1, ease: "none" }, ${r1(16.9 + i * 0.2)});`).join("\n    ")}`;

  return { id: "roadmap", html: scene("roadmap", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
