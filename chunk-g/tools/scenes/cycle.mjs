// G04 (62.6–79.6): the compromise — a stove duty-cycle dial (short warm burst, long freezing dark); stove on, then off and into the bag shivering;
//   barely lifting a cup; eating when he could; a hand on the wall, still taking readings at the barograph.
// VO (local = abs − 62.6): "Byrd chose something in between. (0.20–2.03) He ran the stove only for short periods, just to stay alive, (2.51–6.24) and then shut it
//   off and lay in his sleeping bag in the cold. (6.57–9.35) [+0.6] Some days he could barely lift a cup. (10.41–12.31) He ate when he could. (12.75–13.78) He kept
//   taking the weather readings when he could stand up. (14.16–16.61)"
import { C, r1, filters, rigInit, scene, life, shiver } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { E, E3_CSS, room, byrd } from "./e3.mjs";

const RS = 2.0, RXs = 760, RYs = 240, DX = 380, DY = 560, DR = 190;
export function build() {
  const s = "cy", p = "cy-by", q = "cy-bg";
  const sx = (x) => r1(x * RS + RXs), sy = (y) => r1(y * RS + RYs);
  const arc = (a0, a1, col) => { const P = (a) => [r1(DX + DR * Math.sin((a * Math.PI) / 180)), r1(DY - DR * Math.cos((a * Math.PI) / 180))]; const [x0, y0] = P(a0), [x1, y1] = P(a1); return `<path d="M${DX} ${DY} L${x0} ${y0} A${DR} ${DR} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z" fill="${col}"/>`; };
  const cup = { side: "R", svg: `<g id="${p}-cup" opacity="0"><rect x="146" y="160" width="30" height="30" rx="4" fill="#CBD5E1" stroke="#334155" stroke-width="3"/><rect x="146" y="160" width="30" height="6" fill="#64748B"/><path d="M176 168 q12 7 0 15" fill="none" stroke="#334155" stroke-width="4"/></g>` };
  const food = { side: "R", svg: `<g id="${p}-food" opacity="0"><rect x="142" y="166" width="34" height="22" rx="4" fill="#D4A373" stroke="#8C6A4A" stroke-width="3"/>${[0, 1, 2].map((j) => `<circle cx="${150 + j * 9}" cy="177" r="2.2" fill="#8C6A4A"/>`).join("")}</g>` };
  const inBag = `<g id="${s}-bag" opacity="0"><g transform="translate(200 222) rotate(-90) scale(.52) translate(-100 -265)">${byrd(q, s, { outfit: "sweater" })}</g>
      <rect x="106" y="204" width="96" height="34" rx="14" fill="#A47148" stroke="#8C6A4A" stroke-width="2"/></g>`;
  const body = `
    <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect width="1920" height="1080" fill="${E.pineDk}"/>
      <g transform="translate(${RXs} ${RYs}) scale(${RS})">${room(s, { pipeTop: 0 })}<rect id="${s}-door" x="246" y="250" width="32" height="22" rx="3" fill="#1F2937"/>${inBag}
        <g id="${s}-pos"><g transform="translate(${190 - 100 * 0.78} ${r1(320 - 265 * 0.78)}) scale(.78)">${byrd(p, s, { outfit: "sweater", props: [cup, food] })}</g></g>
        <rect id="${s}-cold" width="520" height="320" fill="#0284C7" opacity="0"/></g>
      <g id="${s}-dial"><circle cx="${DX}" cy="${DY}" r="${DR + 12}" fill="#0B1222" stroke="#334155" stroke-width="6"/>${arc(0, 300, "#1E3A8A")}${arc(300, 360, E.lamp)}
        <g id="${s}-hand"><line x1="${DX}" y1="${DY}" x2="${DX}" y2="${DY - DR + 14}" stroke="#F8FAFC" stroke-width="7" stroke-linecap="round"/></g><circle cx="${DX}" cy="${DY}" r="14" fill="#F8FAFC"/>
        <text x="${DX}" y="${DY - DR - 40}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="34" fill="#fff">STOVE CYCLE</text></g>
    </svg>
    ${tag(s + "-on", "■ STOVE ON: BRIEF WARMTH", 192, 820)}${tag(s + "-off", "■ STOVE OFF: HOURS IN FREEZING DARK", 192, 900)}
    ${tag(s + "-v1", "BARELY ABLE TO LIFT A CUP", 1080, 150)}${tag(s + "-v2", "ATE WHEN HE COULD", 1080, 150)}${tag(s + "-v3", "STILL TAKING WEATHER READINGS", 1080, 150)}`;

  const js = `
    ${rigInit(p)}${"\n    "}${rigInit(q)}
    ${life(p, 0.3, 17.0, { every: 3.0 })}
    ${hide(s + "-on", s + "-off", s + "-v1", s + "-v2", s + "-v3")}
    tl.set("#${p}-lids", { scaleY: .4 }, 0.02);
    tl.set("#${s}-stoveglow", { opacity: 0 }, 0); tl.set("#${s}-door", { opacity: 0 }, 2.5); tl.set("#${s}-door", { opacity: 1 }, 6.6);
    tl.fromTo("#${s}-dial", { opacity: 0, scale: .7, svgOrigin: "${DX} ${DY}" }, { opacity: 1, scale: 1, svgOrigin: "${DX} ${DY}", duration: .3, ease: "back.out(1.5)", immediateRender: false }, 0.3);
    // a short warm burst…
    tl.set("#${s}-hand", { rotation: 300, svgOrigin: "${DX} ${DY}" }, 0);
    tl.to("#${s}-hand", { rotation: 360, svgOrigin: "${DX} ${DY}", duration: 4.0, ease: "none" }, 2.5);
    tl.to("#${s}-hand", { rotation: 650, svgOrigin: "${DX} ${DY}", duration: 3.6, ease: "none" }, 6.6);
    tl.to("#${s}-stoveglow", { opacity: .7, duration: .4, yoyo: true, repeat: 4, ease: "sine.inOut" }, 2.5);
    tl.fromTo("#${s}-on", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 2.6);
    tl.to("#${p}-armR", { rotation: -55, duration: .4 }, 2.6); tl.to("#${p}-armL", { rotation: -20, duration: .4 }, 2.6);
    // …then off, and into the bag in the cold
    tl.to("#${s}-stoveglow", { opacity: 0, duration: .3 }, 6.6);
    tl.fromTo("#${s}-off", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 6.6);
    tl.to("#${s}-cold", { opacity: .16, duration: 1.5 }, 6.8);
    tl.set("#${s}-pos", { opacity: 0 }, 7.2); tl.set("#${s}-bag", { opacity: 1 }, 7.2);
    ${shiver(q, 7.3, 10.2, 1.5)}
    // some days he could barely lift a cup
    tl.set("#${s}-bag", { opacity: 0 }, 10.3); tl.set("#${s}-pos", { opacity: 1, x: 160 }, 10.3); tl.set(["#${p}-armR", "#${p}-foreR"], { rotation: 0 }, 10.3);
    tl.set(["#${p}-armL"], { rotation: 0 }, 10.3);
    tl.set("#${p}-cup", { opacity: 1 }, 10.3);
    tl.fromTo("#${p}-armR", { rotation: 0 }, { rotation: -55, duration: 1.4, ease: "power1.inOut", immediateRender: false }, 10.5);
    ${Array.from({ length: 14 }, (_, i) => `tl.to("#${p}-foreR", { rotation: ${i % 2 ? -4 : 4}, svgOrigin: "142 147", duration: .07, ease: "none" }, ${r1(10.5 + i * 0.13)});`).join("\n    ")}
    tl.fromTo("#${s}-v1", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 10.5);
    // he ate when he could
    tl.set("#${s}-v1", { opacity: 0 }, 12.7); tl.set("#${p}-cup", { opacity: 0 }, 12.75); tl.set("#${p}-food", { opacity: 1 }, 12.75);
    tl.to("#${p}-armR", { rotation: -150, duration: .4 }, 12.75); tl.to("#${p}-foreR", { rotation: -45, duration: .4 }, 12.75);
    tl.fromTo("#${s}-v2", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 12.75);
    // still taking readings: to the barograph, a hand on the wall for support
    tl.set("#${s}-v2", { opacity: 0 }, 14.15); tl.set("#${p}-food", { opacity: 0 }, 14.1);
    tl.to(["#${p}-armR", "#${p}-foreR"], { rotation: 0, duration: .4 }, 14.2);
    tl.to("#${s}-pos", { x: 210, duration: .8, ease: "power1.inOut" }, 14.2);
    tl.to("#${p}-armR", { rotation: -38, duration: .5, ease: "power2.out" }, 15.0); tl.to("#${p}-foreR", { rotation: -12, svgOrigin: "142 147", duration: .5 }, 15.0);
    tl.fromTo("#${s}-v3", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 14.3);`;

  return { id: "cycle", html: scene("cycle", { css: KIT_CSS + E3_CSS, body, js, bg: E.pineDk }) };
}
