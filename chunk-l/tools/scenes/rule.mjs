// L01 (0–16.0): hard cut from K's last frame (today's stations) → "BUILT ON LESSONS LEARNED THE HARD WAY"; the three station panels become engineering
//   cards ✓ 1. ACTIVE VENTILATION (heated ducts + CO: 0 PPM) · ✓ 2. BACKUP HEAT (twin generators) · ✓ 3. STRICT RADIO CHECK-INS (dish + 24/7 log);
//   the gold rule banner over the twelve-person crew: THE ANTARCTIC RULE: NOBODY SHOULD EVER BE TRULY ALONE.
// VO (abs): "Every one of those stations is built on lessons that people like Byrd learned the hard way. (0.23–4.88) Ventilation. (5.38) Backup heat. (6.63)
//   Strict radio check-ins. (7.75–9.23) And one simple rule: (9.73) in Antarctica, (11.46) nobody should ever be truly alone. (12.70–14.79) [+0.8]"
import { C, r1, filters, rigInit, scene, life, scout } from "../lib.mjs";
import { KIT_CSS, hide, bridge } from "./kit.mjs";
import { E3_CSS } from "./e3.mjs";
import { avatar } from "./b3.mjs";

const PW = 440, PY = 270, PH = 400, PX = (i) => 430 + i * 470;
export function build() {
  const s = "ru", p = "ru-sc";
  const vent = `<g>${[150, 290].map((x) => `<rect x="${x - 26}" y="150" width="52" height="210" rx="6" fill="#CBD5E1" stroke="#475569" stroke-width="4"/>${[0, 1, 2].map((j) => `<path class="${s}-up" d="M${x - 12} ${330 - j * 60} l12 -16 l12 16" fill="none" stroke="#F97316" stroke-width="5" stroke-linecap="round"/>`).join("")}`).join("")}
      <rect x="320" y="280" width="104" height="60" rx="8" fill="#0F172A" stroke="#22C55E" stroke-width="4"/><text x="372" y="318" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="18" fill="#4ADE80">CO: 0 PPM</text></g>`;
  const heat = `<g>${[110, 300].map((x, i) => `<rect x="${x - 80}" y="200" width="160" height="130" rx="10" fill="#475569" stroke="#1F2937" stroke-width="4"/><circle cx="${x - 30}" cy="265" r="30" fill="#334155" stroke="#1F2937" stroke-width="4"/>
      <path d="M${x + 30} 236 l-14 30 h14 l-10 30 l26 -38 h-14 l10 -22 z" fill="#FACC15"/><text x="${x}" y="356" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="22" fill="#E2E8F0">${i ? "BACKUP" : "MAIN"}</text>`).join("")}</g>`;
  const radio = `<g><path d="M60 300 Q60 190 170 170 L190 300 Z" fill="#E2E8F0" stroke="#475569" stroke-width="4"/><line x1="125" y1="300" x2="125" y2="350" stroke="#475569" stroke-width="8"/><line x1="115" y1="235" x2="160" y2="200" stroke="#475569" stroke-width="4"/>
      <rect x="230" y="160" width="180" height="200" rx="8" fill="#F8FAFC" stroke="#475569" stroke-width="4"/><text x="320" y="190" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="17" fill="#0F172A">24/7 CHECK-IN LOG</text>
      ${[0, 1, 2, 3].map((j) => `<text x="250" y="${228 + j * 34}" font-family="JetBrains Mono, monospace" font-size="18" fill="#0F172A">${["06:00", "12:00", "18:00", "00:00"][j]}</text><text x="380" y="${228 + j * 34}" font-family="Inter, sans-serif" font-weight="800" font-size="22" fill="#16A34A">✓</text>`).join("")}</g>`;
  const card = (i, title, art) => `<div id="${s}-c${i}" class="ui" style="left:${PX(i)}px; top:${PY}px; width:${PW}px; height:${PH}px; border-radius:18px; overflow:hidden; border:3px solid #22C55E; ${"background-color:#0B1A2E; background-image:linear-gradient(rgba(0,245,212,.10) 2px, transparent 2px), linear-gradient(90deg, rgba(0,245,212,.10) 2px, transparent 2px); background-size:40px 40px;"}">
      <svg width="${PW}" height="${PH}" viewBox="0 0 440 400" style="position:absolute; left:0; top:0;">${art}</svg>
      <div style="position:absolute; left:14px; right:14px; top:14px; padding:8px 6px; white-space:normal; border-radius:10px; background:#052E1A; border:2px solid #22C55E; text-align:center; font-family:'Archivo Black', sans-serif; font-size:28px; color:#86EFAC;">${title}</div></div>`;
  const coats = ["#FF7A00", "#2563EB", "#DC2626", "#059669", "#7C3AED", "#F59E0B", "#0EA5E9", "#BE185D", "#FF7A00", "#2563EB", "#DC2626", "#059669"];
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0; background:linear-gradient(#0B1A2E, #12304F);"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <ellipse id="${s}-warm" cx="1450" cy="900" rx="520" ry="120" fill="#F59E0B" opacity="0" filter="url(#${s}-soft)"/>
      <g transform="translate(${r1(230 - 100 * 1.3)} ${r1(PY + PH - 265 * 1.3)}) scale(1.3)">${scout(p, s, {})}</g>
      <g id="${s}-crew">${coats.map((c, i) => avatar(`${s}-av${i}`, 1110 + i * 62, 910, c)).join("")}</g></svg>
      <div class="ui" style="left:0; right:0; top:150px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:50px; color:#fff;">BUILT ON LESSONS LEARNED THE HARD WAY</div>
      ${card(0, "✓ 1. ACTIVE VENTILATION", vent)}${card(1, "✓ 2. BACKUP HEAT", heat)}${card(2, "✓ 3. STRICT RADIO CHECK-INS", radio)}
      <div id="${s}-ban" class="ui" style="left:430px; width:1380px; top:${PY + PH + 40}px; padding:18px 0; border-radius:18px; background:rgba(17,24,39,.96); border:4px solid ${C.gold}; box-shadow:0 0 50px rgba(245,158,11,.3); text-align:center; font-family:'Archivo Black', sans-serif; font-size:36px; color:#fff;">THE ANTARCTIC RULE: <span style="color:#FBBF24;">NOBODY SHOULD EVER BE TRULY ALONE</span></div></div>
    ${bridge(s, "k-last.png")}
    <div id="${s}-hard" class="ui" style="left:1060px; top:1000px;"><div class="ui-pill" style="position:relative;"><div class="dot"></div><span>BUILT ON LESSONS LEARNED THE HARD WAY</span></div></div>`;

  const js = `
    ${rigInit(p)}
    ${life(p, 5.4, 16.0, { every: 3.0 })}
    ${hide(s + "-c0", s + "-c1", s + "-c2", s + "-ban", s + "-hard")}
    tl.fromTo("#${s}-hard", { opacity: 0, scale: .6, x: -20 }, { opacity: 1, scale: 1, x: 0, duration: .25, ease: "back.out(1.6)", immediateRender: false }, 0.8);
    tl.set(["#${s}-bridge", "#${s}-hard"], { autoAlpha: 0 }, 5.3);
    tl.set("#${p}-armR", { rotation: -70 }, 0);
    ${[[0, 5.38], [1, 6.63], [2, 7.75]].map(([i, t]) => `tl.fromTo("#${s}-c${i}", { opacity: 0, y: 30, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .3, ease: "back.out(1.6)", immediateRender: false }, ${t});`).join("\n    ")}
    tl.fromTo(".${s}-up", { y: 10, opacity: .3 }, { y: -10, opacity: 1, duration: .6, repeat: 9, ease: "none", immediateRender: false }, 5.5);
    tl.to("#${p}-armR", { rotation: 0, duration: .4 }, 9.5);
    tl.fromTo("#${s}-ban", { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: .35, ease: "back.out(1.5)", immediateRender: false }, 9.75);
    tl.to("#${s}-warm", { opacity: .35, duration: 1.0 }, 12.6);
    tl.to("#${s}-ban", { scale: 1.04, duration: .3, yoyo: true, repeat: 1 }, 12.7);`;

  return { id: "rule", html: scene("rule", { css: KIT_CSS + E3_CSS, body, js, bg: "#0B1A2E" }) };
}
