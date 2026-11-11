// Shared palette, UI parts and the Endurance Scout rig for Chunk A.
// Scene files in compositions/ are generated from these by tools/build.mjs.

export const C = {
  navy: "#0B101E",
  indigo: "#1E293B",
  slate: "#334155",
  frost: "#F8FAFC",
  amber: "#FF7A00",
  ember: "#E85D04",
  head: "#14171F",
  white: "#FFFFFF",
  cyan: "#00F5D4",
  gold: "#F59E0B",
  red: "#DC2626",
  fur: "#EDE4D3",
  furShade: "#CDBFA8",
  lamp: "#FFD166",
  ice: "#7DD3FC",
  green: "#22C55E",
  mapSea: "#090D16",
  mapLand: "#1E293B",
  mapLine: "#E2E8F0",
};

// Deterministic PRNG for build-time scatter (snow, stars). Output is static HTML.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const r1 = (v) => Math.round(v * 10) / 10;

export const FONTS = `font-family: Inter, sans-serif;`;

// Shared UI styles (class-scoped; every scene root is styled as #root).
export const UI_CSS = `
  .ui { position: absolute; font-family: Inter, sans-serif; color: ${C.frost}; white-space: nowrap; }
  .ui-pill { display: flex; align-items: center; gap: 18px; height: 80px; padding: 0 34px 0 28px;
    border-radius: 40px; background: rgba(17,24,39,.9); border: 2px solid ${C.gold};
    font-weight: 800; font-size: 30px; letter-spacing: .08em; box-shadow: 0 10px 34px rgba(0,0,0,.45); }
  .ui-pill .num { font-family: "Archivo Black", sans-serif; font-size: 44px; letter-spacing: 0; color: #fff; }
  .ui-pill .dot { width: 18px; height: 18px; border-radius: 50%; background: ${C.cyan}; box-shadow: 0 0 16px ${C.cyan}; }
  .ui-badge { width: 340px; border-radius: 18px; overflow: hidden; background: rgba(17,24,39,.95);
    box-shadow: 0 14px 44px rgba(0,0,0,.5); text-align: center; }
  .ui-badge .hd { background: ${C.red}; color: #fff; font-weight: 800; font-size: 30px; letter-spacing: .16em; padding: 12px 0 10px; }
  .ui-badge .bd { color: #fff; font-family: "Archivo Black", sans-serif; font-size: 56px; padding: 14px 0 18px; }
  .ui-cite { display: flex; align-items: center; gap: 16px; height: 60px; padding: 0 30px; border-radius: 30px;
    background: rgba(17,24,39,.9); border: 2px solid ${C.slate}; font-size: 28px; color: #CBD5E1; }
  .ui-cite b { color: ${C.gold}; letter-spacing: .14em; font-size: 28px; font-weight: 800; }
  .ui-tag { display: flex; align-items: center; height: 60px; padding: 0 26px; border-radius: 12px;
    background: rgba(17,24,39,.9); font-weight: 800; font-size: 30px; letter-spacing: .1em; }
  .ui-title { font-family: "Archivo Black", sans-serif; color: #fff; letter-spacing: .01em; text-shadow: 0 6px 30px rgba(0,0,0,.6); }
  .ui-warn { display: flex; align-items: center; gap: 18px; height: 84px; padding: 0 38px; border-radius: 42px;
    background: ${C.red}; color: #fff; font-weight: 800; font-size: 36px; letter-spacing: .08em;
    box-shadow: 0 0 0 4px rgba(220,38,38,.35), 0 14px 40px rgba(0,0,0,.5); }
`;

export function filters(s) {
  return `
    <filter id="${s}-glow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="${s}-glowBig" x="-150%" y="-150%" width="400%" height="400%">
      <feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="${s}-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="${s}-bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25"/></filter>
    <linearGradient id="${s}-parka" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FF8C24"/><stop offset=".55" stop-color="${C.amber}"/><stop offset="1" stop-color="${C.ember}"/>
    </linearGradient>
    <clipPath id="${s}-torso"><rect x="60" y="98" width="80" height="100" rx="28"/></clipPath>`;
}

