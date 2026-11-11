// B05 (85.4–96.4): the personal motive — 1930s fame and noise slide away into a vast starlit horizon; Byrd writes in his journal:
//   peace · quiet · solitude; slow pull-back until he is a speck on the ice, a question circling his head.
// VO (local = abs − 85.4): "There was also something more personal. (0.21–2.09) He later wrote that he wanted to taste (2.62) peace, (5.39) quiet (6.11)
//   and solitude — (6.6) to find out what being completely alone does to a person. (7.43–10.7)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, cite, hide } from "./kit.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";

const G = 820, BX = 960;
export function build() {
  const s = "so", p = "so-by";
  const stars = Array.from({ length: 120 }, (_, i) => `<circle cx="${-1200 + ((i * 397) % 4300)}" cy="${-700 + ((i * 211) % 1500)}" r="${1 + (i % 3) * 0.6}" fill="#E2E8F0" opacity="${0.3 + (i % 4) * 0.15}"/>`).join("");
  const city = (side) => { const x0 = side < 0 ? 0 : 1480; return `<g id="${s}-city${side < 0 ? "L" : "R"}">${[0, 1, 2, 3].map((i) => { const x = x0 + i * 110, h = 260 + ((i * 97) % 220); return `<rect x="${x}" y="${G - h}" width="96" height="${h}" fill="#1F2937"/>
      ${Array.from({ length: Math.floor(h / 46) }, (_, j) => `<rect x="${x + 16}" y="${G - h + 20 + j * 46}" width="18" height="22" fill="#FDE68A" opacity=".7"/><rect x="${x + 60}" y="${G - h + 20 + j * 46}" width="18" height="22" fill="#FDE68A" opacity=".5"/>`).join("")}`; }).join("")}
      ${[0, 1].map((i) => `<g id="${s}-fl${side < 0 ? "L" : "R"}${i}" opacity="0"><circle cx="${x0 + 120 + i * 200}" cy="${G - 120 - i * 60}" r="60" fill="#FFF7E0" filter="url(#${s}-bloom)"/><circle cx="${x0 + 120 + i * 200}" cy="${G - 120 - i * 60}" r="14" fill="#fff"/></g>`).join("")}
      <g><rect x="${x0 + 90}" y="${G - 230}" width="190" height="130" fill="#EDE4D3" stroke="#B9AC94" stroke-width="3"/><rect x="${x0 + 104}" y="${G - 214}" width="160" height="16" fill="#2B2118"/>
        ${[0, 1, 2, 3].map((j) => `<rect x="${x0 + 104}" y="${G - 188 + j * 18}" width="${j % 2 ? 120 : 160}" height="8" fill="#9C8F7A"/>`).join("")}</g></g>`; };
  const book = `<g><rect x="70" y="138" width="60" height="44" rx="4" fill="#5C3A21" stroke="#2B1A0C" stroke-width="3"/><rect x="100" y="140" width="28" height="40" fill="#F8FAFC"/><line x1="104" y1="150" x2="124" y2="150" stroke="#94A3B8" stroke-width="2"/><line x1="104" y1="158" x2="124" y2="158" stroke="#94A3B8" stroke-width="2"/></g>`;
  const glass = (id, text, x, y) => `<div id="${id}" class="ui" style="left:${x}px; top:${y}px; padding:16px 34px; border-radius:40px; background:rgba(255,255,255,.08); border:2px solid rgba(255,255,255,.35); font-family:'Archivo Black', sans-serif; font-size:40px; color:#F8FAFC;">${text}</div>`;
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}
      <linearGradient id="${s}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B101E"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient></defs>
      <rect x="-2400" y="-1600" width="6720" height="${G + 1600}" fill="url(#${s}-sky)"/>${stars}
      <rect x="-2400" y="${G}" width="6720" height="1600" fill="#CBD5E1"/><rect x="-2400" y="${G}" width="6720" height="6" fill="#F8FAFC"/>
      <path d="M-2400 ${G} Q-1200 ${G - 30} 0 ${G} T2400 ${G} T4320 ${G}" fill="#E2E8F0"/>
      <g id="${s}-noise">${city(-1)}${city(1)}</g>
      <g transform="translate(${BX - 100 * 1.4} ${G - 265 * 1.4}) scale(1.4)">${byrd(p, s, { outfit: "anorak", front: book })}</g>
      <g id="${s}-aura" opacity="0"><g id="${s}-ring"><circle cx="${BX}" cy="${G - 265 * 1.4 + 64 * 1.4}" r="96" fill="none" stroke="${C.cyan}" stroke-width="5" stroke-dasharray="14 12"/></g>
        <text x="${BX}" y="${G - 265 * 1.4 - 40}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="90" fill="${C.cyan}">?</text></g>
    </svg></div>
    ${glass(s + "-g1", "1. PEACE", 300, 300)}${glass(s + "-g2", "2. QUIET", 820, 200)}${glass(s + "-g3", "3. SOLITUDE", 1290, 300)}
    ${cite(s + "-src", "Richard E. Byrd, “Alone” (1938)")}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 11.0, { every: 3.2 })}
    tl.set("#${p}-armL", { rotation: -28 }, 0.02); tl.set("#${p}-armR", { rotation: 24 }, 0.02); tl.set("#${p}-foreR", { rotation: 40 }, 0.02);
    ${Array.from({ length: 12 }, (_, i) => `tl.to("#${p}-foreR", { rotation: ${i % 2 ? 36 : 46}, svgOrigin: "142 147", duration: .3, ease: "sine.inOut" }, ${r1(2.6 + i * 0.32)});`).join("\n    ")}
    ${hide(s + "-g1", s + "-g2", s + "-g3", s + "-src")}
    // fame and noise: camera flashes pop, then the city slides away
    ${[0, 1].map((i) => `tl.fromTo(["#${s}-flL${i}", "#${s}-flR${i}"], { opacity: 1 }, { opacity: 0, duration: .3, immediateRender: false }, ${r1(0.3 + i * 0.5)});`).join("\n    ")}
    tl.to("#${s}-cityL", { x: -900, duration: 1.6, ease: "power2.in" }, 1.0);
    tl.to("#${s}-cityR", { x: 900, duration: 1.6, ease: "power2.in" }, 1.0);
    tl.set("#${s}-noise", { opacity: 0 }, 2.65);
    // peace · quiet · solitude
    tl.fromTo("#${s}-g1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .4, ease: "sine.out", immediateRender: false }, 5.4);
    tl.fromTo("#${s}-g2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .4, ease: "sine.out", immediateRender: false }, 6.1);
    tl.fromTo("#${s}-g3", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .4, ease: "sine.out", immediateRender: false }, 6.6);
    // "what being completely alone does to a person": slow pull-back, the question circles his head
    tl.to(["#${s}-g1", "#${s}-g2", "#${s}-g3"], { opacity: 0, y: -20, duration: .6 }, 8.0);
    tl.to("#${s}-W", { scale: .45, transformOrigin: "${r1((BX / 1920) * 100)}% ${r1((G / 1080) * 100)}%", duration: 3.6, ease: "sine.inOut" }, 7.4);
    tl.to("#${s}-aura", { opacity: 1, duration: .5 }, 7.6);
    tl.to("#${s}-ring", { rotation: 90, svgOrigin: "${BX} ${r1(G - 265 * 1.4 + 64 * 1.4)}", duration: 3.4, ease: "none" }, 7.6);
    tl.fromTo("#${s}-src", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 7.7);`;

  return { id: "solitude", html: scene("solitude", { css: KIT_CSS + E3_CSS, body, js, bg: "#0B101E" }) };
}
