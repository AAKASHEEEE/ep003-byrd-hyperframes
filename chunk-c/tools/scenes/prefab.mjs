// C03 (40.4–61.0): Part 2 — card 2 docks; isometric 9 x 13 x 8 ft box with dimension brackets (Byrd inside for scale); 4 prefab panels
//   fly apart and bolt together; side-elevation: the box lowers into an 8-ft snow pit and is buried flush with the surface.
// VO (local = abs − 40.4): "Part two. (0.21) A house buried in the ice. (1.35) The first problem was the cold. (3.63–5.30) The hut was tiny. (5.83)
//   About nine feet by thirteen feet, (7.28) and eight feet high. (9.72–10.84) Prefabricated, (11.37) carried in pieces, (12.73) and set down into a pit
//   dug in the snow. (14.09–16.66) By the time the tractors left, (17.06) it was completely buried. (18.93–20.24)"
import { C, r1, filters, rigInit, scene, life } from "../lib.mjs";
import { KIT_CSS, pill, tag, hide } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E, E3_CSS, byrd } from "./e3.mjs";

const A = [620, 840], W = 520, H = 320, D = [187, -108], G2 = 520;
export function build() {
  const s = "pf", p = "pf-by";
  const [ax, ay] = A, bx = ax + W, ty = ay - H;
  const P = (pts) => pts.map(([x, y]) => `${x},${y}`).join(" ");
  const front = P([[ax, ty], [bx, ty], [bx, ay], [ax, ay]]), side = P([[bx, ty], [bx + D[0], ty + D[1]], [bx + D[0], ay + D[1]], [bx, ay]]);
  const roof = P([[ax, ty], [bx, ty], [bx + D[0], ty + D[1]], [ax + D[0], ty + D[1]]]), back = P([[ax + D[0], ty + D[1]], [bx + D[0], ty + D[1]], [bx + D[0], ay + D[1]], [ax + D[0], ay + D[1]]]);
  const lbl = (x, y, t, a = "middle") => `<text x="${x}" y="${y}" text-anchor="${a}" font-family="Archivo Black, sans-serif" font-size="34" fill="#fff">${t}</text>`;
  const plank = (id, pts, fill, label, lx, ly) => `<g id="${s}-${id}"><polygon points="${pts}" fill="${fill}" stroke="${E.pineDk}" stroke-width="5" stroke-linejoin="round"/>
      <g id="${s}-${id}L" opacity="0">${lbl(lx, ly, label)}</g></g>`;
  const k = 0.87;
  const body = `
    <div id="${s}-S1" style="position:absolute; inset:0; ${BLUEPRINT_CSS}">
      <div id="${s}-mono" class="e-mono" style="left:${192 + 226}px; top:400px; color:${C.cyan}; border-color:${C.cyan}; box-shadow:0 0 40px ${C.cyan};">2</div>
      <svg id="${s}-iso" class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
        <polygon points="${back}" fill="none" stroke="${C.cyan}" stroke-width="2" stroke-dasharray="10 8" opacity=".5"/>
        <g transform="translate(${880 - 100 * k} ${r1(ay - 14 - 265 * k)}) scale(${k})"><g id="${s}-byG">${byrd(p, s, { outfit: "sweater" })}</g></g>
        <g id="${s}-wire" opacity="0" fill="none" stroke="${C.cyan}" stroke-width="3" stroke-dasharray="12 8"><polygon points="${front}"/><polygon points="${side}"/><polygon points="${roof}"/></g>
        ${plank("pD", back, "rgba(69,26,3,.25)", "PANEL D", ax + D[0] + W / 2, ty + D[1] + 60)}
        ${plank("pB", side, E.pineDk, "PANEL B", bx + 94, ay - 140)}
        ${plank("pC", roof, "#7A4E2D", "PANEL C · ROOF", ax + W / 2 + 90, ty - 30)}
        ${plank("pA", front, "rgba(92,58,33,.22)", "PANEL A", ax + W / 2, ty + 60)}
        <g id="${s}-dW" opacity="0"><line x1="${bx + 20}" y1="${ay + 20}" x2="${bx + D[0] + 20}" y2="${ay + D[1] + 20}" stroke="${C.cyan}" stroke-width="5"/>${lbl(bx + 150, ay + 50, "9 FEET WIDE", "start")}</g>
        <g id="${s}-dL" opacity="0"><line x1="${ax}" y1="${ay + 40}" x2="${bx}" y2="${ay + 40}" stroke="${C.cyan}" stroke-width="5"/><line x1="${ax}" y1="${ay + 28}" x2="${ax}" y2="${ay + 52}" stroke="${C.cyan}" stroke-width="5"/><line x1="${bx}" y1="${ay + 28}" x2="${bx}" y2="${ay + 52}" stroke="${C.cyan}" stroke-width="5"/>${lbl(ax + W / 2, ay + 92, "13 FEET LONG")}</g>
        <g id="${s}-dH" opacity="0"><line x1="${ax - 40}" y1="${ty}" x2="${ax - 40}" y2="${ay}" stroke="${C.cyan}" stroke-width="5"/><line x1="${ax - 52}" y1="${ty}" x2="${ax - 28}" y2="${ty}" stroke="${C.cyan}" stroke-width="5"/><line x1="${ax - 52}" y1="${ay}" x2="${ax - 28}" y2="${ay}" stroke="${C.cyan}" stroke-width="5"/>${lbl(ax - 64, (ty + ay) / 2 + 12, "8 FEET HIGH", "end")}</g>
        <g id="${s}-dG" opacity="0"><line x1="${960}" y1="${ty + 4}" x2="${960}" y2="${r1(ay - 14 - 230)}" stroke="${C.gold}" stroke-width="4" stroke-dasharray="6 5"/>${lbl(976, ty + 50, "~2 FT", "start")}</g>
      </svg></div>
    <div id="${s}-S2" style="position:absolute; inset:0;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "2")}
      <linearGradient id="${s}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0F1E3D"/><stop offset="1" stop-color="#3B5578"/></linearGradient></defs>
      <rect width="1920" height="${G2}" fill="url(#${s}-sky)"/>
      <rect y="${G2}" width="1920" height="${1080 - G2}" fill="#8193AD"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M0 ${G2 + 70 + i * 70} Q960 ${G2 + 58 + i * 70} 1920 ${G2 + 70 + i * 70}" fill="none" stroke="#9AAAC2" stroke-width="3"/>`).join("")}
      <rect id="${s}-pit" x="640" y="${G2}" width="640" height="364" fill="#0F172A"/><rect x="640" y="${G2 + 340}" width="640" height="24" fill="#1E293B"/>
      <g id="${s}-box"><rect x="700" y="120" width="520" height="320" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="6"/>
        ${[1, 2, 3, 4].map((i) => `<line x1="700" y1="${120 + i * 64}" x2="1220" y2="${120 + i * 64}" stroke="${E.pineDk}" stroke-width="3"/>`).join("")}
        <rect x="716" y="116" width="62" height="8" fill="${E.pineDk}"/><rect x="956" y="70" width="12" height="54" fill="#94A3B8"/></g>
      <rect x="628" y="${G2}" width="14" height="364" fill="#CBD5E1"/><rect x="1278" y="${G2}" width="14" height="364" fill="#CBD5E1"/>
      <rect id="${s}-fillL" x="640" y="${G2}" width="60" height="364" fill="#8193AD"/><rect id="${s}-fillR" x="1220" y="${G2}" width="60" height="364" fill="#8193AD"/>
      <rect id="${s}-capL" x="380" y="${G2 - 2}" width="300" height="24" fill="#E2E8F0"/><rect id="${s}-capR" x="1240" y="${G2 - 2}" width="300" height="24" fill="#E2E8F0"/>
      <rect id="${s}-bury" x="640" y="${G2 + 22}" width="640" height="364" fill="#8193AD"/>
      <rect x="0" y="${G2}" width="1920" height="10" fill="#F8FAFC"/>
      <g id="${s}-top"><rect x="716" y="${G2 - 4}" width="62" height="8" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="2"/><rect x="956" y="${G2 - 50}" width="12" height="50" fill="#94A3B8"/></g>
    </svg>${tag(s + "-pitT", "8-FOOT SNOW PIT", 260, 640)}${tag(s + "-flush", "BURIED FLUSH WITH THE SURFACE", 640, 400)}</div>
    <div id="${s}-dock" class="ui k-dock"><span class="n">PART 2</span>A HOUSE BURIED IN THE ICE</div>
    ${pill(s + "-cold", "PROBLEM #1: THE COLD", "", { top: 196 })}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 6.0, 14.0, { every: 3.0 })}
    ${hide(s + "-S2", s + "-dock", s + "-cold", s + "-iso", s + "-pitT", s + "-flush", s + "-bury", s + "-top")}
    // card 2 settles and docks as the chapter header
    tl.set("#${s}-mono", { scale: 7.5, x: ${r1(960 - (192 + 226 + 90))}, y: -50 }, 0);
    tl.to("#${s}-mono", { scale: 1, x: ${r1(960 - (192 + 226 + 90))}, y: 0, duration: .6, ease: "power3.out" }, 0.15);
    tl.to("#${s}-mono", { x: -320, y: -270, scale: .25, opacity: 0, duration: .45, ease: "power3.in" }, 1.2);
    tl.fromTo("#${s}-dock", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1.08, x: 0, duration: .17, ease: "power2.out", immediateRender: false }, 1.6);
    tl.to("#${s}-dock", { scale: 1, duration: .1 }, 1.77);
    tl.fromTo("#${s}-cold", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 3.7);
    // "The hut was tiny": the isometric box assembles on the grid; dimension brackets snap on
    tl.fromTo("#${s}-iso", { opacity: 0, scale: .8, transformOrigin: "50% 60%" }, { opacity: 1, scale: 1, duration: .35, ease: "back.out(1.4)", immediateRender: false }, 5.85);
    tl.fromTo("#${s}-dW", { opacity: 0 }, { opacity: 1, duration: .2, immediateRender: false }, 7.3);
    tl.fromTo("#${s}-dL", { opacity: 0, scaleX: 0, svgOrigin: "${ax} ${ay + 40}" }, { opacity: 1, scaleX: 1, svgOrigin: "${ax} ${ay + 40}", duration: .3, immediateRender: false }, 8.4);
    tl.fromTo("#${s}-dH", { opacity: 0, scaleY: 0, svgOrigin: "${ax - 40} ${ay}" }, { opacity: 1, scaleY: 1, svgOrigin: "${ax - 40} ${ay}", duration: .3, immediateRender: false }, 9.75);
    tl.fromTo("#${s}-dG", { opacity: 0 }, { opacity: 1, duration: .25, immediateRender: false }, 10.3);
    // "Prefabricated, carried in pieces": the four panels fly apart, labelled, then bolt back together
    tl.to(["#${s}-dW", "#${s}-dL", "#${s}-dH", "#${s}-dG"], { opacity: 0, duration: .2 }, 11.2);
    tl.to("#${s}-wire", { opacity: 1, duration: .2 }, 11.35); tl.to("#${s}-wire", { opacity: 0, duration: .3 }, 13.9);
    ${[["pA", 0, 300], ["pB", 340, 0], ["pC", 120, -140], ["pD", -470, 0]].map(([id, x, y], i) => `tl.to("#${s}-${id}", { x: ${x}, y: ${y}, duration: .45, ease: "power3.out" }, ${r1(11.35 + i * 0.12)});
    tl.set("#${s}-${id}L", { opacity: 1 }, ${r1(11.5 + i * 0.12)});
    tl.to("#${s}-${id}", { x: 0, y: 0, duration: .25, ease: "power3.in" }, ${r1(12.8 + i * 0.22)});
    tl.set("#${s}-${id}L", { opacity: 0 }, ${r1(13.05 + i * 0.22)});`).join("\n    ")}
    // side elevation: the box lowers into the 8-ft pit, gaps fill, snow seals the roof flush
    tl.set("#${s}-S2", { opacity: 1 }, 14.05);
    tl.set(["#${s}-S1", "#${s}-cold"], { opacity: 0 }, 14.05);
    tl.to("#${s}-box", { y: ${G2 + 4 - 120}, duration: 2.2, ease: "power2.inOut" }, 14.2);
    tl.fromTo("#${s}-pitT", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 14.6);
    tl.fromTo(["#${s}-fillL", "#${s}-fillR"], { scaleY: 0, svgOrigin: "960 ${G2 + 364}" }, { scaleY: 1, svgOrigin: "960 ${G2 + 364}", duration: 1.3, ease: "power2.out", immediateRender: false }, 17.1);
    tl.to("#${s}-pitT", { opacity: 0, duration: .2 }, 17.0);
    tl.fromTo("#${s}-capL", { x: -320 }, { x: 320, duration: .6, ease: "power3.out", immediateRender: false }, 18.95);
    tl.fromTo("#${s}-capR", { x: 320 }, { x: -320, duration: .6, ease: "power3.out", immediateRender: false }, 18.95);
    tl.to("#${s}-bury", { opacity: 1, duration: .5 }, 19.5);
    tl.set("#${s}-top", { opacity: 1 }, 19.5);
    tl.fromTo("#${s}-flush", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 19.15);`;

  return { id: "prefab", html: scene("prefab", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