/*
 * The Endurance Scout rig, drawn in a 200 x 280 box (feet at y ~ 265).
 * Ids (prefix p): p (whole body), p-legL/R, p-armL/R (pivot at shoulder),
 * p-foreL/R (pivot at elbow), p-head (pivot at neck 100,96), p-eyes, p-pupils,
 * p-lids, p-mouth, p-wglow, p-rim, p-frost, plus optional props.
 * Pivots for GSAP svgOrigin:
 */
export const PIV = {
  armL: "72 116", armR: "128 116", foreL: "58 147", foreR: "142 147",
  legL: "88 192", legR: "112 192", head: "100 96", lids: "100 47", body: "100 265",
};

export function scout(p, s, o = {}) {
  const facing = o.facing || "front";
  const outfit = o.outfit || "parka";
  const ink = C.head;
  const ex = facing === "right" ? 7 : 0;
  const bootDx = facing === "right" ? 3 : 0;
  const rimLine = (x1, y1, x2, y2) => (o.limbRim ? `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8EA4C8" stroke-opacity=".6" stroke-width="13" stroke-linecap="round"/>` : "");
  const leg = (id, x1, y1, x2, y2) => `
      <g id="${p}-${id}">
        ${rimLine(x1, y1, x2, y2)}
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
        <rect x="${x2 - 12 + bootDx}" y="${y2 - 4}" width="25" height="12" rx="6" fill="${C.slate}" stroke="${ink}" stroke-width="3"/>
      </g>`;
  const watch = `
          <circle id="${p}-wglow" cx="153" cy="172" r="22" fill="${C.cyan}" opacity="0" filter="url(#${s}-glowBig)"/>
          <g transform="translate(153 172) rotate(-24)">
            <rect x="-7.5" y="-5.5" width="15" height="11" rx="3" fill="${C.cyan}" filter="url(#${s}-glow)"/>
            <rect x="-7.5" y="-5.5" width="15" height="11" rx="3" fill="none" stroke="${ink}" stroke-width="2"/>
          </g>`;
  const arm = (side) => {
    const sh = side === "L" ? [72, 116] : [128, 116];
    const el = side === "L" ? [58, 147] : [142, 147];
    const ha = side === "L" ? [44, 178] : [156, 178];
    const prop = (o.props || []).filter((q) => q.side === side).map((q) => q.svg).join("");
    return `
      <g id="${p}-arm${side}">
        ${rimLine(sh[0], sh[1], el[0], el[1])}
        <line x1="${sh[0]}" y1="${sh[1]}" x2="${el[0]}" y2="${el[1]}" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
        <g id="${p}-fore${side}">
          ${prop}
          ${rimLine(el[0], el[1], ha[0], ha[1])}
          <line x1="${el[0]}" y1="${el[1]}" x2="${ha[0]}" y2="${ha[1]}" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="${ha[0]}" cy="${ha[1]}" r="${o.hand ? 7.5 : 6}" fill="${o.hand || ink}"/>
          ${side === "R" && !o.noWatch ? watch : ""}
        </g>
      </g>`;
  };
  const BY = BYRD[outfit];
  const hood = BY ? BY.hood
    : outfit !== "parka"
      ? ""
      : facing === "back"
        ? `<circle cx="100" cy="66" r="50" fill="${C.fur}"/><circle cx="100" cy="66" r="50.5" fill="none" stroke="${C.fur}" stroke-width="7" stroke-dasharray="1.5 5" stroke-linecap="round"/>
           <circle cx="100" cy="62" r="42" fill="${C.ember}" stroke="${ink}" stroke-width="4"/><path d="M70 40 A38 38 0 0 1 100 24" fill="none" stroke="#FF9A3C" stroke-width="5" stroke-linecap="round"/>
           <path d="M100 24 V100" stroke="#B84A00" stroke-width="3"/>`
        : `<circle cx="${100 - ex * 0.4}" cy="64" r="47" fill="${C.ember}" stroke="${ink}" stroke-width="4"/>
           <circle cx="${100 + ex * 0.2}" cy="64" r="41" fill="${C.fur}"/>
           <circle cx="${100 + ex * 0.2}" cy="64" r="41.5" fill="none" stroke="${C.fur}" stroke-width="7" stroke-dasharray="1.5 5" stroke-linecap="round"/>
           <circle cx="${100 + ex * 0.2}" cy="64" r="37" fill="${C.furShade}"/>`;
  const torso = BY ? BY.torso(s, ink)
    : outfit === "vest"
      ? `<rect x="60" y="98" width="80" height="100" rx="28" fill="${C.slate}"/>
         <g clip-path="url(#${s}-torso)" stroke="#27324A" stroke-width="3">
           <line x1="60" y1="126" x2="140" y2="126"/><line x1="60" y1="150" x2="140" y2="150"/><line x1="60" y1="174" x2="140" y2="174"/>
         </g>
         <path d="M78 101 Q100 118 122 101" fill="none" stroke="${C.amber}" stroke-width="5" stroke-linecap="round"/>
         <line x1="100" y1="110" x2="100" y2="195" stroke="${C.amber}" stroke-width="2.5"/>
         <rect x="60" y="98" width="80" height="100" rx="28" fill="none" stroke="${ink}" stroke-width="4"/>`
      : `<rect x="60" y="98" width="80" height="100" rx="28" fill="url(#${s}-parka)"/>
         <g clip-path="url(#${s}-torso)">
           <rect x="60" y="141" width="80" height="7" fill="#DCE4EE" opacity=".92"/>
           <rect x="60" y="177" width="80" height="24" fill="#C94F00"/>
         </g>
         ${facing === "back" ? "" : `<line x1="${100 + ex}" y1="103" x2="${100 + ex}" y2="195" stroke="#9A3D00" stroke-width="2.5"/>
         <rect x="${69 + ex}" y="155" width="19" height="14" rx="4" fill="none" stroke="#B84A00" stroke-width="2"/>
         <rect x="${112 + ex}" y="155" width="19" height="14" rx="4" fill="none" stroke="#B84A00" stroke-width="2"/>`}
         <rect x="60" y="98" width="80" height="100" rx="28" fill="none" stroke="${ink}" stroke-width="4"/>`;
  const frostBits = [];
  if (outfit === "parka" && facing !== "back") {
    for (let i = 0; i < 16; i++) {
      const a = (-200 + i * 14.5) * (Math.PI / 180);
      const cx = 100 + 46 * Math.cos(a), cy = 64 + 46 * Math.sin(a);
      const ox = 6 * Math.cos(a), oy = 6 * Math.sin(a);
      frostBits.push(`<polygon points="${r1(cx - oy * 0.35)},${r1(cy + ox * 0.35)} ${r1(cx + ox)},${r1(cy + oy)} ${r1(cx + oy * 0.35)},${r1(cy - ox * 0.35)}" fill="#BAE6FD" opacity=".9"/>`);
    }
  }
  const face =
    facing === "back"
      ? ""
      : `<g id="${p}-eyes">
           <ellipse cx="${88 + ex}" cy="62" rx="8.5" ry="11.5" fill="#fff" filter="url(#${s}-glow)"/>
           <ellipse cx="${112 + ex}" cy="62" rx="8.5" ry="11.5" fill="#fff" filter="url(#${s}-glow)"/>
         </g>
         <g id="${p}-pupils">
           <circle cx="${89.5 + ex * 1.3}" cy="64" r="3.6" fill="${ink}"/>
           <circle cx="${113.5 + ex * 1.3}" cy="64" r="3.6" fill="${ink}"/>
         </g>
         <rect id="${p}-lids" x="${74 + ex}" y="47" width="52" height="30" fill="${ink}"/>
         <g id="${p}-mouth" opacity="0">
           <ellipse cx="${100 + ex}" cy="86" rx="5" ry="6.5" fill="#05070B" stroke="#fff" stroke-width="2.2"/>
         </g>`;
  const headCore =
    facing === "back"
      ? ""
      : `<circle cx="${100 + ex * 0.3}" cy="64" r="33" fill="${ink}"/>
         <path d="M${77 + ex * 0.3} 50 A28 28 0 0 1 ${99 + ex * 0.3} 36" fill="none" stroke="#2C3344" stroke-width="4" stroke-linecap="round"/>`;
  const rim =
    facing === "back"
      ? ""
      : `<g id="${p}-rim" opacity="0" fill="none" stroke="#FFC46B" stroke-linecap="round" filter="url(#${s}-glow)">
           <path d="M126 28 A47 47 0 0 1 146 80" stroke-width="5"/>
           <path d="M139 118 V180" stroke-width="5"/>
           <path d="M133 64 A33 33 0 0 1 128 82" stroke-width="3" opacity=".7"/>
         </g>`;
  // Soft 2px rim light around the silhouette for dark scenes (cyan or amber).
  const rimGlow = `<g id="${p}-rimglow" opacity=".6" fill="none" stroke="${o.rimGlow || C.cyan}" stroke-linecap="round" filter="url(#${s}-soft)">
        <circle cx="100" cy="64" r="50" stroke-width="6"/><rect x="57" y="95" width="86" height="106" rx="30" stroke-width="6"/>
      </g>`;
  const front = (o.front || "");
  return `
    <g id="${p}">
      ${leg("legL", 88, 192, 84, 256)}
      ${leg("legR", 112, 192, 116, 256)}
      ${arm("L")}
      ${o.rimGlow ? rimGlow : ""}
      ${hood}
      <g id="${p}-torso">${o.gaunt ? `<g transform="translate(100 0) scale(.82 1) translate(-100 0)">${torso}</g>` : torso}</g>
      ${arm("R")}
      <g id="${p}-head">
        ${headCore}
        ${face}
        <g id="${p}-frost" opacity="0">${frostBits.join("")}</g>
        ${BY && BY.cap ? BY.cap : ""}
        ${o.gaunt && facing !== "back" ? `<g id="${p}-hollow" fill="none" stroke="#64748B" stroke-width="2.6" stroke-linecap="round" opacity=".95"><path d="M${80 + ex} 77 Q${88 + ex} 83 ${96 + ex} 77"/><path d="M${104 + ex} 77 Q${112 + ex} 83 ${120 + ex} 77"/></g>` : ""}
        ${o.headwear || ""}
        <g id="${p}-ache" opacity="0" fill="none" stroke-linecap="round">
          <circle cx="68" cy="56" r="7" stroke="#F59E0B" stroke-width="3"/><circle cx="68" cy="56" r="13" stroke="#DC2626" stroke-width="2.5"/>
          <circle cx="132" cy="56" r="7" stroke="#F59E0B" stroke-width="3"/><circle cx="132" cy="56" r="13" stroke="#DC2626" stroke-width="2.5"/>
        </g>
      </g>
      ${rim}
      ${front}
    </g>`;
}

