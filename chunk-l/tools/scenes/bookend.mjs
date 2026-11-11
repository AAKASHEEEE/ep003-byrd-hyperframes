// L02 (16.0–37.4): match-cut back to May 31, 1934 — the X-ray hut, Byrd on the floor under the table (whole rig rotated, eyes parented), the brass key
//   glowing; pull back wide: the tiny buried hut, 123 MILES · TOTAL DARKNESS to LITTLE AMERICA; the S.O.S. card dims; a gold shield wraps his men.
// VO (local = abs − 16.0): "So think back to that night (0.18–1.60) on May thirty-first, nineteen thirty-four. (1.94–4.41) One man, (5.08) on the floor of a
//   buried hut, (6.12–7.59) a radio key in front of him (8.03–9.47) and one hundred twenty-three miles of darkness outside. (9.82–12.78) He could have called
//   for help. (13.38–14.64) Instead, (15.10) he protected the men who would have to come for him — (16.05–18.28) and nearly paid for it with his life. (18.71–20.60)"
import { C, r1, filters, scene, life } from "../lib.mjs";
import { KIT_CSS, badge, tag, hide } from "./kit.mjs";
import { E, E3_CSS, cutaway, byrdLying } from "./e3.mjs";
import { avatar, tower } from "./b3.mjs";
import { cam } from "./j10.mjs";

