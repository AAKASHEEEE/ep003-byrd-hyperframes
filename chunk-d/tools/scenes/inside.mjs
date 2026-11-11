// D01 (0–11.5): push from Chunk C's cutaway into the 9 x 13 ft room; 5 cyan callouts (bunk, table, shelves, instruments, radio), then the room dims
//   and a golden spotlight lands on the most important object: the small oil-burning stove.
// VO (abs): "Inside, there was a bunk, (0.21–1.85) a table, (2.13) shelves, (3.12) the weather instruments, (4.13) the radio, (5.49) and the most important
//   object of all: (6.54–8.48) a small oil-burning stove. (8.95–11.10)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, tag, box, hide, bridge, bridgeJs } from "./kit.mjs";
import { E, E3_CSS, cutaway, byrd } from "./e3.mjs";

const G = 300, RX = 700, RY = G + 16, SC = 2.0, WX = 960, WY = 476;
const TX = r1(960 - WX * SC), TY = r1(540 - WY * SC);
export function build() {
  const s = "in", p = "in-by";
  const me = `<g transform="translate(${205 - 100 * 0.75} ${r1(320 - 265 * 0.75)}) scale(.75)">${byrd(p, s, { outfit: "sweater" })}</g>`;
  const hl = (id, x, y, w, h) => `<rect id="${s}-h${id}" x="${RX + x}" y="${RY + y}" width="${w}" height="${h}" rx="4" fill="none" stroke="${C.cyan}" stroke-width="2.4" opacity="0"/>`;
  const sx = (lx) => r1((RX + lx) * SC + TX), sy = (ly) => r1((RY + ly) * SC + TY);
  const body = `
    <div id="${s}-cam" style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0;">
      <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
        ${cutaway(s, G, { rx: RX, inRoom: me, seed: 22 })}
        ${hl(1, 66, 202, 140, 52)}${hl(2, 306, 244, 152, 20)}${hl(3, 326, 46, 132, 84)}${hl(4, 416, 222, 38, 32)}${hl(5, 350, 178, 70, 76)}
        <rect id="${s}-stoveB" x="${RX + 224}" y="${RY + 218}" width="76" height="104" rx="6" fill="none" stroke="${C.amber}" stroke-width="3" opacity="0"/>
      </svg></div>
    <div id="${s}-dim" style="position:absolute; inset:0; background:radial-gradient(circle at ${sx(262)}px ${sy(270)}px, rgba(3,5,8,0) 130px, rgba(3,5,8,.62) 260px);"></div>
    ${tag(s + "-t1", "1. BUNK", sx(70), sy(160))}${tag(s + "-t2", "2. TABLE", 1500, sy(280))}${tag(s + "-t3", "3. SHELVES", sx(330), sy(-10))}
    ${tag(s + "-t4", "4. WEATHER INSTRUMENTS", 1040, 900)}${tag(s + "-t5", "5. RADIO", 1160, 500)}
    ${box(s + "-star", `★ MOST IMPORTANT OBJECT: <span style="color:${C.amber};">SMALL OIL-BURNING STOVE</span>`, 120)}
    ${bridge(s, "c-last.png")}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.5, 11.5, { every: 3.1 })}
    ${bridgeJs(s)}
    ${hide(s + "-dim", s + "-star", ...[1, 2, 3, 4, 5].map((i) => `${s}-t${i}`))}
    tl.set("#${s}-snowcover", { opacity: .12 }, 0);
    tl.set("#${s}-cam", { scale: 1, x: 0, y: 0, transformOrigin: "0 0" }, 0);
    tl.to("#${s}-cam", { scale: ${SC}, x: ${TX}, y: ${TY}, duration: 1.1, ease: "power2.inOut" }, 0.1);
    // the five callouts, in the order he names them
    ${[[1, 1.2], [2, 2.15], [3, 3.15], [4, 4.15], [5, 5.5]].map(([i, t]) => `tl.to("#${s}-h${i}", { opacity: 1, duration: .15 }, ${t});${i > 1 ? ` tl.to(["#${s}-h${i - 1}", "#${s}-t${i - 1}"], { opacity: .25, duration: .2 }, ${t});` : ""}
    tl.fromTo("#${s}-t${i}", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, ${t});`).join("\n    ")}
    // "the most important object of all": the room dims, the stove takes the spotlight
    tl.to([${[1, 2, 3, 4, 5].map((i) => `"#${s}-h${i}", "#${s}-t${i}"`).join(", ")}], { opacity: 0, duration: .3 }, 6.5);
    tl.to("#${s}-dim", { opacity: 1, duration: .5 }, 6.6);
    tl.to("#${s}-stoveB", { opacity: 1, duration: .2 }, 6.8);
    tl.to("#${s}-stoveB", { opacity: .35, duration: .45, yoyo: true, repeat: 8, ease: "sine.inOut" }, 7.1);
    tl.to("#${s}-stoveglow", { opacity: .7, duration: .4, yoyo: true, repeat: 9, ease: "sine.inOut" }, 7.0);
    tl.fromTo("#${s}-star", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 7.2);
    // he turns to warm his hands at it
    tl.to("#${p}-armR", { rotation: -55, duration: .5, ease: "power2.out" }, 8.9);
    tl.to("#${p}-armL", { rotation: -20, duration: .5, ease: "power2.out" }, 9.0);`;

  return { id: "inside", html: scene("inside", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
