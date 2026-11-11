// H02 (33.9–43.5): left — gaunt, hollow-eyed Byrd taps the key with a trembling hand (radio on the table, generator on the floor);
//   right top — WHAT HE SENT ON THE RADIO (green): a generic Morse tape, WEATHER NUMBERS · ROUTINE; right bottom — WHAT HE HID (red): 3 cards stamped ⊘ HIDDEN.
// VO (local = abs − 33.9): "So when he could reach the radio, (0.29) he kept his messages short. (2.17–3.58) Weather numbers. (4.04) Routine. (5.13)
//   Nothing about the floor, (6.22) the headaches, (7.62) the fumes. (8.5–9.13)"
import { C, r1, filters, rigInit, scene, shiver } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { E, E3_CSS } from "./e3.mjs";
import { keyRoom } from "./h8.mjs";

const LS = 2.6;
export function build() {
  const s = "hd", p = "hd-by";
  const morse = "·−·· −−− ·−− · ·−· ·· −· −−· ·−− ··· ·− ·−·· −−− −−·  ·−· −−− ··− − ·· −· ·  ·−− −·−− ·−· · ·−−· −−− ·−· − ";
  const card = (i, t) => `<div id="${s}-c${i}" class="ui" style="left:${1000 + i * 276}px; top:660px; width:252px; height:250px; border-radius:16px; background:#111A2E; border:4px solid #7F1D1D; overflow:hidden;">
      <div style="margin:26px 18px 0; white-space:normal; font-family:'Archivo Black', sans-serif; font-size:30px; line-height:1.15; color:#F8FAFC; text-align:center;">${t}</div>
      <div id="${s}-st${i}" style="position:absolute; left:14px; right:14px; bottom:22px; padding:8px 0; border:4px solid ${E.warn}; border-radius:10px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:28px; color:#FCA5A5; transform:rotate(-6deg);">⊘ HIDDEN</div></div>`;
  const body = `
    <div style="position:absolute; left:0; top:0; width:920px; height:1080px; overflow:hidden; background:${E.pineDk};">
      <svg width="920" height="1080" viewBox="0 0 920 1080" style="position:absolute; left:0; top:0;"><defs>${filters(s)}</defs>
        <g transform="translate(${r1(460 - 380 * LS)} ${r1(560 - 210 * LS)}) scale(${LS})">${keyRoom(s, p)}</g></svg>
      ${tag(s + "-rad", "RADIO (ON THE TABLE)", 400, 450)}${tag(s + "-gen", "GENERATOR (FLOOR)", 520, 880)}</div>
    <div style="position:absolute; left:920px; top:0; width:8px; height:1080px; background:#0B101E;"></div>
    <div id="${s}-top" class="ui" style="left:980px; top:150px; width:860px; height:400px; border-radius:20px; border:4px solid #22C55E; background:#0B1A12; overflow:hidden;">
      <div style="position:absolute; left:26px; top:22px; font-family:'Archivo Black', sans-serif; font-size:30px; color:#86EFAC;">WHAT HE SENT ON THE RADIO</div>
      <div style="position:absolute; left:0; right:0; top:120px; height:92px; background:#F5F0E1; border-top:3px solid #D6CFB8; border-bottom:3px solid #D6CFB8;">
        <div id="${s}-tape" style="position:absolute; left:860px; top:14px; white-space:nowrap; font-family:'JetBrains Mono', monospace; font-size:48px; letter-spacing:.08em; color:#111827;">${morse}${morse}</div></div>
      <div id="${s}-w1" class="ui" style="left:40px; top:262px; padding:12px 26px; border-radius:12px; background:#14532D; font-family:'Archivo Black', sans-serif; font-size:34px; color:#DCFCE7;">WEATHER NUMBERS</div>
      <div id="${s}-w2" class="ui" style="left:450px; top:262px; padding:12px 26px; border-radius:12px; background:#14532D; font-family:'Archivo Black', sans-serif; font-size:34px; color:#DCFCE7;">✓ ROUTINE</div></div>
    <div id="${s}-bot" class="ui" style="left:980px; top:590px; width:860px; height:360px; border-radius:20px; border:4px solid ${E.warn}; background:#1A0B0B;">
      <div style="position:absolute; left:26px; top:16px; font-family:'Archivo Black', sans-serif; font-size:30px; color:#FCA5A5;">WHAT HE HID</div></div>
    ${card(0, "1. COLLAPSED ON FLOOR")}${card(1, "2. SEVERE HEADACHES")}${card(2, "3. TOXIC FUMES")}
    <div id="${s}-short" class="ui" style="left:192px; top:108px;"><div class="ui-pill" style="position:relative;"><div class="dot"></div><span>MESSAGES KEPT SHORT</span></div></div>`;

  const js = `
    ${rigInit(p)}
    ${hide(s + "-top", s + "-bot", s + "-c0", s + "-c1", s + "-c2", s + "-st0", s + "-st1", s + "-st2", s + "-w1", s + "-w2", s + "-short", s + "-rad", s + "-gen")}
    tl.set("#${p}-lids", { scaleY: .35 }, 0.02);
    // at the key: arm full length from the shoulder, the hand trembling on the key
    tl.set("#${p}-armR", { rotation: -12 }, 0.02);
    ${Array.from({ length: 30 }, (_, i) => `tl.to("#${p}-foreR", { rotation: ${i % 2 ? 0 : -7}, svgOrigin: "142 147", duration: .1, ease: "none" }, ${r1(0.4 + i * 0.3)});`).join("\n    ")}
    ${shiver(p, 0.1, 9.6, 1.5)}
    tl.fromTo("#${s}-rad", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 0.3);
    tl.fromTo("#${s}-gen", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 0.5);
    tl.to(["#${s}-rad", "#${s}-gen"], { opacity: 0, duration: .25 }, 2.6);
    tl.fromTo("#${s}-top", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: .3, ease: "power2.out", immediateRender: false }, 0.6);
    tl.fromTo("#${s}-tape", { x: 0 }, { x: -1900, duration: 9.0, ease: "none", immediateRender: false }, 0.6);
    tl.fromTo("#${s}-short", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 2.2);
    tl.fromTo("#${s}-w1", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 4.05);
    tl.fromTo("#${s}-w2", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 5.15);
    tl.fromTo("#${s}-bot", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: .3, ease: "power2.out", immediateRender: false }, 5.9);
    ${[[0, 6.25], [1, 7.65], [2, 8.5]].map(([i, t]) => `tl.fromTo("#${s}-c${i}", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, ${t});
    tl.fromTo("#${s}-st${i}", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: .16, ease: "power3.in", immediateRender: false }, ${r1(t + 0.35)});`).join("\n    ")}`;

  return { id: "hide", html: scene("hide", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