const G = 540, RX = 300, RY = G + 16, LA = 3700, WIDE = cam(0.45, 2133, 600);
const sx = (x) => r1(x * WIDE.scale + WIDE.x), sy = (y) => r1(y * WIDE.scale + WIDE.y);
export function build() {
  const s = "be", p = "be-by";
  const K = 0.7;
  const inRoom = `${byrdLying(p, s, 290, r1(320 - 40 * K), K)}<circle id="${s}-kglow" cx="333" cy="238" r="26" fill="${E.lamp}" opacity=".25" filter="url(#${s}-bloom)"/>`;
  const la = `<g>${[0, 1, 2].map((i) => `<path d="M${LA - 200 + i * 150} ${G} q60 -50 120 0 z" fill="#CBD5E1" stroke="#94A3B8" stroke-width="3"/><rect x="${LA - 160 + i * 150}" y="${G - 30}" width="40" height="22" fill="#FDE68A" opacity=".7"/>`).join("")}
      ${tower(LA + 260, G, 300)}${tower(LA + 420, G, 260)}</g>`;
  const trail = `<path d="M${RX + 520} ${G - 6} L${LA - 230} ${G - 6}" stroke="#94A3B8" stroke-width="10" stroke-dasharray="30 22"/>`;
  const men = ["#5C4033", "#4A5568", "#78350F"].map((c, i) => avatar(`${s}-m${i}`, LA - 120 + i * 80, G - 50, c)).join("");
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0; background:${E.night}; overflow:hidden;">
      <div id="${s}-cam" style="position:absolute; left:0; top:0; width:1920px; height:1080px; transform-origin:0 0;"><svg class="stage" viewBox="0 0 1920 1080" style="overflow:visible;"><defs>${filters(s)}</defs>
        ${cutaway(s, G, { rx: RX, inRoom, seed: 101 })}${trail}${la}<g id="${s}-men">${men}</g></svg></div>
      <svg class="stage" viewBox="0 0 1920 1080">
        <path id="${s}-link" d="M${sx(RX + 260)} ${sy(G - 40)} Q${r1((sx(RX + 260) + sx(LA)) / 2)} ${sy(G) - 330} ${sx(LA - 40)} ${sy(G - 160)}" fill="none" stroke="${C.gold}" stroke-width="5" stroke-dasharray="14 10" opacity="0"/>
        <g id="${s}-shield" opacity="0"><path d="M${sx(LA) - 160} ${sy(G) - 220} L${sx(LA) + 120} ${sy(G) - 220} L${sx(LA) + 120} ${sy(G) - 40} Q${sx(LA) + 120} ${sy(G) + 40} ${sx(LA) - 20} ${sy(G) + 90} Q${sx(LA) - 160} ${sy(G) + 40} ${sx(LA) - 160} ${sy(G) - 40} Z" fill="rgba(245,158,11,.12)" stroke="#F59E0B" stroke-width="6" stroke-linejoin="round"/></g></svg>
      ${tag(s + "-t1", "ONE MAN · ON THE FLOOR OF A BURIED HUT", 192, 196)}${tag(s + "-t2", "A RADIO KEY IN FRONT OF HIM", 192, 266)}
      <div id="${s}-dark" class="ui" style="left:0; right:0; top:${sy(G) + 40}px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:40px; color:#CBD5E1;">123 MILES · TOTAL DARKNESS</div>
      <div class="ui tag" id="${s}-laT" style="left:${sx(LA) - 170}px; top:${sy(G) + 110}px;">LITTLE AMERICA</div>
      <div id="${s}-sos" class="ui" style="left:${sx(RX) - 60}px; top:${sy(G) - 260}px; padding:16px 26px; border-radius:16px; background:rgba(11,16,30,.95); border:4px solid ${E.warn}; font-family:'Archivo Black', sans-serif; font-size:34px; color:#FCA5A5;">SEND “S.O.S.”?<div id="${s}-x" style="position:absolute; left:10px; right:10px; top:50%; height:6px; margin-top:-3px; background:${E.warn};"></div></div>
      <div id="${s}-prot" class="ui" style="left:${sx(LA) - 470}px; top:${sy(G) - 250}px;"><div class="tag" style="position:relative; border-left-color:#F59E0B; font-size:30px;">✓ PROTECTED HIS MEN</div></div>
      <div id="${s}-paid" class="ui" style="left:${sx(RX) - 60}px; top:${sy(G) + 150}px;"><div class="tag" style="position:relative; border-left-color:${E.warn}; font-size:30px;">NEARLY PAID WITH HIS LIFE</div></div></div>
    ${badge(s + "-b", "MAY 31, 1934", "ROSS ICE SHELF", { fs: 36, w: 420, left: 1308 })}`;

  const js = `
    ${hide(s + "-t1", s + "-t2", s + "-dark", s + "-laT", s + "-sos", s + "-x", s + "-prot", s + "-paid", s + "-b")}
    tl.set("#${s}-snowcover", { opacity: .12 }, 0);
    tl.set("#${p}-lids", { scaleY: .55 }, 0.02);
    tl.set("#${s}-cam", { ...${JSON.stringify(cam(1.35, RX + 260, RY + 170))}, transformOrigin: "0 0" }, 0);
    tl.fromTo("#${s}-cam", { scale: 1.35 }, { scale: 1.42, duration: 9.6, ease: "none", immediateRender: false }, 0);
    tl.fromTo("#${s}-b", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 1.95);
    tl.fromTo("#${s}-t1", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 5.1);
    tl.fromTo("#${s}-t2", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .25, immediateRender: false }, 8.05);
    ${Array.from({ length: 8 }, (_, i) => `tl.to("#${s}-kglow", { opacity: ${i % 2 ? 0.25 : 0.8}, duration: .45, ease: "sine.inOut" }, ${r1(8.0 + i * 0.5)});`).join("\n    ")}
    // pull back: the tiny buried hut and 123 miles of darkness
    tl.to(["#${s}-t1", "#${s}-t2"], { opacity: 0, duration: .25 }, 9.7);
    tl.to("#${s}-cam", { ...${JSON.stringify(WIDE)}, duration: 2.6, ease: "power2.inOut" }, 9.82);
    tl.fromTo(["#${s}-dark", "#${s}-laT"], { opacity: 0 }, { opacity: 1, duration: .4, immediateRender: false }, 11.6);
    // he could have called for help — instead, he protected his men
    tl.fromTo("#${s}-sos", { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .25, ease: "back.out(1.7)", immediateRender: false }, 13.4);
    tl.fromTo("#${s}-x", { opacity: 1, scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: .25, immediateRender: false }, 15.1);
    tl.to("#${s}-sos", { opacity: .35, duration: .4 }, 15.4);
    tl.fromTo("#${s}-link", { opacity: 0 }, { opacity: .9, duration: .5, immediateRender: false }, 16.0);
    tl.fromTo("#${s}-shield", { opacity: 0, scale: .8, svgOrigin: "${sx(LA)} ${sy(G)}" }, { opacity: 1, scale: 1, svgOrigin: "${sx(LA)} ${sy(G)}", duration: .4, ease: "back.out(1.5)", immediateRender: false }, 16.1);
    tl.fromTo("#${s}-prot", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 16.4);
    tl.fromTo("#${s}-paid", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 18.75);`;

  return { id: "bookend", html: scene("bookend", { css: KIT_CSS + E3_CSS, body, js, bg: E.night }) };
}
