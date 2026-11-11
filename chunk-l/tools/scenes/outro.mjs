// L05 (68.3–90.0): the comment question over the blurred hut — A: SEND THE S.O.S. MESSAGE vs B: STAY SILENT, LIKE BYRD; Byrd (navy coat) tips his cap;
//   then a clean end screen: EDGE OF ENDURANCE + ✓ SUBSCRIBED, the modern Scout pointing up-right at the WATCH THIS NEXT zone; both YouTube end-card zones
//   (x 140–620 and 1300–1780, y 300–570) are kept empty; the lantern dims to black.
// VO (local = abs − 68.3): "Now I want to hear from you. (0.11–1.34) Would you have sent that message — (1.80–3.18) or stayed silent, (3.54) like Byrd?
//   (4.83–5.48) Tell me in the comments. (5.91–6.98) If you want more stories like this — (7.62–9.35) real people, (9.71) surviving where humans were never
//   meant to live — (10.81–13.31) subscribe to Edge of Endurance. (13.70–15.51) And if you want to see how people survive the cold today, (16.10–18.83)
//   watch this next. (19.21–20.26)"
import { C, r1, filters, rigInit, scene, life, scout } from "../lib.mjs";
import { KIT_CSS, hide } from "./kit.mjs";
import { E, E3_CSS, room, byrd } from "./e3.mjs";

