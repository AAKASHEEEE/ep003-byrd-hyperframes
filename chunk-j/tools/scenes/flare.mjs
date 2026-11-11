// J01 (0–25.6): hard cut from I's last frame → X-ray cutaway: gaunt Byrd hears the radio (TRACTOR APPROACHING), walks to the ladder and climbs it rung by
//   rung (alternating hands and boots), pushes open the hatch, lights a fire and a crimson flare on a pole; then from behind the approaching half-track:
//   AUGUST 10, 1934 · JUST BEFORE MIDNIGHT — a light bursts on the black horizon.
// VO (abs): "At Advance Base, (0.23) Byrd heard on the radio that they were getting close. (1.86–4.14) He did what he could. (4.62–5.50) He climbed the same
//   ladder he had climbed several times a day for months, (5.90–9.63) pushed open the same hatch, and set out a signal — (10.00–12.82) fire and flares — (13.21)
//   so they could see where the buried hut was in all that darkness. (14.66–17.89) And just before midnight (18.63) on August tenth, (20.34) nineteen thirty-four,
//   (21.60) the men on the tractor saw a light. (23.36–25.20)"
import { C, r1, filters, rigInit, scene, life, shiver, walk, snow } from "../lib.mjs";
import { KIT_CSS, badge, tag, hide, bridge } from "./kit.mjs";
import { E, E3_CSS, cutaway, byrd, halftrack } from "./e3.mjs";
import { cam, signal, handFlare } from "./j10.mjs";

