// H04 (65.2–91.3): DR. THOMAS POULTER (brown parka, spectacles) in the Little America shack, worried, pacing; bubble "WE'RE COMING TO RESCUE YOU"
//   stamped ✕ BYRD WOULD REFUSE → green OFFICIAL PROPOSAL: METEOR OBSERVATION TRIP (shooting stars over a tractor; real purpose: rescue);
//   Advance Base inset: Byrd taps back ✓ BYRD AGREES ("NO UNNECESSARY RISKS").
// VO (local = abs − 65.2): "The second-in-command at Little America (0.24) was a scientist named Doctor Thomas Polter. (2.63–5.18) He grew more and more
//   worried. (5.79–7.29) He couldn't openly say (7.77) 'we're coming to rescue you' — (9.46–10.90) Byrd would have refused. (11.37–12.58) So Polter proposed
//   a scientific trip instead: (13.00–15.66) a tractor journey to Advance Base to observe meteors in the clear winter sky. (16.14–20.95) Byrd agreed, (21.59)
//   as long as they didn't take unnecessary risks. (22.79–25.35)"
import { C, r1, filters, rigInit, scene, life, shiver } from "../lib.mjs";
import { KIT_CSS, pill, tag, hide } from "./kit.mjs";
import { E, E3_CSS } from "./e3.mjs";
import { crew } from "./b3.mjs";
import { legs } from "./e5.mjs";
import { shack, SPECS, keyRoom } from "./h8.mjs";

