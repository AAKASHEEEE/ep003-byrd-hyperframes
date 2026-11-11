// D04–D05 (55.5–82.8): locked outside — Byrd climbs out, the hatch slams and ices shut; pull-back: warm hut below, black blizzard above; the shovel he
//   left on the surface pries it open; "a few more minutes…"; then the real danger: darkness closes in from every edge.
// VO (local = abs − 55.5): "And early on, (0.34) there were mistakes that almost ended it all. (1.74–3.94) One evening he climbed out (4.41) and the hatch froze
//   shut behind him. (6.44–8.36) [+0.8] He was locked outside in the dark, (9.71) in the cold, (11.89) with no one within a hundred miles. (12.99–14.82) He had to
//   work it loose with a shovel he'd left on the surface. (15.28–18.23) A few more minutes (18.69) and the story ends right there. (19.96–21.49) [+0.7]
//   But the hatch wasn't the biggest danger. (22.69–24.53) The biggest danger was the darkness. (25.03–26.72)"
import { C, r1, filters, rigInit, scene, life, shiver, walk, snow2 } from "../lib.mjs";
import { KIT_CSS, tag, box, hide, breath } from "./kit.mjs";
import { E, E3_CSS, cutaway, byrd } from "./e3.mjs";

const G = 540, RX = 700, RY = G + 16, K = 0.8;
const cam = (sc, wx, wy, cx = 960, cy = 540) => ({ scale: sc, x: r1(cx - wx * sc), y: r1(cy - wy * sc) });
const FIN = cam(0.62, 960, 600), MID = cam(0.95, 900, 470);
export function build() {
  const s = "hx", p = "hx-by";
  const shovelP = { side: "R", svg: `<g id="${p}-shovel" opacity="0"><line x1="150" y1="166" x2="196" y2="300" stroke="#6B4226" stroke-width="7" stroke-linecap="round"/><path d="M182 292 l30 -10 l18 50 q-10 20 -30 14 z" fill="#94A3B8" stroke="#475569" stroke-width="3"/></g>` };
  const torchP = { side: "R", svg: `<g id="${p}-torch" opacity="0"><rect x="150" y="172" width="14" height="22" rx="3" fill="#475569" transform="rotate(-24 157 183)"/><polygon points="160,192 300,430 190,456" fill="#FDE68A" opacity=".42"/></g>` };
  const ice = `<polygon points="${RX + 2},${G - 4} ${RX + 14},${G - 16} ${RX + 26},${G - 6} ${RX + 40},${G - 18} ${RX + 54},${G - 7} ${RX + 68},${G - 17} ${RX + 84},${G - 4} ${RX + 84},${G + 8} ${RX + 2},${G + 8}" fill="#7DD3FC" stroke="#E0F2FE" stroke-width="3" opacity=".95"/>`;
  const shards = [[-60, -80, -90], [-20, -110, 60], [30, -95, -40], [70, -70, 120], [-80, -40, 200], [90, -30, -150]].map(([x, y, r], i) => `<polygon id="${s}-sh${i}" points="${RX + 20 + i * 10},${G - 8} ${RX + 30 + i * 10},${G - 20} ${RX + 38 + i * 10},${G - 6}" fill="#BAE6FD" opacity="0"/>`).join("");
  const sn = snow2(s, 27.3, { far: 80, near: 26, seed: 51, dx: 900 });
  const body = `
    <div id="${s}-cam" style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0;">
      <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
        ${cutaway(s, G, { rx: RX, seed: 61 })}
        <g id="${s}-hglow" opacity="0"><polygon points="${RX + 14},${G} ${RX + 72},${G} ${RX + 130},${G - 200} ${RX - 44},${G - 200}" fill="${E.lamp}" opacity=".3" filter="url(#${s}-soft)"/></g>
        <ellipse cx="1120" cy="${G + 2}" rx="70" ry="22" fill="#E2E8F0"/>
        <g id="${s}-shv"><line x1="1120" y1="${G - 120}" x2="1120" y2="${G - 6}" stroke="#6B4226" stroke-width="8"/><rect x="1102" y="${G - 128}" width="36" height="8" rx="3" fill="#6B4226"/><path d="M1106 ${G - 14} h28 v20 q-14 12 -28 0 z" fill="#94A3B8"/></g>
        <g id="${s}-spot" opacity="0"><ellipse cx="1120" cy="${G}" rx="110" ry="34" fill="#FFF7E0" opacity=".5" filter="url(#${s}-soft)"/></g>
        <g id="${s}-flat" opacity="0"><line x1="${RX + 96}" y1="${G - 5}" x2="${RX + 206}" y2="${G - 5}" stroke="#6B4226" stroke-width="7" stroke-linecap="round"/><path d="M${RX + 206} ${G - 12} h26 v12 h-26 z" fill="#94A3B8"/></g>
        <g id="${s}-rglow" opacity="0"><rect x="${RX + 20}" y="${RY + 20}" width="480" height="290" fill="${E.lamp}" opacity=".22" filter="url(#${s}-soft)"/></g>
        <g id="${s}-door"><rect x="${RX + 12}" y="${G - 7}" width="62" height="11" rx="2" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="3"/></g>
        <g id="${s}-ice" opacity="0">${ice}</g>${shards}
        <g id="${s}-bpos"><g transform="translate(${-100 * K} ${-265 * K}) scale(${K})">${byrd(p, s, { outfit: "anorak", props: [shovelP, torchP] })}</g></g>
      </svg></div>
    <div id="${s}-storm" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080">${sn.defs ? `<defs>${sn.defs}</defs>` : ""}${sn.far}${sn.near}</svg></div>
    <div id="${s}-dark" style="position:absolute; inset:0; --r:2400px; background:radial-gradient(circle at ${r1(840 * MID.scale + MID.x)}px ${r1(379 * MID.scale + MID.y)}px, rgba(3,5,8,0) var(--r), #030508 calc(var(--r) + 90px));"></div>
    ${tag(s + "-frz", "✕ HATCH FROZEN SHUT", 380, 420)}
    ${tag(s + "-shvT", "SHOVEL LEFT ON SURFACE", 1080, 320)}
    <div id="${s}-alone" class="ui" style="left:192px; top:108px;"><div class="ui-warn" style="height:72px; font-size:32px;">⚠ NO ONE WITHIN 100+ MILES</div></div>
    <div id="${s}-bar" class="ui" style="left:560px; top:930px; width:800px;">
      <div style="font-family:Inter, sans-serif; font-weight:800; font-size:28px; letter-spacing:.12em; color:#FCA5A5; text-align:center; margin-bottom:8px;">TIME BEFORE HYPOTHERMIA</div>
      <div style="height:22px; border-radius:11px; background:#1F2937; border:2px solid #475569; overflow:hidden;"><div id="${s}-fill" style="height:100%; width:100%; background:${E.warn}; transform-origin:0 50%;"></div></div></div>
    ${box(s + "-mist", `MISTAKES THAT <span style="color:${E.warn};">ALMOST ENDED IT ALL</span>`, 130)}
    ${box(s + "-few", `A FEW MORE MINUTES — <span style="color:${E.warn};">THE STORY ENDS RIGHT THERE</span>`, 130)}
    ${box(s + "-dk", `THE BIGGEST DANGER: <span style="color:${C.cyan};">THE DARKNESS</span>`, 130)}`;

  const climbY = (i, n) => r1(876 - ((876 - G) * (i + 1)) / n);
  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 27.3, { every: 3.2 })}
    ${sn.js}
    ${hide(s + "-dark", s + "-frz", s + "-shvT", s + "-alone", s + "-bar", s + "-mist", s + "-few", s + "-dk", s + "-storm")}
    tl.set("#${s}-snowcover", { opacity: .12 }, 0);
    tl.set("#${s}-cam", { ...${JSON.stringify(cam(1.25, 800, 560))}, transformOrigin: "0 0" }, 0);
    tl.set("#${s}-bpos", { x: 736, y: 876 }, 0);
    tl.set("#${s}-door", { rotation: -110, svgOrigin: "${RX + 12} ${G}" }, 0);
    tl.set("#${s}-hglow", { opacity: .9 }, 0);
    tl.fromTo("#${s}-mist", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 1.8);
    tl.to("#${s}-mist", { opacity: 0, duration: .25 }, 4.3);
    // "One evening he climbed out": rung by rung up the ladder and out of the hatch
    tl.set("#${p}-armL", { rotation: 150 }, 4.3); tl.set("#${p}-armR", { rotation: -150 }, 4.3);
    ${Array.from({ length: 6 }, (_, i) => `tl.to("#${s}-bpos", { y: ${climbY(i, 6)}, duration: .27, ease: "power1.inOut" }, ${r1(4.4 + i * 0.27)}); tl.to("#${p}-armL", { rotation: ${i % 2 ? 165 : 140}, duration: .27 }, ${r1(4.4 + i * 0.27)}); tl.to("#${p}-armR", { rotation: ${i % 2 ? -140 : -165}, duration: .27 }, ${r1(4.4 + i * 0.27)});`).join("\n    ")}
    tl.to(["#${p}-armL", "#${p}-armR"], { rotation: 0, duration: .25 }, 6.05);
    tl.to("#${s}-bpos", { x: 850, duration: .55, ease: "power1.inOut" }, 6.1);
    ${walk(p, 6.1, 6.65, 0.27, 16)}
    tl.to("#${s}-storm", { opacity: 1, duration: .5 }, 6.0);
    ${breath(p, 6.3, 22.5)}
    // the hatch slams and welds shut with ice
    tl.to("#${s}-door", { rotation: 0, svgOrigin: "${RX + 12} ${G}", duration: .18, ease: "power3.in" }, 6.75);
    tl.set("#${s}-hglow", { opacity: 0 }, 6.75);
    tl.fromTo("#${s}-ice", { opacity: 0, scaleY: .2, svgOrigin: "${RX + 43} ${G + 8}" }, { opacity: 1, scaleY: 1, svgOrigin: "${RX + 43} ${G + 8}", duration: .25, ease: "power2.out", immediateRender: false }, 7.0);
    tl.fromTo("#${s}-frz", { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: .18, immediateRender: false }, 7.2);
    tl.to("#${s}-frz", { opacity: 0, duration: .2 }, 9.8);
    // "locked outside in the dark": he kneels and pulls at the handle; pull-back into the void
    tl.to("#${s}-bpos", { x: 805, duration: .4 }, 9.6);
    tl.to("#${p}-legL", { rotation: 38, duration: .3 }, 9.8); tl.to("#${p}-legR", { rotation: -38, duration: .3 }, 9.8);
    tl.to("#${p}", { y: 26, duration: .3 }, 9.8);
    tl.to("#${p}-armL", { rotation: -40, duration: .3 }, 9.9); tl.to("#${p}-armR", { rotation: 40, duration: .3 }, 9.9);
    ${shiver(p, 10.3, 14.9, 3)}
    tl.to("#${s}-cam", { ...${JSON.stringify(FIN)}, duration: 1.6, ease: "power2.inOut" }, 10.0);
    tl.fromTo("#${s}-alone", { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 13.0);
    tl.fromTo("#${s}-bar", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 13.2);
    tl.fromTo("#${s}-fill", { scaleX: 1 }, { scaleX: .14, duration: 5.0, ease: "none", immediateRender: false }, 13.3);
    tl.to("#${s}-fill", { opacity: .5, duration: .25, yoyo: true, repeat: 9, ease: "none" }, 13.3);
    // the shovel he'd left on the surface
    tl.to("#${s}-cam", { ...${JSON.stringify(MID)}, duration: .8, ease: "power2.inOut" }, 15.1);
    tl.to("#${s}-spot", { opacity: 1, duration: .25 }, 15.3);
    tl.fromTo("#${s}-shvT", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 15.4);
    tl.to("#${p}", { y: 0, duration: .25 }, 15.4);
    tl.to(["#${p}-legL", "#${p}-legR", "#${p}-armL", "#${p}-armR"], { rotation: 0, duration: .25 }, 15.4);
    tl.to("#${s}-bpos", { x: 1080, duration: .8, ease: "power1.inOut" }, 15.6);
    ${walk(p, 15.6, 16.4, 0.27, 16)}
    tl.set("#${s}-shv", { opacity: 0 }, 16.45); tl.set("#${p}-shovel", { opacity: 1 }, 16.45);
    tl.to("#${s}-spot", { opacity: 0, duration: .2 }, 16.5); tl.to("#${s}-shvT", { opacity: 0, duration: .2 }, 17.0);
    tl.to("#${s}-bpos", { x: 840, duration: .7, ease: "power1.inOut" }, 16.55);
    ${walk(p, 16.55, 17.25, 0.27, 16)}
    tl.to("#${p}-armR", { rotation: 46, duration: .3 }, 17.3);
    tl.to("#${p}", { rotation: -10, svgOrigin: "100 265", duration: .3 }, 17.3);
    ${[0, 1, 2].map((i) => `tl.to("#${p}-armR", { rotation: ${i % 2 ? 46 : 58}, duration: .22, ease: "sine.inOut" }, ${r1(17.6 + i * 0.2)});`).join("\n    ")}
    // CRACK — the ice shatters, the hatch pops open
    tl.set("#${s}-ice", { opacity: 0 }, 18.15);
    ${[[-60, -80, -90], [-20, -110, 60], [30, -95, -40], [70, -70, 120], [-80, -40, 200], [90, -30, -150]].map(([x, y, r], i) => `tl.fromTo("#${s}-sh${i}", { opacity: 1, x: 0, y: 0, rotation: 0 }, { opacity: 0, x: ${x}, y: ${y}, rotation: ${r}, svgOrigin: "${RX + 30 + i * 10} ${G - 10}", duration: .6, ease: "power2.out", immediateRender: false }, 18.15);`).join("\n    ")}
    tl.to("#${s}-door", { rotation: -110, svgOrigin: "${RX + 12} ${G}", duration: .3, ease: "back.out(1.4)" }, 18.2);
    tl.to("#${s}-rglow", { opacity: 1, duration: .3 }, 18.25);
    tl.to("#${p}", { rotation: 0, svgOrigin: "100 265", duration: .3 }, 18.3);
    tl.to("#${p}-armR", { rotation: 0, duration: .3 }, 18.3);
    tl.set("#${p}-shovel", { opacity: 0 }, 18.5); tl.set("#${s}-flat", { opacity: 1 }, 18.5);
    tl.to("#${s}-fill", { opacity: 1, duration: .1 }, 18.35);
    tl.to("#${s}-alone", { opacity: 0, duration: .2 }, 19.6);
    tl.fromTo("#${s}-few", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 19.9);
    // swap the shovel for the flashlight; the cards are swiped away
    tl.set("#${p}-torch", { opacity: 1 }, 21.4);
    tl.to("#${p}-armR", { rotation: -92, duration: .4 }, 21.4);
    tl.to(["#${s}-few", "#${s}-bar", "#${s}-alone"], { x: -1920, duration: .35, ease: "power3.in" }, 22.75);
    // "The biggest danger was the darkness"
    tl.to("#${s}-rglow", { opacity: 0, duration: .5 }, 24.9);
    tl.set("#${s}-dark", { opacity: 1 }, 24.95);
    tl.to("#${s}-dark", { "--r": "170px", duration: 1.7, ease: "power2.inOut" }, 25.0);
    tl.fromTo("#${s}-dk", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 24.75);`;

  return { id: "hatch", html: scene("hatch", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
