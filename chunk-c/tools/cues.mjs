// Ep 003 Chunk C cue sheet (abs seconds). VO pauses inserted: 14.05 +0.7, 38.7 +0.7, 71.2 +0.6.
// Music: The Letter continues from Chunk B (ms 11.4), Out There (lifeline), Out of Service (prefab + surface), Out There (insulation + tunnels).
export const END = 104.4;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-c-vo.mp3", 0, { dur: 104.31, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/letter.mp3", 0, { ms: 11.4, dur: 26.7, vol: 0.14, fin: 0.1, fout: 1.0, lane: 31 });
  add("mu-b", "assets/music/outthere.mp3", 26.3, { ms: 0, dur: 14.2, vol: 0.11, fin: 0.6, fout: 0.6, lane: 32 });
  add("mu-c", "assets/music/outofservice.mp3", 40.3, { ms: 24.0, dur: 30.8, vol: 0.11, fin: 0.3, fout: 0.8, lane: 31 });
  add("mu-d", "assets/music/outthere.mp3", 70.9, { ms: 30.0, dur: 33.5, vol: 0.1, fin: 0.6, fout: 1.5, lane: 32 });
  // C01 goodbye
  add("a-wind", "wind-steady", 0, { ms: 60.0, dur: 26.6, vol: 0.3, fin: 0.5, fout: 0.8, lane: 33 });
  add("a-eng1", "tractor", 1.8, { ms: 0, dur: 11.8, vol: 0.55, fout: 7.0, lane: 34 });
  add("a-eng2", "tractor", 2.6, { ms: 6.0, dur: 11.0, vol: 0.35, fout: 7.0 });
  hit("a-badge", "pop-a", 2.3, { vol: 1.0 });
  hit("a-chord", "piano-low", 15.0, { dur: 3.0, vol: 1.1, fout: 1.5 });
  hit("a-age", "pop-b", 15.1, { vol: 0.6 });
  hit("a-pill", "pop-a", 17.3, { vol: 0.9 });
  add("a-count", "counter", 17.4, { dur: 2.2, vol: 0.45, fout: 0.3 });
  hit("a-sunset", "pop-b", 23.6, { vol: 0.6 });
  hit("a-night", "sub-drop", 24.7, { vol: 0.5 });
  // C02 lifeline
  add("b-hum", "hum", 26.6, { dur: 11.0, vol: 0.15, fin: 0.6, fout: 0.8, lane: 33 });
  add("b-carrier", "static", 27.6, { ms: 10.0, dur: 4.0, vol: 0.12, fin: 0.3, fout: 0.8 });
  hit("b-key", "telegraph", 27.8, { dur: 2.8, vol: 0.5, fout: 0.4 });
  hit("b-wave", "whoosh-tech", 28.1, { vol: 0.45 });
  [29.6, 30.3, 31.6].forEach((t, i) => hit(`b-tag${i}`, "pop-b", t, { vol: 0.55 }));
  hit("b-zoom", "whoosh-fast", 37.7, { vol: 0.6 });
  hit("b-board", "chime", 39.0, { vol: 0.6 });
  hit("b-dive", "whoosh-fast", 39.6, { vol: 0.6 });
  // C03 prefab
  hit("c-chime", "chime", 40.6, { vol: 0.8 });
  hit("c-dock", "pop-a", 42.0, { vol: 1.0 });
  hit("c-cold", "pop-b", 44.1, { vol: 0.6 });
  hit("c-box", "pop-a", 46.25, { vol: 0.9 });
  [47.7, 48.8, 50.15].forEach((t, i) => hit(`c-tape${i}`, "tape", t, { vol: 0.9 }));
  hit("c-gap", "pop-b", 50.7, { vol: 0.5 });
  hit("c-apart", "whoosh-med", 51.75, { vol: 0.5 });
  [53.2, 53.42, 53.64, 53.86].forEach((t, i) => hit(`c-clack${i}`, "wood-clack", t, { dur: 0.6, vol: 0.9 }));
  hit("c-cut", "whoosh-med", 54.45, { vol: 0.4 });
  hit("c-rope", "chain", 54.7, { dur: 1.6, vol: 0.3, fout: 0.6 });
  hit("c-land", "thud-a", 56.6, { vol: 0.8 });
  hit("c-fill", "whoosh-tech", 57.5, { vol: 0.3 });
  hit("c-seal", "thud-c", 59.4, { dur: 1.2, vol: 0.7, fout: 0.4 });
  hit("c-flush", "pop-b", 60.0, { vol: 0.6 });
  // C04 surface
  add("d-wind", "wind-gusts", 61.0, { ms: 80.0, dur: 10.0, vol: 0.35, fin: 0.4, fout: 0.6, lane: 33 });
  hit("d-out", "pop-b", 61.25, { vol: 0.5 });
  [63.9, 65.9, 68.4].forEach((t, i) => { hit(`d-spot${i}`, "flashlight-click", t, { vol: 0.9 }); hit(`d-ch${i}`, "chime", t + 0.05, { vol: 0.35 }); });
  // C05 insulation
  hit("e-why", "pop-a", 71.2, { vol: 1.0 });
  hit("e-ok", "chime", 73.45, { vol: 0.6 });
  hit("e-lens", "pop-b", 73.7, { vol: 0.5 });
  hit("e-left", "whoosh-med", 77.05, { vol: 0.5 });
  add("e-gale", "wind-gusts", 78.3, { ms: 20.0, dur: 3.6, vol: 0.6, fin: 0.2, fout: 0.8, lane: 34 });
  hit("e-drop", "whoosh-tech", 78.6, { vol: 0.35 });
  hit("e-nl", "pop-b", 80.0, { vol: 0.6 });
  hit("e-right", "whoosh-med", 81.86, { vol: 0.5 });
  add("e-warm", "hum", 82.0, { dur: 6.4, vol: 0.2, fin: 0.6, fout: 0.8, lane: 33 });
  hit("e-lock", "chime", 85.5, { vol: 0.6 });
  // C06 hatch, ladder, tunnels
  add("f-wind", "wind-steady", 88.4, { ms: 30.0, dur: 16.0, vol: 0.15, fin: 0.6, fout: 1.0, lane: 34 });
  hit("f-hatch", "thud-c", 88.7, { dur: 1.2, vol: 0.6, fout: 0.4 });
  hit("f-tag", "pop-b", 88.8, { vol: 0.5 });
  hit("f-ladder", "ladder", 90.7, { dur: 2.8, vol: 0.6, fout: 0.4 });
  hit("f-fuel", "clang", 97.8, { dur: 1.0, vol: 0.6, fout: 0.3 });
  hit("f-ft", "pop-b", 98.0, { vol: 0.5 });
  hit("f-food", "thud-b", 99.45, { vol: 0.7 });
  hit("f-fd", "pop-b", 99.65, { vol: 0.5 });
  add("f-shimmer", "synth-rise", 101.2, { dur: 3.0, vol: 0.3, fout: 1.2 });
  hit("f-walls", "chime", 101.3, { vol: 0.6 });
}
