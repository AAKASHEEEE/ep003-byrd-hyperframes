// Ep 003 Chunk E cue sheet (abs seconds). VO pauses inserted: 50.4 +0.8, 67.97 +0.7, 71.45 +0.7 (TOTAL SILENCE: everything muted 71.6–73.85).
// Music: Miasma Shapes (continues D), Out There (the dark + the lost walk), Miasma (pad after the silence), The Letter, then a phonograph-filtered take.
export const END = 103.6;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-e-vo.mp3", 0, { dur: 103.33, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/miasma.mp3", 0, { ms: 23.8, dur: 12.8, vol: 0.14, fin: 0.1, fout: 0.8, lane: 31 });
  add("mu-b", "assets/music/outthere.mp3", 12.3, { ms: 50.0, dur: 59.3, vol: 0.1, fin: 0.8, fout: 0.4, lane: 32 });
  add("mu-c", "assets/music/miasma.mp3", 73.9, { ms: 60.0, dur: 9.9, vol: 0.12, fin: 1.2, fout: 0.8, lane: 31 });
  add("mu-d", "assets/music/letter.mp3", 83.5, { ms: 40.0, dur: 10.0, vol: 0.09, fin: 0.8, fout: 0.6, lane: 32 });
  add("mu-e", "assets/music/phono.mp3", 93.2, { dur: 10.4, vol: 0.5, fin: 0.3, fout: 0.8, lane: 31 });
  // E01 Part 3, the last sunset
  hit("a-chime", "chime", 0.4, { vol: 0.8 });
  hit("a-dock", "pop-a", 1.6, { vol: 1.0 });
  hit("a-prob", "pop-b", 2.9, { vol: 0.6 });
  hit("a-badge", "pop-a", 5.1, { vol: 0.9 });
  hit("a-sunset", "sub-drop", 7.0, { vol: 0.8 });
  [10.0, 10.42, 10.84, 11.26].forEach((t, i) => hit(`a-lock${i}`, "thud-a", t, { vol: 0.45 }));
  hit("a-ns", "pop-b", 11.4, { vol: 0.5 });
  // E02 the white nothing
  add("b-wind", "wind-gusts", 12.6, { ms: 120.0, dur: 17.8, vol: 0.4, fin: 1.5, fout: 1.0, lane: 33 });
  hit("b-risk", "pop-a", 15.0, { vol: 0.9 });
  [20.2, 21.2, 22.5].forEach((t, i) => hit(`b-poof${i}`, "whoosh-tech", t, { vol: 0.35 }));
  hit("b-white", "pop-b", 23.8, { vol: 0.5 });
  hit("b-steps", "footsteps-snow", 26.4, { dur: 3.1, vol: 0.6, fout: 0.4 });
  hit("b-lost", "pop-a", 28.5, { vol: 0.9 });
  // E03 bamboo lifeline
  add("c-wind", "wind-steady", 30.4, { ms: 20.0, dur: 10.8, vol: 0.2, fin: 0.5, fout: 0.8, lane: 34 });
  [33.6, 34.35, 35.1, 35.85, 36.6, 37.35].forEach((t, i) => hit(`c-plant${i}`, "wood-clack", t, { dur: 0.6, vol: 0.55 }));
  hit("c-ok", "chime", 37.7, { vol: 0.6 });
  hit("c-steps", "footsteps-snow", 38.2, { dur: 2.8, vol: 0.4, fout: 0.4 });
  // E04 lost + circle search
  add("d-wind", "wind-steady", 41.2, { ms: 40.0, dur: 30.3, vol: 0.2, fin: 0.5, fout: 0.3, lane: 33 });
  hit("d-steps", "footsteps-snow", 44.4, { dur: 1.6, vol: 0.5, fout: 0.3 });
  hit("d-lost", "pop-a", 49.05, { vol: 0.9 });
  hit("d-dread", "heartbeat", 50.3, { dur: 1.4, vol: 0.6, fout: 0.4 });
  hit("d-map", "whoosh-med", 51.1, { vol: 0.5 });
  [51.5, 51.9, 52.3].forEach((t, i) => hit(`d-arr${i}`, "whoosh-tech", t, { vol: 0.3 }));
  hit("d-guess", "pop-b", 53.3, { vol: 0.5 });
  hit("d-mark", "thud-a", 60.3, { vol: 0.6 });
  hit("d-lock", "sonar", 60.4, { dur: 1.0, vol: 0.45, fout: 0.3 });
  [62.0, 64.0, 66.0].forEach((t, i) => hit(`d-sweep${i}`, "sonar", t, { dur: 1.4, vol: 0.3 + i * 0.08, fout: 0.4 }));
  hit("d-hit", "wood-clack", 67.1, { dur: 0.6, vol: 1.0 });
  hit("d-relief", "chime", 67.2, { vol: 0.7 });
  // E05 total silence (nothing scheduled 71.6–73.85), then close breathing
  hit("e-breath", "breath", 73.9, { dur: 2.9, vol: 0.55, fin: 0.2, fout: 0.5 });
  hit("e-loud", "pop-b", 74.2, { vol: 0.4 });
  hit("e-cut", "whoosh-med", 76.95, { vol: 0.4 });
  hit("e-t10", "pop-b", 78.45, { vol: 0.5 });
  hit("e-t100", "pop-b", 80.15, { vol: 0.5 });
  hit("e-only", "pop-a", 81.3, { vol: 0.8 });
  // E06 the mind inside the hut
  hit("f-enemy", "pop-b", 85.5, { vol: 0.5 });
  add("f-tick", "ticks", 90.5, { dur: 1.0, vol: 0.4, fout: 0.3 });
  hit("f-t1", "pop-b", 90.55, { vol: 0.5 });
  hit("f-page", "page", 91.9, { vol: 0.8 });
  hit("f-t2", "pop-b", 91.95, { vol: 0.5 });
  hit("f-t3", "pop-b", 93.25, { vol: 0.5 });
  hit("f-hd", "pop-a", 98.9, { vol: 0.8 });
  [99.0, 100.3, 101.6].forEach((t, i) => hit(`f-flip${i}`, "page", t, { vol: 0.5 }));
  hit("f-src", "pop-b", 100.2, { vol: 0.4 });
}
