// I01 (0–20.8): hard cut from H's last frame → mid-video subscribe beat: the modern Endurance Scout (orange parka, cyan watch) beside the channel banner
//   clicks SUBSCRIBE → ✓ SUBSCRIBED + bell; the gold padlocked bookmark from Chunk A — WHAT THE RESCUERS FOUND — pulses top-left.
// VO (abs): "And by the way — (0.23–1.25) if you're enjoying this story, (1.70–3.08) this is exactly the kind of video we make on Edge of Endurance: (3.46–6.70)
//   real people, (7.16) surviving the most extreme places and jobs on Earth. (8.23–11.18) Hit subscribe, (11.66–12.54) because the next five minutes are the
//   part almost nobody has heard — (12.91–16.09) what those rescuers found (16.52) when they finally reached that buried hut. (18.31–20.21)"
import { C, r1, filters, rigInit, scene, life, scout } from "../lib.mjs";
import { KIT_CSS, hide, bridge } from "./kit.mjs";
import { BLUEPRINT_CSS } from "./shared.mjs";
import { E3_CSS } from "./e3.mjs";

const LOCK = (w, c = C.gold) => `<svg width="${w}" height="${w * 1.15}" viewBox="0 0 40 46"><path d="M10 20 V13 a10 10 0 0 1 20 0 V20" fill="none" stroke="${c}" stroke-width="5"/><rect x="4" y="20" width="32" height="24" rx="5" fill="${c}"/><circle cx="20" cy="31" r="3.5" fill="#111827"/></svg>`;
const SK = 1.6, SX = 560, FY = 900;
export function build() {
  const s = "ct", p = "ct-sc";
  const bell = `<svg width="44" height="44" viewBox="0 0 24 24"><path d="M12 3 C8 3 6 6 6 10 V15 L4 18 H20 L18 15 V10 C18 6 16 3 12 3 Z" fill="#FDE68A" stroke="#111827" stroke-width="1.5"/><circle cx="12" cy="20.5" r="2" fill="#FDE68A" stroke="#111827" stroke-width="1.2"/></svg>`;
  const body = `
    <div id="${s}-W" style="position:absolute; inset:0; ${BLUEPRINT_CSS}"><svg class="stage" viewBox="0 0 1920 1080"><defs>${filters(s)}</defs>
      <rect x="0" y="${FY}" width="1920" height="${1080 - FY}" fill="#0B1222"/>
      <g transform="translate(${r1(SX - 100 * SK)} ${r1(FY - 265 * SK)}) scale(${SK})">${scout(p, s, {})}</g></svg>
      <div class="ui" style="left:0; right:0; top:196px; text-align:center; font-family:'Archivo Black', sans-serif; font-size:64px; color:#fff; letter-spacing:.02em;">EDGE OF ENDURANCE</div>
      <div class="ui" style="left:0; right:0; top:286px; text-align:center; font-family:Inter, sans-serif; font-weight:800; font-size:30px; letter-spacing:.2em; color:${C.cyan};">REAL SURVIVAL STORIES</div>
      <div id="${s}-real" class="ui" style="left:0; right:0; top:360px; display:flex; justify-content:center;"><div class="tag" style="position:relative;">REAL PEOPLE · THE MOST EXTREME PLACES & JOBS ON EARTH</div></div>
      <div id="${s}-btn" class="ui" style="left:960px; top:560px; width:440px; height:110px; border-radius:20px; background:#FF7A00; display:flex; align-items:center; justify-content:center; font-family:'Archivo Black', sans-serif; font-size:46px; color:#111827; box-shadow:0 10px 40px rgba(255,122,0,.4);"><span id="${s}-sub">SUBSCRIBE</span></div>
      <div id="${s}-done" class="ui" style="left:960px; top:560px; width:440px; height:110px; border-radius:20px; background:#059669; display:flex; align-items:center; justify-content:center; gap:16px; font-family:'Archivo Black', sans-serif; font-size:42px; color:#fff;">✓ SUBSCRIBED <span id="${s}-bell" style="display:inline-block;">${bell}</span></div>
      <svg id="${s}-cur" width="54" height="64" viewBox="0 0 18 22" style="position:absolute; left:1500px; top:820px;"><path d="M1 1 L1 17 L5 13 L8 20 L11 19 L8 12 L14 12 Z" fill="#fff" stroke="#111827" stroke-width="1.4" stroke-linejoin="round"/></svg>
      <div id="${s}-next" class="ui" style="left:960px; top:720px; width:780px; font-family:Inter, sans-serif; font-weight:800; font-size:32px; line-height:1.3; color:#E2E8F0;">NEXT 5 MINUTES: THE PART ALMOST NOBODY HAS HEARD</div></div>
    <div id="${s}-bm" class="ui" style="left:192px; top:108px; display:flex; align-items:center; gap:14px; height:66px; padding:0 26px 0 18px; border-radius:14px; background:rgba(17,24,39,.94); border:3px solid ${C.gold}; font-family:'Archivo Black', sans-serif; font-size:28px; color:#fff;">${LOCK(26)}WHAT THE RESCUERS FOUND</div>
    ${bridge(s, "h-last.png")}`;

  const js = `
    ${rigInit(p)}
    ${life(p, 0.3, 20.8, { every: 3.0 })}
    tl.set("#${s}-bridge", { opacity: 0, visibility: "hidden" }, 0.22);
    ${hide(s + "-real", s + "-done", s + "-next", s + "-cur")}
    tl.set("#${s}-bm", { opacity: .55 }, 0);
    // the scout waves hello, then points at the button
    ${[0, 1, 2, 3].map((i) => `tl.to("#${p}-armL", { rotation: ${i % 2 ? 140 : 165}, duration: .25, ease: "sine.inOut" }, ${r1(0.4 + i * 0.25)});`).join("\n    ")}
    tl.to("#${p}-armL", { rotation: 0, duration: .4 }, 1.5);
    tl.fromTo("#${s}-real", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 7.2);
    tl.to("#${p}-armR", { rotation: -95, duration: .4, ease: "power2.out" }, 10.6);
    // hit subscribe
    tl.fromTo("#${s}-cur", { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: .15, immediateRender: false }, 10.9);
    tl.to("#${s}-cur", { x: -280, y: -210, duration: .6, ease: "power2.inOut" }, 11.0);
    tl.to("#${s}-btn", { scale: .94, duration: .08, yoyo: true, repeat: 1 }, 11.66);
    tl.to("#${s}-cur", { scale: .85, duration: .08, yoyo: true, repeat: 1 }, 11.66);
    tl.set("#${s}-done", { opacity: 1 }, 11.84); tl.set("#${s}-btn", { opacity: 0 }, 11.84);
    ${[0, 1, 2, 3, 4, 5].map((i) => `tl.to("#${s}-bell", { rotation: ${i === 5 ? 0 : i % 2 ? -18 : 18}, duration: .1, ease: "sine.inOut" }, ${r1(11.9 + i * 0.1)});`).join("\n    ")}
    tl.to("#${s}-cur", { opacity: 0, duration: .2 }, 12.6);
    tl.to("#${p}-armR", { rotation: 0, duration: .4 }, 12.7);
    tl.fromTo("#${s}-next", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .25, immediateRender: false }, 13.0);
    // the locked bookmark: what the rescuers found
    tl.to("#${s}-bm", { opacity: 1, scale: 1.12, boxShadow: "0 0 40px ${C.gold}", duration: .3, ease: "back.out(2)" }, 16.5);
    tl.to("#${s}-bm", { scale: 1, duration: .5, yoyo: true, repeat: 4, ease: "sine.inOut" }, 16.8);
    tl.to("#${p}-head", { rotation: -8, svgOrigin: "100 96", duration: .5 }, 16.6);`;

  return { id: "cta", html: scene("cta", { css: KIT_CSS + E3_CSS, body, js, bg: C.navy }) };
}
