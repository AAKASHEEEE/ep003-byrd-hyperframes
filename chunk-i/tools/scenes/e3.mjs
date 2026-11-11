// Episode #003 stage kit: Advance Base hut (cutaway + interior), Byrd rig placements, Antarctica map, Citroën-Kégresse half-track.
// Locks from docs/ep003-byrd-adaptation.md: interior order ladder · bunk · stove · table · generator; one GROUND_Y per scene.
import { C, r1, rng, scout } from "../lib.mjs";

export const E = {
  night: "#050811", crevasse: "#0F172A", glacial: "#CBD5E1", sheet: "#94A3B8", ice: "#1E293B", pit: "#334155",
  pine: "#5C3A21", pineDk: "#451A03", kero: "#D97706", lamp: "#F59E0B", co: "#7E22CE", haze: "#64748B", warn: "#DC2626",
  ochre: "#C87D32", furB: "#D4A373", green: "#10B981",
};
export const RW = 520, RH = 320; // hut room 13 ft x 8 ft

// Interior furniture in room-local coords (0,0 = top-left of the room, floor at y = RH).
export function room(s, o = {}) {
  const planks = Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${32 + i * 32}" x2="${RW}" y2="${32 + i * 32}" stroke="${E.pineDk}" stroke-width="2"/>`).join("");
  const rungs = Array.from({ length: 7 }, (_, i) => `<rect x="18" y="${34 + i * 40}" width="36" height="6" rx="2" fill="#B98A5A"/>`).join("");
  return `<g id="${s}-room">
    <rect width="${RW}" height="${RH}" fill="${E.pine}"/>${planks}
    <rect width="${RW}" height="12" fill="${E.pineDk}"/><rect y="${RH - 6}" width="${RW}" height="12" fill="${E.pineDk}"/>
    <g id="${s}-lampG"><line x1="150" y1="12" x2="150" y2="58" stroke="#1F2937" stroke-width="3"/>
      <circle id="${s}-lampglow" cx="150" cy="72" r="70" fill="${E.lamp}" opacity=".22" filter="url(#${s}-bloom)"/>
      <rect x="140" y="58" width="20" height="26" rx="5" fill="${E.lamp}"/><rect x="138" y="56" width="24" height="5" fill="#1F2937"/></g>
    <rect x="18" y="0" width="6" height="${RH}" fill="#B98A5A"/><rect x="48" y="0" width="6" height="${RH}" fill="#B98A5A"/>${rungs}
    <rect x="70" y="236" width="132" height="14" fill="${E.pineDk}"/><rect x="74" y="250" width="8" height="${RH - 250}" fill="${E.pineDk}"/><rect x="190" y="250" width="8" height="${RH - 250}" fill="${E.pineDk}"/>
    <rect x="72" y="214" width="128" height="24" rx="12" fill="#A47148"/><path d="M84 220 q6 -5 12 0 q6 -5 12 0 q6 -5 12 0 q6 -5 12 0 q6 -5 12 0 q6 -5 12 0 q6 -5 12 0" fill="none" stroke="#D4A373" stroke-width="2"/>
    <rect x="76" y="206" width="34" height="14" rx="7" fill="#E7D7BC"/>
    <rect x="256" y="${o.pipeTop ?? 0}" width="12" height="${222 - (o.pipeTop ?? 0)}" fill="#94A3B8"/><rect x="252" y="150" width="20" height="8" fill="#64748B"/>
    <rect x="230" y="222" width="64" height="9" fill="#111827"/>
    <rect x="234" y="230" width="56" height="80" rx="6" fill="#1F2937" stroke="#0B0F17" stroke-width="3"/>
    <circle id="${s}-stoveglow" cx="262" cy="262" r="46" fill="${E.lamp}" opacity=".35" filter="url(#${s}-bloom)"/>
    <rect x="246" y="250" width="32" height="22" rx="3" fill="${E.lamp}"/><rect x="238" y="308" width="8" height="${RH - 308}" fill="#0B0F17"/><rect x="278" y="308" width="8" height="${RH - 308}" fill="#0B0F17"/>
    <rect x="330" y="118" width="124" height="8" fill="${E.pineDk}"/>
    <rect x="344" y="94" width="38" height="24" rx="2" fill="#6B4226"/><path d="M364 94 L364 84 L410 52 Q420 62 416 76 L370 92 Z" fill="#B08D3C"/>
    <rect x="404" y="100" width="40" height="18" fill="#7F1D1D"/><line x1="408" y1="104" x2="440" y2="104" stroke="#FCA5A5" stroke-width="2"/>
    <rect x="310" y="250" width="144" height="11" fill="#6B4226"/><rect id="${s}-tleg" x="316" y="261" width="9" height="${RH - 261}" fill="#6B4226"/><rect x="440" y="261" width="9" height="${RH - 261}" fill="#6B4226"/>
    <rect x="318" y="240" width="30" height="10" rx="2" fill="#B08D3C"/><line x1="322" y1="236" x2="346" y2="232" stroke="#8A6D2F" stroke-width="4" stroke-linecap="round"/><circle cx="347" cy="231" r="5" fill="#14171F"/>
    <rect x="356" y="196" width="58" height="54" rx="4" fill="#1F2937" stroke="#0B0F17" stroke-width="3"/>
    <rect x="362" y="184" width="9" height="14" rx="4" fill="#FDE68A" opacity=".55"/><rect x="376" y="182" width="9" height="16" rx="4" fill="#FDE68A" opacity=".55"/><rect x="390" y="184" width="9" height="14" rx="4" fill="#FDE68A" opacity=".55"/>
    <circle cx="372" cy="222" r="10" fill="#052e16"/><circle id="${s}-dial" cx="372" cy="222" r="10" fill="#22C55E" opacity=".2"/><circle cx="398" cy="224" r="5" fill="#94A3B8"/><circle cx="398" cy="238" r="4" fill="#94A3B8"/>
    <rect x="420" y="226" width="30" height="24" rx="2" fill="#475569"/><circle cx="430" cy="238" r="7" fill="#E2E8F0"/><line x1="432" y1="238" x2="446" y2="232" stroke="${E.warn}" stroke-width="2"/>
    <rect x="462" y="280" width="52" height="40" rx="4" fill="#475569" stroke="#1F2937" stroke-width="3"/><circle cx="480" cy="300" r="13" fill="#334155" stroke="#1F2937" stroke-width="3"/><rect x="500" y="262" width="7" height="20" fill="#64748B"/>
  </g>`;
}

