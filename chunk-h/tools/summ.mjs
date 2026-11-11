// Summarise `hyperframes check --json` output: node tools/summ.mjs .work/check.json
import fs from "node:fs";
const t = fs.readFileSync(process.argv[2], "utf8");
const s0 = t.indexOf("\n{") + 1;
let d = 0, e = s0, inStr = false;
for (; e < t.length; e++) {
  const ch = t[e];
  if (inStr) { if (ch === "\\") e++; else if (ch === '"') inStr = false; continue; }
  if (ch === '"') inStr = true;
  else if (ch === "{") d++;
  else if (ch === "}" && --d === 0) break;
}
const j = JSON.parse(t.slice(s0, e + 1));
const items = [];
JSON.stringify(j, (k, v) => {
  if (v && typeof v === "object" && !Array.isArray(v) && typeof v.message === "string")
    items.push(`${v.severity || v.level || "?"} ${v.code || v.rule || v.id || ""} ${v.time ?? v.at ?? ""} ${v.selector || v.elementId || ""} :: ${v.message.slice(0, 230)}${v.fixHint || v.fix ? "  FIX: " + String(v.fixHint || v.fix).slice(0, 160) : ""}`);
  return v;
});
console.log("keys:", Object.keys(j).join(","), "ok:", j.ok);
const seen = new Map();
for (const i of items) { const k = i.slice(0, 160); seen.set(k, (seen.get(k) || 0) + 1); }
for (const [k, n] of seen) console.log((n > 1 ? `[x${n}] ` : "") + k);
