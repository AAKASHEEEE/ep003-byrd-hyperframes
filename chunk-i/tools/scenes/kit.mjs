// Shared kit for Chunks F–L: chapter card + dock, badge, pill, citation, tag, centre box, fade, bridge, breath puffs, vest Scout.
import { C, r1, scout } from "../lib.mjs";
import { TAG_CSS } from "./shared.mjs";
import { NT_CSS } from "./eart.mjs";

export const KIT_CSS = `${TAG_CSS}${NT_CSS}
  .k-card { position: absolute; left: 860px; top: 300px; width: 200px; height: 480px; border-radius: 22px; background: #111A2E; border: 4px solid ${C.cyan};
    box-shadow: 0 0 40px ${C.cyan}; display: flex; align-items: center; justify-content: center; font-family: "Archivo Black", sans-serif; font-size: 160px; color: ${C.cyan}; }
  .k-dock { position: absolute; left: 192px; top: 108px; display: flex; align-items: center; gap: 14px; height: 66px; padding: 0 26px 0 12px; border-radius: 14px;
    background: rgba(17,24,39,.94); border-left: 10px solid ${C.amber}; font-family: "Archivo Black", sans-serif; font-size: 32px; color: #fff; white-space: nowrap; }
  .k-dock .n { padding: 2px 12px; border-radius: 8px; background: ${C.red}; }
  .k-box { position: absolute; left: 0; right: 0; display: flex; justify-content: center; }
  .k-box > div { padding: 22px 46px; border-radius: 18px; background: rgba(11,16,30,.94); border: 2px solid ${C.slate};
    font-family: "Archivo Black", sans-serif; font-size: 54px; color: #fff; text-align: center; line-height: 1.15; }
  .k-lab { position: absolute; display: flex; justify-content: center; }
  .k-lab > div { padding: 14px 30px; border-radius: 40px; font-family: "Archivo Black", sans-serif; font-size: 34px; color: #fff; white-space: nowrap; }
  .k-ok { background: #15803D; } .k-bad { background: #991B1B; } .k-ice { background: #075985; }`;

export const card = (s, n, title) => `<div id="${s}-card" class="ui k-card">${n}</div>
    <div id="${s}-dock" class="ui k-dock"><span class="n">#${n}</span>${title}</div>`;
// Card flashes at t, docks top-left at t+1.1.
export const cardJs = (s, t) => `tl.set(["#${s}-card", "#${s}-dock"], { opacity: 0 }, 0);
    tl.fromTo("#${s}-card", { opacity: 0, scale: .5 }, { opacity: 1, scale: 1.08, duration: .2, ease: "power2.out", immediateRender: false }, ${t});
    tl.to("#${s}-card", { scale: 1, duration: .1 }, ${r1(t + 0.2)});
    tl.to("#${s}-card", { x: -760, y: -230, scale: .25, opacity: 0, duration: .45, ease: "power3.in" }, ${r1(t + 0.8)});
    tl.fromTo("#${s}-dock", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1.08, x: 0, duration: .17, ease: "power2.out", immediateRender: false }, ${r1(t + 1.15)});
    tl.to("#${s}-dock", { scale: 1, duration: .1 }, ${r1(t + 1.32)});`;

export const badge = (id, hd, bd, o = {}) => `<div id="${id}" class="ui ui-badge" style="left:${o.left ?? 1388}px; top:${o.top ?? 108}px;${o.w ? ` width:${o.w}px;` : ""}"><div class="hd"${o.color ? ` style="background:${o.color};"` : ""}>${hd}</div><div class="bd"${o.fs ? ` style="font-size:${o.fs}px; padding:18px 0 20px;"` : ""}>${bd}</div></div>`;
export const pill = (id, label, num = "", o = {}) => `<div id="${id}" class="ui ui-pill" style="left:${o.left ?? 192}px; top:${o.top ?? 108}px;"><div class="dot"></div><span>${label}</span>${num !== "" ? `<span class="num" id="${id}-n">${num}</span>` : ""}</div>`;
export const cite = (id, src, o = {}) => `<div id="${id}" class="ui ui-cite" style="left:${o.left ?? 192}px; top:${o.top ?? 960}px;"><b>SOURCE</b>${src}</div>`;
export const tag = (id, text, x, y) => `<div id="${id}" class="ui tag" style="left:${x}px; top:${y}px;">${text}</div>`;
export const box = (id, html, top) => `<div id="${id}" class="ui k-box" style="top:${top}px;"><div>${html}</div></div>`;
export const lab = (id, text, cls, cx, top, w = 800) => `<div id="${id}" class="ui k-lab" style="left:${cx - w / 2}px; width:${w}px; top:${top}px;"><div class="${cls}">${text}</div></div>`;
export const fade = (s, col = "#0B101E") => `<div id="${s}-fade" style="position:absolute; inset:0; background:${col};"></div>`;
export const fadeJs = (s) => `tl.to("#${s}-fade", { opacity: 0, duration: .3 }, 0);`;
export const bridge = (s, png) => `<div id="${s}-bridge" style="position:absolute; inset:0;"><img src="assets/bridge/${png}" style="position:absolute; left:0; top:0; width:1920px; height:1080px;" alt=""/></div>`;
// Hard cut: the previous chunk's last frame holds for one frame, then cuts (no cross-dissolve ghosting).
export const bridgeJs = (s) => `tl.set("#${s}-bridge", { opacity: 0, visibility: "hidden" }, 0.02);`;
// Hide a list of ids at t=0.
export const hide = (...ids) => `tl.set([${ids.map((i) => `"#${i}"`).join(", ")}], { opacity: 0 }, 0);`;
// Counter text tween.
export const count = (id, from, to, t, d, fmt = "v") => `{ const o = { v: ${from} }; tl.fromTo(o, { v: ${from} }, { v: ${to}, duration: ${d}, ease: "power2.out", onUpdate: () => { const v = o.v; document.getElementById("${id}").textContent = ${fmt}; } }, ${t}); }`;

// Scout with a breath-puff element; o.vest switches to the slate thermal vest.
export const scoutK = (p, s, o = {}) => scout(p, s, { ...o, outfit: o.vest ? "vest" : o.outfit,
  front: (o.front || "") + `<circle id="${p}-puff" cx="${o.facing === "right" ? 134 : 122}" cy="86" r="9" fill="#F8FAFC" opacity="0"/>` });
// Outdoor condensation puffs every 2.5 s.
export function breath(p, t0, t1, facing = "front") {
  const cx = facing === "right" ? 134 : 122, out = [];
  for (let t = t0; t < t1 - 1; t += 2.5)
    out.push(`tl.fromTo("#${p}-puff", { opacity: .75, scale: .4, x: 0, y: 0, svgOrigin: "${cx} 86" }, { opacity: 0, scale: 2.2, x: 20, y: -14, svgOrigin: "${cx} 86", duration: 1.2, ease: "power1.out", immediateRender: false }, ${r1(t)});`);
  return out.join("\n    ");
}
export { C, r1 };