// Full cutaway world (1920 x 1080 frame; ice continues below for camera dives). G = GROUND_Y.
export function cutaway(s, G, o = {}) {
  const RX = o.rx ?? 700, RY = G + 16, R = rng(o.seed || 31);
  const stars = Array.from({ length: 70 }, () => `<circle cx="${r1(R() * 1920)}" cy="${r1(R() * (G - 30))}" r="${r1(0.8 + R() * 1.6)}" fill="#E2E8F0" opacity="${r1(0.3 + R() * 0.6)}"/>`).join("");
  const strata = Array.from({ length: 22 }, (_, i) => `<path d="M0 ${G + 60 + i * 52} Q480 ${G + 50 + i * 52 + (i % 2 ? 14 : -10)} 960 ${G + 60 + i * 52} T1920 ${G + 60 + i * 52}" fill="none" stroke="#0F172A" stroke-width="2" opacity=".6"/>`).join("");
  const drums = [0, 1, 2, 3, 4].map((i) => { const x = RX - 420 + i * 70; return `<g><rect x="${x}" y="${RY + 254}" width="52" height="66" rx="6" fill="#64748B"/><rect x="${x}" y="${RY + 270}" width="52" height="4" fill="#475569"/><rect x="${x}" y="${RY + 300}" width="52" height="4" fill="#475569"/><ellipse cx="${x + 26}" cy="${RY + 256}" rx="26" ry="6" fill="#94A3B8"/></g>`; }).join("")
    + [0, 1, 2].map((i) => { const x = RX - 385 + i * 70; return `<g><rect x="${x}" y="${RY + 186}" width="52" height="66" rx="6" fill="#7C8BA0"/><rect x="${x}" y="${RY + 202}" width="52" height="4" fill="#475569"/><ellipse cx="${x + 26}" cy="${RY + 188}" rx="26" ry="6" fill="#A3B1C4"/></g>`; }).join("");
  const crate = (x, y) => `<g><rect x="${x}" y="${y}" width="64" height="54" fill="#78350F"/><path d="M${x} ${y} L${x + 64} ${y + 54} M${x + 64} ${y} L${x} ${y + 54}" stroke="${E.pineDk}" stroke-width="3"/><rect x="${x}" y="${y}" width="64" height="54" fill="none" stroke="${E.pineDk}" stroke-width="3"/></g>`;
  const crates = [0, 1, 2, 3, 4].map((i) => crate(RX + 600 + i * 72, RY + 266)).join("") + [0, 1, 2].map((i) => crate(RX + 636 + i * 72, RY + 212)).join("");
  const anemY = G - 210;
  return `
    ${o.noSky ? "" : `<rect x="-3000" width="7920" height="${G}" fill="${E.night}"/>${stars}`}
    <rect x="-3000" y="${G}" width="7920" height="2400" fill="${E.ice}"/>${strata}
    <rect x="${RX - 40}" y="${RY}" width="${RW + 80}" height="${RH + 50}" rx="10" fill="${E.pit}"/>
    <rect x="${RX - 440}" y="${RY + 150}" width="400" height="${RH - 150 + 14}" rx="18" fill="${E.pit}"/>${drums}
    <rect x="${RX + RW + 40}" y="${RY + 150}" width="400" height="${RH - 150 + 14}" rx="18" fill="${E.pit}"/>${crates}
    <g transform="translate(${RX} ${RY})">${room(s, { pipeTop: -50 })}${o.inRoom || ""}</g>
    <g id="${s}-snowcover"><rect x="-3000" y="${G + 16}" width="7920" height="2400" fill="#8193AD"/>
      ${Array.from({ length: 14 }, (_, i) => `<path d="M0 ${G + 70 + i * 70} Q480 ${G + 58 + i * 70} 960 ${G + 70 + i * 70} T1920 ${G + 70 + i * 70}" fill="none" stroke="#9AAAC2" stroke-width="3"/>`).join("")}</g>
    <rect x="-3000" y="${G}" width="7920" height="18" fill="${E.glacial}"/><rect x="-3000" y="${G}" width="7920" height="4" fill="#F8FAFC"/>
    <rect x="${RX + 256}" y="${G - 40}" width="12" height="58" fill="#94A3B8"/><rect x="${RX + 249}" y="${G - 46}" width="26" height="8" rx="2" fill="#64748B"/>
    <rect x="${RX + 12}" y="${G - 5}" width="62" height="9" rx="2" fill="${E.pine}" stroke="${E.pineDk}" stroke-width="2"/>
    <line x1="420" y1="${G}" x2="420" y2="${anemY}" stroke="#94A3B8" stroke-width="7"/>
    <g id="${s}-anem"><line x1="380" y1="${anemY}" x2="460" y2="${anemY}" stroke="#CBD5E1" stroke-width="4"/><line x1="420" y1="${anemY - 40}" x2="420" y2="${anemY + 40}" stroke="#CBD5E1" stroke-width="4"/>
      <circle cx="380" cy="${anemY}" r="11" fill="#E2E8F0"/><circle cx="460" cy="${anemY}" r="11" fill="#E2E8F0"/><circle cx="420" cy="${anemY - 40}" r="11" fill="#E2E8F0"/><circle cx="420" cy="${anemY + 40}" r="11" fill="#E2E8F0"/></g>
    <g><line x1="1240" y1="${G}" x2="1240" y2="${G - 52}" stroke="#E2E8F0" stroke-width="5"/><line x1="1284" y1="${G}" x2="1284" y2="${G - 52}" stroke="#E2E8F0" stroke-width="5"/>
      <rect x="1230" y="${G - 100}" width="64" height="50" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2"/><polygon points="1224,${G - 100} 1262,${G - 118} 1300,${G - 100}" fill="#E2E8F0"/>
      ${[0, 1, 2, 3].map((i) => `<line x1="1236" y1="${G - 90 + i * 11}" x2="1288" y2="${G - 90 + i * 11}" stroke="#94A3B8" stroke-width="2"/>`).join("")}</g>
    <line x1="1460" y1="${G}" x2="1460" y2="${G - 240}" stroke="#94A3B8" stroke-width="6"/><line x1="1720" y1="${G}" x2="1720" y2="${G - 240}" stroke="#94A3B8" stroke-width="6"/>
    <path d="M1460 ${G - 236} Q1590 ${G - 200} 1720 ${G - 236}" fill="none" stroke="#CBD5E1" stroke-width="2.5"/><path d="M1590 ${G - 218} L${RX + 470} ${G}" fill="none" stroke="#CBD5E1" stroke-width="1.5" opacity=".6"/>
    <path d="M0 ${G} Q120 ${G - 14} 240 ${G} Q560 ${G - 10} 760 ${G} Q1100 ${G - 16} 1400 ${G} Q1700 ${G - 12} 1920 ${G}" fill="${E.glacial}"/>`;
}

