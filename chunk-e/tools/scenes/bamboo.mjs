// E03 (30.4–41.2): the bamboo lifeline — Byrd plants 6 flagged bamboo sticks away from the hatch, a green dashed line links them back to the hut,
//   and he follows them home, flashlight in hand.
// VO (local = abs − 30.4): "So Byrd made himself a lifeline. (0.24–2.23) He pushed bamboo sticks into the snow (2.73) in a line leading away from the hut, (5.22)
//   so he could take short walks and follow them back. (7.44–9.93)"
import { C, r1, filters, rigInit, scene, life, walk } from "../lib.mjs";
import { KIT_CSS, tag, hide, breath } from "./kit.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";
import { bamboo, legs } from "./e5.mjs";

const G = 660, SX = [450, 650, 850, 1050, 1250, 1450];
export function build() {
  const s = "bb", p = "bb-by";
  const torchR = { side: "R", svg: `<g id="${p}-tR"><rect x="150" y="172" width="14" height="22" rx="3" fill="#475569" transform="rotate(-24 157 183)"/><polygon points="160,192 330,440 210,470" fill="#FDE68A" opacity=".38"/></g>` };
  const torchL = { side: "L", svg: `<g id="${p}-tL" opacity="0"><rect x="36" y="172" width="14" height="22" rx="3" fill="#475569" transform="rotate(24 43 183)"/><polygon points="40,192 -130,440 -10,470" fill="#FDE68A" opacity=".38"/></g>` };
  const body = `
    <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect width="1920" height="${G}" fill="#030508"/>${Array.from({ length: 60 }, (_, i) => `<circle cx="${(i * 409) % 1920}" cy="${(i * 137) % (G - 80)}" r="${1 + (i % 3) * 0.5}" fill="#E2E8F0" opacity=".4"/>`).join("")}
      <rect y="${G}" width="1920" height="${1080 - G}" fill="#334155"/><line x1="0" y1="${G}" x2="1920" y2="${G}" stroke="#94A3B8" stroke-width="3"/>
      <rect x="210" y="${G - 6}" width="80" height="10" rx="2" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="2"/><ellipse cx="250" cy="${G - 4}" rx="90" ry="20" fill="${E.lamp}" opacity=".5" filter="url(#${s}-soft)"/>
      <line x1="120" y1="${G}" x2="120" y2="${G - 220}" stroke="#94A3B8" stroke-width="6"/>
      <g id="${s}-life" opacity="0"><line x1="250" y1="${G + 10}" x2="${SX[5]}" y2="${G + 10}" stroke="#22C55E" stroke-width="6" stroke-dasharray="18 12" filter="url(#${s}-glow)"/></g>
      ${SX.map((x, i) => `<g id="${s}-s${i}w">${bamboo(`${s}-s${i}`, x, G)}</g>`).join("")}
      <g id="${s}-bpos"><g transform="translate(${-100 * 1.0} ${-265 * 1.0})">${byrd(p, s, { outfit: "anorak", props: [torchR, torchL] })}</g></g>
    </svg>
    ${tag(s + "-hatch", "ADVANCE BASE HATCH", 192, 720)}
    <div id="${s}-ok" class="ui k-lab" style="left:560px; width:800px; top:180px;"><div class="k-ok">✓ BAMBOO STICK LIFELINE · PATH BACK TO THE HUT</div></div>`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 10.8, { every: 3.0 })}
    ${breath(p, 0.4, 10.6)}
    ${hide(s + "-ok", s + "-hatch")}
    tl.set("#${s}-bpos", { x: 330, y: ${G} }, 0);
    tl.set("#${p}-armR", { rotation: -92 }, 0.02);
    tl.fromTo("#${s}-hatch", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 0.4);
    // planting: walk to each spot, push the stick down into the snow
    ${SX.map((x, i) => { const t = r1(2.7 + i * 0.75); return `tl.to("#${s}-bpos", { x: ${x - 60}, duration: .45, ease: "power1.inOut" }, ${t});
    tl.fromTo("#${s}-s${i}w", { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: .2, ease: "power3.in", immediateRender: false }, ${r1(t + 0.45)});`; }).join("\n    ")}
    ${legs(p, 2.7, 7.2, 0.25, 14)}
    tl.fromTo("#${s}-life", { opacity: 0, scaleX: 0, svgOrigin: "250 ${G}" }, { opacity: 1, scaleX: 1, svgOrigin: "250 ${G}", duration: .8, ease: "power2.out", immediateRender: false }, 7.0);
    tl.fromTo("#${s}-ok", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 7.3);
    // and back along the sticks toward the hatch, the torch now in the left hand
    tl.set("#${p}-tR", { opacity: 0 }, 7.6); tl.set("#${p}-tL", { opacity: 1 }, 7.6);
    tl.to("#${p}-armR", { rotation: 0, duration: .25 }, 7.6); tl.to("#${p}-armL", { rotation: 92, duration: .25 }, 7.6);
    tl.to("#${s}-bpos", { x: 560, duration: 2.9, ease: "power1.inOut" }, 7.8);
    ${legs(p, 7.8, 10.7, 0.29, 14)}`;

  return { id: "bamboo", html: scene("bamboo", { css: KIT_CSS + E3_CSS, body, js, bg: "#030508" }) };
}
