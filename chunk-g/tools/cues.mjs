// Ep 003 Chunk G cue sheet (abs seconds). VO pauses inserted: 24.3 +0.8 (black), 60.97 +0.7, 70.68 +0.6.
// Music: Miasma (symptoms, the evening), silence on the collapse, Shadowfall (the choice), Out of Service (the compromise).
export const END = 79.6;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-g-vo.mp3", 0, { dur: 79.46, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/miasma.mp3", 0, { ms: 120.0, dur: 23.6, vol: 0.13, fin: 0.4, fout: 0.5, lane: 31 });
  add("mu-b", "assets/music/shadowfall.mp3", 25.4, { ms: 70.0, dur: 37.2, vol: 0.12, fin: 1.2, fout: 0.8, lane: 32 });
  add("mu-c", "assets/music/outofservice.mp3", 62.4, { ms: 50.0, dur: 17.2, vol: 0.1, fin: 0.8, fout: 1.6, lane: 31 });
  // G01 symptoms, blame, May 31, the fumes, the collapse
  add("a-beat", "heartbeat", 4.6, { dur: 3.0, vol: 0.45, fin: 0.3, fout: 0.6, lane: 33 });
  [3.6, 4.85, 6.15].forEach((t, i) => hit(`a-sy${i}`, "pop-b", t, { vol: 0.45 }));
  [7.6, 9.15, 10.2].forEach((t, i) => { hit(`a-bl${i}`, "pop-a", t, { vol: 0.6 }); hit(`a-x${i}`, "pencil", t + 0.55, { dur: 0.4, vol: 0.6 }); });
  hit("a-badge", "pop-a", 11.5, { vol: 0.9 });
  add("a-gen", "tractor", 14.3, { ms: 10.0, dur: 9.0, vol: 0.3, fin: 0.4, fout: 0.2, lane: 34 });
  add("a-key", "morse", 15.0, { dur: 6.0, vol: 0.35, fin: 0.2, fout: 0.3, lane: 36 });
  hit("a-hiss", "gas-hiss", 17.0, { dur: 3.5, vol: 0.35, fin: 0.8, fout: 0.8 });
  hit("a-int", "static", 21.4, { dur: 1.6, vol: 0.4, fout: 0.5 });
  hit("a-ring", "tinnitus", 21.6, { dur: 2.4, vol: 0.35, fin: 0.6, fout: 0.2 });
  hit("a-fall", "thud-b", 23.6, { vol: 1.0 });
  // G02 on the floor, engine off, bag
  hit("b-breath", "breath", 25.4, { dur: 1.8, vol: 0.5, fout: 0.5 });
  add("b-gen", "tractor", 25.3, { ms: 30.0, dur: 4.7, vol: 0.22, fout: 0.1, lane: 34 });
  hit("b-sw", "power-off", 30.2, { dur: 1.2, vol: 0.7, fout: 0.4 });
  hit("b-tag", "pop-b", 30.25, { vol: 0.5 });
  hit("b-bag", "wood-creak", 32.8, { dur: 1.0, vol: 0.4 });
  hit("b-weak", "pop-a", 33.4, { vol: 0.7 });
  // G03 the choice
  hit("c-123", "pop-a", 38.1, { vol: 0.8 });
  add("c-wind", "wind-steady", 35.4, { ms: 20.0, dur: 14.0, vol: 0.18, fin: 0.8, fout: 0.8, lane: 33 });
  [43.4, 45.4].forEach((t, i) => hit(`c-hz${i}`, "buzzer", t, { dur: 0.5, vol: 0.35 }));
  hit("c-split", "whoosh-med", 49.85, { vol: 0.5 });
  add("c-fire", "fire", 49.9, { ms: 3.0, dur: 3.4, vol: 0.25, fin: 0.3, fout: 0.6, lane: 34 });
  hit("c-hiss", "gas-hiss", 50.4, { dur: 2.4, vol: 0.35, fin: 0.4, fout: 0.6 });
  hit("c-split2", "whoosh-med", 52.9, { vol: 0.5 });
  hit("c-ice", "ice-crack", 53.8, { vol: 0.6 });
  add("c-teeth", "teeth-chatter", 54.0, { dur: 4.0, vol: 0.3, fin: 0.3, fout: 0.8, lane: 37 });
  hit("c-ban", "stinger", 57.8, { dur: 2.0, vol: 0.6, fout: 0.6 });
  hit("c-fz", "pop-b", 59.3, { vol: 0.6 });
  hit("c-po", "pop-b", 60.4, { vol: 0.6 });
  // G04 the compromise
  hit("d-dial", "pop-a", 62.9, { vol: 0.7 });
  hit("d-ign", "ignite", 65.1, { dur: 1.2, vol: 0.5 });
  add("d-fire", "fire", 65.2, { ms: 8.0, dur: 4.0, vol: 0.22, fin: 0.2, fout: 0.6, lane: 34 });
  add("d-ticks", "ticks", 62.9, { dur: 7.3, vol: 0.18, fin: 0.3, fout: 0.5, lane: 36 });
  hit("d-off", "power-off", 69.2, { dur: 1.0, vol: 0.4 });
  add("d-wind", "wind-steady", 69.4, { ms: 60.0, dur: 3.6, vol: 0.18, fin: 0.4, fout: 0.6, lane: 33 });
  hit("d-cup", "glass", 73.0, { dur: 0.8, vol: 0.35 });
  hit("d-v1", "pop-b", 73.1, { vol: 0.5 });
  hit("d-v2", "pop-b", 75.4, { vol: 0.5 });
  hit("d-step", "wood-creak", 76.8, { dur: 1.2, vol: 0.35 });
  hit("d-v3", "pop-b", 76.9, { vol: 0.5 });
  hit("d-pencil", "pencil", 78.3, { dur: 1.0, vol: 0.4 });
}
