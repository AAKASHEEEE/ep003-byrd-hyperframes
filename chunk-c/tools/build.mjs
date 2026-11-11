// Writes compositions/*.html and index.html for Ep 003 Chunk C from the scene modules.
// Run: node tools/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORDER = [
  ["goodbye", 0, 26.6, "C01 · March 28 1934: the tractors leave, the sun sinks"],
  ["lifeline", 26.6, 13.8, "C02 · radio + telegraph key: the only lifeline"],
  ["prefab", 40.4, 20.6, "C03 · Part 2: 9 x 13 x 8 ft prefab box, buried"],
  ["surface", 61.0, 10.0, "C04 · what you could see from outside"],
  ["insulate", 71.0, 17.4, "C05 · why bury a house? snow insulation"],
  ["tunnels", 88.4, 16.0, "C06 · roof hatch, ladder, fuel + food tunnels"],
];
const only = process.argv.slice(2);
const built = [];
for (const [id] of ORDER) {
  const f = path.join(root, "tools", "scenes", `${id}.mjs`);
  if (!fs.existsSync(f)) continue;
  if (only.length && !only.includes(id)) { built.push(id); continue; }
  const mod = await import(pathToFileURL(f).href);
  const { html } = mod.build();
  fs.mkdirSync(path.join(root, "compositions"), { recursive: true });
  fs.writeFileSync(path.join(root, "compositions", `${id}.html`), html);
  built.push(id);
  console.log("wrote compositions/" + id + ".html", (html.length / 1024).toFixed(0) + " KB");
}
const total = 104.4;
const hosts = ORDER.filter(([id]) => built.includes(id))
  .map(([id, start, dur, label], i) => `      <!-- ${label} -->
      <div id="${id}" class="clip" data-composition-id="${id}" data-composition-src="compositions/${id}.html"
        data-start="${start}" data-duration="${dur}" data-track-index="${i % 2}" data-track-kind="graphics"
        data-width="1920" data-height="1080" style="z-index:${i + 1}"></div>`)
  .join("\n");
const audioPath = path.join(root, "tools", "audio.html");
const audio = fs.existsSync(audioPath) ? fs.readFileSync(audioPath, "utf8") : "";
const index = `<!doctype html>
<html lang="en" data-resolution="landscape">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>Edge of Endurance — Ep 003 · Chunk C (00:00–01:44)</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #0B101E; }
      #root { position: relative; width: 100%; height: 100%; font-family: Inter, sans-serif; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${total}" data-width="1920" data-height="1080">
${hosts}
${audio}
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`;
fs.writeFileSync(path.join(root, "index.html"), index);
console.log("wrote index.html with", built.length, "scenes");