// Standard rest-state sets for a rig, run at t=0 of a scene timeline.
export function rigInit(p, o = {}) {
  const lines = [
    `tl.set("#${p}-lids", { scaleY: 0, svgOrigin: "${PIV.lids}" }, 0);`,
    `tl.set("#${p}-armL", { rotation: 0, svgOrigin: "${PIV.armL}" }, 0);`,
    `tl.set("#${p}-armR", { rotation: 0, svgOrigin: "${PIV.armR}" }, 0);`,
    `tl.set("#${p}-foreL", { rotation: 0, svgOrigin: "${PIV.foreL}" }, 0);`,
    `tl.set("#${p}-foreR", { rotation: 0, svgOrigin: "${PIV.foreR}" }, 0);`,
    `tl.set("#${p}-legL", { rotation: 0, svgOrigin: "${PIV.legL}" }, 0);`,
    `tl.set("#${p}-legR", { rotation: 0, svgOrigin: "${PIV.legR}" }, 0);`,
    `tl.set("#${p}-head", { rotation: 0, svgOrigin: "${PIV.head}" }, 0);`,
    `tl.set("#${p}", { x: 0, y: 0, rotation: 0, scaleY: 1, svgOrigin: "${PIV.body}" }, 0);`,
  ];
  if (o.noFace) return lines.filter((l) => !l.includes("-lids")).join("\n    ");
  return lines.join("\n    ");
}

