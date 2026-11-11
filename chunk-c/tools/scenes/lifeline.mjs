// C02 (26.6–40.4): the only lifeline — radio set + telegraph key; a signal arcs 123 miles to the rest of humanity; "it starts with the hut";
//   the 7-part board lights Part 2 and the camera dives into card 2 (Scene C03 opens on that card — hard cut).
// VO (local = abs − 26.6): "From this moment, (0.19) the only connection to the rest of humanity (1.38) was a radio set (3.65) and a telegraph key.
//   (4.97–6.02) So what does it actually take to survive alone through the Antarctic night? (6.72–10.61) It starts with the hut. (11.10–12.26) [+0.7]"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, cutaway, byrd } from "./e3.mjs";

const G = 300, SC = 0.62, TX = -120, TY = r1(420 - G * SC), RX = 700;
const cam = (sc, wx, wy, cx = 960, cy = 540) => ({ scale: sc, x: r1(cx - wx * sc), y: r1(cy - wy * sc) });
const MX = (i) => 192 + i * 226;
export function build() {
  const s = "ll", p = "ll-by";
  const seated = `<g transform="translate(${300 - 100 * 0.75} ${r1(320 - 265 * 0.75)}) scale(.75)">${byrd(p, s, { outfit: "sweater" })}</g>`;
  const world = cutaway(s, G, { rx: RX, inRoom: seated, seed: 8 });
  const ant = [r1(TX + 1720 * SC), r1(TY + (G - 240) * SC)];
  const RCV = [1700, 420];
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0; background:${E.night};">
      <div id="${s}-cam" style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0;">
        <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>${world}</svg></div>
      <svg class="stage" viewBox="0 0 1920 1080">
        <g id="${s}-rcv"><line x1="${RCV[0]}" y1="${RCV[1]}" x2="${RCV[0]}" y2="${RCV[1] - 120}" stroke="#94A3B8" stroke-width="5"/>
          <rect x="${RCV[0] - 60}" y="${RCV[1] - 36}" width="120" height="36" fill="#334155"/><rect x="${RCV[0] - 44}" y="${RCV[1] - 26}" width="18" height="14" fill="${E.lamp}"/><rect x="${RCV[0] + 26}" y="${RCV[1] - 26}" width="18" height="14" fill="${E.lamp}"/>
          <circle cx="${RCV[0]}" cy="${RCV[1] - 124}" r="9" fill="${C.cyan}"/></g>
        <g id="${s}-wave"><path id="${s}-arc" d="M${ant[0]} ${ant[1]} Q${r1((ant[0] + RCV[0]) / 2)} 40 ${RCV[0]} ${RCV[1] - 124}" pathLength="100" fill="none" stroke="${C.cyan}" stroke-width="6" stroke-dasharray="100 100" stroke-dashoffset="100" filter="url(#${s}-glow)"/></g>
      </svg>
      ${tag(s + "-t1", "1. VACUUM-TUBE RADIO", 260, 760)}${tag(s + "-t2", "2. TELEGRAPH KEY (MORSE CODE)", 260, 840)}
      ${tag(s + "-hum", "REST OF HUMANITY · 123 MI", 1290, 460)}
      <div id="${s}-grid" style="position:absolute; inset:0; ${BLUEPRINT_CSS} background-color:transparent; opacity:0;"></div></div>
    <div id="${s}-S2" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">
      <svg class="stage" viewBox="0 0 1920 1080"><line x1="${MX(0) + 90}" y1="590" x2="${MX(6) + 90}" y2="590" stroke="#475569" stroke-width="6" stroke-dasharray="18 14"/></svg>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<div id="${s}-m${i}" class="e-mono" style="left:${MX(i)}px; top:400px;${i === 0 ? ` color:${C.cyan}; border-color:${C.cyan};` : ""}">${i + 1}</div>`).join("")}
    </div>`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 12.3, { every: 3.0 })}
    tl.set("#${p}-armR", { rotation: -12 }, 0.02); tl.set("#${p}-foreR", { rotation: 0 }, 0.02);
    ${hide(s + "-S2", s + "-t1", s + "-t2", s + "-hum", s + "-rcv")}
    tl.set("#${s}-snowcover", { opacity: .12 }, 0);
    tl.set("#${s}-cam", { scale: ${SC}, x: ${TX}, y: ${TY}, transformOrigin: "0 0" }, 0);
    // tapping the key: the signal leaves the antenna and arcs 123 miles to the rest of humanity
    ${Array.from({ length: 12 }, (_, i) => `tl.to("#${p}-foreR", { rotation: ${i % 2 ? 0 : -7}, svgOrigin: "142 147", duration: .1, ease: "none" }, ${r1(1.2 + i * 0.22 + (i % 4 === 3 ? 0.15 : 0))});`).join("\n    ")}
    tl.to("#${s}-dial", { opacity: .95, duration: .3, yoyo: true, repeat: 9, ease: "sine.inOut" }, 1.0);
    tl.fromTo("#${s}-rcv", { opacity: 0 }, { opacity: 1, duration: .3, immediateRender: false }, 1.4);
    tl.to("#${s}-arc", { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 1.5);
    tl.to("#${s}-wave", { opacity: .4, duration: .4, yoyo: true, repeat: 9, ease: "sine.inOut" }, 3.2);
    tl.fromTo("#${s}-hum", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 3.0);
    tl.fromTo("#${s}-t1", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 3.7);
    tl.fromTo("#${s}-t2", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 5.0);
    // "So what does it take…": slow push; "It starts with the hut": the camera dives into the buried box, blueprint grid over the ice
    tl.to("#${s}-cam", { scale: .7, x: ${r1(TX - 60)}, y: ${r1(TY - 30)}, duration: 4.3, ease: "sine.inOut" }, 6.7);
    tl.to(["#${s}-t1", "#${s}-t2", "#${s}-hum", "#${s}-wave", "#${s}-rcv"], { opacity: 0, duration: .25 }, 10.8);
    tl.to("#${s}-cam", { ...${JSON.stringify(cam(1.9, RX + 260, G + 176))}, duration: 1.0, ease: "power3.inOut" }, 11.1);
    tl.to("#${s}-grid", { opacity: .9, duration: .5 }, 11.6);
    // the 7-part board: Part 2 lights, dive into card 2
    tl.set("#${s}-S2", { opacity: 1 }, 12.4);
    tl.set("#${s}-S1", { opacity: 0 }, 12.4);
    tl.to("#${s}-m1", { color: "${C.cyan}", borderColor: "${C.cyan}", boxShadow: "0 0 40px ${C.cyan}", duration: .15 }, 12.6);
    tl.to("#${s}-m0", { boxShadow: "0 0 24px ${C.cyan}", duration: .15 }, 12.5);
    tl.to("#${s}-S2", { scale: 7.5, x: ${r1(960 - MX(1) - 90)}, y: -50, transformOrigin: "${r1(((MX(1) + 90) / 1920) * 100)}% ${r1((590 / 1080) * 100)}%", duration: .55, ease: "power3.in" }, 13.1);`;

  return { id: "lifeline", html: scene("lifeline", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