export function build() {
  const s = "ou", b = "ou-by", p = "ou-sc";
  const bell = `<svg width="40" height="40" viewBox="0 0 24 24"><path d="M12 3 C8 3 6 6 6 10 V15 L4 18 H20 L18 15 V10 C18 6 16 3 12 3 Z" fill="#FDE68A" stroke="#111827" stroke-width="1.5"/><circle cx="12" cy="20.5" r="2" fill="#FDE68A" stroke="#111827" stroke-width="1.2"/></svg>`;
  const bub = `<svg width="54" height="48" viewBox="0 0 54 48"><path d="M6 4 H48 Q52 4 52 8 V30 Q52 34 48 34 H22 L10 44 L12 34 H6 Q2 34 2 30 V8 Q2 4 6 4 Z" fill="${C.cyan}"/><circle cx="16" cy="19" r="3.5" fill="#0B101E"/><circle cx="27" cy="19" r="3.5" fill="#0B101E"/><circle cx="38" cy="19" r="3.5" fill="#0B101E"/></svg>`;
  const opt = (id, x, k, t, col) => `<div id="${id}" class="ui" style="left:${x}px; top:140px; width:660px; padding:26px 0; border-radius:22px; background:rgba(11,16,30,.95); border:4px solid ${col}; text-align:center;">
      <div style="font-family:Inter, sans-serif; font-weight:800; font-size:28px; letter-spacing:.16em; color:${col};">${k}</div><div style="margin-top:8px; font-family:'Archivo Black', sans-serif; font-size:40px; color:#fff;">${t}</div></div>`;
  const stars = Array.from({ length: 70 }, (_, i) => `<circle cx="${(i * 331) % 1920}" cy="${(i * 97) % 700}" r="${1 + (i % 3) * 0.6}" fill="#E2E8F0" opacity="${0.3 + (i % 4) * 0.15}"/>`).join("");
  const body = `
    <div id="${s}-A" style="position:absolute; inset:0; background:${E.pineDk}; overflow:hidden;">
      <svg class="stage" viewBox="0 0 1920 1080" style="filter:blur(14px);"><defs>${filters(s + "R")}</defs><g transform="translate(-30 -60) scale(3.8)">${room(s + "R", { pipeTop: 0 })}</g><rect width="1920" height="1080" fill="#000" opacity=".45"/></svg>
      <svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs><g transform="translate(${320 - 100 * 1.6} ${r1(1040 - 265 * 1.6)}) scale(1.6)">${byrd(b, s, { outfit: "navy" })}</g></svg>
      <div class="ui" style="left:0; right:0; top:60px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:36px; color:#E2E8F0;">WOULD YOU SEND THE MESSAGE — OR STAY SILENT?</div>
      ${opt(s + "-a", 260, "OPTION A", "SEND THE S.O.S. MESSAGE", E.warn)}${opt(s + "-b", 1000, "OPTION B", "STAY SILENT, LIKE BYRD", C.gold)}
      <div id="${s}-cm" class="ui" style="left:0; right:0; top:420px; display:flex; justify-content:center; align-items:center; gap:18px; font-family:'Archivo Black', sans-serif; font-size:44px; color:${C.cyan};">${bub}TELL ME IN THE COMMENTS BELOW</div></div>
    <div id="${s}-E" style="position:absolute; inset:0; background:#050811; overflow:hidden;"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s + "E")}</defs>
      ${stars}<rect y="860" width="1920" height="220" fill="#1E293B"/><rect y="856" width="1920" height="6" fill="#94A3B8"/>
      <g id="${s}-lamp"><line x1="1180" y1="860" x2="1180" y2="700" stroke="#475569" stroke-width="6"/><circle id="${s}-lg" cx="1180" cy="712" r="110" fill="${E.lamp}" opacity=".4" filter="url(#${s}E-bloom)"/><rect x="1166" y="700" width="28" height="34" rx="6" fill="${E.lamp}"/></g>
      <g transform="translate(${960 - 100 * 1.1} ${r1(1000 - 265 * 1.1)}) scale(1.1)">${scout(p, s + "E", {})}</g></svg>
      <div class="ui" style="left:0; right:0; top:90px; display:flex; justify-content:center; align-items:center; gap:22px;">
        <div style="padding:14px 30px; border-radius:16px; background:rgba(17,24,39,.95); border:3px solid ${C.cyan}; font-family:'Archivo Black', sans-serif; font-size:40px; color:#fff;">EDGE OF ENDURANCE</div>
        <div style="position:relative; width:330px; height:78px;"><div id="${s}-sub" style="position:absolute; inset:0; border-radius:16px; background:#FF7A00; display:flex; align-items:center; justify-content:center; font-family:'Archivo Black', sans-serif; font-size:36px; color:#111827;">SUBSCRIBE</div>
          <div id="${s}-done" style="position:absolute; inset:0; border-radius:16px; background:#059669; display:flex; align-items:center; justify-content:center; gap:12px; font-family:'Archivo Black', sans-serif; font-size:32px; color:#fff;">✓ SUBSCRIBED <span id="${s}-bell" style="display:inline-block;">${bell}</span></div></div></div>
      <div id="${s}-prev" class="ui" style="left:140px; width:480px; top:600px; text-align:center; font-family:Inter, sans-serif; font-weight:800; font-size:28px; letter-spacing:.12em; color:#94A3B8;">▲ PREVIOUS EPISODE</div>
      <div id="${s}-next" class="ui" style="left:1300px; width:480px; top:600px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:34px; color:#FBBF24;">▲ WATCH THIS NEXT</div>
      <div id="${s}-cold" class="ui" style="left:1300px; width:480px; top:650px; text-align:center; font-family:Inter, sans-serif; font-weight:800; font-size:28px; color:#CBD5E1;">HOW PEOPLE SURVIVE THE COLD TODAY</div></div>
    <div id="${s}-black" style="position:absolute; inset:0; background:#000;"></div>`;

  const js = `
    ${rigInit(b)}${"\n    "}${rigInit(p)}
    ${life(b, 0.2, 7.5, { every: 2.8 })}${"\n    "}${life(p, 7.6, 21.7, { every: 3.0 })}
    tl.set("#${s}-E", { autoAlpha: 0 }, 0);
    ${hide(s + "-a", s + "-b", s + "-cm", s + "-done", s + "-prev", s + "-next", s + "-cold", s + "-black")}
    // the question
    tl.fromTo("#${s}-a", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 1.8);
    tl.fromTo("#${s}-b", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 3.55);
    // like Byrd: he tips his cap
    tl.to("#${b}-armR", { rotation: -165, duration: .4, ease: "power2.out" }, 4.8); tl.to("#${b}-foreR", { rotation: -40, duration: .4 }, 4.8);
    tl.to("#${b}-head", { rotation: -8, svgOrigin: "100 96", duration: .3, yoyo: true, repeat: 1 }, 5.2);
    tl.to(["#${b}-armR", "#${b}-foreR"], { rotation: 0, duration: .4 }, 6.2);
    tl.fromTo("#${s}-cm", { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .3, ease: "back.out(1.6)", immediateRender: false }, 5.92);
    // end screen
    tl.set("#${s}-E", { autoAlpha: 1 }, 7.5); tl.set("#${s}-A", { autoAlpha: 0 }, 7.5);
    tl.fromTo("#${s}-prev", { opacity: 0 }, { opacity: 1, duration: .4, immediateRender: false }, 7.8);
    tl.to("#${s}-sub", { scale: .94, duration: .08, yoyo: true, repeat: 1 }, 13.7);
    tl.set("#${s}-done", { opacity: 1 }, 13.88); tl.set("#${s}-sub", { opacity: 0 }, 13.88);
    ${[0, 1, 2, 3, 4, 5].map((i) => `tl.to("#${s}-bell", { rotation: ${i === 5 ? 0 : i % 2 ? -18 : 18}, duration: .1, ease: "sine.inOut" }, ${r1(13.95 + i * 0.1)});`).join("\n    ")}
    tl.fromTo("#${s}-cold", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .3, immediateRender: false }, 16.2);
    tl.to("#${p}-armR", { rotation: -125, duration: .45, ease: "power2.out" }, 19.1);
    tl.fromTo("#${s}-next", { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .3, ease: "back.out(1.8)", immediateRender: false }, 19.21);
    // the lantern dims to black
    tl.to("#${s}-lg", { opacity: 0, duration: 1.0 }, 20.4);
    tl.to("#${s}-black", { opacity: 1, duration: .8, ease: "power1.in" }, 20.9);`;

  return { id: "outro", html: scene("outro", { css: KIT_CSS + E3_CSS, body, js, bg: "#050811" }) };
}
