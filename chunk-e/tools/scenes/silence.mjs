// E05 (69.6–83.6): total silence — extreme close-up on Byrd's eyes in the black; each breath puff ripples a cyan sound ring across the screen;
//   pull back: the only shelter could be ten steps away, or a hundred.
// VO (local = abs − 69.6): "Now imagine that moment. (0.21) Total silence. (2.08–3.10) [+0.7] Your own breathing is the loudest thing on the continent.
//   (4.29–6.88) And somewhere out there, (7.37) maybe ten steps away, (8.79) maybe a hundred, (10.46) is the only shelter you have. (11.66–13.21)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";

const K = 4.2, HX = 960, HY = 470, G = 860;
export function build() {
  const s = "sl", p = "sl-by", q = "sl-b2";
  const puffs = [4.4, 5.5, 6.5];
  const hatch = (id, x, y, k) => `<g id="${id}" opacity="0"><rect x="${x - 40 * k}" y="${y - 6 * k}" width="${80 * k}" height="${12 * k}" rx="3" fill="none" stroke="${E.lamp}" stroke-width="3" stroke-dasharray="8 6"/>
      <text x="${x}" y="${y - 30 * k}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="${r1(28 + 14 * k)}" fill="${E.lamp}" opacity=".8">?</text></g>`;
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0; background:#030508;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      ${puffs.map((_, i) => `<circle id="${s}-ring${i}" cx="${HX}" cy="${HY + 110}" r="80" fill="none" stroke="${C.cyan}" stroke-width="6" opacity="0"/>`).join("")}
      <g transform="translate(${HX - 100 * K} ${HY - 64 * K}) scale(${K})">${byrd(p, s, { outfit: "anorak" })}</g>
      ${puffs.map((_, i) => `<circle id="${s}-puff${i}" cx="${HX + 90}" cy="${HY + 120}" r="40" fill="#E2E8F0" opacity="0"/>`).join("")}
    </svg></div>
    <div id="${s}-S2" style="position:absolute; inset:0; background:#030508;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "2")}</defs>
      <rect y="600" width="1920" height="480" fill="#0F172A"/><line x1="0" y1="600" x2="1920" y2="600" stroke="#334155" stroke-width="2"/>
      ${hatch(s + "-near", 980, 760, 1.4)}${hatch(s + "-far", 1520, 630, .5)}
      <g transform="translate(${330 - 100 * 1.1} ${G - 265 * 1.1}) scale(1.1)">${byrd(q, s + "2", { outfit: "anorak", props: [{ side: "R", svg: `<g><rect x="150" y="172" width="14" height="22" rx="3" fill="#475569" transform="rotate(-24 157 183)"/><polygon points="160,192 330,440 210,470" fill="#FDE68A" opacity=".3"/></g>` }] })}</g>
    </svg>${tag(s + "-t10", "? 10 STEPS AWAY ?", 880, 820)}${tag(s + "-t100", "? 100 STEPS AWAY ?", 1380, 520)}</div>
    <div id="${s}-loud" class="ui k-lab" style="left:360px; width:1200px; top:880px;"><div style="background:rgba(11,16,30,.9); border:3px solid ${C.cyan}; color:${C.cyan};">THE LOUDEST THING ON THE CONTINENT: YOUR OWN BREATH</div></div>
    <div id="${s}-quiet" class="ui k-lab" style="left:460px; width:1000px; top:150px;"><div style="background:rgba(11,16,30,.9); border:2px solid #334155; color:#CBD5E1;">TOTAL SILENCE</div></div>
    <div id="${s}-only" class="ui" style="left:192px; top:108px;"><div class="ui-pill" style="position:relative;"><div class="dot"></div><span>THE ONLY SHELTER YOU HAVE</span></div></div>`;

  const js = `
    ${rigInit(p)}${"\n    "}${rigInit(q)}
    ${life(p, 0.4, 7.3, { every: 2.4 })}
    ${life(q, 7.4, 14.0, { every: 3.0 })}
    tl.set("#${q}-armR", { rotation: -92 }, 0.02);
    ${hide(s + "-S2", s + "-loud", s + "-quiet", s + "-only", s + "-t10", s + "-t100")}
    tl.fromTo("#${s}-S1", { scale: 1.08 }, { scale: 1, transformOrigin: "50% 45%", duration: 7.3, ease: "sine.out", immediateRender: false }, 0);
    tl.fromTo("#${s}-quiet", { opacity: 0 }, { opacity: 1, duration: .4, immediateRender: false }, 2.1);
    tl.to("#${s}-quiet", { opacity: 0, duration: .4 }, 3.9);
    // each breath: a puff hangs, a sound ring sweeps the whole frame
    ${puffs.map((t, i) => `tl.fromTo("#${s}-puff${i}", { opacity: .8, scale: .3, x: 0, y: 0, svgOrigin: "${HX + 90} ${HY + 120}" }, { opacity: 0, scale: 2.2, x: 120, y: -60, svgOrigin: "${HX + 90} ${HY + 120}", duration: 1.4, ease: "power1.out", immediateRender: false }, ${t});
    tl.fromTo("#${s}-ring${i}", { opacity: .9, scale: 1, svgOrigin: "${HX} ${HY + 110}" }, { opacity: 0, scale: 14, svgOrigin: "${HX} ${HY + 110}", duration: 1.6, ease: "power1.out", immediateRender: false }, ${t});`).join("\n    ")}
    tl.fromTo("#${s}-loud", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .3, immediateRender: false }, 4.6);
    tl.to("#${s}-loud", { opacity: 0, duration: .25 }, 7.2);
    // pull back: ten steps, or a hundred
    tl.set("#${s}-S2", { opacity: 1 }, 7.35);
    tl.set("#${s}-S1", { opacity: 0 }, 7.35);
    tl.fromTo("#${s}-near", { opacity: 0 }, { opacity: 1, duration: .4, immediateRender: false }, 8.8);
    tl.to("#${s}-near", { opacity: .35, duration: .5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 9.3);
    tl.fromTo("#${s}-t10", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 8.85);
    tl.fromTo("#${s}-far", { opacity: 0 }, { opacity: 1, duration: .4, immediateRender: false }, 10.5);
    tl.to("#${s}-far", { opacity: .35, duration: .5, yoyo: true, repeat: 3, ease: "sine.inOut" }, 11.0);
    tl.fromTo("#${s}-t100", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 10.55);
    tl.fromTo("#${s}-only", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 11.7);`;

  return { id: "silence", html: scene("silence", { css: KIT_CSS + E3_CSS, body, js, bg: "#030508" }) };
}
