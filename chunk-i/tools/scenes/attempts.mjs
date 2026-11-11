// I02 (20.8–35.5): top-down-style 123-mile route strip LITTLE AMERICA (0 MI) → ADVANCE BASE (123 MI). Attempt #1: the half-track wanders off the route in
//   drifting snow, breaks down, turns back. Attempt #2 (EARLY AUGUST 1934): out to the 23-MILE marker, stalls smoking, turns back — 100 MILES SHORT.
// VO (local = abs − 20.8): "The first attempt failed. (0.33–1.59) The tractor lost its way in the dark, (1.93–3.73) struggled through drifts and broke down,
//   (3.99–6.28) and the crew had to turn back. (6.61–8.09) The second attempt, (8.69) in early August, (9.76) broke down about twenty-three miles out.
//   (11.00–12.98) It turned back too. (13.32–14.33)"
import { C, r1, filters, scene, snow } from "../lib.mjs";
import { KIT_CSS, badge, hide } from "./kit.mjs";
import { E, E3_CSS, halftrack } from "./e3.mjs";

const Y = 560, X0 = 260, X1 = 1660, MI = (m) => r1(X0 + ((X1 - X0) * m) / 123), TK = 0.34;
export function build() {
  const s = "at";
  const sn = snow(s + "-sn", 60, 15, { dx: 600, dy: 60, seed: 12 });
  const mk = (m, lab) => `<g><line x1="${MI(m)}" y1="${Y - 26}" x2="${MI(m)}" y2="${Y + 26}" stroke="#64748B" stroke-width="4"/><text x="${MI(m)}" y="${Y + 66}" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="28" fill="#94A3B8">${lab}</text></g>`;
  const gear = `<g id="${s}-gear" opacity="0"><circle cx="0" cy="0" r="22" fill="${E.warn}"/><circle cx="0" cy="0" r="9" fill="#111827"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<rect x="-5" y="-31" width="10" height="12" fill="${E.warn}" transform="rotate(${a})"/>`).join("")}</g>`;
  const smoke = [0, 1, 2].map((i) => `<circle class="${s}-sm" cx="${i * 10}" cy="${-i * 26}" r="${14 + i * 6}" fill="#94A3B8" opacity="0"/>`).join("");
  const stamp = (id, t, top) => `<div id="${id}" class="ui e-stamp" style="left:300px; top:${top}px; color:#FCA5A5; border-color:${E.warn}; background:rgba(11,16,30,.92); font-size:34px;">${t}</div>`;
  const body = `
    <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect width="1920" height="1080" fill="#0F172A"/>
      ${Array.from({ length: 14 }, (_, i) => `<path d="M${(i * 173) % 1920} ${300 + ((i * 89) % 520)} q60 -18 120 0 q60 18 120 0" fill="none" stroke="#1E293B" stroke-width="10" stroke-linecap="round"/>`).join("")}
      <line x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}" stroke="#475569" stroke-width="8" stroke-dasharray="22 14"/>
      ${mk(23, "23 MI")}${mk(60, "60 MI")}${mk(100, "100 MI")}
      <circle cx="${X0}" cy="${Y}" r="20" fill="${C.cyan}"/><circle cx="${X1}" cy="${Y}" r="20" fill="${E.lamp}"/>
      <g id="${s}-short" opacity="0"><path d="M${MI(23)} ${Y - 90} L${MI(23)} ${Y - 110} L${X1} ${Y - 110} L${X1} ${Y - 90}" fill="none" stroke="${E.warn}" stroke-width="4"/>
        <text x="${r1((MI(23) + X1) / 2)}" y="${Y - 126}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="34" fill="#FCA5A5">100 MILES SHORT</text></g>
      <g id="${s}-mv"><g id="${s}-dir"><g transform="scale(${TK}) translate(-150 0)">${halftrack(s + "-ht", s, { light: false, crew: 0 })}</g></g>
        <g transform="translate(-30 -70)">${gear}</g><g transform="translate(30 -50)">${smoke}</g>
        <text id="${s}-q" x="0" y="-80" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="64" fill="#FDE68A" opacity="0">?</text></g>
      <g id="${s}-drift" opacity="0">${sn.svg}</g>
    </svg>
    <div class="ui tag" style="left:${X0 - 120}px; top:${Y + 100}px;">LITTLE AMERICA (0 MI)</div><div class="ui tag" style="left:${X1 - 200}px; top:${Y + 100}px;">ADVANCE BASE (123 MI)</div>
    ${stamp(s + "-s1", "✕ ATTEMPT #1: LOST IN DRIFTS & BROKE DOWN — TURNED BACK", 790)}${stamp(s + "-s2", "✕ ATTEMPT #2: BROKE DOWN AT 23 MILES — TURNED BACK", 900)}
    ${badge(s + "-b2", "ATTEMPT #2", "EARLY AUGUST 1934", { fs: 36, w: 470, left: 1258 })}`;

  const js = `
    ${hide(s + "-s1", s + "-s2", s + "-b2")}
    tl.set("#${s}-mv", { x: ${X0}, y: ${Y} }, 0);
    ${sn.js}
    // attempt #1: out into the dark, off the route, drifts, breakdown, back
    tl.to("#${s}-mv", { x: ${MI(14)}, duration: 1.6, ease: "power1.inOut" }, 0.4);
    tl.to("#${s}-mv", { x: ${MI(20)}, y: ${Y - 110}, duration: 1.6, ease: "sine.inOut" }, 2.0);
    tl.fromTo("#${s}-q", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 2.2);
    tl.to("#${s}-drift", { opacity: 1, duration: .6 }, 3.6);
    tl.to("#${s}-mv", { x: ${MI(24)}, y: ${Y - 60}, duration: 1.6, ease: "power2.out" }, 3.9);
    tl.to("#${s}-q", { opacity: 0, duration: .2 }, 5.2);
    tl.fromTo("#${s}-gear", { opacity: 0, scale: .4, rotation: 0 }, { opacity: 1, scale: 1, rotation: 90, duration: .4, ease: "back.out(2)", immediateRender: false }, 5.5);
    tl.to("#${s}-gear", { opacity: 0, duration: .2 }, 6.5);
    tl.set("#${s}-dir", { scaleX: -1, svgOrigin: "0 0" }, 6.6);
    tl.to("#${s}-mv", { x: ${X0}, y: ${Y}, duration: 1.6, ease: "power1.inOut" }, 6.7);
    tl.to("#${s}-drift", { opacity: 0, duration: .6 }, 7.6);
    tl.fromTo("#${s}-s1", { opacity: 0, scale: 1.6, rotation: -4 }, { opacity: 1, scale: 1, rotation: -2, duration: .18, ease: "power3.in", immediateRender: false }, 6.8);
    // attempt #2: early August, out to the 23-mile marker, stall, back
    tl.set("#${s}-dir", { scaleX: 1, svgOrigin: "0 0" }, 8.6);
    tl.fromTo("#${s}-b2", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 9.8);
    tl.to("#${s}-mv", { x: ${MI(23)}, duration: 2.0, ease: "power1.inOut" }, 10.6);
    tl.to(".${s}-sm", { opacity: .8, duration: .3, stagger: .15 }, 12.5);
    tl.fromTo(".${s}-sm", { y: 0 }, { y: -30, duration: 1.4, stagger: .15, immediateRender: false }, 12.5);
    tl.to("#${s}-short", { opacity: 1, duration: .3 }, 12.7);
    tl.to(".${s}-sm", { opacity: 0, duration: .3 }, 13.5);
    tl.set("#${s}-dir", { scaleX: -1, svgOrigin: "0 0" }, 13.3);
    tl.to("#${s}-mv", { x: ${X0}, duration: 1.2, ease: "power1.inOut" }, 13.4);
    tl.fromTo("#${s}-s2", { opacity: 0, scale: 1.6, rotation: -4 }, { opacity: 1, scale: 1, rotation: -2, duration: .18, ease: "power3.in", immediateRender: false }, 12.05);`;

  return { id: "attempts", html: scene("attempts", { css: KIT_CSS + E3_CSS, body, js, bg: "#0F172A" }) };
}
