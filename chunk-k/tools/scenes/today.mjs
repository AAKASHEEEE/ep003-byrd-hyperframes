// K03 (44.6–66.8): the 1934 weather logbook opens and a cyan data trace runs across the Antarctic interior (✓ A RARE LOOK AT THE ANTARCTIC INTERIOR IN
//   WINTER); then TODAY · WINTERING IN ANTARCTICA — the modern Endurance Scout beside 3 panels: AMUNDSEN–SCOTT SOUTH POLE (elevated, on stilts), CONCORDIA
//   (twin towers), VOSTOK; green badges ✓ MEDICAL DOCTORS · ✓ CARBON MONOXIDE ALARMS · ✓ PSYCHOLOGISTS · ✓ CREWS OF DOZENS (a row of crew).
// VO (local = abs − 44.6): "And the science? (0.36–1.19) His weather records from that winter (1.80–3.55) were a rare look at what the Antarctic interior does
//   in the dark months. (3.88–7.72) Today, (8.27) people still spend the winter there — (9.19–10.80) at the South Pole, (11.30) at Concordia, (12.69) at Vostok —
//   (13.88) in modern stations with doctors, (15.20–17.02) carbon monoxide alarms, (17.47–18.90) psychologists and crews of dozens. (19.25–21.52)"
import { C, r1, filters, rigInit, scene, life, scout } from "../lib.mjs";
import { KIT_CSS, tag, hide, cite } from "./kit.mjs";
import { E, E3_CSS, antarctica, ADVANCE_BASE } from "./e3.mjs";
import { avatar } from "./b3.mjs";

