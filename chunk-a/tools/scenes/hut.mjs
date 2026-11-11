// A01 (00:00–19.4): May 31, 1934 — surface blizzard, X-ray dive into the buried hut, Byrd collapsed on the floor, pull back: 123 miles of darkness.
// VO (abs): "It's the last day of May, 1934. (0.23) Somewhere on the Ross Ice Shelf in Antarctica, (3.40) under the snow, (6.26) there's a small
//   wooden hut. (7.39) Inside, (9.19) one man is lying on the floor. (10.12) He can barely move. (12.11) He has a radio message to send, (13.53)
//   and help is 123 miles away in total darkness. (15.54–19.05)"
import { C, r1, filters, rigInit, scene, snow2 } from "../lib.mjs";
import { KIT_CSS, badge, pill, tag, hide } from "./kit.mjs";
import { E, E3_CSS, cutaway, byrdLying } from "./e3.mjs";

const G = 320, RX = 700, RY = G + 16;
// camera: screen = world * sc + (tx, ty); centre world (wx, wy) on screen (cx, cy)
const cam = (sc, wx, wy, cx = 960, cy = 540) => ({ scale: sc, x: r1(cx - wx * sc), y: r1(cy - wy * sc) });
const FAR_G = 560, FAR_SC = 0.36, FAR_TX = 60, FAR_TY = r1(FAR_G - G * FAR_SC);

