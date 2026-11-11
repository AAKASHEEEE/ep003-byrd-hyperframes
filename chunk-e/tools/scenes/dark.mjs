// E01 (0–12.6): Part 3 — hard cut from Chunk D's iris; the board lights card 3, which docks; the last sunset of late April at 80°S;
//   the sky goes abyssal black and a MAY → AUGUST bar stamps "no sunrise".
// VO (abs, pauses inserted): "Part three. (0.22) Living in the dark. (1.36) The second problem was the dark. (2.80–4.50) At that latitude, (5.05) the sun set
//   for the winter in late April. (6.36–8.44) After that, (8.89) there was no sunrise. (9.79) Not for months. (11.38–12.26)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, badge, pill, tag, hide, breath, bridge, bridgeJs } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";
import { board, MX } from "./e5.mjs";

const HZ = 580;
export function build() {
  const s = "dk", p = "dk-by";
  const months = ["MAY", "JUNE", "JULY", "AUGUST"];
  const sunX = (i) => 520 + i * 300;
  const nosun = (i) => `<g id="${s}-ns${i}" opacity="0"><circle cx="${sunX(i)}" cy="290" r="30" fill="none" stroke="#64748B" stroke-width="5"/>
      <line x1="${sunX(i) - 30}" y1="320" x2="${sunX(i) + 30}" y2="260" stroke="${E.warn}" stroke-width="6"/>
      <text x="${sunX(i)}" y="370" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="30" fill="#CBD5E1">${months[i]}</text></g>`;
  const body = `
    <div id="${s}-B" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">${board(s, 2)}</div>
    <div id="${s}-S" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}
      <linearGradient id="${s}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E2A4A"/><stop offset=".85" stop-color="#7C4A3A"/><stop offset="1" stop-color="#F59E0B"/></linearGradient></defs>
      <rect width="1920" height="${HZ}" fill="url(#${s}-sky)"/>
      <g id="${s}-sun"><circle cx="1380" cy="${HZ - 10}" r="70" fill="#F59E0B" opacity=".35" filter="url(#${s}-glowBig)"/><circle cx="1380" cy="${HZ - 10}" r="40" fill="#FDBA74"/></g>
      <rect id="${s}-night" width="1920" height="${HZ}" fill="#030508" opacity="0"/>
      ${Array.from({ length: 70 }, (_, i) => `<circle class="${s}-star" cx="${(i * 389) % 1920}" cy="${(i * 151) % (HZ - 60)}" r="${1 + (i % 3) * 0.6}" fill="#E2E8F0" opacity="0"/>`).join("")}
      <line x1="${sunX(0) - 60}" y1="290" x2="${sunX(3) + 60}" y2="290" stroke="#334155" stroke-width="4" stroke-dasharray="12 10" id="${s}-bar" opacity="0"/>
      ${[0, 1, 2, 3].map(nosun).join("")}
      <rect y="${HZ}" width="1920" height="${1080 - HZ}" fill="#CBD5E1"/><rect id="${s}-gdark" y="${HZ}" width="1920" height="${1080 - HZ}" fill="#0F172A" opacity="0"/>
      <line x1="0" y1="${HZ}" x2="1920" y2="${HZ}" stroke="#F8FAFC" stroke-width="3"/>
      <g transform="translate(${520 - 100 * 1.3} ${r1(HZ + 180 - 265 * 1.3)}) scale(1.3)">${byrd(p, s, { outfit: "anorak" })}</g>
    </svg>${tag(s + "-ns", "⊘ NO SUNRISE FOR MONTHS", 820, 420)}</div>
    <div id="${s}-dock" class="ui k-dock"><span class="n">PART 3</span>LIVING IN THE DARK</div>
    ${pill(s + "-prob", "PROBLEM #2: THE DARK", "", { top: 196 })}
    ${badge(s + "-b", "LATE APRIL 1934", "80° SOUTH", { fs: 44, w: 400, left: 1328 })}
    ${bridge(s, "d-last.png")}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 5.0, 12.6, { every: 3.0 })}
    ${breath(p, 5.2, 12.4)}
    ${bridgeJs(s)}
    ${hide(s + "-S", s + "-dock", s + "-prob", s + "-b", s + "-ns")}
    // the board: card 3 lights and docks as the chapter header
    tl.to("#${s}-m2", { color: "${C.cyan}", borderColor: "${C.cyan}", boxShadow: "0 0 40px ${C.cyan}", duration: .15 }, 0.35);
    tl.to("#${s}-m2", { scale: 1.25, duration: .25, ease: "back.out(2)" }, 0.5);
    tl.to("#${s}-m2", { x: ${-MX(2) - 60}, y: -330, scale: .25, opacity: 0, duration: .45, ease: "power3.in" }, 1.25);
    tl.fromTo("#${s}-dock", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1.08, x: 0, duration: .17, ease: "power2.out", immediateRender: false }, 1.6);
    tl.to("#${s}-dock", { scale: 1, duration: .1 }, 1.77);
    tl.fromTo("#${s}-prob", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 2.9);
    // the last sunset of late April, 80°S
    tl.set("#${s}-S", { opacity: 1 }, 4.9);
    tl.set("#${s}-B", { opacity: 0 }, 4.9);
    tl.fromTo("#${s}-b", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 5.1);
    tl.to("#${s}-sun", { y: 110, duration: 2.6, ease: "power1.in" }, 6.0);
    tl.to("#${s}-night", { opacity: .98, duration: 1.6, ease: "sine.in" }, 8.4);
    tl.to("#${s}-gdark", { opacity: .7, duration: 1.6 }, 8.4);
    tl.to(".${s}-star", { opacity: .6, duration: .8 }, 9.4);
    // no sunrise: May, June, July, August stamped out
    tl.to("#${s}-bar", { opacity: 1, duration: .3 }, 9.8);
    ${[0, 1, 2, 3].map((i) => `tl.fromTo("#${s}-ns${i}", { opacity: 0, scale: 1.4, svgOrigin: "${sunX(i)} 300" }, { opacity: 1, scale: 1, svgOrigin: "${sunX(i)} 300", duration: .18, ease: "power2.in", immediateRender: false }, ${r1(10.0 + i * 0.42)});`).join("\n    ")}
    tl.fromTo("#${s}-ns", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 10.9);`;

  return { id: "dark", html: scene("dark", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
