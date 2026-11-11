// D03 (26.2–55.5): the daily routine — 4 columns build left to right (wake in the dark · climb into −50°F wind · read by flashlight · log the numbers),
//   then a REPEAT loop sweeps the columns twice while the calendar flips April -> May -> June.
// VO (local = abs − 26.2): "Now imagine your daily routine in that box. (0.32–2.96) You wake up in the dark. (3.41) The air inside is so cold your breath hangs
//   in front of you. (5.03–8.19) You climb the ladder, (8.68) push open the hatch, (10.01) and step out into the wind, (11.39) at temperatures that can fall
//   below minus fifty. (13.15–15.60) You read the instruments by flashlight. (16.03–17.89) You climb back down. (18.45) You write the numbers in a logbook that
//   maybe a dozen people in the world will ever read. (20.32–24.84) Then you do it again. (25.49) And again. (26.88) [+0.5] For months. (28.25–28.98)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, box, badge, hide, breath } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";

const CX = [192, 584, 976, 1368], CY = 300, CW = 360, CH = 640;
export function build() {
  const s = "rt";
  const fig = (p, outfit, x, foot, k, o = {}) => `<g transform="translate(${r1(x - 100 * k)} ${r1(foot - 265 * k)}) scale(${k})"><g id="${p}-pos">${byrd(p, s, { outfit, ...o })}</g></g>`;
  const planks = (fill) => `<rect width="${CW}" height="${CH}" fill="${fill}"/>${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${60 + i * 64}" x2="${CW}" y2="${60 + i * 64}" stroke="#120A04" stroke-width="3"/>`).join("")}`;
  // flashlight beam parented to the forearm (rig-local, along the forearm direction)
  const torch = { side: "R", svg: `<g><rect x="150" y="172" width="14" height="22" rx="3" fill="#475569" transform="rotate(-24 157 183)"/>
      <polygon points="160,192 330,440 210,470" fill="#FDE68A" opacity=".4"/></g>` };
  const pencil = { side: "R", svg: `<line x1="152" y1="182" x2="170" y2="206" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"/>` };
  const col1 = `${planks("#1A0F07")}<rect x="40" y="470" width="280" height="16" fill="${E.pineDk}"/>${fig("rt-p1", "sweater", 180, 444, .62)}
      <rect x="44" y="400" width="272" height="76" rx="34" fill="#A47148"/><path d="M60 412 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0 q10 -8 20 0" fill="none" stroke="#D4A373" stroke-width="3"/>
      <g id="${s}-cloud" opacity="0">${[[230, 330, 16], [254, 318, 22], [284, 306, 28]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#E2E8F0" opacity=".75"/>`).join("")}</g>`;
  const col2 = `<rect width="${CW}" height="300" fill="#0B1222"/><rect y="300" width="${CW}" height="${CH - 300}" fill="${E.ice}"/><rect x="140" y="300" width="80" height="${CH - 300}" fill="#0B0F17"/>
      <rect x="148" y="300" width="6" height="${CH - 300}" fill="#B98A5A"/><rect x="206" y="300" width="6" height="${CH - 300}" fill="#B98A5A"/>${Array.from({ length: 8 }, (_, i) => `<rect x="148" y="${330 + i * 40}" width="64" height="5" fill="#B98A5A"/>`).join("")}
      ${fig("rt-p2", "anorak", 180, 300, .55)}
      <rect y="300" width="140" height="10" fill="${E.glacial}"/><rect x="220" y="300" width="140" height="10" fill="${E.glacial}"/>
      <rect x="66" y="295" width="74" height="10" rx="3" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="2" transform="rotate(70 140 300)"/>
      <g id="${s}-storm" opacity="0">${Array.from({ length: 12 }, (_, i) => `<line x1="${(i * 71) % 360 - 60}" y1="${40 + ((i * 53) % 240)}" x2="${(i * 71) % 360 + 40}" y2="${60 + ((i * 53) % 240)}" stroke="#E2E8F0" stroke-width="3" opacity=".7"/>`).join("")}</g>`;
  const col3 = `<rect width="${CW}" height="470" fill="#050811"/><rect y="470" width="${CW}" height="${CH - 470}" fill="#CBD5E1"/>
      <g><line x1="262" y1="470" x2="262" y2="410" stroke="#E2E8F0" stroke-width="5"/><line x1="306" y1="470" x2="306" y2="410" stroke="#E2E8F0" stroke-width="5"/>
        <rect x="248" y="350" width="72" height="62" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2"/>${[0, 1, 2, 3].map((i) => `<line x1="254" y1="${362 + i * 12}" x2="314" y2="${362 + i * 12}" stroke="#94A3B8" stroke-width="2"/>`).join("")}</g>
      ${fig("rt-p3", "anorak", 100, 470, .62, { props: [torch] })}`;
  const col4 = `${planks("#6B4226")}<rect x="160" y="470" width="190" height="14" fill="#2B1A0C" stroke="#120A04" stroke-width="2"/><rect x="172" y="484" width="10" height="76" fill="#2B1A0C"/><rect x="330" y="484" width="10" height="76" fill="#2B1A0C"/>
      <rect x="184" y="456" width="84" height="14" fill="#7F1D1D"/><rect x="226" y="452" width="42" height="16" fill="#F8FAFC"/><line x1="232" y1="458" x2="262" y2="458" stroke="#94A3B8" stroke-width="2"/>
      <rect y="560" width="${CW}" height="${CH - 560}" fill="${E.pineDk}"/>${fig("rt-p4", "sweater", 130, 560, .62, { props: [pencil] })}`;
  const col = (i, head, inner) => `<div id="${s}-k${i}" style="position:absolute; left:${CX[i]}px; top:${CY}px; width:${CW}px; height:${CH}px; border-radius:18px; overflow:hidden; border:4px solid #334155;">
      <svg width="${CW}" height="${CH}" viewBox="0 0 ${CW} ${CH}" style="position:absolute; left:0; top:0;"><defs>${i === 0 ? filters(s) : ""}</defs>${inner}</svg>
      <div class="tag" style="position:absolute; left:20px; top:18px;">${head}</div></div>`;
  const note = (id, i, text, color = "#F8FAFC") => `<div id="${id}" class="ui" style="left:${CX[i] + 24}px; width:${CW - 48}px; top:${CY + CH - 120}px; white-space:normal; text-align:center; font-family:Inter, sans-serif; font-weight:800; font-size:28px; line-height:1.25; color:${color}; background:rgba(11,16,30,.85); border-radius:12px; padding:8px 0;">${text}</div>`;
  const body = `
    <div style="position:absolute; inset:0; ${BLUEPRINT_CSS}"></div>
    ${col(0, "1 · WAKE", col1)}${col(1, "2 · −50°F WIND", col2)}${col(2, "3 · FLASHLIGHT", col3)}${col(3, "4 · LOGBOOK", col4)}
    ${note(s + "-n0", 0, "BREATH HANGS IN THE AIR")}${note(s + "-n1", 1, "BELOW −50°F", "#7DD3FC")}${note(s + "-n2", 2, "READ THE INSTRUMENTS")}${note(s + "-n3", 3, "MAYBE A DOZEN READERS", C.gold)}
    <svg class="stage" viewBox="0 0 1920 1080"><g id="${s}-loop" opacity="0"><path d="M372 288 C700 236 1220 236 1548 288" fill="none" stroke="${C.cyan}" stroke-width="8" stroke-linecap="round"/>
      <polygon points="1548,288 1522,264 1516,298" fill="${C.cyan}"/></g></svg>
    <div id="${s}-rep" class="ui" style="left:0; right:0; top:196px; display:flex; justify-content:center;"><div style="padding:10px 30px; border-radius:30px; background:rgba(17,24,39,.94); border:3px solid ${C.cyan}; font-family:'Archivo Black', sans-serif; font-size:32px; color:${C.cyan};">↻ REPEAT DAILY</div></div>
    ${box(s + "-title", `NOW IMAGINE YOUR <span style="color:${C.gold};">DAILY ROUTINE</span>`, 120)}
    ${["APRIL", "MAY", "JUNE"].map((m, i) => badge(`${s}-cal${i}`, "1934 · FOR MONTHS", m, { fs: 40, w: 400, left: 1328 })).join("")}`;

  const ps = ["rt-p1", "rt-p2", "rt-p3", "rt-p4"];
  const js = `
    ${ps.map((p) => rigInit(p)).join("\n    ")}
    ${ps.map((p, i) => life(p, 3.4 + i * 0.2, 29.3, { every: 3 + i * 0.3 })).join("\n    ")}
    ${hide(s + "-rep", s + "-cal0", s + "-cal1", s + "-cal2", ...[0, 1, 2, 3].map((i) => `${s}-k${i}`), ...[0, 1, 2, 3].map((i) => `${s}-n${i}`))}
    tl.fromTo("#${s}-title", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 0.3);
    // 1. wake in the dark: breath hangs
    tl.fromTo("#${s}-k0", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.4)", immediateRender: false }, 3.4);
    tl.set("#rt-p1-lids", { scaleY: .4 }, 3.4); tl.to("#rt-p1-lids", { scaleY: 0, duration: .4 }, 4.2);
    tl.fromTo("#${s}-cloud", { opacity: 0, scale: .3, svgOrigin: "220 340" }, { opacity: 1, scale: 1, svgOrigin: "220 340", duration: 1.2, ease: "power1.out", immediateRender: false }, 5.1);
    tl.fromTo("#${s}-n0", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 6.2);
    // 2. climb the ladder, push the hatch, step out into −50°F wind
    tl.fromTo("#${s}-k1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.4)", immediateRender: false }, 8.7);
    tl.fromTo("#rt-p2-pos", { y: 520 }, { y: 0, duration: 2.6, ease: "power1.inOut", immediateRender: false }, 8.8);
    tl.set("#rt-p2-armL", { rotation: 150 }, 8.8); tl.set("#rt-p2-armR", { rotation: -150 }, 8.8);
    tl.to("#rt-p2-armR", { rotation: 0, duration: .4 }, 11.4); tl.to("#rt-p2-armL", { rotation: 128, duration: .4 }, 11.4); tl.to("#rt-p2-armL", { rotation: 0, duration: .5 }, 14.2);
    tl.to("#${s}-storm", { opacity: 1, duration: .4 }, 11.4);
    tl.fromTo("#${s}-storm", { x: -80 }, { x: 80, duration: 1.2, repeat: 3, ease: "none", immediateRender: false }, 11.4);
    ${breath("rt-p2", 11.6, 16.0)}
    tl.fromTo("#${s}-n1", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 13.2);
    // 3. read the instruments by flashlight
    tl.fromTo("#${s}-k2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.4)", immediateRender: false }, 16.0);
    tl.set("#rt-p3-armR", { rotation: -86 }, 0.05);
    tl.fromTo("#${s}-n2", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 16.6);
    // 4. back down, write the numbers
    tl.fromTo("#${s}-k3", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.4)", immediateRender: false }, 18.45);
    tl.set("#rt-p4-armR", { rotation: -28 }, 0.05);
    ${Array.from({ length: 14 }, (_, i) => `tl.to("#rt-p4-foreR", { rotation: ${i % 2 ? -6 : 6}, svgOrigin: "142 147", duration: .18, ease: "sine.inOut" }, ${r1(20.4 + i * 0.2)});`).join("\n    ")}
    tl.fromTo("#${s}-n3", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 22.0);
    // again, and again, for months
    tl.to("#${s}-title", { opacity: 0, duration: .2 }, 25.3);
    tl.fromTo("#${s}-loop", { opacity: 0 }, { opacity: 1, duration: .3, immediateRender: false }, 25.5);
    tl.fromTo("#${s}-rep", { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 25.5);
    ${[0, 1, 2, 3, 0, 1, 2, 3].map((i, j) => `tl.to("#${s}-k${i}", { borderColor: "${C.cyan}", duration: .08 }, ${r1(25.6 + j * 0.42)}); tl.to("#${s}-k${i}", { borderColor: "#334155", duration: .25 }, ${r1(25.95 + j * 0.42)});`).join("\n    ")}
    tl.fromTo("#${s}-cal0", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 25.6);
    tl.set("#${s}-cal0", { opacity: 0 }, 26.9); tl.fromTo("#${s}-cal1", { opacity: 0, scaleY: .2 }, { opacity: 1, scaleY: 1, duration: .15, immediateRender: false }, 26.9);
    tl.set("#${s}-cal1", { opacity: 0 }, 28.25); tl.fromTo("#${s}-cal2", { opacity: 0, scaleY: .2 }, { opacity: 1, scaleY: 1, duration: .15, immediateRender: false }, 28.25);`;

  return { id: "routine", html: scene("routine", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