// Byrd lying on the floor, head toward +x (rotate 90, whole rig — eyes stay inside the head group). (fx, fy) = feet pivot.
export function byrdLying(p, s, fx, fy, k = 0.85, o = {}) {
  return `<g transform="translate(${fx} ${fy}) rotate(90) scale(${k}) translate(-100 -265)">${scout(p, s, { outfit: o.outfit || "sweater", noWatch: true, hand: o.hand, facing: "front" })}</g>`;
}
export const byrd = (p, s, o = {}) => scout(p, s, { outfit: o.outfit || "anorak", noWatch: true, hand: o.hand ?? (o.outfit === "anorak" || !o.outfit ? "#5C3A21" : undefined), facing: o.facing || "front", front: (o.front || "") + `<circle id="${p}-puff" cx="122" cy="86" r="9" fill="#F8FAFC" opacity="0"/>`, props: o.props, rimGlow: o.rimGlow, gaunt: o.gaunt, headwear: o.headwear });

// Antarctica (polar stereographic-ish, Greenwich up, Ross Sea down). pt(lonE, latS) -> [x, y] in a box of size `size` centred at (cx, cy).
// Coastline as [lon°E, lat°S] (approximate real coast: Peninsula, Weddell/Ronne-Filchner, Amery, Ross Ice Shelf front).
const COAST = [[0, 70], [15, 69.8], [30, 69.4], [40, 68.6], [50, 66.8], [60, 67.3], [68, 69.5], [72, 72.6], [76, 69.6], [82, 67.4], [90, 66.6], [100, 65.6],
  [110, 66.3], [120, 66.8], [135, 66.4], [145, 67.6], [155, 69], [162, 70.6], [170, 71.4], [168, 73.6], [164, 75.8], [166, 77.6], [172, 77.9], [180, 78.3],
  [190, 78.4], [198, 78.1], [203, 77.4], [210, 76.4], [220, 75.2], [230, 74.6], [240, 73.8], [250, 74.3], [260, 72.8], [268, 72.5], [278, 73.2], [286, 72.8],
  [289, 70.6], [293, 68.4], [295, 66.6], [298, 65], [300.5, 63.6], [303, 63.2], [301, 64.6], [299, 66.4], [298, 68.4], [298, 70.6], [298, 73.2], [300, 75.6],
  [310, 77.6], [318, 78.2], [325, 77.8], [330, 76.2], [335, 75], [340, 73.6], [345, 72.6], [352, 71.3]];
