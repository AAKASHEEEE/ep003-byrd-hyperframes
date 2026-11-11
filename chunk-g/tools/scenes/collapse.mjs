// G01 (0–25.3): he blames the cold, the loneliness, the work; May 31 evening: the generator chugs, CO fills the room while he taps the key;
//   "He collapsed" — whole rig falls to the floor (eyes inside the head), hard cut to black.
// VO (abs, pauses inserted): "Byrd didn't understand at first what was happening to him. (0.23–3.00) He felt weak. (3.54) His head pounded. (4.81) His eyes hurt.
//   (6.12) He blamed the cold, (7.60) the loneliness, (9.13) the work. (10.17–10.70) Then came the evening of May thirty-first. (11.43–13.73) He was running the
//   gasoline engine to send his regular radio message to Little America. (14.34–18.91) Partway through the transmission, (19.39) the fumes caught up with him.
//   (21.27) He collapsed. (23.16–24.00) [+0.8 black]"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, badge, tag, hide } from "./kit.mjs";
import { E, E3_CSS, room, byrd } from "./e3.mjs";
import { RS, RXs, RYs, sx, sy, gen, haze } from "./g7.mjs";

export function build() {
  const s = "co", p = "co-by";
  const blame = ["THE COLD?", "THE LONELINESS?", "THE WORK?"];
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0; background:${E.pineDk};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <g transform="translate(${RXs} ${RYs}) scale(${RS})">${room(s, { pipeTop: 0 })}${gen(s)}
        <g transform="translate(${300 - 100 * 0.78} ${r1(320 - 265 * 0.78)}) scale(.78)">${byrd(p, s, { outfit: "sweater" })}</g>
        <g id="${s}-haze" opacity="0">${haze(s, 8)}</g></g>
    </svg></div>
    ${["WEAK", "HEAD POUNDING", "EYES HURT"].map((t, i) => tag(`${s}-sy${i}`, t, 420 + i * 330, 110)).join("")}
    ${blame.map((t, i) => `<div id="${s}-bl${i}" class="ui" style="left:${300 + i * 470}px; top:${210 + (i % 2) * 40}px; padding:14px 30px; border-radius:40px; background:#F8FAFC; font-family:'Archivo Black', sans-serif; font-size:36px; color:#111827;">${t}<div style="position:absolute; left:${[260, 180, 40][i]}px; bottom:-24px; width:0; height:0; border-left:16px solid transparent; border-right:16px solid transparent; border-top:26px solid #F8FAFC; transform:skewX(${[-35, -10, 30][i]}deg); transform-origin:50% 0;"></div><div id="${s}-x${i}" style="position:absolute; left:16px; right:16px; top:50%; height:7px; margin-top:-3px; background:${E.warn}; border-radius:4px;"></div></div>`).join("")}
    ${badge(s + "-b", "MAY 31, 1934", "EVENING", { fs: 48 })}
    <div id="${s}-int" class="ui" style="left:0; right:0; top:180px; display:flex; justify-content:center;"><div class="ui-warn">TRANSMISSION INTERRUPTED</div></div>
    <div id="${s}-black" style="position:absolute; inset:0; background:#000;"></div>`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 21.0, { every: 3.0 })}
    ${hide(s + "-sy0", s + "-sy1", s + "-sy2", s + "-bl0", s + "-bl1", s + "-bl2", s + "-x0", s + "-x1", s + "-x2", s + "-b", s + "-int", s + "-black")}
    // weak, head pounding, eyes hurt: rubbing his eyes
    tl.to("#${p}-armL", { rotation: 150, duration: .5 }, 0.4); tl.to("#${p}-foreL", { rotation: 45, duration: .5 }, 0.4);
    tl.set("#${p}-lids", { scaleY: .45 }, 0.4);
    ${[[0, 3.6], [1, 4.85], [2, 6.15]].map(([i, t]) => `tl.fromTo("#${s}-sy${i}", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, ${t});`).join("\n    ")}
    tl.to("#${p}-ache", { opacity: 1, duration: .2 }, 4.85);
    ${[0, 1, 2, 3, 4, 5].map((i) => `tl.to("#${p}-ache", { scale: ${i % 2 ? 1 : 1.18}, svgOrigin: "100 56", duration: .38, ease: "sine.inOut" }, ${r1(5.0 + i * 0.4)});`).join("\n    ")}
    // he blames the cold, the loneliness, the work — all crossed out
    ${[[0, 7.6], [1, 9.15], [2, 10.2]].map(([i, t]) => `tl.fromTo("#${s}-bl${i}", { opacity: 0, scale: .5 }, { opacity: 1, scale: 1, duration: .22, ease: "back.out(2)", immediateRender: false }, ${t});
    tl.fromTo("#${s}-x${i}", { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: .2, immediateRender: false }, ${r1(t + 0.55)});`).join("\n    ")}
    tl.to(["#${s}-bl0", "#${s}-bl1", "#${s}-bl2", "#${s}-sy0", "#${s}-sy1", "#${s}-sy2"], { opacity: 0, duration: .3 }, 11.3);
    tl.to("#${p}-armL", { rotation: 0, duration: .4 }, 11.3); tl.to("#${p}-foreL", { rotation: 0, duration: .4 }, 11.3);
    // May 31, evening: the generator chugs, he taps the key, the fumes fill the room
    tl.fromTo("#${s}-b", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 11.5);
    ${Array.from({ length: 48 }, (_, i) => `tl.to("#${s}-gen", { x: ${i % 2 ? 0.8 : -0.8}, y: ${i % 3 ? 0.4 : -0.4}, duration: .08, ease: "none" }, ${r1(14.3 + i * 0.2)});`).join("\n    ")}
    tl.set("#${p}-armR", { rotation: -12 }, 14.3);
    ${Array.from({ length: 16 }, (_, i) => `tl.to("#${p}-foreR", { rotation: ${i % 2 ? 0 : -7}, svgOrigin: "142 147", duration: .1, ease: "none" }, ${r1(15.0 + i * 0.3)});`).join("\n    ")}
    tl.to("#${s}-haze", { opacity: 1, duration: 6.0, ease: "power1.in" }, 15.0);
    tl.fromTo(".${s}-hz", { scale: .4, transformOrigin: "50% 50%" }, { scale: 1.6, duration: 7.5, ease: "sine.out", immediateRender: false }, 15.0);
    // the fumes catch up with him: he sways, then falls (whole rig, eyes stay in the head)
    tl.to("#${p}", { rotation: -8, svgOrigin: "100 265", duration: .6, ease: "sine.inOut", yoyo: true, repeat: 1 }, 21.3);
    tl.fromTo("#${s}-int", { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: .18, immediateRender: false }, 21.4);
    tl.set("#${p}-lids", { scaleY: .8 }, 22.5);
    tl.to("#${p}", { rotation: 90, y: -40, svgOrigin: "100 265", duration: .45, ease: "power2.in" }, 23.2);
    tl.set("#${s}-black", { opacity: 1 }, 24.05);`;

  return { id: "collapse", html: scene("collapse", { css: KIT_CSS + E3_CSS, body, js, bg: E.pineDk }) };
}