// A blink: lids close and open in 0.14 s.
export function blink(p, t) {
  return `tl.to("#${p}-lids", { scaleY: 1, duration: 0.06, ease: "power2.in" }, ${t});
    tl.to("#${p}-lids", { scaleY: 0, duration: 0.09, ease: "power2.out" }, ${r1(t + 0.07)});`;
}

// Idle breath on the body: two slow squash cycles per call window (acting, not a UI loop).
export function breathe(p, t0, t1, amt = 0.012) {
  const out = [];
  for (let t = t0; t < t1 - 0.1; t += 2) {
    out.push(`tl.to("#${p}", { scaleY: ${1 - amt}, duration: 1, ease: "sine.inOut" }, ${r1(t)});`);
    out.push(`tl.to("#${p}", { scaleY: 1, duration: 1, ease: "sine.inOut" }, ${r1(t + 1)});`);
  }
  return out.join("\n    ");
}

// Walk cycle: alternating leg swings and opposite arm swings over [t0, t1), step period sp.
export function walk(p, t0, t1, sp = 0.5, swing = 18) {
  const out = [];
  let i = 0;
  for (let t = t0; t < t1 - 0.05; t += sp, i++) {
    const s = i % 2 ? 1 : -1;
    out.push(`tl.to("#${p}-legL", { rotation: ${s * swing}, duration: ${sp}, ease: "sine.inOut" }, ${r1(t)});`);
    out.push(`tl.to("#${p}-legR", { rotation: ${-s * swing}, duration: ${sp}, ease: "sine.inOut" }, ${r1(t)});`);
    out.push(`tl.to("#${p}-armL", { rotation: ${-s * swing * 0.6}, duration: ${sp}, ease: "sine.inOut" }, ${r1(t + 0.04)});`);
    out.push(`tl.to("#${p}-armR", { rotation: ${s * swing * 0.6}, duration: ${sp}, ease: "sine.inOut" }, ${r1(t + 0.04)});`);
    out.push(`tl.to("#${p}", { y: -4, duration: ${r1(sp / 2)}, ease: "sine.out" }, ${r1(t)});`);
    out.push(`tl.to("#${p}", { y: 0, duration: ${r1(sp / 2)}, ease: "sine.in" }, ${r1(t + sp / 2)});`);
  }
  out.push(`tl.to(["#${p}-legL", "#${p}-legR", "#${p}-armL", "#${p}-armR"], { rotation: 0, duration: 0.25, ease: "power2.out" }, ${r1(t1)});`);
  return out.join("\n    ");
}