const SHELF = [[166, 77.6], [172, 77.9], [180, 78.3], [190, 78.4], [198, 78.1], [203, 77.4], [205, 80], [200, 82.5], [190, 84.5], [180, 85.5], [170, 84.5], [164, 82], [162, 79.5]];
export function antarctica(size = 900, cx = 960, cy = 540) {
  const k = size / 2 / 3300;
  const P = (lon, km) => { const a = (lon * Math.PI) / 180; return [r1(cx + km * k * Math.sin(a)), r1(cy - km * k * Math.cos(a))]; };
  const smooth = (pts) => { const q = pts.map(([l, lat]) => P(l, (90 - lat) * 111)); let d = `M${q[0][0]} ${q[0][1]}`; for (let i = 0; i < q.length; i++) { const a = q[i], b = q[(i + 1) % q.length]; d += ` Q${a[0]} ${a[1]} ${r1((a[0] + b[0]) / 2)} ${r1((a[1] + b[1]) / 2)}`; } return d + "Z"; };
  const pt = (lonE, latS) => P(lonE, (90 - latS) * 111);
  return { coast: smooth(COAST), shelf: smooth(SHELF), pt, k };
}
export const LITTLE_AMERICA = [196.2, 78.5], ADVANCE_BASE = [196.05, 80.13];

