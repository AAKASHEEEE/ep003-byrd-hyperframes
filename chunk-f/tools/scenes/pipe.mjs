// F04 (60.2–88.0): the pipe ices shut — macro of the stovepipe through the −60°F snow roof: warm damp air rises, ice layers 1→2→3 grow inward until the
//   pipe is ~85% blocked; pull back inside the hut: air vents blocked, source #2 = the gasoline generator ON THE FLOOR (wired to the radio battery);
//   CO curls down out of the pipe joint and the generator.
// VO (local = abs − 60.2): "But in Antarctica, that pipe had a problem. (0.15–2.71) Warm, damp air from inside rose into the cold pipe, (3.25) and the moisture
//   froze. (7.00–8.28) Ice built up, (8.78) layer by layer, (9.95) until the pipe was partly blocked. (11.31–13.02) The same thing happened to the exhaust and the
//   air vents. (13.88–16.91) And there was a second source of fumes: (17.12) the small gasoline engine that charged the batteries for his radio. (19.38–22.84)
//   What was leaking back into the hut was carbon monoxide. (23.44–26.69) [+0.8]"
import { C, r1, filters, rigInit, scene, life, shiver } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { E, E3_CSS, room, byrd } from "./e3.mjs";

const PX = 960, PW = 220, RS = 2.2, RXs = 388, RYs = 188;
export function build() {
  const s = "pp", p = "pp-by";
  const L = PX - PW / 2, R = PX + PW / 2;
  // ice layers grow inward from both walls in the snow-roof band (y 400–600)
  const layer = (i, d) => `<g id="${s}-ice${i}" opacity="0"><polygon points="${L},400 ${L + d},440 ${L + d * 0.8},500 ${L + d},560 ${L},600" fill="#7DD3FC" opacity="${0.55 + i * 0.15}" stroke="#E0F2FE" stroke-width="3"/>
      <polygon points="${R},400 ${R - d},440 ${R - d * 0.8},500 ${R - d},560 ${R},600" fill="#7DD3FC" opacity="${0.55 + i * 0.15}" stroke="#E0F2FE" stroke-width="3"/></g>`;
  const warm = [0, 1, 2].map((i) => `<path class="${s}-wa" d="M${PX - 40 + i * 40} 900 q14 -20 0 -40 q-14 -20 0 -40 q14 -20 0 -40" fill="none" stroke="${E.lamp}" stroke-width="7" stroke-linecap="round"/>`).join("");
  const sx = (x) => r1(x * RS + RXs), sy = (y) => r1(y * RS + RYs);
  const co = (id, x, y) => [[0, 0, 26], [22, -14, 20], [-20, -10, 18], [10, 18, 22]].map(([dx, dy, r], i) => `<circle class="${id}" cx="${x + dx}" cy="${y + dy}" r="${r}" fill="${i % 2 ? E.haze : E.co}" opacity=".6" filter="url(#${s}2-soft)"/>`).join("");
  const body = `
    <div id="${s}-M" style="position:absolute; inset:0; background:#0B1222;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect width="1920" height="400" fill="#050811"/><rect y="400" width="1920" height="200" fill="#8193AD"/>${[430, 470, 510, 550].map((y) => `<path d="M0 ${y} Q960 ${y - 10} 1920 ${y}" fill="none" stroke="#9AAAC2" stroke-width="3"/>`).join("")}
      <rect y="600" width="1920" height="480" fill="${E.pine}"/>${[650, 720, 790, 860, 930, 1000].map((y) => `<line x1="0" y1="${y}" x2="1920" y2="${y}" stroke="${E.pineDk}" stroke-width="4"/>`).join("")}
      <rect x="${L}" y="0" width="${PW}" height="1080" fill="#94A3B8" opacity=".22"/><rect x="${L - 10}" y="0" width="10" height="1080" fill="#CBD5E1"/><rect x="${R}" y="0" width="10" height="1080" fill="#CBD5E1"/>
      <g id="${s}-warm">${warm}</g>
      ${layer(0, 34)}${layer(1, 64)}${layer(2, 94)}
    </svg>
      ${tag(s + "-snow", "−60°F SNOW ROOF", 1180, 470)}${tag(s + "-damp", "WARM, DAMP AIR ↑", 1180, 820)}
      ${tag(s + "-l1", "ICE LAYER 1", 380, 430)}${tag(s + "-l2", "ICE LAYER 2", 380, 500)}${tag(s + "-l3", "ICE LAYER 3", 380, 570)}
      <div id="${s}-blk" class="ui" style="left:0; right:0; top:160px; display:flex; justify-content:center;"><div class="ui-warn">⚠ PIPE PARTLY BLOCKED (~85%)</div></div></div>
    <div id="${s}-H" style="position:absolute; inset:0; background:${E.pineDk};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "2")}</defs>
      <g transform="translate(${RXs} ${RYs}) scale(${RS})">${room(s + "2", { pipeTop: 0 })}
        ${[[176, 20], [470, 20]].map(([x, y], i) => `<g><rect x="${x}" y="${y}" width="34" height="18" fill="#475569" stroke="#1F2937" stroke-width="2"/>${[0, 1, 2].map((j) => `<line x1="${x + 4}" y1="${y + 4 + j * 5}" x2="${x + 30}" y2="${y + 4 + j * 5}" stroke="#1F2937" stroke-width="1.5"/>`).join("")}</g>`).join("")}
        <path id="${s}-wire" d="M488 282 Q470 250 430 262 L400 262" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="5 4" opacity="0"/>
        <g transform="translate(${170 - 100 * 0.78} ${r1(320 - 265 * 0.78)}) scale(.78)">${byrd(p, s + "2", { outfit: "sweater" })}</g></g>
      <ellipse id="${s}-spot" cx="${sx(488)}" cy="${sy(305)}" rx="120" ry="70" fill="#FFF7E0" opacity="0" filter="url(#${s}2-soft)"/>
      <g id="${s}-coA" opacity="0">${co(s + "-c1", sx(262), sy(154))}</g><g id="${s}-coB" opacity="0">${co(s + "-c2", sx(488), sy(285))}</g>
    </svg>
      ${tag(s + "-v1", "✕ AIR VENT BLOCKED", 520, 120)}${tag(s + "-v2", "✕ AIR VENT BLOCKED", 1300, 120)}
      ${tag(s + "-gen", "SOURCE #2: GASOLINE RADIO GENERATOR (FLOOR)", 860, 960)}
      <div id="${s}-co" class="ui" style="left:0; right:0; top:200px; display:flex; justify-content:center;"><div class="ui-warn">⚠ CARBON MONOXIDE (CO) LEAKING INTO THE HUT</div></div></div>`;

  const js = `
    ${rigInit(p)}
    ${life(p, 14.0, 27.8, { every: 3.0 })}
    ${hide(s + "-H", s + "-snow", s + "-damp", s + "-l1", s + "-l2", s + "-l3", s + "-blk", s + "-v1", s + "-v2", s + "-gen", s + "-co")}
    tl.fromTo("#${s}-snow", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 0.6);
    // warm damp air rises and freezes on the walls, layer by layer
    tl.fromTo("#${s}-warm", { y: 80 }, { y: -320, duration: 2.4, repeat: 3, ease: "none", immediateRender: false }, 3.2);
    tl.fromTo("#${s}-damp", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 3.4);
    ${[[0, 7.1], [1, 8.8], [2, 10.0]].map(([i, t]) => `tl.fromTo("#${s}-ice${i}", { opacity: 0, scaleX: .2, svgOrigin: "${PX} 500" }, { opacity: 1, scaleX: 1, svgOrigin: "${PX} 500", duration: .8, ease: "power2.out", immediateRender: false }, ${t});
    tl.fromTo("#${s}-l${i + 1}", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .22, immediateRender: false }, ${t});`).join("\n    ")}
    tl.to("#${s}-warm", { opacity: .3, duration: .6 }, 11.0);
    tl.fromTo("#${s}-blk", { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: .18, ease: "power2.in", immediateRender: false }, 11.4);
    // pull back into the hut: vents blocked; the second source is the generator on the floor
    tl.set("#${s}-H", { opacity: 1 }, 13.8);
    tl.set("#${s}-M", { opacity: 0 }, 13.8);
    tl.fromTo("#${s}-H", { scale: 1.3 }, { scale: 1, transformOrigin: "50% 30%", duration: .6, ease: "power2.out", immediateRender: false }, 13.8);
    tl.fromTo("#${s}-v1", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 15.2);
    tl.fromTo("#${s}-v2", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 15.6);
    tl.to("#${s}-spot", { opacity: .55, duration: .3 }, 19.4);
    tl.to("#${s}-wire", { opacity: 1, duration: .3 }, 20.6);
    tl.fromTo("#${s}-gen", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 19.5);
    ${Array.from({ length: 16 }, (_, i) => `tl.to("#${s}2-room", { x: ${i % 2 ? 0.6 : -0.6}, duration: .08, ease: "none" }, ${r1(19.5 + i * 0.1)});`).join("\n    ")}
    // CO leaks back in: from the pipe joint and the generator
    tl.to(["#${s}-v1", "#${s}-v2"], { opacity: 0, duration: .25 }, 23.2);
    ${["A", "B"].map((k, i) => `tl.fromTo("#${s}-co${k}", { opacity: 0, scale: .4, x: 0, y: 0, svgOrigin: "${i ? sx(488) : sx(262)} ${i ? sy(285) : sy(154)}" }, { opacity: 1, scale: 2.6, x: ${i ? -160 : -120}, y: ${i ? -80 : 140}, svgOrigin: "${i ? sx(488) : sx(262)} ${i ? sy(285) : sy(154)}", duration: 3.6, ease: "sine.out", immediateRender: false }, ${r1(23.5 + i * 0.4)});`).join("\n    ")}
    tl.fromTo("#${s}-co", { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: .18, ease: "power2.in", immediateRender: false }, 24.0);
    ${shiver(p, 25.0, 27.5, 2)}`;

  return { id: "pipe", html: scene("pipe", { css: KIT_CSS + E3_CSS, body, js, bg: "#0B1222" }) };
}
