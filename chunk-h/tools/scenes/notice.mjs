// H03 (43.5–65.2): a radio link 123 miles long; then the Little America radio shack — 2 operators in headphones at the receiver beside a 4-row
//   SIGNAL ANOMALY LOG that lights clue by clue; banner NOT A BAD SIGNAL — A MAN NOT THINKING STRAIGHT.
// VO (local = abs − 43.5): "But you can only hide so much over a radio. (0.22–2.59) Back at Little America, (3.03) the men listening noticed something was off.
//   (4.58–6.68) His messages were shorter than before. (7.45–9.37) Sometimes they made no sense. (9.86–11.57) Some schedules were missed completely.
//   (12.08–14.16) Words were garbled in a way that didn't sound like a bad signal. (14.69–17.95) It sounded like a man who wasn't thinking straight. (18.47–20.87) [+0.7]"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, pill, tag, hide } from "./kit.mjs";
import { E, E3_CSS } from "./e3.mjs";
import { crew } from "./b3.mjs";
import { shack, PHONES } from "./h8.mjs";

export function build() {
  const s = "nt", o1 = "nt-o1", o2 = "nt-o2";
  const op = (p, outfit, x) => `<g transform="translate(${x - 100} ${860 - 265})">${crew(p, s, outfit, { headwear: PHONES })}</g>`;
  const ROW = (i) => 300 + i * 150;
  const row = (i, title, extra) => `<div id="${s}-r${i}" class="ui" style="left:1130px; top:${ROW(i)}px; width:700px; height:132px; border-radius:16px; background:#111A2E; border:4px solid #334155;">
      <div style="position:absolute; left:24px; top:16px; font-family:'Archivo Black', sans-serif; font-size:32px; color:#F8FAFC;">${title}</div>
      <div id="${s}-f${i}" style="position:absolute; right:22px; top:14px; font-size:34px; color:${E.warn}; opacity:0;">⚑</div>${extra}</div>`;
  const body = `
    <div id="${s}-L" style="position:absolute; inset:0; background:${E.night};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "L")}</defs>
      <line x1="960" y1="880" x2="960" y2="200" stroke="#475569" stroke-width="5" stroke-dasharray="16 14"/>
      <circle cx="960" cy="880" r="16" fill="${E.lamp}"/><circle cx="960" cy="200" r="16" fill="${C.cyan}"/>
      <g id="${s}-pulse"><circle cx="960" cy="880" r="14" fill="none" stroke="${C.cyan}" stroke-width="5"/><circle cx="960" cy="880" r="28" fill="none" stroke="${C.cyan}" stroke-width="3" opacity=".5"/></g></svg>
      <div class="ui tag" style="left:1000px; top:860px;">ADVANCE BASE · BYRD</div><div class="ui tag" style="left:1000px; top:180px;">LITTLE AMERICA</div>
      <div class="ui" style="left:640px; top:520px; font-family:'Archivo Black', sans-serif; font-size:40px; color:#CBD5E1;">123 MILES</div></div>
    <div id="${s}-S" style="position:absolute; inset:0; background:#2A1A0E;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      ${shack(s)}${op(o1, "crew2", 360)}${op(o2, "crew3", 520)}</svg>
      <div class="ui" style="left:1130px; top:200px; font-family:'Archivo Black', sans-serif; font-size:36px; color:#FBBF24;">SIGNAL ANOMALY LOG</div>
      ${row(0, "1. MESSAGES SHORTER", `<div style="position:absolute; left:24px; top:76px; width:560px; height:26px; border-radius:8px; background:#1E293B;"><div id="${s}-bar" style="width:100%; height:100%; border-radius:8px; background:#38BDF8;"></div></div>`)}
      ${row(1, "2. MADE NO SENSE", `<div style="position:absolute; left:24px; top:72px; font-family:'JetBrains Mono', monospace; font-size:32px; color:#FCA5A5;">"WX … ?? … ??"</div>`)}
      ${row(2, "3. MISSED SCHEDULES", `<div style="position:absolute; left:24px; top:72px; font-family:'JetBrains Mono', monospace; font-size:30px; color:#FCA5A5;">CHECK-IN: NO RESPONSE ✕</div>`)}
      ${row(3, "4. GARBLED WORDS", `<svg width="240" height="50" style="position:absolute; left:24px; top:70px;"><path d="M0 25 q15 -22 30 0 q15 22 30 0 q15 -22 30 0 q15 22 30 0 q15 -22 30 0 q15 22 30 0 q15 -22 30 0 q15 22 30 0" fill="none" stroke="#22D3EE" stroke-width="4"/></svg>
        <div style="position:absolute; left:276px; top:58px; font-family:Inter, sans-serif; font-weight:800; font-size:28px; color:#67E8F9;">SIGNAL: CLEAR ✓</div>
        <div style="position:absolute; left:276px; top:90px; font-family:'JetBrains Mono', monospace; font-size:28px; color:#FCA5A5;">"T-E…M ?? O…K"</div>`)}
      <div id="${s}-ban" class="ui k-lab" style="left:160px; width:1600px; top:940px;"><div style="background:rgba(11,16,30,.95); border:3px solid ${E.warn}; font-size:38px;">NOT A BAD SIGNAL — A MAN NOT THINKING STRAIGHT</div></div>
      ${pill(s + "-la", "LITTLE AMERICA RADIO SHACK · 123 MILES NORTH")}</div>`;

  const js = `
    ${rigInit(o1)}${"\n    "}${rigInit(o2)}
    ${life(o1, 3.2, 21.7, { every: 3.1 })}${"\n    "}${life(o2, 3.4, 21.7, { every: 2.7 })}
    ${hide(s + "-S", s + "-la", s + "-r0", s + "-r1", s + "-r2", s + "-r3", s + "-ban")}
    // the only link: a radio signal 123 miles long
    ${[0, 1].map((i) => `tl.fromTo("#${s}-pulse", { y: 0, opacity: 1 }, { y: -680, opacity: .6, duration: 1.2, ease: "none", immediateRender: false }, ${r1(0.3 + i * 1.3)});`).join("\n    ")}
    // the shack: operators listening
    tl.set("#${s}-S", { opacity: 1 }, 3.0); tl.set("#${s}-L", { opacity: 0 }, 3.0);
    tl.fromTo("#${s}-la", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 3.1);
    tl.set("#${o1}-armR", { rotation: -150 }, 3.0); tl.set("#${o1}-foreR", { rotation: -60 }, 3.0);
    tl.to("#${o1}-head", { rotation: 8, svgOrigin: "100 96", duration: .4 }, 4.6);
    tl.to("#${o2}-head", { rotation: -6, svgOrigin: "100 96", duration: .4 }, 4.8);
    tl.to("#${o2}-armR", { rotation: -62, duration: .4, ease: "power2.out" }, 7.3);
    // the anomaly log fills, clue by clue
    ${[[0, 7.45], [1, 9.86], [2, 12.08], [3, 14.69]].map(([i, t]) => `tl.fromTo("#${s}-r${i}", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .25, ease: "power2.out", immediateRender: false }, ${t});
    tl.to("#${s}-r${i}", { borderColor: "${E.warn}", duration: .2 }, ${r1(t + 0.4)});
    tl.to("#${s}-f${i}", { opacity: 1, duration: .15 }, ${r1(t + 0.4)});`).join("\n    ")}
    tl.fromTo("#${s}-bar", { width: "100%" }, { width: "20%", duration: 1.2, ease: "power2.inOut", immediateRender: false }, 7.9);
    ${Array.from({ length: 10 }, (_, i) => `tl.to("#${s}-wave", { y: ${i % 2 ? 0 : -2}, duration: .1, ease: "none" }, ${r1(14.7 + i * 0.3)});`).join("\n    ")}
    tl.to("#${o2}-head", { rotation: 6, svgOrigin: "100 96", duration: .5 }, 18.4);
    tl.fromTo("#${s}-ban", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 18.5);`;

  return { id: "notice", html: scene("notice", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