export function build() {
  const s = "ht", p = "ht-by";
  const sn = snow2(s, 19.4, { far: 80, near: 26 });
  const lying = byrdLying(p, s, 200, 286, 0.75);
  const world = cutaway(s, G, { rx: RX, inRoom: lying });
  const hutX = r1(FAR_TX + (RX + 260) * FAR_SC);
  const crev = [980, 1210, 1430].map((x, i) => `<polygon points="${x - 40},${FAR_G} ${x - 8},${FAR_G + 70 + i * 10} ${x + 6},${FAR_G + 30} ${x + 18},${FAR_G + 90} ${x + 44},${FAR_G}" fill="#050811" stroke="#3B82F6" stroke-width="2" stroke-opacity=".5"/>`).join("");
  const camp = `<g transform="translate(1640 ${FAR_G})">
      <rect x="-70" y="-34" width="56" height="34" fill="#334155"/><polygon points="-76,-34 -42,-58 -8,-34" fill="#475569"/><rect x="-56" y="-24" width="12" height="10" fill="${E.lamp}"/>
      <rect x="6" y="-28" width="64" height="28" fill="#334155"/><polygon points="0,-28 38,-50 76,-28" fill="#475569"/><rect x="26" y="-20" width="12" height="10" fill="${E.lamp}"/>
      <line x1="-100" y1="0" x2="-100" y2="-110" stroke="#94A3B8" stroke-width="3"/><line x1="100" y1="0" x2="100" y2="-110" stroke="#94A3B8" stroke-width="3"/>
      <path d="M-100 -108 Q0 -90 100 -108" fill="none" stroke="#CBD5E1" stroke-width="1.5"/>
      <circle cx="0" cy="-20" r="90" fill="${E.lamp}" opacity=".12" filter="url(#${s}-bloom)"/></g>`;
  const body = `
    <div id="${s}-sky" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080">${Array.from({ length: 60 }, (_, i) => `<circle cx="${(i * 433) % 1920}" cy="${(i * 157) % 900}" r="${1 + (i % 3) * 0.5}" fill="#E2E8F0" opacity=".45"/>`).join("")}</svg></div>
    <div id="${s}-cam" style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0;">
      <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}${sn.defs}
        <linearGradient id="${s}-scan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cyan}" stop-opacity="0"/><stop offset="1" stop-color="${C.cyan}" stop-opacity=".55"/></linearGradient></defs>
        ${world}
        <g id="${s}-uglow" opacity="0"><ellipse cx="${RX + 260}" cy="${G + 170}" rx="300" ry="130" fill="${E.lamp}" opacity=".38" filter="url(#${s}-bloom)"/><ellipse cx="${RX + 260}" cy="${G + 170}" rx="140" ry="60" fill="#FDE68A" opacity=".25" filter="url(#${s}-bloom)"/></g>
        <g id="${s}-hglow" opacity="0"><polygon points="${RX + 18},${G - 4} ${RX + 68},${G - 4} ${RX + 110},${G - 170} ${RX - 24},${G - 170}" fill="${E.lamp}" opacity=".35" filter="url(#${s}-soft)"/>
          <ellipse cx="${RX + 43}" cy="${G - 2}" rx="90" ry="26" fill="${E.lamp}" filter="url(#${s}-bloom)"/><rect x="${RX + 14}" y="${G - 6}" width="58" height="6" fill="#FDE68A"/></g>
        <g id="${s}-scanG"><rect x="0" y="${G + 16}" width="1920" height="70" fill="url(#${s}-scan)"/></g>
      </svg></div>
    <div id="${s}-far" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>
      <clipPath id="${s}-lineclip"><rect id="${s}-lineclipR" x="${hutX}" y="${FAR_G - 30}" width="0" height="60"/></clipPath></defs>
      ${crev}${camp}
      <g clip-path="url(#${s}-lineclip)"><line x1="${hutX}" y1="${FAR_G - 8}" x2="1590" y2="${FAR_G - 8}" stroke="${C.amber}" stroke-width="6" stroke-dasharray="22 14"/></g>
    </svg></div>
    <div id="${s}-streak" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><g id="${s}-streakG">${Array.from({ length: 46 }, (_, i) => { const x = -2200 + ((i * 677) % 4100), y = -200 + ((i * 263) % 1300), l = 90 + (i % 4) * 40; return `<line x1="${x}" y1="${y}" x2="${x + l}" y2="${y + l * 0.22}" stroke="#F8FAFC" stroke-width="${2 + (i % 3) * 1.5}" stroke-linecap="round" opacity="${0.25 + (i % 5) * 0.1}"/>`; }).join("")}</g></svg></div>
    <div id="${s}-snow" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080">${sn.far}${sn.near}</svg></div>
    ${tag(s + "-msg", "MESSAGE DUE", 1130, 470)}
    ${tag(s + "-camp", "LITTLE AMERICA", 1440, 400)}
    ${tag(s + "-dist", "123 MILES · TOTAL DARKNESS", 640, 640)}
    ${badge(s + "-b", "MAY 31, 1934", "ROSS ICE SHELF", { fs: 36, w: 420, left: 1308 })}
    ${pill(s + "-pill", "DISTANCE TO HELP", "123 MI")}`;

  const js = `
    ${rigInit(p)}
    tl.set("#${p}-lids", { scaleY: .5 }, 0.01);
    tl.set("#${p}-armR", { rotation: 25 }, 0.01);
    tl.set("#${p}-armL", { rotation: 140 }, 0.01);
    tl.set("#${p}-foreL", { rotation: -20 }, 0.01);
    ${hide(s + "-msg", s + "-camp", s + "-dist", s + "-b", s + "-pill")}
    tl.set("#${s}-scanG", { y: 0, opacity: 0 }, 0);
    tl.set("#${s}-cam", { ...${JSON.stringify(cam(1.15, RX + 43, 250))}, transformOrigin: "0 0" }, 0);
    // hook: amber heartbeat glow leaking up from the buried hatch, heavy foreground streaks
    tl.fromTo("#${s}-streakG", { x: 0, y: 0 }, { x: 2600, y: 560, duration: 6.4, ease: "none", immediateRender: false }, 0);
    tl.to("#${s}-streak", { opacity: 0, duration: .5 }, 5.8);
    ${[0, 1, 2, 3, 4, 5].map((i) => `tl.fromTo(["#${s}-hglow", "#${s}-uglow"], { opacity: .15 }, { opacity: .9, duration: .18, ease: "power2.out", immediateRender: false }, ${r1(0.4 + i * 0.92)});
    tl.to(["#${s}-hglow", "#${s}-uglow"], { opacity: .15, duration: .6, ease: "power2.in" }, ${r1(0.58 + i * 0.92)});`).join(" ")}
    tl.to(["#${s}-hglow", "#${s}-uglow"], { opacity: 0, duration: .4 }, 6.2);
    tl.set("#${s}-far", { opacity: 0 }, 0);
    tl.to("#${s}-far", { opacity: 1, duration: .25 }, 16.5);
    ${sn.js}
    tl.to("#${s}-anem", { rotation: 1440, svgOrigin: "420 ${G - 210}", duration: 19.4, ease: "none" }, 0);
    // blizzard surface, slow push
    tl.to("#${s}-cam", { ...${JSON.stringify(cam(1.0, 960, 120))}, duration: 6.1, ease: "sine.inOut" }, 0);
    tl.fromTo("#${s}-b", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 1.0);
    // "under the snow": X-ray scan sweeps down, the snow turns to glass, camera tilts into the pit
    tl.set("#${s}-scanG", { opacity: 1 }, 6.2);
    tl.to("#${s}-scanG", { y: 760, duration: .9, ease: "power1.in" }, 6.2);
    tl.to("#${s}-scanG", { opacity: 0, duration: .2 }, 7.0);
    tl.to("#${s}-snowcover", { opacity: .12, duration: .9, ease: "power1.in" }, 6.25);
    tl.to("#${s}-cam", { ...${JSON.stringify(cam(1.0, 960, 610))}, duration: 2.2, ease: "power2.inOut" }, 6.3);
    // "Inside, one man is lying on the floor"
    tl.to("#${s}-snow", { opacity: 0, duration: .5 }, 9.0);
    tl.to("#${s}-cam", { ...${JSON.stringify(cam(2.6, 960, 500))}, duration: 1.4, ease: "power2.inOut" }, 9.2);
    // trembling arm pushing at the table leg
    ${Array.from({ length: 26 }, (_, i) => `tl.to("#${p}-armL", { rotation: ${i % 2 ? 134 : 146}, duration: .11, ease: "sine.inOut" }, ${r1(10.4 + i * 0.12)});`).join("\n    ")}
    tl.to("#${p}-armL", { rotation: 120, duration: .5, ease: "power2.in" }, 13.6);
    tl.to("#${p}-head", { rotation: -6, duration: 1.2, ease: "sine.inOut" }, 12.1);
    tl.to("#${s}-stoveglow", { opacity: .2, duration: .6, yoyo: true, repeat: 15, ease: "sine.inOut" }, 0);
    // "He has a radio message to send"
    tl.to("#${s}-dial", { opacity: .95, duration: .25, yoyo: true, repeat: 5, ease: "sine.inOut" }, 13.6);
    tl.fromTo("#${s}-msg", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 13.7);
    tl.to("#${s}-msg", { opacity: 0, duration: .2 }, 15.4);
    // "help is 123 miles away in total darkness": fast pull-back, the hut shrinks to the left, dashed line runs to Little America
    tl.to("#${s}-cam", { scale: ${FAR_SC}, x: ${FAR_TX}, y: ${FAR_TY}, duration: 1.0, ease: "power3.inOut" }, 15.6);
    tl.to("#${s}-snow", { opacity: 1, duration: .5 }, 16.0);
    tl.fromTo("#${s}-pill", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 15.7);
    tl.to("#${s}-lineclipR", { attr: { width: ${r1(1600 - hutX)} }, duration: 1.6, ease: "power2.inOut" }, 16.4);
    tl.fromTo("#${s}-camp", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 17.8);
    tl.fromTo("#${s}-dist", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 17.2);`;

  return { id: "hut", html: scene("hut", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