const G = 540, RX = 700, RY = G + 16, K = 0.7, GY = 700;
export function build() {
  const s = "fa", p = "fa-by";
  const me = `<g id="${s}-bpos"><g transform="translate(${r1(-100 * K)} ${r1(-265 * K)}) scale(${K})">${byrd(p, s, { outfit: "anorak", gaunt: true, props: [handFlare(p, s)] })}</g></g>`;
  const sn = snow(s + "-sn", 70, 7.2, { dx: 500, dy: 120, seed: 77 });
  const stars = Array.from({ length: 60 }, (_, i) => `<circle cx="${(i * 331) % 1920}" cy="${(i * 97) % 640}" r="${1 + (i % 3) * 0.6}" fill="#E2E8F0" opacity="${0.3 + (i % 4) * 0.15}"/>`).join("");
  const body = `
    <div id="${s}-A" style="position:absolute; inset:0; background:${E.night}; overflow:hidden;">
      <div id="${s}-cam" style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
        ${cutaway(s, G, { rx: RX, inRoom: me, seed: 91 })}
        <rect id="${s}-hole" x="${RX + 12}" y="${G - 5}" width="62" height="9" fill="#0B0F17" opacity="0"/>
        <g id="${s}-door"><rect x="${RX + 12}" y="${G - 7}" width="62" height="11" rx="2" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="3"/></g>
        ${signal(s, G, 800)}</svg></div>
      ${tag(s + "-rad", "RADIO: TRACTOR APPROACHING", 1180, 300)}${tag(s + "-lad", "THE SAME LADDER — SEVERAL TIMES A DAY, FOR MONTHS", 192, 196)}
      ${tag(s + "-sig", "SIGNAL: FIRE + FLARES", 1120, 260)}${tag(s + "-see", "SO THEY COULD FIND THE BURIED HUT", 1120, 330)}</div>
    <div id="${s}-B" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "B")}</defs>
      <rect width="1920" height="1080" fill="#02040A"/>${stars}<rect y="${GY}" width="1920" height="${1080 - GY}" fill="#111827"/><rect y="${GY - 2}" width="1920" height="4" fill="#475569"/>
      <g id="${s}-hz"><circle id="${s}-hglow" cx="1580" cy="${GY - 30}" r="150" fill="#EF4444" opacity=".1" filter="url(#${s}B-bloom)" style="mix-blend-mode:screen"/>
        <ellipse id="${s}-refl" cx="1580" cy="${GY + 30}" rx="260" ry="30" fill="#F97316" opacity="0" filter="url(#${s}B-soft)"/>
        <circle id="${s}-hdot" cx="1580" cy="${GY - 30}" r="4" fill="#FCA5A5" opacity=".5"/></g>
      <g transform="translate(220 ${GY}) scale(1.15)"><g id="${s}-bob">${halftrack(s + "-ht", s + "B", { crew: 3 })}</g></g>
      <g>${sn.svg}</g></svg>
      <div id="${s}-saw" class="ui" style="left:0; right:0; top:880px; display:flex; justify-content:center;"><div class="ui-warn" style="background:#B45309;">THE MEN SAW A LIGHT</div></div>
      ${badge(s + "-b", "AUGUST 10, 1934", "JUST BEFORE MIDNIGHT", { fs: 34, w: 470, left: 1258 })}</div>
    ${bridge(s, "i-last.png")}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 5.8, { every: 2.6 })}
    ${shiver(p, 0.3, 18.5, 1.5)}
    tl.set("#${s}-bridge", { opacity: 0, visibility: "hidden" }, 0.22);
    ${hide(s + "-B", s + "-rad", s + "-lad", s + "-sig", s + "-see", s + "-saw", s + "-b")}
    tl.set("#${s}-snowcover", { opacity: .12 }, 0);
    tl.set("#${s}-bpos", { x: 330, y: 320 }, 0);
    tl.set("#${p}-armR", { rotation: -12 }, 0);
    tl.set("#${s}-cam", { ...${JSON.stringify(cam(1.6, 920, 740))}, transformOrigin: "0 0" }, 0);
    // the radio: they're getting close
    tl.to("#${s}-dial", { opacity: .9, duration: .2, yoyo: true, repeat: 5 }, 1.9);
    tl.fromTo("#${s}-rad", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 1.95);
    tl.to("#${s}-rad", { opacity: 0, duration: .2 }, 4.5);
    tl.to("#${p}-armR", { rotation: 0, duration: .3 }, 4.5);
    // to the ladder
    tl.to("#${s}-bpos", { x: 33, duration: 1.2, ease: "power1.inOut" }, 4.6);
    ${walk(p, 4.6, 5.75, 0.29, 16)}
    tl.to("#${s}-cam", { ...${JSON.stringify(cam(1.6, 760, 700))}, duration: 1.2, ease: "power1.inOut" }, 4.6);
    // the climb: seven rungs, hands and boots alternating
    tl.fromTo("#${s}-lad", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 6.0);
    tl.set("#${p}-armL", { rotation: 150 }, 5.9); tl.set("#${p}-armR", { rotation: -150 }, 5.9);
    ${Array.from({ length: 7 }, (_, i) => { const t = r1(5.95 + i * 0.53), y = r1(320 - (336 * (i + 1)) / 7); return `tl.to("#${s}-bpos", { y: ${y}, duration: .45, ease: "power1.inOut" }, ${t});
    tl.to("#${p}-armL", { rotation: ${i % 2 ? 140 : 168}, duration: .26 }, ${t}); tl.to("#${p}-armR", { rotation: ${i % 2 ? -168 : -140}, duration: .26 }, ${t});
    tl.to("#${p}-legL", { rotation: ${i % 2 ? 0 : -22}, duration: .26 }, ${t}); tl.to("#${p}-legR", { rotation: ${i % 2 ? 22 : 0}, duration: .26 }, ${t});`; }).join("\n    ")}
    tl.to("#${s}-cam", { ...${JSON.stringify(cam(1.45, 800, 560))}, duration: 3.6, ease: "power1.inOut" }, 6.0);
    tl.to("#${s}-lad", { opacity: 0, duration: .2 }, 9.7);
    // the hatch, pushed open
    tl.to("#${s}-door", { rotation: -110, svgOrigin: "${RX + 12} ${G}", duration: .3, ease: "power2.out" }, 9.95);
    tl.set("#${s}-hole", { opacity: 1 }, 9.95);
    tl.to(["#${p}-armL", "#${p}-armR", "#${p}-legL", "#${p}-legR"], { rotation: 0, duration: .25 }, 9.85);
    // out onto the snow
    tl.to("#${s}-bpos", { x: 172, duration: 1.0, ease: "power1.inOut" }, 10.4);
    ${walk(p, 10.4, 11.4, 0.25, 14)}
    tl.to("#${s}-cam", { ...${JSON.stringify(cam(1.0, 960, 470))}, duration: 2.2, ease: "power2.inOut" }, 10.4);
    // fire and flares
    tl.to("#${p}-armL", { rotation: 40, duration: .3, yoyo: true, repeat: 1 }, 12.6);
    tl.fromTo("#${s}-fire", { opacity: 0 }, { opacity: 1, duration: .25, immediateRender: false }, 12.9);
    ${Array.from({ length: 12 }, (_, i) => `tl.to("#${s}-flame", { scaleY: ${i % 2 ? 1 : 1.18}, svgOrigin: "800 ${G - 32}", duration: .2, ease: "sine.inOut" }, ${r1(13.0 + i * 0.2)});`).join("\n    ")}
    tl.to("#${p}-armL", { rotation: 150, duration: .35, ease: "power2.out" }, 13.15);
    tl.fromTo("#${p}-flare", { opacity: 0 }, { opacity: 1, duration: .15, immediateRender: false }, 13.3);
    ${Array.from({ length: 10 }, (_, i) => `tl.to("#${p}-fglow", { scale: ${i % 2 ? 1 : 1.25}, svgOrigin: "35 124", duration: .22, ease: "sine.inOut" }, ${r1(13.45 + i * 0.22)});`).join("\n    ")}
    tl.fromTo("#${s}-sig", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 13.3);
    tl.fromTo("#${s}-see", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 14.7);
    tl.to("#${p}-head", { rotation: -10, svgOrigin: "100 96", duration: .6 }, 15.0);
    // from behind the tractor, out in the black
    tl.set("#${s}-B", { opacity: 1 }, 18.5); tl.set("#${s}-A", { opacity: 0 }, 18.5);
    ${sn.js.replace(/, 0\);/g, ", 18.5);")}
    ${Array.from({ length: 34 }, (_, i) => `tl.to("#${s}-bob", { y: ${i % 2 ? 0 : -2.5}, duration: .1, ease: "none" }, ${r1(18.5 + i * 0.21)});`).join("\n    ")}
    tl.fromTo("#${s}-b", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 18.7);
    tl.to("#${s}-hglow", { opacity: .8, scale: 1.0, svgOrigin: "1580 ${GY - 30}", duration: .5, ease: "power2.out" }, 23.4);
    tl.to("#${s}-hdot", { opacity: 1, scale: 3, svgOrigin: "1580 ${GY - 30}", duration: .4 }, 23.4);
    tl.to("#${s}-refl", { opacity: .6, duration: .5 }, 23.5);
    tl.fromTo("#${s}-saw", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 23.6);`;

  return { id: "flare", html: scene("flare", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