// Shiver: fast, uneven horizontal jitter (fixed offsets, so every render matches).
export function shiver(p, t0, t1, amp = 3) {
  const out = [];
  const R = rng(Math.round(t0 * 1000));
  let t = t0;
  while (t < t1) {
    const x = r1((R() * 2 - 1) * amp);
    out.push(`tl.to("#${p}", { x: ${x}, duration: 0.05, ease: "none" }, ${r1(t)});`);
    t += 0.05;
  }
  out.push(`tl.to("#${p}", { x: 0, duration: 0.1 }, ${r1(t1)});`);
  return out.join("\n    ");
}

// Blowing snow: n flakes drifting left-to-right over [0, dur] across a w x h region.
export function snow(s, n, dur, o = {}) {
  const R = rng(o.seed || 7);
  const w = o.w || 2200, h = o.h || 1200, x0 = o.x0 || -140, y0 = o.y0 || -60;
  const flakes = [], tw = [];
  for (let i = 0; i < n; i++) {
    const x = x0 + R() * w, y = y0 + R() * h, r = 1.5 + R() * (o.big || 3.5);
    const dx = (o.dx || 520) * (0.6 + R() * 0.8), dy = (o.dy || 90) * (0.4 + R() * 1.2);
    const op = r1(0.35 + R() * 0.55);
    flakes.push(`<circle id="${s}-f${i}" cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="#fff" opacity="${op}"/>`);
    tw.push(`tl.fromTo("#${s}-f${i}", { x: 0, y: 0 }, { x: ${r1(dx * dur / 6)}, y: ${r1(dy * dur / 6)}, duration: ${dur}, ease: "none" }, 0);`);
  }
  return { svg: flakes.join(""), js: tw.join("\n    ") };
}

