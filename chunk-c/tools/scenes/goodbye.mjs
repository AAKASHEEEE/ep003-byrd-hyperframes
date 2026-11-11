// C01 (0–26.6): March 28, 1934 — the tractor crews drive north; their lights shrink to nothing. Age 45, nearest human 123 mi, the sun sinking.
// VO (abs, pauses inserted): "Now imagine saying goodbye. (0.22) On March 28th, 1934, (2.31) the tractor crews who had helped build the hut (4.90)
//   started their engines and drove north. (7.45–9.42) Byrd stood on the snow (9.94) and watched their lights shrink to nothing. (11.77–13.77)
//   [+0.7] He was forty-five years old. (15.04–16.68) The nearest human being was 123 miles away. (17.27–20.70) The sun was getting lower every day.
//   (21.24) And in about a month, (23.51) it would disappear completely. (24.72–26.19)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, badge, pill, tag, hide, breath, count, bridge, bridgeJs } from "./kit.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";

const HZ = 380, G = 700, VP = [1240, HZ];
// Rear view of a Citroën-Kégresse half-track (bottom-centre at 0,0): two track units, boxy cab and cargo, red taillights, headlight glow ahead.
const rear = (id) => `<g id="${id}">
    <ellipse cx="0" cy="-150" rx="170" ry="60" fill="#FDE68A" opacity=".25"/>
    <rect x="-120" y="-70" width="56" height="70" rx="12" fill="#1C1917"/><rect x="64" y="-70" width="56" height="70" rx="12" fill="#1C1917"/>
    ${[-100, -82].map((x) => `<line x1="${x}" y1="-62" x2="${x}" y2="-8" stroke="#44403C" stroke-width="4"/>`).join("")}${[82, 100].map((x) => `<line x1="${x}" y1="-62" x2="${x}" y2="-8" stroke="#44403C" stroke-width="4"/>`).join("")}
    <rect x="-96" y="-150" width="192" height="92" rx="8" fill="#57534E" stroke="#292524" stroke-width="4"/>
    <rect x="-70" y="-196" width="140" height="52" rx="6" fill="#44403C" stroke="#292524" stroke-width="4"/><rect x="-54" y="-188" width="108" height="30" rx="4" fill="#FDE68A" opacity=".35"/>
    <rect x="-84" y="-128" width="168" height="40" rx="4" fill="#78350F"/><line x1="-84" y1="-108" x2="84" y2="-108" stroke="#451A03" stroke-width="3"/>
    <circle cx="-80" cy="-74" r="11" fill="#EF4444"/><circle cx="80" cy="-74" r="11" fill="#EF4444"/>
    <circle cx="-80" cy="-74" r="26" fill="#EF4444" opacity=".35"/><circle cx="80" cy="-74" r="26" fill="#EF4444" opacity=".35"/></g>`;
