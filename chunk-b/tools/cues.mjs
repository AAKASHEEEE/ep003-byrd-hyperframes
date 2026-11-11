// Ep 003 Chunk B cue sheet (abs seconds). VO pauses inserted: 46.2 +0.5 ("Then, reality hit"), 82.86 +0.6 ("it would be him").
// Music (Epidemic Sound): Núna (B01–B02a), Shadowfall (mystery -> reality -> "it would be him"), The Letter (solitude).
export const END = 96.4;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-b-vo.mp3", 0, { dur: 96.38, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/nuna.mp3", 0.4, { ms: 0, dur: 27.6, vol: 0.12, fin: 0.6, fout: 1.2, lane: 31 });
  add("mu-b", "assets/music/shadowfall.mp3", 27.6, { ms: 0, dur: 57.9, vol: 0.12, fin: 1.0, fout: 1.0, lane: 32 });
  add("mu-c", "assets/music/letter.mp3", 85.2, { ms: 0, dur: 11.2, vol: 0.15, fin: 0.8, fout: 1.5, lane: 31 });
  // B01 Part 1 card -> Little America -> France
  hit("a-chime", "chime", 0.5, { vol: 0.8 });
  hit("a-fly", "whoosh-fast", 1.5, { vol: 0.5 });
  hit("a-dock", "pop-a", 1.9, { vol: 1.0 });
  hit("a-whip", "whoosh-fast", 3.95, { vol: 0.7 });
  hit("a-badge", "pop-a", 4.1, { vol: 1.0 });
  add("a-dogs", "dogs", 4.3, { ms: 0, dur: 11.8, vol: 0.18, fin: 0.8, fout: 1.2, lane: 33 });
  add("a-gen", "hum", 4.3, { dur: 12.0, vol: 0.12, fin: 0.8, fout: 1.0, lane: 34 });
  add("a-tele", "telegraph", 9.0, { dur: 2.0, vol: 0.35, fout: 0.5 });
  hit("a-pill", "pop-a", 10.6, { vol: 1.0 });
  hit("a-xray", "whoosh-tech", 12.0, { vol: 0.35 });
  [12.4, 12.75, 13.1, 13.45].forEach((t, i) => hit(`a-hut${i}`, "pop-b", t, { vol: 0.55 }));
  hit("a-ross", "pop-b", 14.3, { vol: 0.6 });
  hit("a-map", "whoosh-med", 16.3, { vol: 0.6 });
  hit("a-fr", "whoosh-fast", 17.2, { vol: 0.5 });
  hit("a-lock", "sonar", 17.95, { dur: 1.2, vol: 0.5, fout: 0.4 });
  hit("a-pf", "pop-a", 18.0, { vol: 0.9 });
  // B02 inland mystery + original plan
  hit("b-goal", "pop-a", 20.3, { vol: 0.9 });
  add("b-wind", "wind-gusts", 19.9, { ms: 40.0, dur: 7.9, vol: 0.35, fin: 0.5, fout: 0.8, lane: 33 });
  hit("b-t1", "pop-b", 23.7, { vol: 0.6 });
  hit("b-t2", "pop-b", 26.4, { vol: 0.6 });
  hit("b-map", "whoosh-med", 27.8, { vol: 0.6 });
  [29.1, 29.45, 29.8, 30.15, 30.5].forEach((t, i) => hit(`b-ping${i}`, "sonar", t, { dur: 0.6, vol: 0.35, fout: 0.2 }));
  hit("b-known", "pop-b", 31.3, { vol: 0.6 });
  hit("b-sub", "sub-drop", 33.6, { vol: 0.7 });
  add("b-eerie", "wind-steady", 33.6, { ms: 40.0, dur: 5.4, vol: 0.25, fin: 0.6, fout: 1.0, lane: 34 });
  hit("b-unk", "pop-b", 35.2, { vol: 0.6 });
  hit("b-la", "pop-b", 39.1, { vol: 0.6 });
  hit("b-laser", "whoosh-tech", 41.0, { vol: 0.5 });
  add("b-count", "counter", 41.0, { dur: 1.6, vol: 0.45, fout: 0.3 });
  hit("b-pin", "pop-a", 42.6, { vol: 0.9 });
  hit("b-card", "pop-a", 44.0, { vol: 0.9 });
  [44.3, 44.6, 44.9].forEach((t, i) => hit(`b-av${i}`, `arp${1 + i * 2}`, t, { vol: 0.45 }));
  hit("b-ok", "chime", 45.3, { vol: 0.6 });
  // B03 reality hit
  hit("c-anvil", "anvil", 47.7, { dur: 1.8, vol: 0.8, fout: 0.8 });
  add("c-engine", "tractor", 46.6, { ms: 10.0, dur: 10.6, vol: 0.45, fin: 0.4, fout: 0.6, lane: 33 });
  hit("c-g1", "pop-b", 49.1, { vol: 0.6 });
  hit("c-g2", "pop-b", 51.0, { vol: 0.6 });
  hit("c-g3", "pop-b", 52.7, { vol: 0.6 });
  hit("c-rope", "chain", 52.8, { dur: 1.4, vol: 0.45, fout: 0.4 });
  hit("c-max", "pop-a", 53.0, { vol: 0.8 });
  hit("c-map", "whoosh-med", 57.2, { vol: 0.6 });
  hit("c-slash", "whoosh-tech", 59.5, { vol: 0.4 });
  add("c-count", "counter", 60.2, { dur: 1.8, vol: 0.45, fout: 0.3 });
  hit("c-l123", "pop-b", 62.0, { vol: 0.6 });
  hit("c-cmp", "pop-a", 62.6, { vol: 0.9 });
  hit("c-v1", "thud-b", 63.5, { vol: 0.6 });
  hit("c-v2", "thud-b", 64.0, { vol: 0.6 });
  hit("c-one", "piano-low", 64.35, { dur: 3.0, vol: 1.1, fout: 1.5 });
  // B04 why one?
  hit("d-why", "pop-a", 65.4, { vol: 1.0 });
  hit("d-ka", "whoosh-med", 70.2, { vol: 0.5 });
  hit("d-spark", "spark", 71.0, { dur: 1.6, vol: 0.35, fout: 0.4 });
  hit("d-xa", "stamp", 72.8, { vol: 0.9 });
  hit("d-kb", "whoosh-med", 74.2, { vol: 0.5 });
  hit("d-clank", "chain", 74.8, { dur: 1.2, vol: 0.5, fout: 0.4 });
  hit("d-xb", "stamp", 76.1, { vol: 0.9 });
  hit("d-kc", "whoosh-med", 77.25, { vol: 0.5 });
  hit("d-ok", "chime", 78.5, { vol: 0.7 });
  hit("d-sub", "sub-drop", 84.1, { vol: 0.7 });
  hit("d-brass", "brass", 84.15, { dur: 2.4, vol: 0.45, fout: 1.0 });
  hit("d-rule", "pop-a", 82.8, { vol: 0.9 });
  // B05 solitude
  hit("e-flash1", "flashbulb", 85.7, { vol: 0.6 });
  hit("e-flash2", "flashbulb", 86.2, { vol: 0.5 });
  hit("e-slide", "whoosh-med", 86.4, { vol: 0.5 });
  add("e-breeze", "wind-steady", 87.4, { ms: 50.0, dur: 9.0, vol: 0.28, fin: 1.0, fout: 1.2, lane: 34 });
  [90.8, 91.5, 92.0].forEach((t, i) => hit(`e-g${i}`, "chime", t, { vol: 0.3 }));
  hit("e-src", "pop-b", 93.1, { vol: 0.5 });
}
