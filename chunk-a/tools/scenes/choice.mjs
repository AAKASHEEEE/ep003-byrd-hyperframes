// A02 (19.4–28.0): the impossible choice. Close-up: telegraph table, Byrd's trembling hand rises from the floor toward the brass key.
// VO (local = abs − 19.4): "He has one choice. (0.23) Tell the truth (1.89) and bring rescuers out to die… (2.91) or say nothing. (5.06–6.05)
//   [1.35 s silence] He said nothing. (7.40–8.34)"
import { C, r1, filters, scene } from "../lib.mjs";
import { KIT_CSS, hide } from "./kit.mjs";
import { E, E3_CSS, halftrack } from "./e3.mjs";

export function build() {
  const s = "ch";
  const planks = Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${60 + i * 64}" x2="1920" y2="${60 + i * 64}" stroke="#2B1A0C" stroke-width="5"/>`).join("");
  const sosIcon = `<svg width="320" height="170" viewBox="0 0 320 170"><rect x="0" y="92" width="320" height="16" fill="#E2E8F0"/>
      <polygon points="104,92 128,168 146,128 168,170 186,124 212,92" fill="#050811" stroke="#60A5FA" stroke-width="4" stroke-linejoin="round"/>
      <g transform="translate(158 160) rotate(40) scale(.5) translate(-300 0)">${halftrack(s + "-icon", s, { light: false, crew: 0 })}</g>
      <g id="${s}-haz"><polygon points="268,8 312,82 224,82" fill="${E.warn}" stroke="#FEE2E2" stroke-width="4" stroke-linejoin="round"/><rect x="264" y="30" width="8" height="30" rx="3" fill="#fff"/><circle cx="268" cy="70" r="5" fill="#fff"/></g></svg>`;
  const keyIcon = `<svg width="320" height="170" viewBox="-40 -25 320 170"><rect x="70" y="72" width="100" height="16" rx="3" fill="#B08D3C"/><line x1="86" y1="66" x2="150" y2="56" stroke="#8A6D2F" stroke-width="8" stroke-linecap="round"/>
      <circle cx="152" cy="54" r="11" fill="#14171F"/><circle cx="120" cy="64" r="50" fill="none" stroke="#94A3B8" stroke-width="7"/><line x1="86" y1="98" x2="154" y2="30" stroke="#94A3B8" stroke-width="7"/></svg>`;
  const card = (id, x, border, k, t, icon, w, wc) => `<div id="${id}" class="e-card" style="left:${x}px; top:110px; height:450px; border-color:${border};">
      <div class="k">${k}</div><div class="t">${t}</div><div style="margin-top:8px;">${icon}</div><div class="w" style="color:${wc};">${w}</div></div>`;
  const body = `
    <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect width="1920" height="1080" fill="#3B2414"/>${planks}
      <circle id="${s}-glow" cx="1180" cy="640" r="420" fill="${E.lamp}" opacity=".16" filter="url(#${s}-bloom)"/>
      <rect x="0" y="736" width="1920" height="40" fill="#7A4E2D"/><rect x="0" y="776" width="1920" height="70" fill="#5A3820"/><rect x="0" y="846" width="1920" height="234" fill="#1A0F07"/>
      <rect x="330" y="560" width="260" height="176" rx="8" fill="#1F2937" stroke="#0B0F17" stroke-width="5"/>
      <rect x="352" y="530" width="26" height="34" rx="10" fill="#FDE68A" opacity=".55"/><rect x="398" y="524" width="26" height="40" rx="10" fill="#FDE68A" opacity=".55"/><rect x="444" y="530" width="26" height="34" rx="10" fill="#FDE68A" opacity=".55"/>
      <circle cx="410" cy="650" r="34" fill="#052e16"/><circle id="${s}-dial" cx="410" cy="650" r="34" fill="#22C55E" opacity=".35"/><circle cx="520" cy="630" r="14" fill="#94A3B8"/><circle cx="520" cy="690" r="11" fill="#94A3B8"/>
      <rect x="930" y="700" width="300" height="40" rx="6" fill="#B08D3C" stroke="#7A5F27" stroke-width="4"/>
      <circle cx="980" cy="690" r="16" fill="#8A6D2F"/><line x1="980" y1="688" x2="1160" y2="664" stroke="#8A6D2F" stroke-width="16" stroke-linecap="round"/>
      <circle cx="1166" cy="656" r="28" fill="#14171F" stroke="#475569" stroke-width="3"/>
      <g id="${s}-arm">
        <path d="M1700 1200 L1352 742 L1296 790 L1560 1200 Z" fill="#334155"/>
        ${[0, 1, 2, 3, 4].map((i) => `<line x1="${1372 + i * 60 - 30}" y1="${790 + i * 80}" x2="${1330 + i * 60 - 30}" y2="${770 + i * 80}" stroke="#2A3646" stroke-width="6"/>`).join("")}
        <rect x="-46" y="-30" width="92" height="60" rx="22" fill="#475569" stroke="#14171F" stroke-width="4" transform="translate(1322 760) rotate(-38)"/>
        <ellipse cx="1262" cy="690" rx="54" ry="40" fill="#14171F" stroke="#475569" stroke-width="3" transform="rotate(-38 1262 690)"/>
        <path d="M1238 650 L1186 600" stroke="#14171F" stroke-width="24" stroke-linecap="round"/><path d="M1238 650 L1186 600" stroke="#475569" stroke-width="3" stroke-linecap="round" opacity=".0"/>
        <path d="M1222 690 L1178 668" stroke="#14171F" stroke-width="22" stroke-linecap="round"/>
        ${[[1290, 650], [1302, 674], [1306, 700]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="#14171F" stroke="#475569" stroke-width="3"/>`).join("")}
        <circle cx="1186" cy="600" r="12" fill="#14171F" stroke="#475569" stroke-width="3"/><circle cx="1178" cy="668" r="11" fill="#14171F" stroke="#475569" stroke-width="3"/></g>
    </svg>
    <div id="${s}-dark" style="position:absolute; inset:0; background:#05070B;"></div>
    <div id="${s}-one" class="ui k-box" style="top:150px;"><div>HE HAS <span style="color:${C.gold};">ONE</span> CHOICE</div></div>
    ${card(s + "-c1", 230, E.warn, "OPTION 1", "SEND &ldquo;S.O.S.&rdquo;", sosIcon, "⚠ RESCUERS DIE IN THE DARK", "#F87171")}
    ${card(s + "-c2", 1130, "#475569", "OPTION 2", "SAY NOTHING", keyIcon, "STAY SILENT", "#94A3B8")}
    <svg id="${s}-crack" class="stage" viewBox="0 0 1920 1080"><path d="M520 160 L470 300 L540 360 L480 545 M470 300 L300 330 M540 360 L780 400" fill="none" stroke="#F8FAFC" stroke-width="5" stroke-linecap="round"/></svg>
    <div id="${s}-final" class="e-big" style="top:400px; font-size:120px;">HE SAID NOTHING.</div>`;

  const js = `
    ${hide(s + "-dark", s + "-one", s + "-c1", s + "-c2", s + "-crack", s + "-final")}
    tl.set("#${s}-arm", { rotation: 26, svgOrigin: "1620 1180" }, 0);
    tl.to("#${s}-haz", { opacity: .25, duration: .2, yoyo: true, repeat: 13, ease: "none" }, 2.0);
    tl.to("#${s}-dial", { opacity: .8, duration: .5, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0);
    tl.fromTo("#${s}-one", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 0.3);
    tl.to("#${s}-one", { opacity: 0, duration: .2 }, 1.75);
    // the hand rises from the floor toward the key, trembling
    tl.to("#${s}-arm", { rotation: 3, svgOrigin: "1620 1180", duration: 1.6, ease: "power1.inOut" }, 0.6);
    tl.to("#${s}-arm", { rotation: 0, svgOrigin: "1620 1180", duration: 2.6, ease: "sine.inOut" }, 2.2);
    ${Array.from({ length: 36 }, (_, i) => `tl.to("#${s}-arm", { x: ${i % 2 ? -2 : 2}, y: ${i % 3 ? 1.5 : -1.5}, duration: .07, ease: "none" }, ${r1(2.2 + i * 0.14)});`).join("\n    ")}
    // OPTION 1 on "Tell the truth", OPTION 2 on "or say nothing" (spring pop, opacity never bounces)
    tl.fromTo("#${s}-c1", { opacity: 0, scale: .6 }, { opacity: 1, scale: 1.06, duration: .17, ease: "power2.out", immediateRender: false }, 1.9);
    tl.to("#${s}-c1", { scale: 1, duration: .1 }, 2.07);
    tl.fromTo("#${s}-c2", { opacity: 0, scale: .6 }, { opacity: 1, scale: 1.06, duration: .17, ease: "power2.out", immediateRender: false }, 5.1);
    tl.to("#${s}-c2", { scale: 1, duration: .1 }, 5.27);
    // the silence: the hand hovers an inch from the key
    tl.to("#${s}-glow", { opacity: .07, duration: 1.2 }, 6.1);
    // "He said nothing": the hand pulls back and drops; option 1 cracks and falls; the answer locks in the centre
    tl.to("#${s}-arm", { y: 700, duration: .45, ease: "power2.in" }, 7.4);
    tl.set("#${s}-crack", { opacity: 1 }, 7.4);
    tl.to(["#${s}-c1", "#${s}-crack"], { y: 160, rotation: -8, opacity: 0, duration: .2, ease: "power2.in" }, 7.4);
    tl.to("#${s}-c2", { x: -400, y: 60, scale: 1.1, duration: .2, ease: "power3.out" }, 7.45);
    tl.to("#${s}-dark", { opacity: .78, duration: .3 }, 7.45);
    tl.set("#${s}-c2", { opacity: 0 }, 7.65);
    tl.fromTo("#${s}-final", { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: .14, ease: "power2.out", immediateRender: false }, 7.65);`;

  return { id: "choice", html: scene("choice", { css: KIT_CSS + E3_CSS, body, js, bg: "#3B2414" }) };
}
