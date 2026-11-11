// F03 (43.3–60.2): Part 4 — the board lights card 4, which docks; X-ray of the stove and its pipe up through the snow roof: the exhaust is supposed to
//   leave through the pipe (green arrows up and out).
// VO (local = abs − 43.3): "Part four. (0.28) The invisible killer. (1.52) The third problem was the one he couldn't see. (3.05–5.77) To stay alive in that hut,
//   Byrd needed heat. (6.37–9.37) The heat came from the oil stove. (9.89–11.73) And the stove's fumes were supposed to leave through a pipe running up through
//   the snow. (12.30–16.41)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, pill, tag, hide } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, cutaway, byrd } from "./e3.mjs";
import { board, MX } from "./e5.mjs";

const G = 300, RX = 700, RY = G + 16;
const cam = (sc, wx, wy, cx = 960, cy = 540) => ({ scale: sc, x: r1(cx - wx * sc), y: r1(cy - wy * sc) });
export function build() {
  const s = "kl", p = "kl-by";
  const me = `<g transform="translate(${190 - 100 * 0.75} ${r1(320 - 265 * 0.75)}) scale(.75)">${byrd(p, s, { outfit: "sweater" })}</g>`;
  const px = RX + 262, arrows = [0, 1, 2, 3].map((i) => `<polygon class="${s}-ar" points="${px - 10},${RY + 200 - i * 80} ${px},${RY + 180 - i * 80} ${px + 10},${RY + 200 - i * 80}" fill="#22C55E"/>`).join("");
  const body = `
    <div id="${s}-B" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">${board(s, 3)}</div>
    <div id="${s}-X" style="position:absolute; inset:0; background:${E.night};">
      <div id="${s}-cam" style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
        ${cutaway(s, G, { rx: RX, inRoom: me, seed: 26 })}
        <g id="${s}-path" opacity="0"><line x1="${px}" y1="${RY + 210}" x2="${px}" y2="${G - 120}" stroke="#22C55E" stroke-width="4" stroke-dasharray="10 8"/>
          <g id="${s}-flow">${arrows}</g><path d="M${px} ${G - 120} q30 -40 0 -80 q-30 -40 0 -80" fill="none" stroke="#22C55E" stroke-width="4" stroke-dasharray="10 8"/></g>
      </svg></div>
      ${tag(s + "-t1", "INTENDED EXHAUST PATH ↑", 1060, 200)}${tag(s + "-t2", "SUPPOSED TO LEAVE THROUGH THE PIPE", 1060, 280)}${tag(s + "-heat", "HEAT = THE OIL STOVE", 300, 860)}</div>
    <div id="${s}-dock" class="ui k-dock"><span class="n">PART 4</span>THE INVISIBLE KILLER</div>
    ${pill(s + "-prob", "PROBLEM #3: CARBON MONOXIDE", "", { top: 196 })}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 6.0, 16.9, { every: 3.0 })}
    ${hide(s + "-X", s + "-dock", s + "-prob", s + "-t1", s + "-t2", s + "-heat")}
    tl.to("#${s}-m3", { color: "${C.cyan}", borderColor: "${C.cyan}", boxShadow: "0 0 40px ${C.cyan}", duration: .15 }, 0.3);
    tl.to("#${s}-m3", { scale: 1.25, duration: .25, ease: "back.out(2)" }, 0.45);
    tl.to("#${s}-m3", { x: ${-MX(3) - 60}, y: -330, scale: .25, opacity: 0, duration: .45, ease: "power3.in" }, 1.2);
    tl.fromTo("#${s}-dock", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1.08, x: 0, duration: .17, ease: "power2.out", immediateRender: false }, 1.55);
    tl.to("#${s}-dock", { scale: 1, duration: .1 }, 1.72);
    tl.fromTo("#${s}-prob", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 3.1);
    // X-ray of the stove and its pipe
    tl.set("#${s}-X", { opacity: 1 }, 6.3);
    tl.set("#${s}-B", { opacity: 0 }, 6.3);
    tl.set("#${s}-snowcover", { opacity: .12 }, 0);
    tl.set("#${s}-cam", { ...${JSON.stringify(cam(1.0, 960, 460))}, transformOrigin: "0 0" }, 0);
    tl.to("#${s}-cam", { ...${JSON.stringify(cam(1.55, px, 380))}, duration: 3.2, ease: "power2.inOut" }, 6.5);
    tl.to("#${s}-stoveglow", { opacity: .7, duration: .5, yoyo: true, repeat: 9, ease: "sine.inOut" }, 9.9);
    tl.fromTo("#${s}-heat", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 10.0);
    tl.to("#${s}-path", { opacity: 1, duration: .3 }, 12.3);
    tl.fromTo("#${s}-flow", { y: 60 }, { y: -20, duration: .8, repeat: 5, ease: "none", immediateRender: false }, 12.3);
    tl.fromTo("#${s}-t1", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 12.6);
    tl.fromTo("#${s}-t2", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 14.6);`;

  return { id: "killer", html: scene("killer", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
