// K02 (25.0–44.6): the book opens into a projection — a tiny figure under a vast starfield (HOW SMALL HE IS), golden threads to other people
//   (HOW MUCH A MIND NEEDS OTHER PEOPLE); then the gold quote card, each phrase warming to amber as it is spoken.
// VO (local = abs − 25.0): "It's not an adventure book in the usual sense. (0.20–2.52) It's a quiet, (3.05) honest account of a man discovering how small
//   he is, (4.09–6.89) and how much a human mind needs other people. (7.34–9.59) And it holds one line that people still quote almost ninety years later:
//   (10.20–14.05) [+0.7] 'Half the confusion in the world comes from not knowing how little we need.' (15.29–18.98)"
import { C, r1, filters, scene } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { E3_CSS } from "./e3.mjs";

export function build() {
  const s = "qt";
  const fig = (x, y, k, id, col = "#F8FAFC") => `<g id="${id}" transform="translate(${x} ${y}) scale(${k})"><circle cx="0" cy="-58" r="11" fill="${col}"/><path d="M-10 -44 L10 -44 L13 -12 L6 -12 L5 18 L-5 18 L-6 -12 L-13 -12 Z" fill="${col}"/></g>`;
  const others = [[420, 850], [700, 930], [1240, 930], [1520, 850], [960, 990]];
  const stars = Array.from({ length: 160 }, (_, i) => `<circle cx="${(i * 467) % 1920}" cy="${(i * 211) % 980}" r="${0.8 + (i % 4) * 0.5}" fill="#E2E8F0" opacity="${0.25 + (i % 5) * 0.14}"/>`).join("");
  const phr = ["Half the confusion", "in the world", "comes from not knowing", "how little we need."];
  const body = `
    <div id="${s}-P" style="position:absolute; inset:0; background:radial-gradient(ellipse at 50% 100%, #1E293B 0, #050811 60%);"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <g id="${s}-stars">${stars}</g>
      <g id="${s}-threads" fill="none" stroke="${C.gold}" stroke-width="3" stroke-linecap="round" opacity="0">${others.map(([x, y]) => `<path d="M960 790 Q${r1((960 + x) / 2)} ${r1(Math.min(790, y) - 120)} ${x} ${y - 60}"/>`).join("")}</g>
      <g id="${s}-others" opacity="0">${others.map(([x, y], i) => fig(x, y, 1.1, `${s}-o${i}`, "#FDE68A")).join("")}</g>
      ${fig(960, 830, 0.8, s + "-me")}</svg>
      ${tag(s + "-small", "HOW SMALL HE IS", 1020, 730)}<div id="${s}-need" class="ui" style="left:0; right:0; top:196px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:44px; color:#FDE68A;">HOW MUCH A MIND NEEDS OTHER PEOPLE</div>
      <div id="${s}-acc" class="ui" style="left:0; right:0; top:120px; text-align:center; font-family:Inter, sans-serif; font-weight:800; font-size:30px; letter-spacing:.14em; color:#94A3B8;">NOT AN ADVENTURE BOOK · A QUIET, HONEST ACCOUNT</div></div>
    <div id="${s}-cover" class="ui" style="left:760px; top:250px; width:400px; height:560px; border-radius:8px 16px 16px 8px; background:linear-gradient(90deg,#0F1B3D 0,#1E2E5C 8%,#1A2950 100%); border:3px solid #0B142E; transform-origin:0 50%;">
      <div style="position:absolute; left:34px; right:22px; top:150px; text-align:center; font-family:Georgia, serif; font-weight:700; font-size:96px; letter-spacing:.08em; color:#E8C252;">ALONE</div>
      <div style="position:absolute; left:34px; right:22px; top:330px; text-align:center; font-family:Georgia, serif; font-size:30px; letter-spacing:.14em; color:#D4A017;">RICHARD E. BYRD</div></div>
    <div id="${s}-card" class="ui" style="left:260px; top:300px; width:1400px; padding:50px 60px 44px; border-radius:26px; background:rgba(17,24,39,.97); border:5px solid ${C.gold}; box-shadow:0 0 70px rgba(245,158,11,.3); text-align:center;">
      <div style="font-family:Inter, sans-serif; font-weight:800; font-size:28px; letter-spacing:.16em; color:#94A3B8;">STILL QUOTED ALMOST 90 YEARS LATER</div>
      <div style="margin-top:22px; white-space:normal; font-family:Georgia, serif; font-weight:700; font-size:60px; line-height:1.25; color:#64748B;">"${phr.map((t, i) => `<span id="${s}-w${i}">${t}</span>`).join(" ")}"</div>
      <div id="${s}-att" style="margin-top:26px; font-family:Inter, sans-serif; font-weight:800; font-size:30px; color:#CBD5E1;">— Admiral Richard E. Byrd, <i>Alone</i> (1938)</div></div>`;

  const js = `
    ${hide(s + "-threads", s + "-others", s + "-small", s + "-need", s + "-acc", s + "-card", s + "-att")}
    tl.set("#${s}-P", { autoAlpha: 0 }, 0);
    // the book opens into the projection
    tl.to("#${s}-cover", { scaleX: 0, duration: .5, ease: "power2.in" }, 0.2);
    tl.set("#${s}-P", { autoAlpha: 1 }, 0.55);
    tl.fromTo("#${s}-P", { scale: .4, transformOrigin: "50% 50%" }, { scale: 1, duration: .6, ease: "power2.out", immediateRender: false }, 0.55);
    tl.fromTo("#${s}-acc", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 0.9);
    tl.fromTo("#${s}-stars", { scale: 1 }, { scale: 1.12, svgOrigin: "960 540", duration: 10, ease: "none", immediateRender: false }, 0.6);
    tl.fromTo("#${s}-small", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 4.1);
    // golden threads to other people
    tl.to("#${s}-others", { opacity: 1, duration: .4 }, 7.3);
    tl.fromTo("#${s}-threads", { opacity: 0 }, { opacity: .9, duration: .6, immediateRender: false }, 7.5);
    tl.to("#${s}-small", { opacity: 0, duration: .25 }, 6.5);
    tl.fromTo("#${s}-need", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 7.4);
    // the line
    tl.to(["#${s}-need", "#${s}-acc"], { opacity: 0, duration: .25 }, 10.0);
    tl.to("#${s}-P", { opacity: .35, duration: .4 }, 10.1);
    tl.fromTo("#${s}-card", { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: .35, ease: "back.out(1.4)", immediateRender: false }, 10.2);
    ${[[0, 15.3], [1, 16.1], [2, 16.9], [3, 17.95]].map(([i, t]) => `tl.to("#${s}-w${i}", { color: "#FBBF24", duration: .3 }, ${t});`).join("\n    ")}
    tl.fromTo("#${s}-att", { opacity: 0 }, { opacity: 1, duration: .4, immediateRender: false }, 18.6);`;

  return { id: "quote", html: scene("quote", { css: KIT_CSS + E3_CSS, body, js, bg: "#050811" }) };
}