const PK = 1.1, PX = 400;
export function build() {
  const s = "pt", p = "pt-po", b = "pt-by";
  const chart = { side: "L", svg: `<g id="${p}-chart"><rect x="20" y="168" width="46" height="34" rx="3" fill="#1E293B" stroke="#E2E8F0" stroke-width="2"/><path d="M26 196 L44 178 M38 196 L58 176" stroke="#FDE68A" stroke-width="2"/></g>` };
  const meteors = [[60, 40], [200, 20], [330, 60]].map(([x, y], i) => `<g class="${s}-met" opacity="0"><line x1="${x}" y1="${y}" x2="${x + 70}" y2="${y + 40}" stroke="#FDE68A" stroke-width="4" stroke-linecap="round" opacity=".7"/><circle cx="${x + 72}" cy="${y + 41}" r="5" fill="#fff"/></g>`).join("");
  const body = `
    <div style="position:absolute; inset:0; background:#2A1A0E;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      ${shack(s)}<g id="${s}-walk"><g transform="translate(${r1(PX - 100 * PK)} ${r1(860 - 265 * PK)}) scale(${PK})">${crew(p, s, "crew1", { headwear: SPECS, props: [chart] })}</g></g></svg></div>
    <div id="${s}-bub" class="ui" style="left:140px; top:255px; width:820px; padding:26px 0; border-radius:28px; background:#F8FAFC; text-align:center; font-family:'Archivo Black', sans-serif; font-size:38px; color:#111827;">"WE'RE COMING TO RESCUE YOU"
      <div style="position:absolute; left:${PX - 140 - 22}px; bottom:-26px; width:0; height:0; border-left:22px solid transparent; border-right:22px solid transparent; border-top:28px solid #F8FAFC;"></div></div>
    <div id="${s}-no" class="ui e-stamp" style="left:260px; top:425px; color:#FCA5A5; border-color:${E.warn}; background:rgba(11,16,30,.92); font-size:36px;">✕ BYRD WOULD REFUSE</div>
    <div id="${s}-prop" class="ui" style="left:1140px; top:196px; width:680px; height:424px; border-radius:22px; background:#052E1A; border:5px solid #22C55E; overflow:hidden;">
      <div style="margin:22px 0 0 28px; font-family:Inter, sans-serif; font-weight:800; font-size:28px; letter-spacing:.14em; color:#86EFAC;">OFFICIAL PROPOSAL</div>
      <div style="margin:6px 0 0 28px; font-family:'Archivo Black', sans-serif; font-size:40px; line-height:1.05; color:#fff;">METEOR OBSERVATION TRIP</div>
      <svg width="680" height="264" viewBox="0 0 440 171" preserveAspectRatio="xMidYMax slice" style="position:absolute; left:0; bottom:0;"><rect width="440" height="200" fill="#020617"/>
        ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 149) % 440}" cy="${(i * 67) % 140}" r="${0.8 + (i % 3) * 0.5}" fill="#E2E8F0" opacity=".6"/>`).join("")}${meteors}
        <rect x="0" y="170" width="440" height="30" fill="#CBD5E1"/><g transform="translate(150 172) scale(.42)"><rect x="0" y="-60" width="300" height="60" rx="10" fill="#57534E"/><rect x="100" y="-120" width="96" height="62" rx="6" fill="#78716C"/><circle cx="60" cy="-14" r="16" fill="#1C1917"/><circle cx="250" cy="-14" r="18" fill="#1C1917"/></g></svg></div>
    ${tag(s + "-trip", "TRACTOR JOURNEY TO ADVANCE BASE", 1160, 630)}
    <div id="${s}-real" class="ui" style="left:1500px; top:380px; padding:8px 16px; border-radius:10px; background:${E.lamp}; font-family:'Archivo Black', sans-serif; font-size:28px; color:#111827; transform:rotate(4deg);">REAL PURPOSE: RESCUE</div>
    <div id="${s}-in" class="ui" style="left:1160px; top:680px; width:660px; height:320px; border-radius:18px; overflow:hidden; border:4px solid #475569; background:${E.pineDk};">
      <svg width="660" height="320" viewBox="0 0 660 320" style="position:absolute; left:0; top:0;"><defs>${filters(s + "I")}</defs><g transform="translate(-180 -140) scale(1.6)">${keyRoom(s + "I", b)}</g></svg>
      <div class="tag" style="position:absolute; left:16px; top:14px;">ADVANCE BASE · 123 MI SOUTH</div></div>
    <div id="${s}-ok" class="ui" style="left:300px; top:960px;"><div class="ui-pill" style="position:relative; border-color:#22C55E;"><div class="dot" style="background:#22C55E;"></div><span>✓ BYRD AGREES ("NO UNNECESSARY RISKS")</span></div></div>
    ${pill(s + "-id", "DR. THOMAS POULTER · SECOND-IN-COMMAND & SCIENTIST")}`;

  const js = `
    ${rigInit(p)}${"\n    "}${rigInit(b)}
    ${life(p, 0.2, 26.0, { every: 3.2 })}
    ${hide(s + "-bub", s + "-no", s + "-prop", s + "-trip", s + "-real", s + "-in", s + "-ok", s + "-id")}
    tl.fromTo("#${s}-id", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 0.3);
    tl.set("#${p}-armL", { rotation: 20 }, 0.02);
    // worried: pacing the shack, hand to chin
    tl.to("#${s}-walk", { x: 140, duration: 1.0, ease: "sine.inOut" }, 5.8);
    tl.to("#${s}-walk", { x: 0, duration: 1.0, ease: "sine.inOut" }, 6.85);
    ${legs(p, 5.8, 7.85)}
    tl.to("#${p}-armR", { rotation: 150, duration: .4 }, 6.0); tl.to("#${p}-foreR", { rotation: 40, duration: .4 }, 6.0);
    tl.to("#${p}-armR", { rotation: 0, duration: .4 }, 9.2); tl.to("#${p}-foreR", { rotation: 0, duration: .4 }, 9.2);
    // he couldn't say it openly — Byrd would refuse
    tl.fromTo("#${s}-bub", { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.8)", immediateRender: false }, 9.45);
    tl.fromTo("#${s}-no", { opacity: 0, scale: 1.8, rotation: -10 }, { opacity: 1, scale: 1, rotation: -5, duration: .18, ease: "power3.in", immediateRender: false }, 11.4);
    // the cover story
    tl.to(["#${s}-bub", "#${s}-no"], { opacity: 0, x: -60, duration: .25 }, 12.9);
    tl.to("#${p}-armL", { rotation: 80, duration: .4, ease: "power2.out" }, 13.0);
    tl.fromTo("#${s}-prop", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: .3, ease: "power2.out", immediateRender: false }, 13.05);
    tl.to(".${s}-met", { opacity: 1, duration: .2, stagger: .5 }, 14.0);
    ${[0, 1, 2].map((i) => `tl.fromTo(".${s}-met:nth-of-type(${i + 1})", { x: -40, y: -24 }, { x: 0, y: 0, duration: .5, immediateRender: false }, ${r1(14.0 + i * 0.5)});`).join("\n    ")}
    tl.fromTo("#${s}-trip", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 16.2);
    tl.fromTo("#${s}-real", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: .18, ease: "power3.in", immediateRender: false }, 18.6);
    // across the radio line, Byrd agrees
    tl.to("#${s}-trip", { opacity: 0, duration: .2 }, 20.6);
    tl.fromTo("#${s}-in", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .3, ease: "power2.out", immediateRender: false }, 20.8);
    tl.set("#${b}-armR", { rotation: -12 }, 20.8); tl.set("#${b}-lids", { scaleY: .35 }, 20.8);
    ${Array.from({ length: 12 }, (_, i) => `tl.to("#${b}-foreR", { rotation: ${i % 2 ? 0 : -7}, svgOrigin: "142 147", duration: .1, ease: "none" }, ${r1(21.6 + i * 0.3)});`).join("\n    ")}
    ${shiver(b, 20.9, 26.0, 1.5)}
    tl.fromTo("#${s}-ok", { opacity: 0, scale: .6, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 22.8);`;

  return { id: "poulter", html: scene("poulter", { css: KIT_CSS + E3_CSS, body, js, bg: "#2A1A0E" }) };
}
