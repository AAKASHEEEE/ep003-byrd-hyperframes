// A04 (53.7–71.1): the 3-suspect lineup (stove · radio · wind) -> wind ruled out -> push into the stove: the invisible killer.
// VO (local = abs − 53.7): "For more than four months, (0.22) his only company was a stove, (1.85) a radio (3.95) and the wind. (4.82–5.52)
//   And the thing that nearly killed him wasn't the cold outside. (6.08–9.60) It was something inside the hut with him, (9.92)
//   something he couldn't see, (12.38) couldn't smell, (14.17) and couldn't live without. (15.20–16.33)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, room, byrd } from "./e3.mjs";

const HX = 638, HY = 290;
const RS = 3.2, RXs = -200, RYs = -198; // interior close-up: room scale + offset (stove centred ~ (820, 640))
export function build() {
  const s = "su", p = "su-by";
  const cardX = [330, 770, 1210];
  const cone = (x) => `<polygon points="${x + 150},0 ${x + 230},0 ${x + 380},330 ${x},330" fill="url(#${s}-cone)"/>`;
  const stoveArt = `<svg width="380" height="380" viewBox="0 0 380 380"><circle cx="190" cy="210" r="120" fill="${E.lamp}" opacity=".18"/>
      <rect x="178" y="20" width="24" height="120" fill="#94A3B8"/><rect x="120" y="130" width="140" height="18" fill="#111827"/>
      <rect x="128" y="146" width="124" height="170" rx="12" fill="#1F2937" stroke="#0B0F17" stroke-width="5"/><rect x="152" y="190" width="76" height="52" rx="6" fill="${E.lamp}"/>
      <rect x="140" y="312" width="16" height="30" fill="#0B0F17"/><rect x="224" y="312" width="16" height="30" fill="#0B0F17"/></svg>`;
  const radioArt = `<svg width="380" height="380" viewBox="0 0 380 380"><rect x="80" y="110" width="220" height="170" rx="10" fill="#1F2937" stroke="#0B0F17" stroke-width="5"/>
      ${[110, 160, 210].map((x) => `<rect x="${x}" y="70" width="30" height="44" rx="12" fill="#FDE68A" opacity=".6"/>`).join("")}
      <circle cx="150" cy="200" r="36" fill="#052e16"/><circle cx="150" cy="200" r="36" fill="#22C55E" opacity=".45"/><circle cx="250" cy="180" r="14" fill="#94A3B8"/><circle cx="250" cy="230" r="11" fill="#94A3B8"/>
      <rect x="110" y="300" width="160" height="22" rx="4" fill="#B08D3C"/><line x1="130" y1="296" x2="250" y2="284" stroke="#8A6D2F" stroke-width="9" stroke-linecap="round"/><circle cx="254" cy="282" r="13" fill="#14171F"/></svg>`;
  const windArt = `<svg width="380" height="380" viewBox="0 0 380 380"><g fill="none" stroke="#CBD5E1" stroke-width="10" stroke-linecap="round">
      <path d="M40 140 H250 a40 40 0 1 0 -40 -40"/><path d="M60 200 H300 a36 36 0 1 1 -36 36"/><path d="M40 270 H200 a30 30 0 1 0 -30 -30"/></g>
      ${[[90, 90], [300, 120], [130, 320], [320, 300], [60, 220]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#F8FAFC"/>`).join("")}</svg>`;
  const sus = (i, art, label) => `<div id="${s}-c${i}" class="e-sus" style="left:${cardX[i]}px; top:330px;"><div style="position:absolute; left:0; top:20px;">${art}</div><div class="n">${label}</div></div>`;
  const haze = [[0, 0, 40], [40, -30, 34], [-36, -22, 30], [70, 20, 26], [-60, 26, 28]].map(([x, y, r], i) => `<circle id="${s}-hz${i}" cx="${HX + x * 1.6}" cy="${HY + y * 1.6}" r="${r * 2}" fill="${i % 2 ? E.haze : E.co}" opacity=".35" filter="url(#${s}-soft)"/>`).join("");
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">
      <svg class="stage" viewBox="0 0 1920 1080"><defs><linearGradient id="${s}-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF7E0" stop-opacity=".0"/><stop offset="1" stop-color="#FFF7E0" stop-opacity=".22"/></linearGradient></defs>
        ${cardX.map((x, i) => `<g id="${s}-cone${i}">${cone(x)}</g>`).join("")}</svg>
      ${sus(0, stoveArt, "1. A STOVE")}${sus(1, radioArt, "2. A RADIO")}${sus(2, windArt, "3. THE WIND")}
      <div id="${s}-x" class="e-stamp" style="left:1236px; top:520px; color:#EF4444; border-color:#EF4444; font-size:40px; padding:12px 22px;">✕ NOT THE KILLER</div>
    </div>
    <div id="${s}-S2" style="position:absolute; inset:0; background:${E.pineDk};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <g transform="translate(${RXs} ${RYs}) scale(${RS})">${room(s, { pipeTop: 0 })}</g>
      <g transform="translate(${262 - 100 * 2.78} ${r1(RYs + 320 * RS - 265 * 2.78)}) scale(2.78)">${byrd(p, s, { outfit: "sweater" })}</g>
      ${haze}
      <g id="${s}-q"><text x="${HX + 110}" y="${HY + 50}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="96" fill="#E9D5FF" opacity=".85">?</text></g>
    </svg>
      ${tag(s + "-t1", "⊘ CAN'T SEE IT", 1300, 260)}${tag(s + "-t2", "⊘ CAN'T SMELL IT", 1300, 340)}${tag(s + "-t3", "⚠ CAN'T LIVE WITHOUT IT", 520, 880)}</div>
    ${tag(s + "-hd", "FOR 4+ MONTHS · HIS ONLY COMPANY", 640, 220)}
    <div id="${s}-sub" class="ui" style="left:0; right:0; top:108px; display:flex; justify-content:center;"><div style="display:flex; align-items:center; gap:18px; height:72px; padding:0 14px 0 30px; border-radius:36px; background:rgba(17,24,39,.94); border:2px solid #334155;">
      <span style="font-family:'Archivo Black', sans-serif; font-size:30px; color:#fff;">EDGE OF ENDURANCE</span>
      <span id="${s}-subbtn" style="display:flex; align-items:center; gap:10px; height:52px; padding:0 24px; border-radius:26px; background:${E.warn}; font-weight:800; font-size:28px; letter-spacing:.06em; color:#fff;"><svg width="26" height="28" viewBox="0 0 26 28"><path d="M13 2 C7 2 5 7 5 12 V18 L2 22 H24 L21 18 V12 C21 7 19 2 13 2 Z" fill="#fff"/><circle cx="13" cy="25" r="3" fill="#fff"/></svg>SUBSCRIBE</span></div></div>`;

  const js = `
    ${rigInit(p)}
    tl.set("#${p}-lids", { scaleY: .45 }, 0.01);
    ${life(p, 10.6, 17.4, { noBlink: true })}
    tl.set("#${p}-ache", { opacity: 0 }, 0);
    ${hide(s + "-S2", s + "-c0", s + "-c1", s + "-c2", s + "-cone0", s + "-cone1", s + "-cone2", s + "-x", s + "-hd", s + "-sub", s + "-t1", s + "-t2", s + "-t3", s + "-q", ...[0, 1, 2, 3, 4].map((i) => `${s}-hz${i}`))}
    tl.fromTo("#${s}-hd", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 0.3);
    tl.fromTo("#${s}-sub", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 0.3);
    tl.to("#${s}-subbtn", { scale: 1.1, duration: .12, yoyo: true, repeat: 1 }, 1.4);
    tl.to("#${s}-sub", { opacity: 0, y: -20, duration: .25 }, 5.3);
    // spotlight relay: stove, radio, wind
    ${[3.0, 3.95, 4.85].map((t, i) => `tl.set("#${s}-cone${i}", { opacity: 1 }, ${t});
    tl.fromTo("#${s}-c${i}", { opacity: 0, scale: .6 }, { opacity: 1, scale: 1.06, duration: .17, ease: "power2.out", immediateRender: false }, ${t});
    tl.to("#${s}-c${i}", { scale: 1, duration: .1 }, ${r1(t + 0.17)});`).join("\n    ")}
    tl.to("#${s}-S1", { scale: 1.05, transformOrigin: "50% 55%", duration: 4.2, ease: "sine.inOut" }, 5.6);
    ${[0, 1].map((i) => `tl.to("#${s}-cone${i}", { opacity: .55, duration: .8, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${5.8 + i * 0.4});`).join(" ")}
    // "wasn't the cold outside": the wind is ruled out
    tl.fromTo("#${s}-x", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: .14, ease: "power2.in", immediateRender: false }, 8.9);
    tl.to(["#${s}-c2", "#${s}-cone2"], { opacity: .2, duration: .3 }, 9.1);
    // "something inside the hut with him": push into the stove card, hard cut inside the hut
    tl.to("#${s}-hd", { opacity: 0, duration: .15 }, 9.9);
    tl.to("#${s}-S1", { scale: 3.4, transformOrigin: "${520 / 19.2}% ${560 / 10.8}%", duration: .55, ease: "power3.in" }, 9.95);
    tl.set("#${s}-S1", { opacity: 0 }, 10.5);
    tl.set("#${s}-S2", { opacity: 1 }, 10.5);
    // warming his hands at the stove
    tl.set("#${p}-armR", { rotation: -58 }, 10.5);
    tl.set("#${p}-foreR", { rotation: 0 }, 10.5);
    tl.set("#${p}-armL", { rotation: 150 }, 10.5);
    tl.set("#${p}-foreL", { rotation: 40 }, 10.5);
    tl.to("#${p}-ache", { opacity: 1, duration: .3 }, 12.4);
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `tl.to("#${p}-ache", { scale: ${i % 2 ? 1 : 1.14}, svgOrigin: "100 56", duration: .4, ease: "sine.inOut" }, ${r1(12.6 + i * 0.42)});`).join(" ")}
    tl.to("#${s}-stoveglow", { opacity: .55, duration: .5, yoyo: true, repeat: 12, ease: "sine.inOut" }, 10.5);
    // the haze curls out of the stovepipe joint
    ${[0, 1, 2, 3, 4].map((i) => `tl.fromTo("#${s}-hz${i}", { opacity: 0, scale: .3, svgOrigin: "${HX} ${HY}" }, { opacity: .4, scale: 1.5, x: ${[-260, -180, -330, -120, -230][i]}, y: ${[-20, 30, -40, 60, 10][i]}, svgOrigin: "${HX} ${HY}", duration: 5.5, ease: "sine.out", immediateRender: false }, ${r1(11.0 + i * 0.35)});`).join("\n    ")}
    tl.fromTo("#${s}-q", { opacity: 0, scale: .5, svgOrigin: "${HX} ${HY}" }, { opacity: 1, scale: 1, svgOrigin: "${HX} ${HY}", duration: .3, ease: "back.out(1.6)", immediateRender: false }, 11.4);
    tl.fromTo("#${s}-t1", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 12.4);
    tl.fromTo("#${s}-t2", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 14.2);
    tl.fromTo("#${s}-t3", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 15.2);`;

  return { id: "suspects", html: scene("suspects", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
