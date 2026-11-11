// F05 (88.0–107.8): can't see, smell or taste it; in the blood, CO takes oxygen's place; the 4-step ladder (headaches → tired & sick → confused →
//   fall asleep and don't wake up) beside a deteriorating Byrd; fade to black.
// VO (local = abs − 88.0): "Carbon monoxide is a gas you can't see, (0.73–3.22) can't smell and can't taste. (3.64–5.39) When you breathe it, (5.94) it takes the
//   place of oxygen in your blood. (7.06–9.20) At first, you get headaches. (9.73–11.12) Then you feel tired and sick. (11.58–13.08) Then confused. (13.50–14.40)
//   Then you fall asleep, (14.84–15.86) and if nobody gets you out of that air, (16.27–18.00) you don't wake up. (18.33–19.17)"
import { C, r1, filters, rigInit, scene } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";

const VY = 470;
export function build() {
  const s = "bl", p = "bl-by";
  const cells = Array.from({ length: 8 }, (_, i) => { const x = 220 + i * 200; return `<g class="${s}-cell"><ellipse cx="${x}" cy="${VY}" rx="58" ry="40" fill="#DC2626" stroke="#7F1D1D" stroke-width="4"/><ellipse cx="${x}" cy="${VY}" rx="24" ry="14" fill="#B91C1C"/>
      <circle id="${s}-ox${i}" cx="${x}" cy="${VY}" r="13" fill="#22D3EE" stroke="#E0F2FE" stroke-width="2"/><g id="${s}-k${i}" opacity="0"><rect x="${x - 15}" y="${VY - 12}" width="30" height="24" rx="4" fill="#475569" stroke="#94A3B8" stroke-width="2"/><text x="${x}" y="${VY + 5}" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="13" fill="#F8FAFC">CO</text></g></g>`; }).join("");
  const steps = ["STEP 1: HEADACHES", "STEP 2: TIRED &amp; SICK", "STEP 3: CONFUSED", "STEP 4: FALL ASLEEP — AND DON'T WAKE UP"];
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0; ${BLUEPRINT_CSS}"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect x="0" y="${VY - 110}" width="1920" height="220" fill="#450A0A"/><rect x="0" y="${VY - 110}" width="1920" height="8" fill="#7F1D1D"/><rect x="0" y="${VY + 102}" width="1920" height="8" fill="#7F1D1D"/>
      <g id="${s}-flow">${cells}</g></svg>
      ${["⊘ CAN'T SEE", "⊘ CAN'T SMELL", "⊘ CAN'T TASTE"].map((t, i) => `<div id="${s}-p${i}" class="ui" style="left:${360 + i * 420}px; top:160px;"><div class="ui-pill" style="position:relative; height:70px;"><span>${t}</span></div></div>`).join("")}
      ${tag(s + "-o2", "● O₂ OXYGEN", 300, 720)}${tag(s + "-cot", "■ CO TAKES THE PLACE OF OXYGEN IN YOUR BLOOD", 640, 720)}</div>
    <div id="${s}-S2" style="position:absolute; inset:0; ${BLUEPRINT_CSS}"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "2")}</defs>
      <g transform="translate(${420 - 100 * 1.8} ${r1(900 - 265 * 1.8)}) scale(1.8)"><g id="${s}-body">${byrd(p, s + "2", { outfit: "sweater" })}</g></g>
      <g id="${s}-q" opacity="0"><circle cx="420" cy="${r1(900 - 265 * 1.8 + 64 * 1.8)}" r="96" fill="none" stroke="${C.cyan}" stroke-width="5" stroke-dasharray="12 10"/></g>
      <text id="${s}-qm" x="420" y="${r1(900 - 265 * 1.8 - 20)}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="72" fill="${C.cyan}" opacity="0">?</text>
    </svg>
      ${steps.map((t, i) => `<div id="${s}-s${i}" class="ui" style="left:820px; top:${200 + i * 160}px; width:900px; padding:24px 30px; border-radius:16px; background:rgba(11,16,30,.94); border:3px solid #334155; font-family:'Archivo Black', sans-serif; font-size:${i === 3 ? 34 : 40}px; color:#475569; white-space:normal;">${t}</div>`).join("")}</div>
    <div id="${s}-black" style="position:absolute; inset:0; background:#000;"></div>`;

  const js = `
    ${rigInit(p)}
    ${hide(s + "-S2", s + "-black", s + "-p0", s + "-p1", s + "-p2", s + "-o2", s + "-cot")}
    tl.fromTo("#${s}-flow", { x: 0 }, { x: -200, duration: 9.6, ease: "none", immediateRender: false }, 0);
    ${[[0, 1.6], [1, 3.7], [2, 4.9]].map(([i, t]) => `tl.fromTo("#${s}-p${i}", { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .22, ease: "back.out(2)", immediateRender: false }, ${t});`).join("\n    ")}
    tl.fromTo("#${s}-o2", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 5.9);
    // CO knocks the oxygen off each cell and locks on
    ${Array.from({ length: 8 }, (_, i) => `tl.to("#${s}-ox${i}", { opacity: 0, scale: .4, svgOrigin: "${220 + i * 200} ${VY}", duration: .3, ease: "power2.in" }, ${r1(7.0 + i * 0.22)}); tl.fromTo("#${s}-k${i}", { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: .2, immediateRender: false }, ${r1(7.2 + i * 0.22)});`).join("\n    ")}
    tl.fromTo("#${s}-cot", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 7.2);
    // the ladder, beside Byrd getting worse
    tl.set("#${s}-S2", { opacity: 1 }, 9.6);
    tl.set("#${s}-S1", { opacity: 0 }, 9.6);
    ${steps.map((_, i) => { const t = [9.75, 11.6, 13.5, 14.85][i]; return `tl.to("#${s}-s${i}", { color: "${i === 3 ? "#FCA5A5" : "#F8FAFC"}", borderColor: "${["#F59E0B", "#EA580C", "#DC2626", "#7F1D1D"][i]}", duration: .2 }, ${t});`; }).join("\n    ")}
    tl.to("#${p}-ache", { opacity: 1, duration: .2 }, 9.8);
    ${[0, 1, 2, 3].map((i) => `tl.to("#${p}-ache", { scale: ${i % 2 ? 1 : 1.18}, svgOrigin: "100 50", duration: .4, ease: "sine.inOut" }, ${r1(10.0 + i * 0.42)});`).join("\n    ")}
    tl.to("#${p}-lids", { scaleY: .6, duration: .4 }, 11.6);
    tl.to("#${s}-body", { rotation: 6, svgOrigin: "100 265", duration: .6 }, 11.7);
    tl.to(["#${p}-armL", "#${p}-armR"], { rotation: 0, duration: .4 }, 11.7);
    tl.to(["#${s}-q", "#${s}-qm"], { opacity: 1, duration: .3 }, 13.5);
    tl.to("#${s}-q", { rotation: 180, svgOrigin: "420 ${r1(900 - 265 * 1.8 + 64 * 1.8)}", duration: 2.0, ease: "none" }, 13.5);
    tl.to(["#${s}-q", "#${s}-qm"], { opacity: 0, duration: .3 }, 15.4);
    tl.to("#${p}-lids", { scaleY: 1, duration: 1.0 }, 15.0);
    tl.to("#${s}-body", { rotation: 14, svgOrigin: "100 265", duration: 1.6, ease: "power1.in" }, 15.0);
    tl.to("#${s}-black", { opacity: 1, duration: 1.6, ease: "power1.in" }, 18.2);`;

  return { id: "blood", html: scene("blood", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