export function scene(id, { css = "", body = "", js = "", bg = C.navy }) {
  return `<template>
  <style>
    #root { position: absolute; inset: 0; overflow: hidden; background: ${bg}; }
    #root svg.stage { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
    ${UI_CSS}
    ${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1920" data-height="1080">
${body}
  </div>
  <script>
    const tl = gsap.timeline({ paused: true });
    ${js}
    window.__timelines["${id}"] = tl;
  </script>
</template>
`;
}

// Small vector props shared by several scenes.
export function stiltHouse(x, y, w, h, o = {}) {
  const roof = o.roof || "#3B4A63", wall = o.wall || "#24324A", win = o.win || C.lamp;
  const id = o.id ? ` id="${o.id}"` : "";
  const posts = [x + w * 0.12, x + w * 0.5, x + w * 0.88]
    .map((px) => `<line x1="${r1(px)}" y1="${y + h}" x2="${r1(px)}" y2="${y + h + h * 0.28}" stroke="${wall}" stroke-width="${Math.max(2, w * 0.035)}"/>`)
    .join("");
  const winW = w * 0.16, winH = h * 0.26;
  const wins = (o.wins || [0.22, 0.62])
    .map((f) => `<rect x="${r1(x + w * f)}" y="${r1(y + h * 0.38)}" width="${r1(winW)}" height="${r1(winH)}" fill="${win}"${o.glow ? ` filter="url(#${o.glow})"` : ""}/>`)
    .join("");
  return `<g${id}>${posts}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${wall}"/>
    <polygon points="${r1(x - w * 0.06)},${y + 2} ${r1(x + w / 2)},${r1(y - h * 0.48)} ${r1(x + w * 1.06)},${y + 2}" fill="${roof}"/>
    <polygon points="${r1(x - w * 0.06)},${y + 2} ${r1(x + w / 2)},${r1(y - h * 0.48)} ${r1(x + w / 2)},${r1(y - h * 0.36)} ${r1(x + w * 0.02)},${y + 2}" fill="#E2E8F0" opacity=".85"/>
    ${wins}</g>`;
}

// ---- Chunk B upgrades -------------------------------------------------------
// Idle life: torso breathes 102% Y every 2 s; blinks every 3.2 s (skip windows given as [a, b]).
export function life(p, t0, t1, o = {}) {
  const out = [`tl.set("#${p}-torso", { scaleY: 1, svgOrigin: "100 198" }, 0);`];
  for (let t = t0; t < t1 - 0.2; t += 2) {
    out.push(`tl.to("#${p}-torso", { scaleY: 1.02, duration: 1, ease: "sine.inOut" }, ${r1(t)});`);
    out.push(`tl.to("#${p}-torso", { scaleY: 1, duration: 1, ease: "sine.inOut" }, ${r1(t + 1)});`);
  }
  if (!o.noBlink)
    for (let t = t0 + 1.1; t < t1 - 0.3; t += o.every || 3.2)
      if (!(o.skip || []).some(([a, b]) => t > a - 0.3 && t < b)) out.push(blink(p, r1(t)));
  return out.join("\n    ");
}

