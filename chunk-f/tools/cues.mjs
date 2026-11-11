// Ep 003 Chunk F cue sheet (abs seconds). VO pauses inserted: 42.57 +0.7, 86.7 +0.8.
// Music: Miasma (the silence), Out of Service (in control), Shadowfall (the invisible killer), Miasma (blood + ladder, to black).
export const END = 107.8;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-f-vo.mp3", 0, { dur: 107.55, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/phono.mp3", 0, { ms: 0, dur: 3.0, vol: 0.3, fout: 2.0, lane: 32 });
  add("mu-b", "assets/music/miasma.mp3", 0.5, { ms: 70.0, dur: 20.2, vol: 0.13, fin: 1.0, fout: 1.0, lane: 31 });
  add("mu-c", "assets/music/outofservice.mp3", 20.3, { ms: 30.0, dur: 14.6, vol: 0.1, fin: 0.6, fout: 0.8, lane: 32 });
  add("mu-d", "assets/music/shadowfall.mp3", 43.2, { ms: 20.0, dur: 44.6, vol: 0.12, fin: 0.8, fout: 0.6, lane: 31 });
  add("mu-e", "assets/music/miasma.mp3", 87.9, { ms: 100.0, dur: 19.9, vol: 0.14, fin: 0.8, fout: 1.6, lane: 32 });
  // F01 the silence presses
  add("a-press", "rumble", 6.8, { ms: 1.0, dur: 3.2, vol: 0.45, fin: 0.6, fout: 1.0 });
  hit("a-box", "pop-a", 8.85, { vol: 0.8 });
  [12.65, 13.86, 15.37].forEach((t, i) => { hit(`a-inf${i}`, "whoosh-med", t, { vol: 0.4 }); hit(`a-thud${i}`, "thud-a", t + 0.25, { vol: 0.5 }); });
  // F02 in control -> headaches
  hit("b-hd", "pop-b", 20.7, { vol: 0.5 });
  [23.3, 26.6, 31.45, 32.85].forEach((t, i) => hit(`b-ok${i}`, `arp${i + 2}`, t, { vol: 0.45 }));
  hit("b-drop", "sub-drop", 34.6, { vol: 0.7 });
  hit("b-badge", "pop-a", 39.3, { vol: 0.9 });
  add("b-beat", "heartbeat", 38.5, { dur: 4.8, vol: 0.5, fin: 0.4, fout: 0.6, lane: 33 });
  hit("b-ring", "tinnitus", 40.9, { dur: 3.0, vol: 0.4, fout: 1.0 });
  // F03 Part 4
  hit("c-chime", "chime", 43.6, { vol: 0.8 });
  hit("c-dock", "pop-a", 44.85, { vol: 1.0 });
  hit("c-prob", "pop-b", 46.4, { vol: 0.6 });
  hit("c-cut", "whoosh-med", 49.6, { vol: 0.5 });
  add("c-fire", "fire", 53.2, { ms: 3.0, dur: 7.0, vol: 0.28, fin: 0.4, fout: 0.8, lane: 33 });
  hit("c-up", "whoosh-tech", 55.6, { vol: 0.4 });
  // F04 the pipe ices shut
  add("d-wind", "wind-steady", 60.2, { ms: 50.0, dur: 13.6, vol: 0.2, fin: 0.5, fout: 0.8, lane: 34 });
  [67.3, 69.0, 70.2].forEach((t, i) => hit(`d-ice${i}`, i % 2 ? "ice-crack" : "ice-crack-b", t, { vol: 0.7 }));
  hit("d-blk", "pop-a", 71.6, { vol: 0.9 });
  hit("d-cut", "whoosh-med", 74.0, { vol: 0.5 });
  [75.4, 75.8].forEach((t, i) => hit(`d-vent${i}`, "pop-b", t, { vol: 0.5 }));
  add("d-gen", "tractor", 79.6, { ms: 10.0, dur: 4.6, vol: 0.32, fin: 0.3, fout: 0.8, lane: 33 });
  hit("d-gtag", "pop-b", 79.7, { vol: 0.5 });
  hit("d-hiss", "gas-hiss", 83.8, { dur: 2.2, vol: 0.5, fout: 0.6 });
  hit("d-dread", "piano-low", 84.1, { dur: 3.0, vol: 1.0, fout: 1.2 });
  hit("d-co", "pop-a", 84.2, { vol: 0.8 });
  // F05 blood + ladder
  [89.6, 91.7, 92.9].forEach((t, i) => hit(`e-pill${i}`, "click", t, { vol: 0.7 }));
  hit("e-co", "pop-b", 95.2, { vol: 0.5 });
  [97.75, 99.6, 101.5, 102.85].forEach((t, i) => hit(`e-step${i}`, `arp${4 - i}`, t, { vol: 0.5 }));
  hit("e-sub", "sub-drop", 105.6, { vol: 0.7 });
  add("e-drone", "hum", 104.8, { dur: 3.0, vol: 0.2, fin: 0.8, fout: 1.2 });
}
