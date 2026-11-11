// G02 (25.3–35.4): eyelids open on the floor (whole rig rotated, eyes parented); he crawls to the generator and flips its switch OFF, then crawls into
//   his sleeping bag on the bunk — too weak to stand.
// VO (local = abs − 25.3): "He came to on the floor. (0.13–1.46) Somehow he managed to stagger to the engine and shut it off. (1.94–5.23) Then he crawled into his
//   sleeping bag, (5.80–7.66) too weak to do anything else. (8.08–9.65)"
import { C, r1, filters, rigInit, scene, shiver } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { E, E3_CSS, room, byrd } from "./e3.mjs";
import { RS, RXs, RYs, sx, sy, gen, haze } from "./g7.mjs";

const K = 0.78;
export function build() {
  const s = "fl", p = "fl-by", q = "fl-b2";
  // lying on the floor, head toward +x: whole rig rotated 90° about the feet (eyes stay in the head group)
  const lying = `<g id="${s}-crawl"><g transform="translate(${262} ${r1(320 - 40 * K)}) rotate(90) scale(${K}) translate(-100 -265)">${byrd(p, s, { outfit: "sweater" })}</g></g>`;
  // in the bunk under the fur bag
  const bunk = `<g id="${s}-bunk" opacity="0"><g transform="translate(200 222) rotate(-90) scale(.52) translate(-100 -265)">${byrd(q, s, { outfit: "sweater" })}</g>
      <rect x="106" y="204" width="96" height="34" rx="14" fill="#A47148" stroke="#8C6A4A" stroke-width="2"/><path d="M114 210 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0" fill="none" stroke="#D4A373" stroke-width="2"/></g>`;
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0; background:${E.pineDk};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <g transform="translate(${RXs} ${RYs}) scale(${RS})">${room(s, { pipeTop: 0 })}${gen(s)}
        <g id="${s}-haze" opacity=".7">${haze(s, 6)}</g>${lying}${bunk}</g>
    </svg></div>
    <div id="${s}-lidT" style="position:absolute; left:0; top:0; width:1920px; height:540px; background:#000;"></div>
    <div id="${s}-lidB" style="position:absolute; left:0; top:540px; width:1920px; height:540px; background:#000;"></div>
    ${tag(s + "-off", "GENERATOR: OFF", sx(440), sy(236))}
    <div id="${s}-weak" class="ui" style="left:192px; top:108px;"><div class="ui-pill" style="position:relative;"><div class="dot"></div><span>TOO WEAK TO STAND</span></div></div>`;

  const js = `
    ${rigInit(p)}${"\n    "}${rigInit(q)}
    ${hide(s + "-off", s + "-weak")}
    tl.set("#${p}-lids", { scaleY: .6 }, 0.02); tl.set("#${q}-lids", { scaleY: .5 }, 0.02);
    // eyelids open (blink twice)
    tl.to("#${s}-lidT", { y: -380, duration: .35, ease: "power2.out" }, 0.1); tl.to("#${s}-lidB", { y: 380, duration: .35, ease: "power2.out" }, 0.1);
    tl.to("#${s}-lidT", { y: -200, duration: .15 }, 0.5); tl.to("#${s}-lidB", { y: 200, duration: .15 }, 0.5);
    tl.to("#${s}-lidT", { y: -560, duration: .3 }, 0.7); tl.to("#${s}-lidB", { y: 560, duration: .3 }, 0.7);
    ${Array.from({ length: 22 }, (_, i) => `tl.to("#${s}-gen", { x: ${i % 2 ? 0.8 : -0.8}, duration: .08, ease: "none" }, ${r1(0 + i * 0.22)});`).join("\n    ")}
    // he came to right beside the engine: drags himself the last few inches and reaches for the switch
    tl.to("#${s}-crawl", { rotation: -28, svgOrigin: "262 ${r1(320 - 40 * K)}", duration: .8, ease: "power2.out" }, 1.9);
    tl.to("#${s}-crawl", { x: 8, duration: .5, ease: "power1.inOut" }, 2.8); tl.to("#${s}-crawl", { x: 16, duration: .5, ease: "power1.inOut" }, 3.5);
    ${Array.from({ length: 4 }, (_, i) => `tl.to("#${p}-armL", { rotation: ${i % 2 ? -70 : -50}, duration: .4, ease: "sine.inOut" }, ${r1(1.9 + i * 0.6)});`).join("\n    ")}
    tl.to("#${p}-armR", { rotation: -150, duration: .5, ease: "power2.out" }, 3.9); tl.to("#${p}-foreR", { rotation: -30, duration: .5 }, 3.9);
    // the switch flips OFF, the engine stops
    tl.to("#${s}-sw", { rotation: 90, svgOrigin: "501 298", duration: .12 }, 4.9);
    tl.fromTo("#${s}-off", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 4.95);
    tl.to("#${s}-haze", { opacity: .35, duration: 4.0 }, 5.0);
    // then into the sleeping bag
    tl.to("#${s}-off", { opacity: 0, duration: .2 }, 5.7);
    tl.to(["#${p}-armR", "#${p}-foreR", "#${p}-armL"], { rotation: 0, duration: .3 }, 5.6); tl.to("#${s}-crawl", { rotation: 0, svgOrigin: "262 ${r1(320 - 40 * K)}", duration: .4 }, 5.6);
    tl.to("#${s}-crawl", { x: -60, duration: 0.9, ease: "power1.inOut" }, 5.9);
    tl.set("#${s}-crawl", { opacity: 0 }, 6.7); tl.set("#${s}-bunk", { opacity: 1 }, 6.7);
    ${shiver(q, 6.8, 10.0, 1.5)}
    tl.fromTo("#${s}-weak", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 8.1);`;

  return { id: "floor", html: scene("floor", { css: KIT_CSS + E3_CSS, body, js, bg: "#000" }) };
}
