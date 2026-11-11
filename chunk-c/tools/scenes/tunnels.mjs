// C06 (88.4–104.4): full Advance Base cutaway — roof hatch + ladder (Byrd climbs down rung by rung), the fuel tunnel and the food tunnel light up:
//   "his pantry and his gas station were walls of ice". Last frame hands off to Chunk D's interior tour.
// VO (local = abs − 88.4): "The only way in or out (0.23) was a hatch in the roof (2.21) and a short ladder. (3.79–4.79) Leading off from the hut, (5.21)
//   Byrd had tunnels dug into the snow — (6.88) one stacked with fuel, (9.37) one stacked with food. (11.01–12.21) His pantry and his gas station were
//   walls of ice. (12.65–15.59)"
import { C, r1, filters, rigInit, scene } from "../lib.mjs";
import { KIT_CSS, tag, box, hide } from "./kit.mjs";
import { E, E3_CSS, cutaway, byrd } from "./e3.mjs";

const G = 300, RX = 700, RY = G + 16, K = 0.7;
export function build() {
  const s = "tn", p = "tn-by";
  const climber = `<g id="${s}-climb"><g transform="translate(${36 - 100 * K} 0) scale(${K})">${byrd(p, s, { outfit: "anorak" })}</g></g>`;
  const world = cutaway(s, G, { rx: RX, inRoom: climber, seed: 22 });
  const beam = (id, x, w, dir) => `<g id="${s}-${id}" opacity="0"><polygon points="${x},${RY + 230} ${x + dir * w},${RY + 160} ${x + dir * w},${RY + 330} ${x},${RY + 290}" fill="${E.lamp}" opacity=".32" filter="url(#${s}-soft)"/></g>`;
  const frost = Array.from({ length: 16 }, (_, i) => { const x = i < 8 ? RX - 420 + i * 50 : RX + 560 + (i - 8) * 50; return `<path d="M${x} ${RY + 158} l5 10 l5 -10 l-5 -6 z" fill="#E0F2FE"/>`; }).join("");
  const body = `
    <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      ${world}
      ${beam("bL", RX, 440, -1)}${beam("bR", RX + 520, 440, 1)}
      ${[RX - 6, RX + 526].map((x, i) => `<g id="${s}-lan${i}" opacity="0"><line x1="${x}" y1="${RY + 200}" x2="${x}" y2="${RY + 222}" stroke="#1F2937" stroke-width="3"/><rect x="${x - 9}" y="${RY + 222}" width="18" height="24" rx="4" fill="${E.lamp}"/><circle cx="${x}" cy="${RY + 234}" r="22" fill="${E.lamp}" opacity=".45" filter="url(#${s}-soft)"/></g>`).join("")}
      <g id="${s}-frost" opacity="0">${frost}</g>
      <g id="${s}-hl" opacity="0"><rect x="${RX + 6}" y="${G - 12}" width="74" height="22" rx="4" fill="none" stroke="${C.gold}" stroke-width="5"/><rect x="${RX + 10}" y="${RY}" width="52" height="320" rx="6" fill="none" stroke="${C.gold}" stroke-width="4" stroke-dasharray="10 8"/></g>
    </svg>
    ${tag(s + "-hatch", "ONLY WAY IN OR OUT: ROOF HATCH & LADDER", 192, 880)}
    ${tag(s + "-fuel", "LEFT TUNNEL: FUEL (“HIS GAS STATION”)", 192, 700)}
    ${tag(s + "-food", "RIGHT TUNNEL: FOOD (“HIS PANTRY”)", 1130, 760)}
    ${box(s + "-walls", `WALLS OF ICE = <span style="color:${C.gold};">PANTRY</span> &amp; <span style="color:${C.gold};">GAS STATION</span>`, 880)}`;

  // climbing down: alternate arms and legs per rung, body steps down 40 px (one rung) at a time
  const steps = 7, t0 = 2.3, dt = 0.4, yTop = -200, yEnd = r1(320 - 265 * K);
  const climb = Array.from({ length: steps }, (_, i) => { const t = r1(t0 + i * dt), y = r1(yTop + ((yEnd - yTop) * (i + 1)) / steps), a = i % 2;
    return `tl.to("#${s}-climb", { y: ${y}, duration: ${dt}, ease: "power1.inOut" }, ${t});
    tl.to("#${p}-armL", { rotation: ${a ? 168 : 146}, duration: ${dt}, ease: "sine.inOut" }, ${t}); tl.to("#${p}-armR", { rotation: ${a ? -146 : -168}, duration: ${dt}, ease: "sine.inOut" }, ${t}); tl.to(["#${p}-foreL", "#${p}-foreR"], { rotation: ${a ? 12 : -12}, duration: ${dt} }, ${t});
    tl.to("#${p}-legL", { rotation: ${a ? -18 : 0}, duration: ${dt} }, ${t}); tl.to("#${p}-legR", { rotation: ${a ? 0 : 18}, duration: ${dt} }, ${t});`; }).join("\n    ");
  const js = `
    ${rigInit(p)}
    tl.set("#${s}-snowcover", { opacity: .12 }, 0);
    tl.set("#${s}-climb", { y: ${yTop} }, 0);
    tl.set("#${p}-armL", { rotation: 150 }, 0.02); tl.set("#${p}-armR", { rotation: -150 }, 0.02);
    ${hide(s + "-hatch", s + "-fuel", s + "-food", s + "-walls")}
    // the hatch and the ladder
    tl.to("#${s}-hl", { opacity: 1, duration: .25 }, 0.3);
    tl.fromTo("#${s}-hatch", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 0.4);
    ${climb}
    tl.to(["#${p}-armL", "#${p}-armR", "#${p}-legL", "#${p}-legR"], { rotation: 0, duration: .3 }, ${r1(t0 + steps * dt)});
    tl.to("#${s}-hl", { opacity: 0, duration: .3 }, 5.3);
    tl.to("#${s}-hatch", { opacity: 0, duration: .25 }, 6.6);
    // the two tunnels light up
    tl.set("#${s}-lan0", { opacity: 1 }, 9.3);
    tl.fromTo("#${s}-bL", { opacity: 0, scaleX: 0, svgOrigin: "${RX} ${RY + 260}" }, { opacity: 1, scaleX: 1, svgOrigin: "${RX} ${RY + 260}", duration: .5, ease: "power2.out", immediateRender: false }, 9.4);
    tl.fromTo("#${s}-fuel", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 9.6);
    tl.set("#${s}-lan1", { opacity: 1 }, 10.95);
    tl.fromTo("#${s}-bR", { opacity: 0, scaleX: 0, svgOrigin: "${RX + 520} ${RY + 260}" }, { opacity: 1, scaleX: 1, svgOrigin: "${RX + 520} ${RY + 260}", duration: .5, ease: "power2.out", immediateRender: false }, 11.05);
    tl.fromTo("#${s}-food", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 11.25);
    // "walls of ice": frost glints along both tunnel ceilings
    tl.to("#${s}-frost", { opacity: 1, duration: .3 }, 12.8);
    tl.to("#${s}-frost", { opacity: .4, duration: .4, yoyo: true, repeat: 5, ease: "sine.inOut" }, 13.2);
    tl.fromTo("#${s}-walls", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 12.9);`;

  return { id: "tunnels", html: scene("tunnels", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
