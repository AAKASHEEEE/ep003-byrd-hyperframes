// E06 (83.6–103.6): inside the hut — the darkness presses on the walls; three defences light up (schedule on the wall, a book in his hands,
//   the phonograph spinning with notes in the air); then a flip-board: each day its own subject to think about.
// VO (local = abs − 83.6): "Inside the hut, (0.27) the darkness was a different kind of enemy. (1.87–4.13) Byrd was a disciplined man. (4.68–6.46) He kept a
//   schedule. (6.90) He read books. (8.32) He played records on a little phonograph. (9.62–11.64) He tried different ways to keep his mind steady — (12.12–14.59)
//   at one point, (15.02) he even tried giving each day its own subject to think about. (16.17–19.43)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, tag, box, cite, hide } from "./kit.mjs";
import { E, E3_CSS, room, byrd } from "./e3.mjs";

const RS = 2.4, RXs = -10, RYs = -40; // room-local -> screen: x*RS + RXs, y*RS + RYs
export function build() {
  const s = "md", p = "md-by";
  const sx = (x) => r1(x * RS + RXs), sy = (y) => r1(y * RS + RYs);
  const book = `<g id="${p}-book" opacity="0"><rect x="68" y="128" width="64" height="40" rx="3" fill="#7F1D1D" stroke="#2B1A0C" stroke-width="3"/><rect x="72" y="131" width="27" height="34" fill="#F8FAFC"/><rect x="101" y="131" width="27" height="34" fill="#F8FAFC"/>
      ${[0, 1, 2].map((i) => `<line x1="76" y1="${138 + i * 8}" x2="95" y2="${138 + i * 8}" stroke="#94A3B8" stroke-width="2"/><line x1="105" y1="${138 + i * 8}" x2="124" y2="${138 + i * 8}" stroke="#94A3B8" stroke-width="2"/>`).join("")}</g>`;
  const sched = `<g id="${s}-sched"><rect x="80" y="80" width="56" height="70" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2"/><circle cx="108" cy="84" r="4" fill="${E.warn}"/>
      ${[0, 1, 2, 3, 4].map((i) => `<line x1="86" y1="${96 + i * 10}" x2="130" y2="${96 + i * 10}" stroke="#94A3B8" stroke-width="2"/>`).join("")}</g>`;
  const disc = `<g id="${s}-disc"><ellipse cx="363" cy="92" rx="18" ry="5" fill="#111827"/><line x1="349" y1="92" x2="377" y2="92" stroke="#475569" stroke-width="2"/></g>`;
  const notes = ["♪", "♫", "♪", "♫"].map((n, i) => `<text id="${s}-note${i}" x="${sx(400) + i * 30}" y="${sy(70)}" font-family="Inter, sans-serif" font-size="54" fill="${C.gold}" opacity="0">${n}</text>`).join("");
  const days = ["DAY 1 · ONE SUBJECT", "DAY 2 · A NEW SUBJECT", "DAY 3 · ANOTHER ONE"];
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0; background:${E.pineDk};"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <g transform="translate(${RXs} ${RYs}) scale(${RS})">${room(s, { pipeTop: 0 })}${sched}${disc}
        <g transform="translate(${300 - 100 * 0.78} ${r1(320 - 265 * 0.78)}) scale(.78)">${byrd(p, s, { outfit: "sweater", front: book })}</g></g>
      ${notes}
    </svg></div>
    <div id="${s}-press" style="position:absolute; inset:0; background:radial-gradient(ellipse at 50% 50%, rgba(3,5,8,0) 45%, rgba(3,5,8,.92) 85%);"></div>
    ${tag(s + "-enemy", "THE DARKNESS INSIDE: A DIFFERENT ENEMY", 560, 120)}
    ${tag(s + "-t1", "1. SCHEDULE ✓", sx(70), sy(160))}${tag(s + "-t2", "2. BOOKS ✓", sx(150), sy(110))}${tag(s + "-t3", "3. PHONOGRAPH ✓", sx(300), sy(20))}
    <div id="${s}-flipHd" class="ui k-lab" style="left:460px; width:1000px; top:120px;"><div style="background:rgba(11,16,30,.92); border:2px solid ${C.gold}; font-size:30px;">EACH DAY: ITS OWN SUBJECT TO THINK ABOUT</div></div>
    ${days.map((d, i) => `<div id="${s}-d${i}" class="ui" style="left:1150px; top:200px; width:500px; height:110px; border-radius:16px; background:#F8FAFC; display:flex; align-items:center; justify-content:center; font-family:'Archivo Black', sans-serif; font-size:36px; color:#111827; box-shadow:0 12px 30px rgba(0,0,0,.5);">${d}</div>`).join("")}
    ${cite(s + "-src", "Richard E. Byrd, “Alone” (1938)")}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 20.0, { every: 3.2 })}
    ${hide(s + "-enemy", s + "-t1", s + "-t2", s + "-t3", s + "-flipHd", s + "-d0", s + "-d1", s + "-d2", s + "-src")}
    // the darkness presses in on the walls
    tl.fromTo("#${s}-press", { opacity: .4 }, { opacity: 1, duration: 1.0, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.3);
    tl.fromTo("#${s}-enemy", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 1.9);
    tl.to("#${s}-enemy", { opacity: 0, duration: .25 }, 6.6);
    tl.to("#${s}-press", { opacity: .45, duration: .6 }, 4.4);
    // three defences
    tl.fromTo("#${s}-sched", { opacity: .4 }, { opacity: 1, duration: .2, immediateRender: false }, 6.9);
    tl.fromTo("#${s}-t1", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 6.95);
    tl.set("#${p}-book", { opacity: 1 }, 8.3);
    tl.set("#${p}-armL", { rotation: -28 }, 8.3); tl.set("#${p}-armR", { rotation: 28 }, 8.3);
    tl.fromTo("#${s}-t2", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 8.35);
    tl.fromTo("#${s}-t3", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .22, immediateRender: false }, 9.65);
    tl.to("#${s}-disc", { scaleX: -1, svgOrigin: "363 92", duration: .3, repeat: 30, yoyo: true, ease: "none" }, 9.7);
    ${[0, 1, 2, 3].map((i) => `tl.fromTo("#${s}-note${i}", { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: ${-60 - i * 40}, y: ${-30 + i * 20}, duration: 1.4, ease: "sine.out", immediateRender: false }, ${r1(9.8 + i * 0.45)}); tl.to("#${s}-note${i}", { opacity: 0, duration: .6 }, ${r1(11.2 + i * 0.45)});`).join("\n    ")}
    // keep the mind steady: one subject a day
    tl.to(["#${s}-t1", "#${s}-t2", "#${s}-t3"], { opacity: 0, duration: .3 }, 12.0);
    tl.to("#${s}-W", { scale: 1.18, transformOrigin: "${r1(((sx(300)) / 1920) * 100)}% ${r1((sy(250) / 1080) * 100)}%", duration: 6.0, ease: "sine.inOut" }, 12.1);
    tl.fromTo("#${s}-flipHd", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 15.3);
    ${[0, 1, 2].map((i) => `tl.fromTo("#${s}-d${i}", { opacity: 0, rotationX: -90, transformOrigin: "50% 0%" }, { opacity: 1, rotationX: 0, duration: .3, ease: "power2.out", immediateRender: false }, ${r1(15.4 + i * 1.3)});${i < 2 ? ` tl.set("#${s}-d${i}", { opacity: 0 }, ${r1(15.4 + (i + 1) * 1.3)});` : ""}`).join("\n    ")}
    tl.fromTo("#${s}-src", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 16.6);`;

  return { id: "mind", html: scene("mind", { css: KIT_CSS + E3_CSS, body, js, bg: E.pineDk }) };
}