export function build() {
  const s = "gb", p = "gb-by";
  const tracks = [[960, 1080], [1500, 1080]].map(([x, y]) => `<line x1="${x}" y1="${y}" x2="${VP[0]}" y2="${VP[1]}" stroke="#94A3B8" stroke-width="3" opacity=".5"/>`).join("");
  const body = `
    <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}
      <linearGradient id="${s}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16295A"/><stop offset=".8" stop-color="#3B5BA0"/><stop offset="1" stop-color="#F59E0B" stop-opacity=".55"/></linearGradient>
      <linearGradient id="${s}-snow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#94A3B8"/><stop offset="1" stop-color="#E2E8F0"/></linearGradient></defs>
      <rect width="1920" height="${HZ}" fill="url(#${s}-sky)"/>
      ${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 467) % 1920}" cy="${(i * 113) % 300}" r="${1 + (i % 3) * 0.5}" fill="#E2E8F0" opacity=".45"/>`).join("")}
      <g id="${s}-sun"><circle cx="1560" cy="${HZ - 20}" r="70" fill="#F59E0B" opacity=".35" filter="url(#${s}-glowBig)"/><circle cx="1560" cy="${HZ - 20}" r="44" fill="#FBBF24"/></g>
      <rect y="${HZ}" width="1920" height="${1080 - HZ}" fill="url(#${s}-snow)"/><line x1="0" y1="${HZ}" x2="1920" y2="${HZ}" stroke="#CBD5E1" stroke-width="2"/>
      ${tracks}
      <g id="${s}-t2"><g id="${s}-t2s">${rear(s + "-r2")}</g></g><g id="${s}-t1"><g id="${s}-t1s">${rear(s + "-r1")}</g></g>
      <line x1="200" y1="${G + 10}" x2="200" y2="${G - 300}" stroke="#94A3B8" stroke-width="7"/>
      <g id="${s}-anem"><line x1="160" y1="${G - 300}" x2="240" y2="${G - 300}" stroke="#CBD5E1" stroke-width="4"/><line x1="200" y1="${G - 340}" x2="200" y2="${G - 260}" stroke="#CBD5E1" stroke-width="4"/>
        <circle cx="160" cy="${G - 300}" r="11" fill="#E2E8F0"/><circle cx="240" cy="${G - 300}" r="11" fill="#E2E8F0"/><circle cx="200" cy="${G - 340}" r="11" fill="#E2E8F0"/><circle cx="200" cy="${G - 260}" r="11" fill="#E2E8F0"/></g>
      <rect x="560" y="${G}" width="90" height="14" rx="3" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="3"/><rect x="700" y="${G - 46}" width="14" height="58" fill="#94A3B8"/><rect x="692" y="${G - 52}" width="30" height="8" fill="#64748B"/>
      <g transform="translate(${400 - 100 * 1.6} ${G - 265 * 1.6}) scale(1.6)">${byrd(p, s, { outfit: "anorak" })}</g>
      <rect id="${s}-night" width="1920" height="1080" fill="#050811" opacity="0"/>
    </svg>
    ${tag(s + "-age", "AGE: 45 YEARS OLD", 560, 300)}
    ${tag(s + "-sunset", "SUNSET IN ~1 MONTH (LATE APRIL)", 1180, 250)}
    ${badge(s + "-b", "MARCH 28, 1934", "DAY 1 ALONE", { fs: 40 })}
    ${pill(s + "-near", "NEAREST HUMAN", "0 MI")}
    ${bridge(s, "b-last.png")}`;

  // tractor paths: from foreground to the vanishing point, shrinking to 4% and winking out at 13.2
  // perspective: screen offset from the vanishing point scales with size (sc ~ 1/distance); lights wink out at 13.2
  const drive = (id, x0, y0, t0) => { const ks = [[t0, 1], [t0 + 1.6, 0.55], [t0 + 3.6, 0.3], [t0 + 6.4, 0.15], [11.6, 0.07], [13.2, 0.03]];
    const P = (sc) => ({ x: r1(VP[0] + (x0 - VP[0]) * sc), y: r1(VP[1] + (y0 - VP[1]) * sc) });
    return `tl.set("#${id}", { x: ${x0}, y: ${y0} }, 0); tl.set("#${id}s", { scale: 1, svgOrigin: "0 0" }, 0);
    ${ks.slice(1).map(([t, sc], i) => `tl.to("#${id}", { x: ${P(sc).x}, y: ${P(sc).y}, duration: ${r1(t - ks[i][0])}, ease: "none" }, ${r1(ks[i][0])}); tl.to("#${id}s", { scale: ${sc}, svgOrigin: "0 0", duration: ${r1(t - ks[i][0])}, ease: "none" }, ${r1(ks[i][0])});`).join(" ")}
    tl.to("#${id}", { opacity: 0, duration: .3 }, 13.0);`; };
  const js = `
    ${rigInit(p)}
    ${life(p, 0.4, 26.6, { every: 3.1 })}
    ${breath(p, 0.6, 26.0)}
    ${bridgeJs(s)}
    tl.to("#${s}-anem", { rotation: 1800, svgOrigin: "200 ${G - 300}", duration: 26.6, ease: "none" }, 0);
    ${hide(s + "-age", s + "-sunset", s + "-b", s + "-near")}
    ${drive(s + "-t1", 1020, 1000, 2.4)}
    ${drive(s + "-t2", 1460, 960, 3.0)}
    // the wave goodbye
    tl.to("#${p}-armR", { rotation: -150, duration: .4, ease: "power2.out" }, 2.6);
    ${Array.from({ length: 10 }, (_, i) => `tl.to("#${p}-foreR", { rotation: ${i % 2 ? 18 : -18}, svgOrigin: "142 147", duration: .35, ease: "sine.inOut" }, ${r1(3.0 + i * 0.36)});`).join("\n    ")}
    tl.to("#${p}-foreR", { rotation: 0, duration: .3 }, 6.7);
    tl.to("#${p}-armR", { rotation: -100, duration: 1.2, ease: "sine.inOut" }, 7.0);
    tl.to("#${p}-armR", { rotation: 0, duration: .8, ease: "sine.inOut" }, 13.4);
    tl.fromTo("#${s}-b", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 2.3);
    // "He was forty-five years old" / "123 miles away"
    tl.fromTo("#${s}-age", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 15.1);
    tl.fromTo("#${s}-near", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 17.3);
    ${count(s + "-near-n", 0, 123, 17.4, 2.2, "Math.round(v) + ' MI'")}
    // the sun steps lower and lower, then sets; the snowfield falls into night
    ${[[21.3, 50], [22.6, 100], [24.7, 150]].map(([t, y]) => `tl.to("#${s}-sun", { y: ${y}, duration: .7, ease: "power2.inOut" }, ${t});`).join("\n    ")}
    tl.fromTo("#${s}-sunset", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 23.6);
    tl.to("#${s}-night", { opacity: .78, duration: 3.6, ease: "sine.in" }, 22.8);`;

  return { id: "goodbye", html: scene("goodbye", { css: KIT_CSS + E3_CSS, body, js, bg: "#16295A" }) };
}
