// C05 (71.0–88.4): "Why bury a house?" — snow traps air (natural insulator); split screen: above the surface the wind strips the heat out in minutes,
//   below it the snow blanket keeps the temperature steady.
// VO (local = abs − 71.0): "Why bury a house? (0.18–1.35) [+0.6] Because snow (2.47) is one of the best insulators on Earth. (3.59–5.59) Above the surface,
//   (6.08) the wind could strip the heat out of anything in minutes. (7.52–10.25) Below it, (10.86) the hut sat in a blanket of snow (11.97) that stayed far
//   steadier than the air above. (14.42–16.91)"
import { C, r1, filters, rigInit, scene, shiver, life } from "../lib.mjs";
import { KIT_CSS, box, hide } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";

const PW = 752, PH = 640, PY = 270;
export function build() {
  const s = "ins", pL = "ins-bl", pR = "ins-br";
  const wind = (id, y0, n) => `<g id="${id}">${Array.from({ length: n }, (_, i) => { const y = y0 + i * 46, x = -200 + ((i * 173) % 420); return `<path d="M${x} ${y} q40 -16 80 0 t80 0 t80 0" fill="none" stroke="#BAE6FD" stroke-width="6" stroke-linecap="round" opacity=".85"/><polygon points="${x + 240},${y - 9} ${x + 258},${y} ${x + 240},${y + 9}" fill="#BAE6FD"/>`; }).join("")}</g>`;
  const heat = (id) => `<g id="${id}">${[0, 1, 2].map((i) => `<path d="M${520 + i * 6} ${300 + i * 40} q20 -12 40 0 t40 0 t40 0" fill="none" stroke="${E.lamp}" stroke-width="7" stroke-linecap="round"/>`).join("")}</g>`;
  const hutBox = (x, y) => `<rect x="${x}" y="${y}" width="270" height="170" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="5"/>${[1, 2, 3].map((i) => `<line x1="${x}" y1="${y + i * 42}" x2="${x + 270}" y2="${y + i * 42}" stroke="${E.pineDk}" stroke-width="2"/>`).join("")}`;
  const left = `<rect width="${PW}" height="${PH}" fill="#0F172A"/><rect y="400" width="${PW}" height="${PH - 400}" fill="#CBD5E1"/>
      <g id="${s}-lglow"><rect x="240" y="230" width="270" height="170" fill="${E.lamp}" opacity=".35" filter="url(#${s}-soft)"/></g>
      ${hutBox(240, 230)}
      <g transform="translate(${375 - 100 * 0.55} ${r1(400 - 265 * 0.55)}) scale(.55)">${byrd(pL, s, { outfit: "sweater" })}</g>
      <g transform="translate(480 250)"><rect x="-8" y="0" width="16" height="110" rx="8" fill="#1E293B" stroke="#94A3B8" stroke-width="3"/><circle cx="0" cy="116" r="13" fill="${E.warn}"/><rect id="${s}-merc" x="-4" y="20" width="8" height="92" fill="${E.warn}"/></g>
      ${heat(s + "-heat")}${wind(s + "-wl", 140, 7)}`;
  const right = `<rect width="${PW}" height="${PH}" fill="#0F172A"/><rect y="260" width="${PW}" height="${PH - 260}" fill="#8193AD"/><rect y="260" width="${PW}" height="8" fill="#F8FAFC"/>
      ${[0, 1, 2, 3, 4].map((i) => `<path d="M0 ${330 + i * 60} Q376 ${318 + i * 60} ${PW} ${330 + i * 60}" fill="none" stroke="#9AAAC2" stroke-width="3"/>`).join("")}
      <rect id="${s}-ring" x="220" y="300" width="310" height="210" rx="16" fill="none" stroke="${C.cyan}" stroke-width="8" opacity=".9" filter="url(#${s}-glow)"/>
      <rect x="230" y="310" width="290" height="190" fill="${E.pit}"/>${hutBox(240, 320)}
      <rect x="240" y="320" width="270" height="170" fill="${E.lamp}" opacity=".18"/>
      <g transform="translate(${375 - 100 * 0.55} ${r1(490 - 265 * 0.55)}) scale(.55)">${byrd(pR, s, { outfit: "sweater" })}</g>
      ${wind(s + "-wr", 60, 4)}`;
  const panel = (id, x, border, head, inner) => `<div id="${id}" style="position:absolute; left:${x}px; top:${PY}px; width:${PW}px; height:${PH}px; border-radius:20px; overflow:hidden; border:4px solid ${border};">
      <svg width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}" style="position:absolute; left:0; top:0;">${inner}</svg>
      <div class="tag" style="position:absolute; left:24px; top:22px; border-left-color:${border};">${head}</div></div>`;
  const note = (id, text, color, x) => `<div id="${id}" class="ui" style="left:${x + 24}px; width:${PW - 48}px; top:${PY + PH - 84}px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:32px; color:${color}; background:rgba(11,16,30,.88); border-radius:14px; padding:10px 0;">${text}</div>`;
  const body = `
    <div style="position:absolute; inset:0; ${BLUEPRINT_CSS}"></div>
    <div id="${s}-lens" style="position:absolute; left:0; top:0; width:1920px; height:1080px;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}
      <clipPath id="${s}-lc"><circle cx="960" cy="660" r="250"/></clipPath></defs>
      <circle cx="960" cy="660" r="258" fill="none" stroke="${C.cyan}" stroke-width="8"/>
      <g clip-path="url(#${s}-lc)"><rect x="700" y="400" width="520" height="520" fill="#E2E8F0"/>
        ${Array.from({ length: 14 }, (_, i) => { const x = 740 + ((i * 137) % 440), y = 440 + ((i * 89) % 440); return `<g stroke="#94A3B8" stroke-width="5" stroke-linecap="round"><line x1="${x - 34}" y1="${y}" x2="${x + 34}" y2="${y}"/><line x1="${x - 17}" y1="${y - 29}" x2="${x + 17}" y2="${y + 29}"/><line x1="${x - 17}" y1="${y + 29}" x2="${x + 17}" y2="${y - 29}"/></g>`; }).join("")}
        <g id="${s}-air">${Array.from({ length: 16 }, (_, i) => `<circle cx="${760 + ((i * 113) % 400)}" cy="${470 + ((i * 151) % 380)}" r="${12 + (i % 3) * 6}" fill="#7DD3FC" opacity=".55"/>`).join("")}</g></g></svg>
      <div class="ui" style="left:1240px; top:620px; font-family:Inter, sans-serif; font-weight:800; font-size:30px; color:#7DD3FC;">● TRAPPED AIR</div></div>
    ${panel(s + "-L", 192, E.warn, "ABOVE SURFACE: EXPOSED TO WIND", left)}${panel(s + "-R", 976, E.green, "BELOW SURFACE: SNOW BLANKET", right)}
    ${note(s + "-nL", "✕ HEAT STRIPPED IN MINUTES", "#FCA5A5", 192)}${note(s + "-nR", "✓ STEADY TEMPERATURE", "#6EE7B7", 976)}
    ${box(s + "-why", `WHY BURY A <span style="color:${C.gold};">HOUSE</span>?`, 150)}
    <div id="${s}-ok" class="ui k-lab" style="left:360px; width:1200px; top:150px;"><div class="k-ok">✓ SNOW = TRAPPED AIR · A NATURAL INSULATOR</div></div>`;

  const js = `
    ${rigInit(pL)}${"\n    "}${rigInit(pR)}
    ${life(pR, 11.0, 17.4, { every: 3.0 })}
    ${hide(s + "-lens", s + "-L", s + "-R", s + "-nL", s + "-nR", s + "-ok")}
    tl.fromTo("#${s}-why", { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: .2, ease: "power2.in", immediateRender: false }, 0.2);
    tl.to("#${s}-why", { scale: 1.08, duration: 2.0, ease: "sine.inOut" }, 0.5);
    // "Because snow is one of the best insulators": the answer + a macro lens of trapped air
    tl.set("#${s}-why", { opacity: 0 }, 2.45);
    tl.fromTo("#${s}-ok", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 2.45);
    tl.fromTo("#${s}-lens", { opacity: 0, scale: .6, transformOrigin: "50% 61%" }, { opacity: 1, scale: 1, duration: .35, ease: "back.out(1.4)", immediateRender: false }, 2.7);
    tl.to("#${s}-air", { opacity: .3, duration: .5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 3.2);
    // split: above vs below
    tl.set(["#${s}-lens", "#${s}-ok"], { opacity: 0 }, 6.05);
    tl.fromTo("#${s}-L", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: .3, ease: "power2.out", immediateRender: false }, 6.05);
    ${[0, 1, 2, 3].map((i) => `tl.fromTo("#${s}-wl", { x: -220 }, { x: 760, duration: 1.4, ease: "none", immediateRender: false }, ${r1(7.4 + i * 1.4)});`).join("\n    ")}
    ${[0, 1, 2, 3].map((i) => `tl.fromTo("#${s}-heat", { x: 0, opacity: 1 }, { x: 260, opacity: 0, duration: 1.4, ease: "power1.in", immediateRender: false }, ${r1(7.6 + i * 1.4)});`).join("\n    ")}
    tl.to("#${s}-merc", { attr: { y: 100, height: 12 }, duration: 2.6, ease: "power2.in" }, 7.6);
    tl.to("#${s}-lglow", { opacity: 0, duration: 2.6 }, 7.6);
    ${shiver(pL, 8.6, 17.2, 3)}
    tl.fromTo("#${s}-nL", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 9.0);
    tl.fromTo("#${s}-R", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: .3, ease: "power2.out", immediateRender: false }, 10.86);
    ${[0, 1, 2, 3].map((i) => `tl.fromTo("#${s}-wr", { x: -220 }, { x: 760, duration: 1.4, ease: "none", immediateRender: false }, ${r1(11.2 + i * 1.4)});`).join("\n    ")}
    tl.to("#${s}-ring", { opacity: .45, duration: .6, yoyo: true, repeat: 5, ease: "sine.inOut" }, 12.0);
    tl.fromTo("#${s}-nR", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 14.5);`;

  return { id: "insulate", html: scene("insulate", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