// Spring pop: 60% -> 108% -> 100% over ~8 frames. Opacity never bounces.
export function spring(sel, t, o = {}) {
  const from = o.from || "scale: .6";
  return `tl.fromTo("${sel}", { opacity: 0, ${from} }, { opacity: 1, scale: 1.08, x: 0, y: 0, duration: .17, ease: "power2.out" }, ${t});
    tl.to("${sel}", { scale: 1, duration: .1, ease: "sine.inOut" }, ${r1(t + 0.17)});`;
}

// Two-layer parallax snow: small slow far flakes + large fast blurred near flakes.
export function snow2(s, dur, o = {}) {
  const base = { w: o.w, h: o.h, x0: o.x0, y0: o.y0 };
  const far = snow(s + "-sf", o.far ?? 70, dur, { ...base, seed: (o.seed || 3) + 1, dx: 260, dy: 60, big: 1.6 });
  const near = snow(s + "-sn", o.near ?? 22, dur, { ...base, seed: (o.seed || 3) + 2, dx: 900, dy: 260, big: 5 });
  return {
    defs: `<filter id="${s}-nearBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter>`,
    far: `<g opacity=".7">${far.svg}</g>`,
    near: `<g filter="url(#${s}-nearBlur)">${near.svg}</g>`,
    js: far.js + "\n    " + near.js,
  };
}

// Additive light: a flat cone plus a 25px-blurred screen-mode bloom at 35%.
export function bloomDef(s) {
  return `<filter id="${s}-bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25"/></filter>`;
}
export function beam(id, points, color, s, op = 0.22) {
  return `<g id="${id}"><polygon points="${points}" fill="${color}" opacity="${op}"/>
    <polygon points="${points}" fill="${color}" opacity=".35" style="mix-blend-mode:screen" filter="url(#${s}-bloom)"/></g>`;
}

// ---- Episode #003 (1934) wardrobe for Admiral Byrd: same brand head/eyes, no smartwatch (pass noWatch) ----
const torsoBox = (fill, inner, ink) => `<rect x="60" y="98" width="80" height="100" rx="28" fill="${fill}"/>
         <g clip-path="url(#__S__-torso)">${inner}</g>
         <rect x="60" y="98" width="80" height="100" rx="28" fill="none" stroke="${ink}" stroke-width="4"/>`;
