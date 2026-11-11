// A06 (93.6–106.0): the open loop — the roof hatch glows open, a redacted, padlocked quote ("his first words") docks top-left until Part 6,
//   then the 7-part expedition trail lights up and the camera dives into Part 1 (Chunk B opens on this last frame — hard cut).
// VO (local = abs − 93.6): "And there's a moment at the very end — (0.24) the first words he said when they reached him — (2.34) that tells you
//   everything about this man. (4.77–6.67) Hold on to that. (7.04) We'll get there. (8.18–8.87) Here's how it unfolded, (9.37) in seven parts. (10.83–11.86)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, box, hide } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";

const G = 700, HX = 960;
const LOCK = (w, c = C.gold) => `<svg width="${w}" height="${w * 1.15}" viewBox="0 0 40 46"><path d="M10 20 V13 a10 10 0 0 1 20 0 V20" fill="none" stroke="${c}" stroke-width="5"/><rect x="4" y="20" width="32" height="24" rx="5" fill="${c}"/><circle cx="20" cy="31" r="3.5" fill="#111827"/></svg>`;
export function build() {
  const s = "pt", p = "pt-by";
  const MX = (i) => 192 + i * 226;
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}
      <clipPath id="${s}-above"><rect x="0" y="0" width="1920" height="${G}"/></clipPath>
      <linearGradient id="${s}-col" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${E.lamp}" stop-opacity=".55"/><stop offset="1" stop-color="${E.lamp}" stop-opacity="0"/></linearGradient></defs>
      <rect width="1920" height="1080" fill="${E.night}"/>
      ${Array.from({ length: 70 }, (_, i) => `<circle cx="${(i * 419) % 1920}" cy="${(i * 181) % 640}" r="${1 + (i % 3) * 0.6}" fill="#E2E8F0" opacity=".5"/>`).join("")}
      <rect y="${G}" width="1920" height="${1080 - G}" fill="#1E293B"/><rect y="${G}" width="1920" height="10" fill="${E.glacial}"/>
      <line x1="560" y1="${G}" x2="560" y2="${G - 220}" stroke="#94A3B8" stroke-width="6"/><line x1="1420" y1="${G}" x2="1420" y2="${G - 240}" stroke="#94A3B8" stroke-width="6"/>
      <g id="${s}-colG" opacity="0"><polygon points="${HX - 44},${G} ${HX + 44},${G} ${HX + 120},${G - 420} ${HX - 120},${G - 420}" fill="url(#${s}-col)"/></g>
      <rect x="${HX - 46}" y="${G - 2}" width="92" height="14" fill="#F59E0B" opacity=".9"/>
      <g clip-path="url(#${s}-above)"><g id="${s}-rise"><g transform="translate(${HX - 100 * 1.25} ${G + 40}) scale(1.25)">${byrd(p, s, { outfit: "sweater" })}</g></g></g>
      <g id="${s}-hatch"><rect x="${HX - 46}" y="${G - 8}" width="92" height="12" rx="2" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="3"/></g>
    </svg>
    <div id="${s}-quote" style="position:absolute; left:460px; top:200px; width:1000px; padding:34px 40px 30px; border-radius:26px; background:rgba(17,24,39,.96); border:4px solid ${C.gold}; text-align:center;">
      <div style="display:flex; align-items:center; justify-content:center; gap:22px;">${LOCK(44)}<span style="font-family:Inter, sans-serif; font-weight:800; font-size:30px; letter-spacing:.14em; color:${C.gold};">THE FIRST WORDS HE SAID</span></div>
      <div style="margin-top:18px; font-family:'Archivo Black', sans-serif; font-size:44px; color:${C.gold}; line-height:1.35;">&ldquo;H█████, f██████… I h███ a b███ of h██ s███…&rdquo;</div></div></div>
    <div id="${s}-S2" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">
      <svg class="stage" viewBox="0 0 1920 1080"><line x1="${MX(0) + 90}" y1="590" x2="${MX(6) + 90}" y2="590" stroke="#475569" stroke-width="6" stroke-dasharray="18 14"/></svg>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<div id="${s}-m${i}" class="e-mono" style="left:${MX(i)}px; top:400px;">${i + 1}</div>`).join("")}
    </div>
    ${box(s + "-hd", `136 DAYS ALONE: <span style="color:${C.amber};">7 PARTS</span>`, 210)}
    <div id="${s}-dock" class="ui" style="left:192px; top:108px; display:flex; align-items:center; gap:14px; height:66px; padding:0 26px 0 18px; border-radius:14px; background:rgba(17,24,39,.94); border:3px solid ${C.gold}; font-family:'Archivo Black', sans-serif; font-size:28px; color:#fff;">${LOCK(26)}LOCKED UNTIL PART 6: HIS FIRST WORDS</div>`;

  const js = `
    ${rigInit(p)}
    tl.set("#${p}-lids", { scaleY: .25 }, 0.01);
    ${life(p, 2.4, 9.3, { every: 3 })}
    ${hide(s + "-S2", s + "-quote", s + "-hd", s + "-dock")}
    tl.set("#${s}-rise", { y: 0 }, 0);
    // the roof hatch swings open; warm light pours up into the polar night
    tl.to("#${s}-hatch", { rotation: -100, svgOrigin: "${HX - 46} ${G}", duration: .45, ease: "power2.out" }, 0.3);
    tl.to("#${s}-colG", { opacity: 1, duration: .4 }, 0.5);
    tl.to("#${s}-rise", { y: -220, duration: 1.0, ease: "power2.out" }, 1.2);
    // the quote rises, redacted and padlocked
    tl.fromTo("#${s}-quote", { opacity: 0, y: 120, scale: .6 }, { opacity: 1, y: 0, scale: 1, duration: .35, ease: "back.out(1.4)", immediateRender: false }, 2.4);
    // "that tells you everything about this man": a slow nod
    tl.to("#${p}-head", { rotation: 8, svgOrigin: "100 96", duration: .3, ease: "sine.inOut" }, 5.2);
    tl.to("#${p}-head", { rotation: 0, svgOrigin: "100 96", duration: .3, ease: "sine.inOut" }, 5.55);
    // "Hold on to that": the quote shrinks into a pinned bookmark, top-left
    tl.to("#${s}-quote", { x: -520, y: -150, scale: .3, opacity: 0, duration: .4, ease: "power3.in" }, 7.1);
    tl.fromTo("#${s}-dock", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1.06, x: 0, duration: .17, ease: "power2.out", immediateRender: false }, 7.5);
    tl.to("#${s}-dock", { scale: 1, duration: .1 }, 7.67);
    // "Here's how it unfolded, in seven parts" — whip to the trail board
    tl.set("#${s}-S2", { opacity: 1 }, 9.35);
    tl.fromTo("#${s}-S2", { x: 900 }, { x: 0, duration: .22, ease: "power3.out", immediateRender: false }, 9.35);
    tl.set("#${s}-S1", { opacity: 0 }, 9.57);
    tl.fromTo("#${s}-hd", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 9.5);
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => { const c = i === 6 ? C.amber : C.cyan; const t = r1(10.0 + i * 0.25); return `tl.to("#${s}-m${i}", { color: "${c}", borderColor: "${c}", boxShadow: "0 0 40px ${c}", duration: .12 }, ${t});`; }).join("\n    ")}
    // dive into Part 1
    tl.to("#${s}-hd", { opacity: 0, duration: .15 }, 11.7);
    tl.to("#${s}-S2", { scale: 7.5, x: ${r1(960 - MX(0) - 90)}, y: -50, transformOrigin: "${r1(((MX(0) + 90) / 1920) * 100)}% ${r1((590 / 1080) * 100)}%", duration: .45, ease: "power3.in" }, 11.75);`;

  return { id: "parts", html: scene("parts", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
