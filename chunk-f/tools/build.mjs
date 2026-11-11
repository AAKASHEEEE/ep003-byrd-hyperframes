// Writes compositions/*.html and index.html for Ep 003 Chunk F from the scene modules.
// Run: node tools/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORDER = [
  ["press", 0, 43.3, "F01–F02 · the silence presses; in control; end-of-May headaches"],
  ["killer", 43.3, 16.9, "F03 · Part 4: the stove and its pipe"],
  ["pipe", 60.2, 27.8, "F04 · the pipe ices shut; generator; CO leaks in"],
  ["blood", 88.0, 19.8, "F05 · CO in the blood; the 4-step ladder"],
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
const total = 107.8;
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
    <title>Edge of Endurance — Ep 003 · Chunk F (00:00–01:48)</title>
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