export const BYRD = {
  // Outdoor: canvas + reindeer-fur anorak, ochre #C87D32, cream-brown wolf-fur hood rim #D4A373, leather belt.
  anorak: {
    hood: `<circle cx="100" cy="64" r="47" fill="#A8641F" stroke="#14171F" stroke-width="4"/>
           <circle cx="100" cy="64" r="41" fill="#D4A373"/>
           <circle cx="100" cy="64" r="41.5" fill="none" stroke="#D4A373" stroke-width="7" stroke-dasharray="1.5 5" stroke-linecap="round"/>
           <circle cx="100" cy="64" r="37" fill="#B98A5A"/>`,
    torso: (s, ink) => torsoBox("#C87D32", `<rect x="60" y="98" width="80" height="16" fill="#D4A373"/>
           <rect x="60" y="150" width="80" height="9" fill="#3B2414"/><rect x="93" y="149" width="14" height="11" rx="2" fill="none" stroke="#B08D3C" stroke-width="2.5"/>
           <rect x="60" y="184" width="80" height="16" fill="#D4A373"/><line x1="122" y1="114" x2="122" y2="148" stroke="#A8641F" stroke-width="3"/>`, ink).replace("__S__", s),
  },
  // Inside the hut: charcoal wool sweater #334155 with a rolled turtleneck.
  sweater: {
    hood: "",
    torso: (s, ink) => torsoBox("#334155", `<g stroke="#2A3646" stroke-width="2"><line x1="70" y1="118" x2="70" y2="196"/><line x1="80" y1="118" x2="80" y2="196"/><line x1="90" y1="118" x2="90" y2="196"/><line x1="100" y1="118" x2="100" y2="196"/><line x1="110" y1="118" x2="110" y2="196"/><line x1="120" y1="118" x2="120" y2="196"/><line x1="130" y1="118" x2="130" y2="196"/></g>
           <rect x="60" y="184" width="80" height="16" fill="#2A3646"/>`, ink).replace("__S__", s) + `<rect x="78" y="90" width="44" height="18" rx="9" fill="#475569" stroke="${ink}" stroke-width="3"/>`,
  },
  // 1933 flashback: US Navy admiral, double-breasted dark navy coat, gold shoulderboards, brass buttons, ribbons, peaked cap.
  navy: {
    hood: "",
    torso: (s, ink) => torsoBox("#1E293B", `<g fill="#D4A017"><circle cx="88" cy="128" r="3.5"/><circle cx="112" cy="128" r="3.5"/><circle cx="88" cy="150" r="3.5"/><circle cx="112" cy="150" r="3.5"/><circle cx="88" cy="172" r="3.5"/><circle cx="112" cy="172" r="3.5"/></g>
           <path d="M84 100 L100 122 L116 100" fill="#F8FAFC"/><path d="M92 100 L100 112 L108 100" fill="#14171F"/>
           <rect x="66" y="128" width="7" height="5" fill="#DC2626"/><rect x="66" y="134" width="7" height="5" fill="#2563EB"/><rect x="66" y="140" width="7" height="5" fill="#F59E0B"/>
           <rect x="60" y="188" width="80" height="4" fill="#D4A017"/>`, ink).replace("__S__", s)
      + `<rect x="56" y="99" width="22" height="9" rx="3" fill="#D4A017" stroke="${ink}" stroke-width="2"/><rect x="122" y="99" width="22" height="9" rx="3" fill="#D4A017" stroke="${ink}" stroke-width="2"/>`,
    cap: `<rect x="66" y="22" width="68" height="16" rx="6" fill="#F8FAFC" stroke="#14171F" stroke-width="3"/><rect x="68" y="36" width="64" height="9" fill="#1E293B"/>
           <path d="M70 45 Q100 56 130 45" fill="#14171F" stroke="#14171F" stroke-width="3"/><circle cx="100" cy="40" r="5" fill="#D4A017"/>`,
  },
};
// Expedition crew parkas (Ep #003): each a different colour, fur-trimmed hood, goggles pushed up on the head.
const crewParka = (coat, shade, fur) => ({
  hood: `<circle cx="100" cy="64" r="47" fill="${shade}" stroke="#14171F" stroke-width="4"/><circle cx="100" cy="64" r="41" fill="${fur}"/>
         <circle cx="100" cy="64" r="41.5" fill="none" stroke="${fur}" stroke-width="7" stroke-dasharray="1.5 5" stroke-linecap="round"/><circle cx="100" cy="64" r="37" fill="#8C6A4A"/>`,
  torso: (s, ink) => torsoBox(coat, `<rect x="60" y="184" width="80" height="16" fill="${fur}"/><rect x="60" y="150" width="80" height="7" fill="#2B1A0C"/>
         <line x1="100" y1="104" x2="100" y2="182" stroke="${shade}" stroke-width="3"/>`, ink).replace("__S__", s),
  cap: `<rect x="72" y="30" width="56" height="12" rx="6" fill="#64748B" stroke="#14171F" stroke-width="2.5"/><circle cx="88" cy="36" r="5" fill="#94A3B8"/><circle cx="112" cy="36" r="5" fill="#94A3B8"/>`,
});
BYRD.crew1 = crewParka("#5C4033", "#3E2B22", "#A47148");
BYRD.crew2 = crewParka("#4A5568", "#2D3748", "#A47148");
BYRD.crew3 = crewParka("#78350F", "#4A2108", "#C9A27E");
