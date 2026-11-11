// F01–F02 (0–43.3): the silence presses on you; three small problems inflate around him; the first two months in control (checklist), then
//   "the quietest danger" — END OF MAY 1934, hands to his temples, headache rings.
// VO (abs, pauses inserted): "He also discovered something people who have spent winters in Antarctica still talk about today. (0.22–6.13) The silence isn't
//   empty. (6.78) It presses on you. (8.81–9.87) Small problems grow huge. (10.38) A cold meal, (12.65) a stuck instrument, (13.86) a radio message that doesn't go
//   through — (15.37) any of them can ruin a whole day. (18.01–20.00) For the first two months, he managed. (20.64–22.80) His radio contacts with Little America
//   were regular. (23.27) His weather reports were steady. (26.56) He was lonely, but he was in control. (28.59–30.94) He wasn't freezing. (31.41) He wasn't lost.
//   (32.80–33.83) And that is exactly when the quietest danger arrived. (34.36–37.35) And then, at the end of May, (38.30–40.35) he started getting headaches.
//   (40.82–42.27) [+0.7]"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, badge, box, hide, bridge, bridgeJs } from "./kit.mjs";
import { E, E3_CSS, room, byrd } from "./e3.mjs";

const RS = 2.2, RXs = 388, RYs = 188;
export function build() {
  const s = "pr", p = "pr-by";
  const pencil = { side: "R", svg: `<line x1="152" y1="182" x2="170" y2="206" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"/>` };
  const icon = (i, x, y, inner, label) => `<div id="${s}-i${i}" style="position:absolute; left:${x - 80}px; top:${y - 80}px; width:160px; height:160px;">
      <svg width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="72" fill="#0B1222" stroke="#F8FAFC" stroke-width="5"/>${inner}</svg>
      <div class="tag" style="position:absolute; left:50%; top:166px; transform:translateX(-50%); font-size:24px; height:46px;">${label}</div></div>`;
  const plate = `<ellipse cx="80" cy="92" rx="50" ry="18" fill="#94A3B8"/><ellipse cx="80" cy="88" rx="34" ry="10" fill="#CBD5E1"/>${[[60, 80], [90, 76], [104, 86]].map(([x, y]) => `<polygon points="${x},${y - 12} ${x + 6},${y} ${x},${y + 12} ${x - 6},${y}" fill="#7DD3FC"/>`).join("")}`;
  const gear = `<circle cx="80" cy="80" r="34" fill="#B08D3C" stroke="#7A5F27" stroke-width="5"/>${Array.from({ length: 8 }, (_, i) => `<rect x="74" y="34" width="12" height="16" fill="#B08D3C" transform="rotate(${i * 45} 80 80)"/>`).join("")}<circle cx="80" cy="80" r="10" fill="#7A5F27"/><polygon points="104,52 112,66 98,62" fill="#7DD3FC"/>`;
  const radio = `<path d="M30 80 q12 -24 24 0 t24 0 t24 0 t24 0" fill="none" stroke="#22D3EE" stroke-width="5"/><path d="M58 58 l44 44 M102 58 l-44 44" stroke="${E.warn}" stroke-width="9" stroke-linecap="round"/>`;
  const checks = ["✓ RADIO REGULAR", "✓ WEATHER REPORTS STEADY", "✓ NOT FREEZING", "✓ NOT LOST"];
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0; background:${E.pineDk};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <g transform="translate(${RXs} ${RYs}) scale(${RS})">${room(s, { pipeTop: 0 })}
        <g transform="translate(${300 - 100 * 0.78} ${r1(320 - 265 * 0.78)}) scale(.78)">${byrd(p, s, { outfit: "sweater", props: [pencil] })}</g></g>
    </svg></div>
    <div id="${s}-wT" style="position:absolute; left:0; top:0; width:1920px; height:260px; background:linear-gradient(#1E293B, rgba(30,41,59,0));"></div>
    <div id="${s}-wL" style="position:absolute; left:0; top:0; width:360px; height:1080px; background:linear-gradient(90deg, #1E293B, rgba(30,41,59,0));"></div>
    <div id="${s}-wR" style="position:absolute; right:0; top:0; width:360px; height:1080px; background:linear-gradient(270deg, #1E293B, rgba(30,41,59,0));"></div>
    <div id="${s}-arrows" class="ui" style="left:0; right:0; top:0; height:1080px; font-family:'Archivo Black', sans-serif; font-size:64px; color:#94A3B8;">
      <span style="position:absolute; left:120px; top:500px;">→</span><span style="position:absolute; right:120px; top:500px;">←</span><span style="position:absolute; left:930px; top:30px;">↓</span></div>
    ${box(s + "-press", `THE SILENCE <span style="color:#94A3B8;">PRESSES ON YOU</span>`, 130)}
    ${icon(1, 300, 330, plate, "1. COLD MEAL")}${icon(2, 1520, 330, gear, "2. STUCK INSTRUMENT")}${icon(3, 1520, 720, radio, "3. FAILED RADIO MESSAGE")}
    <div id="${s}-list" class="ui" style="left:192px; top:280px; width:520px;">
      <div id="${s}-hd" style="font-family:'Archivo Black', sans-serif; font-size:32px; color:#6EE7B7; margin-bottom:14px;">APRIL – MAY: IN CONTROL</div>
      ${checks.map((c, i) => `<div id="${s}-c${i}" style="margin-bottom:12px; padding:12px 22px; border-radius:12px; background:rgba(11,16,30,.9); border-left:8px solid #22C55E; font-weight:800; font-size:30px; color:#F8FAFC;">${c}</div>`).join("")}</div>
    <div id="${s}-ache" class="ui" style="left:900px; top:180px;"><div class="ui-warn">HEADACHES</div></div>
    ${badge(s + "-b", "END OF MAY", "1934", { fs: 52 })}
    ${bridge(s, "e-last.png")}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 43.3, { every: 3.2 })}
    ${bridgeJs(s)}
    ${hide(s + "-wT", s + "-wL", s + "-wR", s + "-arrows", s + "-press", s + "-i1", s + "-i2", s + "-i3", s + "-list", s + "-hd", ...checks.map((_, i) => `${s}-c${i}`), s + "-ache", s + "-b")}
    tl.set("#${p}-armR", { rotation: -28 }, 0.02);
    // the silence presses in from three sides
    tl.fromTo("#${s}-wT", { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 1.4, ease: "power2.inOut", immediateRender: false }, 6.8);
    tl.fromTo("#${s}-wL", { opacity: 0, x: -260 }, { opacity: 1, x: 0, duration: 1.4, ease: "power2.inOut", immediateRender: false }, 6.8);
    tl.fromTo("#${s}-wR", { opacity: 0, x: 260 }, { opacity: 1, x: 0, duration: 1.4, ease: "power2.inOut", immediateRender: false }, 6.8);
    tl.fromTo("#${s}-arrows", { opacity: 0 }, { opacity: 1, duration: .4, immediateRender: false }, 7.4);
    tl.to("#${s}-W", { scale: .94, transformOrigin: "50% 60%", duration: 3.0, ease: "sine.inOut" }, 6.8);
    tl.fromTo("#${s}-press", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 8.85);
    tl.to(["#${s}-press", "#${s}-arrows"], { opacity: 0, duration: .25 }, 10.9);
    // small problems grow huge
    ${[[1, 12.65], [2, 13.86], [3, 15.37]].map(([i, t]) => `tl.fromTo("#${s}-i${i}", { opacity: 0, scale: .4 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(2)", immediateRender: false }, ${t});
    tl.to("#${s}-i${i}", { scale: 1.7, duration: 2.6, ease: "power1.in" }, ${r1(t + 0.3)});`).join("\n    ")}
    tl.to(["#${s}-i1", "#${s}-i2", "#${s}-i3", "#${s}-wT", "#${s}-wL", "#${s}-wR"], { opacity: 0, duration: .4 }, 20.2);
    tl.to("#${s}-W", { scale: 1, duration: .6 }, 20.2);
    // two months in control
    tl.fromTo("#${s}-list", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 20.6);
    tl.fromTo("#${s}-hd", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 20.7);
    ${[23.3, 26.6, 31.45, 32.85].map((t, i) => `tl.fromTo("#${s}-c${i}", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, ${t});`).join("\n    ")}
    ${Array.from({ length: 30 }, (_, i) => `tl.to("#${p}-foreR", { rotation: ${i % 2 ? -6 : 6}, svgOrigin: "142 147", duration: .2, ease: "sine.inOut" }, ${r1(22.0 + i * 0.4)});`).join("\n    ")}
    // the quietest danger
    tl.to("#${s}-list", { opacity: .2, duration: .6 }, 34.5);
    tl.fromTo("#${s}-b", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 39.3);
    tl.to("#${p}-armL", { rotation: 152, duration: .4, ease: "power2.out" }, 40.8); tl.to("#${p}-foreL", { rotation: 40, duration: .4 }, 40.8);
    tl.to("#${p}-armR", { rotation: -152, duration: .4, ease: "power2.out" }, 40.8); tl.to("#${p}-foreR", { rotation: -40, duration: .4 }, 40.8);
    tl.to("#${p}-lids", { scaleY: .5, duration: .3 }, 40.9);
    tl.to("#${p}-ache", { opacity: 1, duration: .2 }, 41.0);
    ${[0, 1, 2, 3, 4].map((i) => `tl.to("#${p}-ache", { scale: ${i % 2 ? 1 : 1.18}, svgOrigin: "100 50", duration: .38, ease: "sine.inOut" }, ${r1(41.1 + i * 0.4)});`).join("\n    ")}
    tl.fromTo("#${s}-ache", { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: .18, immediateRender: false }, 41.0);`;

  return { id: "press", html: scene("press", { css: KIT_CSS + E3_CSS, body, js, bg: E.pineDk }) };
}
