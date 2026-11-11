// B04 (65.2–85.4): "Why one?" — 3-column matrix: 2 men turn on each other ✕ · 3 men need too much cargo ✕ · 1 man needs only enough for himself ✓,
//   then the push into column C: "it would be him".
// VO (local = abs − 65.2): "Why one? (0.22) Byrd's reasoning was simple (1.50) and a little frightening. (3.47–4.44) Two men alone in a tiny hut for
//   months could turn on each other. (5.03–8.47) Three needed more supplies than they could carry. (8.98–11.28) One man needed only enough for
//   himself. (12.03–14.72) And if it was going to be one man, (15.16) Byrd decided, (17.22) [0.6 s] it would be him. (18.93–19.80)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, pill, box, hide } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";
import { crew } from "./b3.mjs";

const CX = [192, 712, 1232], CY = 300, CW = 496, CH = 600, FL = 470; // column svg floor y
export function build() {
  const s = "wo";
  const room = `<rect x="24" y="96" width="448" height="${FL - 96}" fill="${E.pine}"/>${[150, 210, 270, 330, 390].map((y) => `<line x1="24" y1="${y}" x2="472" y2="${y}" stroke="${E.pineDk}" stroke-width="3"/>`).join("")}<rect x="24" y="${FL}" width="448" height="14" fill="${E.pineDk}"/>`;
  const crate = (x, y, w = 70, h = 54) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#78350F" stroke="${E.pineDk}" stroke-width="3"/><path d="M${x} ${y} L${x + w} ${y + h} M${x + w} ${y} L${x} ${y + h}" stroke="${E.pineDk}" stroke-width="2"/></g>`;
  const fig = (id, kind, x, k) => `<g transform="translate(${r1(x - 100 * k)} ${r1(FL - 265 * k)}) scale(${k})">${kind === "byrd" ? byrd(id, s, { outfit: "anorak" }) : crew(id, s, kind)}</g>`;
  const colA = `${room}${fig(s + "-a1", "crew1", 150, .62)}${fig(s + "-a2", "crew3", 346, .62)}
      <g id="${s}-spark"><path d="M206 214 L226 196 L234 220 L256 200 L262 226 L286 206" fill="none" stroke="#FACC15" stroke-width="6" stroke-linejoin="round"/><path d="M212 240 L236 230 L248 250 L270 236 L290 246" fill="none" stroke="${E.warn}" stroke-width="5" stroke-linejoin="round"/></g>`;
  const colB = `${room}${fig(s + "-b1", "crew1", 90, .5)}${fig(s + "-b2", "crew2", 170, .5)}${fig(s + "-b3", "crew3", 250, .5)}
      ${[[300, FL - 54], [372, FL - 54], [300, FL - 108], [372, FL - 108], [336, FL - 162], [300, FL - 216], [372, FL - 216], [336, FL - 270]].map(([x, y]) => crate(x, y)).join("")}
      <g id="${s}-scale" transform="translate(400 130)"><line x1="0" y1="0" x2="0" y2="-10" stroke="#94A3B8" stroke-width="4"/><g transform="rotate(16)"><line x1="-50" y1="0" x2="50" y2="0" stroke="${E.warn}" stroke-width="6"/><circle cx="50" cy="12" r="12" fill="${E.warn}"/><circle cx="-50" cy="12" r="8" fill="#94A3B8"/></g></g>`;
  const colC = `${room}<g id="${s}-cby">${fig(s + "-c1", "byrd", 210, .7)}</g>${crate(330, FL - 54)}${crate(330, FL - 108, 70, 54)}`;
  const col = (i, head, color, inner) => `<div id="${s}-k${i}" style="position:absolute; left:${CX[i]}px; top:${CY}px; width:${CW}px; height:${CH}px; border-radius:22px; overflow:hidden; background:#0B1222; border:4px solid ${color};">
      <svg width="${CW}" height="${CH}" viewBox="0 0 ${CW} ${CH}" style="position:absolute; left:0; top:0;"><defs>${i === 0 ? filters(s) : ""}</defs>${inner}</svg>
      <div class="tag" style="position:absolute; left:24px; top:22px; border-left-color:${color};">${head}</div></div>`;
  const note = (id, text, color, i) => `<div id="${id}" class="ui" style="left:${CX[i] + 24}px; width:${CW - 48}px; top:${CY + 500}px; text-align:center; font-family:Inter, sans-serif; font-weight:800; font-size:28px; letter-spacing:.04em; color:${color};">${text}</div>`;
  const stamp = (id, text, i) => `<div id="${id}" class="e-stamp" style="left:${CX[i] + 34}px; top:${CY + 250}px; font-size:36px; padding:10px 18px; color:#EF4444; border-color:#EF4444; background:#0B101E;">${text}</div>`;
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">
      ${col(0, "OPTION A: 2 MEN", E.warn, colA)}${col(1, "OPTION B: 3 MEN", E.warn, colB)}${col(2, "OPTION C: 1 MAN", E.green, colC)}
      ${note(s + "-n0", "⚠ CABIN FEVER", "#FCA5A5", 0)}${note(s + "-n1", "⚠ TOO MUCH TO HAUL", "#FCA5A5", 1)}${note(s + "-n2", "✓ ENOUGH FOR HIMSELF", "#6EE7B7", 2)}
      ${stamp(s + "-x0", "✕ TOO DANGEROUS", 0)}${stamp(s + "-x1", "✕ IMPOSSIBLE LOAD", 1)}
    </div>
    ${box(s + "-why", `WHY <span style="color:${C.gold};">ONE</span>?`, 140)}
    <div id="${s}-sub" class="ui" style="left:0; right:0; top:250px; text-align:center; font-family:Inter, sans-serif; font-weight:800; font-size:34px; letter-spacing:.08em; color:#CBD5E1;">SIMPLE · AND A LITTLE <span style="color:#FCA5A5;">FRIGHTENING</span></div>
    ${pill(s + "-rule", "COMMANDER'S RULE: “IT WOULD BE HIM”")}`;

  const ids = [s + "-a1", s + "-a2", s + "-b1", s + "-b2", s + "-b3", s + "-c1"];
  const js = `
    ${ids.map((id) => rigInit(id)).join("\n    ")}
    ${ids.map((id, i) => life(id, 0.3 + i * 0.13, 20.2, { every: 2.6 + i * 0.25 })).join("\n    ")}
    tl.set(["#${s}-a1-lids", "#${s}-a2-lids"], { scaleY: .38 }, 0.02);
    ${hide(s + "-sub", s + "-k0", s + "-k1", s + "-k2", s + "-n0", s + "-n1", s + "-n2", s + "-x0", s + "-x1", s + "-why", s + "-rule", s + "-spark")}
    tl.fromTo("#${s}-why", { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: .2, ease: "power2.in", immediateRender: false }, 0.2);
    tl.to("#${s}-why", { scale: 1.12, duration: 4.6, ease: "sine.inOut" }, 0.4);
    tl.fromTo("#${s}-sub", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .3, immediateRender: false }, 1.6);
    tl.to("#${s}-sub", { color: "#F8FAFC", duration: .3 }, 3.5);
    tl.to("#${s}-sub", { opacity: 0, duration: .25 }, 4.8);
    // A: two men, one tiny hut — sparks fly
    tl.fromTo("#${s}-k0", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.4)", immediateRender: false }, 5.0);
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `tl.set("#${s}-spark", { opacity: ${i % 2 ? 0 : 1} }, ${r1(5.8 + i * 0.22)});`).join("\n    ")}
    tl.set("#${s}-spark", { opacity: 1 }, 7.6);
    tl.fromTo("#${s}-n0", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 6.4);
    tl.fromTo("#${s}-x0", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: .14, ease: "power2.in", immediateRender: false }, 7.6);
    // B: three men, a mountain of crates, the scale tips red
    tl.fromTo("#${s}-k1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.4)", immediateRender: false }, 9.0);
    tl.fromTo("#${s}-n1", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 9.8);
    tl.fromTo("#${s}-x1", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: .14, ease: "power2.in", immediateRender: false }, 10.9);
    // C: one man, just enough
    tl.fromTo("#${s}-k2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.4)", immediateRender: false }, 12.05);
    tl.fromTo("#${s}-n2", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 13.3);
    // "if it was going to be one man, Byrd decided": A and B fade back
    tl.to(["#${s}-k0", "#${s}-k1", "#${s}-n0", "#${s}-n1", "#${s}-x0", "#${s}-x1"], { opacity: .22, duration: .4 }, 15.2);
    tl.to("#${s}-why", { opacity: 0, duration: .25 }, 15.2);
    tl.to("#${s}-k2", { boxShadow: "0 0 50px #10B981", duration: .4 }, 15.3);
    // "it would be him": push into column C, Byrd steps forward, eyes narrow
    tl.to("#${s}-W", { scale: 1.6, x: ${r1(960 - (CX[2] + CW / 2))}, y: 60, transformOrigin: "${r1(((CX[2] + CW / 2) / 1920) * 100)}% ${r1(((CY + 300) / 1080) * 100)}%", duration: 1.6, ease: "power2.inOut" }, 17.4);
    tl.to("#${s}-cby", { scale: 1.12, svgOrigin: "210 ${FL}", duration: .5, ease: "power2.out" }, 18.9);
    tl.to("#${s}-c1-lids", { scaleY: .35, duration: .3 }, 19.0);
    tl.fromTo("#${s}-rule", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 17.6);`;

  return { id: "whyone", html: scene("whyone", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