// Citroën-Kégresse half-track, ground at y = 0, nose toward +x: rear caterpillar track (4 bogies) + front wheels, boxy hood, radiator grille, enclosed cab.
export function halftrack(id, s, o = {}) {
  const heads = (o.crew ?? 3) ? [118, 146, 174].slice(0, o.crew ?? 3).map((x, i) => `<g><circle cx="${x}" cy="-118" r="12" fill="#14171F"/><ellipse cx="${x - 4 + (i === 2 ? 3 : 0)}" cy="-120" rx="2.6" ry="3.6" fill="#fff"/><ellipse cx="${x + 4 + (i === 2 ? 3 : 0)}" cy="-120" rx="2.6" ry="3.6" fill="#fff"/><rect x="${x - 12}" y="-131" width="24" height="5" rx="2" fill="#64748B"/></g>`).join("") : "";
  const cone = o.light === false ? "" : `<defs><linearGradient id="${id}-cone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FDE68A" stop-opacity=".55"/><stop offset="1" stop-color="#FDE68A" stop-opacity="0"/></linearGradient></defs>
    <polygon id="${id}-beam" points="300,-74 820,-190 820,30 300,-62" fill="url(#${id}-cone)" style="mix-blend-mode:screen"/>`;
  return `<g id="${id}">${cone}
    <path d="M6 -44 Q6 -60 22 -60 L150 -60 Q166 -60 166 -44 L166 -16 Q166 0 150 0 L22 0 Q6 0 6 -16 Z" fill="#1C1917"/>
    <g id="${id}-bogies" fill="#57534E" stroke="#1C1917" stroke-width="3">${[34, 66, 98, 130].map((x) => `<circle cx="${x}" cy="-22" r="14"/>`).join("")}</g>
    <circle cx="22" cy="-40" r="12" fill="#44403C"/><circle cx="150" cy="-40" r="12" fill="#44403C"/>
    <rect x="4" y="-104" width="96" height="44" rx="4" fill="#44403C"/><path d="M4 -104 Q52 -128 100 -104" fill="#57534E"/>
    <rect x="100" y="-150" width="96" height="90" rx="6" fill="#57534E" stroke="#292524" stroke-width="3"/>
    <rect x="106" y="-142" width="84" height="38" rx="4" fill="#FDE68A" opacity=".28"/>${heads}
    <rect x="196" y="-112" width="96" height="52" rx="6" fill="#78716C" stroke="#292524" stroke-width="3"/>
    <rect x="286" y="-114" width="14" height="56" rx="2" fill="#57534E"/>${[289, 293, 297].map((x) => `<line x1="${x}" y1="-108" x2="${x}" y2="-62" stroke="#292524" stroke-width="2"/>`).join("")}
    <circle cx="298" cy="-68" r="8" fill="#FDE68A"/>
    <circle cx="252" cy="-26" r="26" fill="#1C1917"/><circle cx="252" cy="-26" r="9" fill="#78716C"/>
    <path d="M226 -60 Q252 -76 278 -60" fill="none" stroke="#292524" stroke-width="6"/>
  </g>`;
}

// Shared CSS for the Episode #003 Chunk A UI (decision cards, suspect cards, stamps, quote card, part monoliths).
export const E3_CSS = `
  .e-card { position: absolute; width: 560px; height: 400px; border-radius: 22px; background: rgba(11,16,30,.95); border: 5px solid #475569;
    box-shadow: 0 20px 60px rgba(0,0,0,.6); font-family: "Archivo Black", sans-serif; color: #fff; text-align: center; }
  .e-card .k { margin-top: 30px; font-family: Inter, sans-serif; font-weight: 800; font-size: 30px; letter-spacing: .16em; color: #94A3B8; }
  .e-card .t { margin-top: 10px; font-size: 52px; line-height: 1.1; }
  .e-card .w { position: absolute; left: 0; right: 0; bottom: 30px; font-family: Inter, sans-serif; font-weight: 800; font-size: 30px; letter-spacing: .06em; }
  .e-stamp { position: absolute; display: flex; align-items: center; gap: 18px; padding: 16px 34px; border-radius: 16px; border: 6px solid; font-family: "Archivo Black", sans-serif;
    font-size: 54px; letter-spacing: .02em; background: rgba(11,16,30,.9); white-space: nowrap; }
  .e-big { position: absolute; left: 0; right: 0; text-align: center; font-family: "Archivo Black", sans-serif; color: #fff; }
  .e-sus { position: absolute; width: 380px; height: 500px; border-radius: 22px; background: #111A2E; border: 4px solid #334155; overflow: hidden; }
  .e-sus .n { position: absolute; left: 0; right: 0; bottom: 26px; text-align: center; font-family: "Archivo Black", sans-serif; font-size: 40px; color: #fff; }
  .e-mono { position: absolute; width: 180px; height: 380px; border-radius: 18px; background: #111A2E; border: 4px solid #334155;
    display: flex; align-items: center; justify-content: center; font-family: "Archivo Black", sans-serif; font-size: 110px; color: #64748B; }
`;
