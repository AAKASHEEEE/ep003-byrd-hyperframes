// L04 (50.5–68.3): the dim hut — THE COLD OUTSIDE ✕ DIDN'T BEAT HIM, THE DARKNESS ✕ DIDN'T BEAT HIM; slow push-in on the small warm stove while violet CO
//   curls from the pipe joint (ALMOST BEAT HIM: THE WARM STOVE); the room darkens; THE DANGER ISN'T ALWAYS THE OBVIOUS ONE.
// VO (local = abs − 50.5): "The cold outside didn't beat him. (0.22–2.02) The darkness didn't beat him. (2.48–3.94) The thing that almost did (4.47–5.74)
//   was a small, (6.20) warm stove he thought was keeping him safe. (7.39–9.99) [+0.7] That's the strange truth about surviving in the most extreme places on
//   Earth. (11.00–14.99) The danger isn't always the obvious one. (15.32–17.39)"
import { C, r1, filters, scene } from "../lib.mjs";
import { KIT_CSS, tag, hide } from "./kit.mjs";
import { E, E3_CSS, room } from "./e3.mjs";
import { cam } from "./j10.mjs";

const RS = 2.2, RXs = 384, RYs = 120;
export function build() {
  const s = "sv";
  const wx = (x) => r1(x * RS + RXs), wy = (y) => r1(y * RS + RYs);
  const co = Array.from({ length: 6 }, (_, i) => `<circle class="${s}-co" cx="${wx(262) + (i % 2 ? 26 : -22)}" cy="${wy(150) - i * 46}" r="${34 + i * 8}" fill="${E.co}" opacity="0" filter="url(#${s}-soft)"/>`).join("");
  const card = (id, x, title, icon, col) => `<div id="${id}" class="ui" style="left:${x}px; top:300px; width:390px; padding:24px 0 26px; border-radius:20px; background:rgba(11,16,30,.95); border:3px solid ${col}; text-align:center;">
      <svg width="120" height="120" viewBox="0 0 120 120">${icon}</svg>
      <div style="margin-top:8px; font-family:'Archivo Black', sans-serif; font-size:32px; color:#fff;">${title}</div>
      <div id="${id}-st" style="margin:16px auto 0; width:260px; padding:8px 0; border:4px solid ${E.warn}; border-radius:10px; font-family:'Archivo Black', sans-serif; font-size:26px; color:#FCA5A5; transform:rotate(-5deg);">✕ DIDN'T BEAT HIM</div></div>`;
  const flake = `<g stroke="#7DD3FC" stroke-width="7" stroke-linecap="round">${[0, 60, 120].map((a) => `<line x1="60" y1="14" x2="60" y2="106" transform="rotate(${a} 60 60)"/>`).join("")}</g>`;
  const moon = `<circle cx="60" cy="60" r="44" fill="#1E293B" stroke="#64748B" stroke-width="5"/><circle cx="78" cy="48" r="36" fill="#0B101E"/>`;
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0; background:${E.pineDk}; overflow:hidden;">
      <div id="${s}-cam" style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
        <g transform="translate(${RXs} ${RYs}) scale(${RS})">${room(s, { pipeTop: 0 })}</g>
        <rect id="${s}-dim" x="-400" y="-400" width="2720" height="1880" fill="#000" opacity=".45"/>
        <circle id="${s}-hot" cx="${wx(262)}" cy="${wy(262)}" r="150" fill="${E.lamp}" opacity=".45" filter="url(#${s}-bloom)"/>
        ${co}</svg></div>
      ${card(s + "-cold", 50, "THE COLD OUTSIDE", flake, "#38BDF8")}${card(s + "-dark", 1480, "THE DARKNESS", moon, "#64748B")}
      ${tag(s + "-almost", "ALMOST BEAT HIM: THE WARM STOVE", 1120, 860)}
      <div id="${s}-th" class="ui" style="left:160px; width:1600px; top:150px; padding:26px 0; border-radius:20px; background:rgba(11,16,30,.95); border:4px solid ${C.gold}; text-align:center; font-family:'Archivo Black', sans-serif; font-size:52px; color:#fff;">THE DANGER ISN'T ALWAYS <span style="color:#FBBF24;">THE OBVIOUS ONE.</span></div></div>`;

  const js = `
    ${hide(s + "-cold", s + "-cold-st", s + "-dark", s + "-dark-st", s + "-almost", s + "-th")}
    tl.set("#${s}-cam", { scale: 1, x: 0, y: 0, transformOrigin: "0 0" }, 0);
    // the cold, the darkness — neither beat him
    tl.fromTo("#${s}-cold", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: .3, ease: "power2.out", immediateRender: false }, 0.22);
    tl.fromTo("#${s}-cold-st", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: .16, ease: "power3.in", immediateRender: false }, 1.4);
    tl.fromTo("#${s}-dark", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .3, ease: "power2.out", immediateRender: false }, 2.48);
    tl.fromTo("#${s}-dark-st", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: .16, ease: "power3.in", immediateRender: false }, 3.45);
    // the thing that almost did: push in on the small warm stove
    tl.to(["#${s}-cold", "#${s}-dark"], { opacity: 0, duration: .3 }, 4.4);
    tl.to("#${s}-cam", { ...${JSON.stringify(cam(1.45, wx(262), wy(230)))}, duration: 6.0, ease: "power1.inOut" }, 4.5);
    ${Array.from({ length: 14 }, (_, i) => `tl.to("#${s}-hot", { opacity: ${i % 2 ? 0.45 : 0.7}, duration: .45, ease: "sine.inOut" }, ${r1(4.5 + i * 0.5)});`).join("\n    ")}
    tl.to(".${s}-co", { opacity: .5, duration: .6, stagger: .35 }, 6.6);
    tl.fromTo(".${s}-co", { y: 20, scale: .7, transformOrigin: "50% 50%" }, { y: -60, scale: 1.2, duration: 6.0, stagger: .35, ease: "sine.out", immediateRender: false }, 6.6);
    tl.fromTo("#${s}-almost", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 7.4);
    // the strange truth
    tl.to("#${s}-dim", { opacity: .78, duration: 1.4 }, 11.0);
    tl.to("#${s}-almost", { opacity: 0, duration: .3 }, 14.9);
    tl.fromTo("#${s}-th", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out", immediateRender: false }, 15.32);`;

  return { id: "stove", html: scene("stove", { css: KIT_CSS + E3_CSS, body, js, bg: E.pineDk }) };
}