const PW = 440, PY = 270, PH = 400, PX = (i) => 430 + i * 470;
export function build() {
  const s = "td", p = "td-sc";
  const ant = antarctica(760, 1290, 560);
  const [ax, ay] = ant.pt(...ADVANCE_BASE), [cx, cy] = ant.pt(123.3, 75.1), [vx, vy] = ant.pt(106.8, 78.5), [px, py] = ant.pt(0, 90);
  const trace = `M${ax} ${ay} ` + Array.from({ length: 24 }, (_, i) => { const t = (i + 1) / 24; return `L${r1(ax + (px - ax) * t + Math.sin(i * 1.7) * 26)} ${r1(ay + (py - ay) * t + Math.cos(i * 1.3) * 22 - Math.sin(t * 3.1) * 90)}`; }).join(" ");
  const log = `<g id="${s}-log"><rect x="230" y="330" width="540" height="380" rx="14" fill="#5C3A21" stroke="#3B2414" stroke-width="5"/>
      <rect x="250" y="346" width="246" height="348" fill="#F5F0E1"/><rect x="504" y="346" width="246" height="348" fill="#EFE8D4"/><line x1="500" y1="346" x2="500" y2="694" stroke="#C9BFA4" stroke-width="3"/>
      ${Array.from({ length: 11 }, (_, i) => `<line x1="268" y1="${384 + i * 28}" x2="${470 - (i % 3) * 30}" y2="${384 + i * 28}" stroke="#94A3B8" stroke-width="3"/><line x1="522" y1="${384 + i * 28}" x2="${730 - ((i + 1) % 3) * 30}" y2="${384 + i * 28}" stroke="#94A3B8" stroke-width="3"/>`).join("")}</g>`;
  const pole = `<g><rect x="80" y="210" width="280" height="80" rx="6" fill="#CBD5E1" stroke="#475569" stroke-width="4"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${96 + i * 44}" y="226" width="30" height="20" rx="3" fill="#1E3A8A"/>`).join("")}
      ${[110, 190, 250, 330].map((x) => `<rect x="${x - 7}" y="290" width="14" height="70" fill="#64748B"/>`).join("")}<rect x="0" y="360" width="440" height="40" fill="#E2E8F0"/></g>`;
  const conc = `<g><rect x="0" y="360" width="440" height="40" fill="#E2E8F0"/>${[130, 300].map((x) => `<rect x="${x - 55}" y="150" width="110" height="210" rx="12" fill="#F8FAFC" stroke="#64748B" stroke-width="4"/>${[0, 1, 2, 3].map((j) => `<rect x="${x - 40}" y="${176 + j * 44}" width="80" height="14" rx="3" fill="#0EA5E9"/>`).join("")}`).join("")}
      <rect x="185" y="280" width="60" height="16" fill="#94A3B8"/></g>`;
  const vost = `<g><rect x="0" y="360" width="440" height="40" fill="#E2E8F0"/><rect x="60" y="270" width="190" height="90" fill="#B91C1C" stroke="#7F1D1D" stroke-width="4"/><rect x="250" y="300" width="130" height="60" fill="#F8FAFC" stroke="#64748B" stroke-width="4"/>
      ${[0, 1, 2].map((i) => `<rect x="${80 + i * 56}" y="292" width="36" height="22" rx="3" fill="#FDE68A"/>`).join("")}<line x1="330" y1="300" x2="330" y2="150" stroke="#475569" stroke-width="6"/><line x1="300" y1="190" x2="360" y2="190" stroke="#475569" stroke-width="4"/></g>`;
  const panel = (i, title, art) => `<div id="${s}-p${i}" class="ui" style="left:${PX(i)}px; top:${PY}px; width:${PW}px; height:${PH}px; border-radius:18px; overflow:hidden; border:3px solid #38BDF8; background:linear-gradient(#0C4A6E,#7DD3FC);">
      <svg width="${PW}" height="${PH}" viewBox="0 0 440 400" style="position:absolute; left:0; top:0;">${art}</svg>
      <div style="position:absolute; left:14px; right:14px; top:14px; padding:8px 6px; white-space:normal; border-radius:10px; background:rgba(11,16,30,.88); text-align:center; font-family:'Archivo Black', sans-serif; font-size:28px; color:#fff;">${title}</div></div>`;
  const bdg = (i, t) => `<div id="${s}-g${i}" class="ui" style="left:${PX(0) + (i % 2) * 700}px; top:${PY + PH + 34 + Math.floor(i / 2) * 72}px; width:680px; padding:14px 0; border-radius:16px; background:#052E1A; border:3px solid #22C55E; text-align:center; font-family:'Archivo Black', sans-serif; font-size:28px; color:#86EFAC;">✓ ${t}</div>`;
  const coats = ["#FF7A00", "#2563EB", "#DC2626", "#059669", "#7C3AED", "#F59E0B", "#0EA5E9", "#BE185D", "#FF7A00", "#2563EB", "#DC2626", "#059669"];
  const body = `
    <div id="${s}-A" style="position:absolute; inset:0; background:${E.night};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}<clipPath id="${s}-clip"><rect id="${s}-cr" x="880" y="0" width="0" height="1080"/></clipPath></defs>
      <path d="${ant.coast}" fill="#1E293B" stroke="#475569" stroke-width="3"/><path d="${ant.shelf}" fill="#334155" opacity=".7"/>
      <circle cx="${ax}" cy="${ay}" r="10" fill="${E.lamp}"/>
      <g clip-path="url(#${s}-clip)"><path d="${trace}" fill="none" stroke="${C.cyan}" stroke-width="5" stroke-linejoin="round" filter="url(#${s}-glow)"/></g>
      ${log}</svg>
      <div class="ui" style="left:230px; top:270px; font-family:'Archivo Black', sans-serif; font-size:32px; color:#E7D7BC;">1934 WEATHER LOGBOOK</div>
      <div class="ui tag" style="left:${ax + 20}px; top:${ay - 10}px;">ADVANCE BASE</div>
      <div id="${s}-rare" class="ui" style="left:0; right:0; top:880px; display:flex; justify-content:center;"><div class="tag" style="position:relative; font-size:32px; border-left-color:#22C55E;">✓ A RARE LOOK AT THE ANTARCTIC INTERIOR IN WINTER</div></div>
      <div id="${s}-sci" class="ui" style="left:192px; top:150px; font-family:'Archivo Black', sans-serif; font-size:44px; color:#fff;">AND THE SCIENCE?</div></div>
    <div id="${s}-T" style="position:absolute; inset:0; background:linear-gradient(#0B1A2E, #12304F);"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "T")}</defs>
      <g transform="translate(${r1(230 - 100 * 1.3)} ${r1(PY + PH - 265 * 1.3)}) scale(1.3)">${scout(p, s + "T", {})}</g>
      <g id="${s}-crew" opacity="0">${coats.map((c, i) => avatar(`${s}-av${i}`, 1110 + i * 62, 910, c)).join("")}</g></svg>
      <div class="ui" style="left:0; right:0; top:150px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:50px; color:#fff;">TODAY · WINTERING IN ANTARCTICA</div>
      ${panel(0, "1. AMUNDSEN–SCOTT SOUTH POLE", pole)}${panel(1, "2. CONCORDIA STATION", conc)}${panel(2, "3. VOSTOK STATION", vost)}
      ${bdg(0, "MEDICAL DOCTORS")}${bdg(1, "CARBON MONOXIDE ALARMS")}${bdg(2, "PSYCHOLOGISTS")}${bdg(3, "CREWS OF DOZENS")}
      ${cite(s + "-cite", "U.S. Antarctic Program · Concordia (IPEV/PNRA) · Vostok (AARI)")}</div>`;

  const js = `
    ${rigInit(p)}
    ${life(p, 8.3, 22.2, { every: 3.0 })}
    tl.set("#${s}-T", { autoAlpha: 0 }, 0);
    ${hide(s + "-rare", s + "-sci", s + "-p0", s + "-p1", s + "-p2", s + "-g0", s + "-g1", s + "-g2", s + "-g3", s + "-cite")}
    // the science: the logbook's trace across the interior
    tl.fromTo("#${s}-sci", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 0.36);
    tl.fromTo("#${s}-log", { scale: .8, opacity: 0, svgOrigin: "500 520" }, { scale: 1, opacity: 1, svgOrigin: "500 520", duration: .4, ease: "back.out(1.5)", immediateRender: false }, 1.6);
    tl.to("#${s}-cr", { attr: { width: 900 }, duration: 3.6, ease: "power1.inOut" }, 2.0);
    tl.fromTo("#${s}-rare", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 3.95);
    // today
    tl.set("#${s}-T", { autoAlpha: 1 }, 8.2); tl.set("#${s}-A", { autoAlpha: 0 }, 8.2);
    ${[[0, 11.3], [1, 12.7], [2, 13.9]].map(([i, t]) => `tl.fromTo("#${s}-p${i}", { opacity: 0, y: 30, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .3, ease: "back.out(1.6)", immediateRender: false }, ${t});`).join("\n    ")}
    tl.to("#${p}-armR", { rotation: -70, duration: .4, ease: "power2.out" }, 11.2);
    tl.fromTo("#${s}-cite", { opacity: 0 }, { opacity: 1, duration: .3, immediateRender: false }, 14.2);
    ${[[0, 16.2], [1, 17.5], [2, 19.3], [3, 20.4]].map(([i, t]) => `tl.fromTo("#${s}-g${i}", { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .22, ease: "back.out(2)", immediateRender: false }, ${t});`).join("\n    ")}
    tl.to("#${s}-crew", { opacity: 1, duration: .4 }, 20.5);`;

  return { id: "today", html: scene("today", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
