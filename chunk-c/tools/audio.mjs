// Sound for a chunk: VO + music beds + effects -> tools/audio.html (mounted by build.mjs). Cues live in tools/cues.mjs.
// Music and effects: Epidemic Sound (connected account). Hits: start = picture time + 1 frame - measured onset.
// File lengths and onsets are measured with ffprobe/ffmpeg and cached in .work/sfxmeta.json.
import fs from "node:fs";
import { execSync } from "node:child_process";
import { END, cues as defineCues } from "./cues.mjs";

const root = new URL("../", import.meta.url);
const metaPath = new URL(".work/sfxmeta.json", root);
const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, "utf8")) : {};
const measure = (file) => {
  if (meta[file]) return meta[file];
  const p = new URL(file, root).pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const len = parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${p}"`, { encoding: "utf8" }));
  const sd = execSync(`ffmpeg -hide_banner -nostats -i "${p}" -af silencedetect=n=-40dB:d=0.01 -f null - 2>&1`, { encoding: "utf8" });
  const first = sd.split("\n").find((l) => l.includes("silence_start") || l.includes("silence_end"));
  let on = 0;
  if (first && first.includes("silence_start: 0")) { const m = sd.match(/silence_end: ([0-9.]+)/); on = m ? parseFloat(m[1]) : 0; }
  return (meta[file] = { len, on: on > 0.6 ? 0 : on });
};

const F = 1 / 30, r = (v) => Math.round(v * 1000) / 1000;
const out = [];
const path = (f) => (f.includes("/") ? f : `assets/sfx/${f}.mp3`);
const add = (id, f, start, o = {}) => out.push({ id, file: path(f), start: r(Math.max(0, start)), ...o });
const hit = (id, f, t, o = {}) => add(id, f, t + F - measure(path(f)).on, o);
defineCues(add, hit);

for (const c of out) { const m = measure(c.file); if (!c.dur) c.dur = r(m.len - (c.ms || 0)); if (c.start + c.dur > END) c.dur = r(END - c.start); }
fs.mkdirSync(new URL(".work/", root), { recursive: true });
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 1));
// Lane assignment: first lane (35+) free at the cue's start.
out.sort((a, b) => a.start - b.start);
const lanes = [];
const html = out.map((c) => {
  let ln = c.lane;
  if (ln == null) { let i = 0; while (lanes[i] != null && lanes[i] > c.start) i++; lanes[i] = c.start + c.dur; ln = 35 + i; }
  const a = [`id="${c.id}"`, `class="clip"`, `src="${c.file}"`, `data-start="${c.start}"`, `data-duration="${c.dur}"`,
    c.ms ? `data-media-start="${c.ms}"` : "", `data-volume="${c.vol ?? 1}"`, c.fin ? `data-fade-in="${c.fin}"` : "",
    c.fout ? `data-fade-out="${c.fout}"` : "", `data-track-index="${ln}"`].filter(Boolean).join(" ");
  return `      <audio ${a}></audio>`;
}).join("\n");
fs.writeFileSync(new URL("./audio.html", import.meta.url), `      <!-- Sound: VO + Epidemic Sound music & effects (tools/audio.mjs + cues.mjs) -->\n${html}\n`);
console.log("wrote tools/audio.html with", out.length, "cues");
