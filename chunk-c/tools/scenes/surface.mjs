// C04 (61.0–71.0): from the outside — eye-level surface (hut hidden under opaque snow); 3 spotlights: antenna poles, wind pole, weather box.
//   Same surface layout as Chunk A (cutaway kit) for continuity; every pole/leg on GROUND_Y.
// VO (local = abs − 61.0): "From the outside, (0.21) all you could see were a few radio antenna poles, (1.63) a tall pole for measuring wind, (4.74)
//   and a small white box for the weather instruments. (7.03–9.51)"
import { C, r1, filters, scene, snow2 } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { E, E3_CSS, cutaway } from "./e3.mjs";

const G = 640;
export function build() {
  const s = "sf";
  const sn = snow2(s, 10, { far: 60, near: 16, seed: 41 });
  const spot = (id, x, w) => `<g id="${s}-${id}" opacity="0"><polygon points="${x - 40},0 ${x + 40},0 ${x + w},${G + 14} ${x - w},${G + 14}" fill="url(#${s}-cone)"/>
      <ellipse cx="${x}" cy="${G + 6}" rx="${w + 20}" ry="22" fill="#FFF7E0" opacity=".6" filter="url(#${s}-soft)"/></g>`;
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}${sn.defs}
      <linearGradient id="${s}-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF7E0" stop-opacity="0"/><stop offset="1" stop-color="#FFF7E0" stop-opacity=".42"/></linearGradient></defs>
      ${cutaway(s, G, { rx: 700, seed: 14 })}
      ${spot("sp1", 1590, 230)}${spot("sp2", 420, 120)}${spot("sp3", 1262, 110)}
      ${sn.far}${sn.near}
    </svg></div>
    ${tag(s + "-t1", "1. RADIO ANTENNA POLES", 1250, 220)}${tag(s + "-t2", "2. WIND POLE (ANEMOMETER)", 210, 280)}${tag(s + "-t3", "3. WEATHER INSTRUMENT BOX", 860, 340)}
    ${tag(s + "-out", "FROM THE OUTSIDE", 192, 108)}`;

  const js = `
    ${sn.js}
    ${hide(s + "-t1", s + "-t2", s + "-t3", s + "-out")}
    tl.to("#${s}-anem", { rotation: 1080, svgOrigin: "420 ${G - 210}", duration: 10, ease: "none" }, 0);
    tl.fromTo("#${s}-W", { scale: 1.06 }, { scale: 1, transformOrigin: "50% 60%", duration: 10, ease: "sine.out", immediateRender: false }, 0);
    tl.fromTo("#${s}-out", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 0.25);
    ${[[1, 2.9, "t1"], [2, 4.9, "t2"], [3, 7.4, "t3"]].map(([i, t, id]) => `tl.to("#${s}-sp${i}", { opacity: 1, duration: .25 }, ${t});
    tl.fromTo("#${s}-${id}", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, ${r1(t + 0.1)});`).join("\n    ")}
    tl.to(["#${s}-sp1", "#${s}-sp2"], { opacity: .35, duration: .4 }, 7.4);`;

  return { id: "surface", html: scene("surface", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
