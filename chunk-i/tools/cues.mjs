// Ep 003 Chunk I cue sheet (abs seconds). VO pauses inserted: 52.35 +0.7, 55.17 +0.6.
// Music: Out There (subscribe beat), Shadowfall (two failed attempts), Miasma (the cold dark), Bring Him Home (Part 6: the third try).
export const END = 86.8;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-i-vo.mp3", 0, { dur: 86.53, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/outthere.mp3", 0.2, { ms: 30.0, dur: 20.6, vol: 0.12, fin: 0.6, fout: 1.0, lane: 31 });
  add("mu-b", "assets/music/shadowfall.mp3", 20.7, { ms: 30.0, dur: 14.8, vol: 0.12, fin: 0.6, fout: 0.8, lane: 32 });
  add("mu-c", "assets/music/miasma.mp3", 35.4, { ms: 100.0, dur: 17.8, vol: 0.13, fin: 0.8, fout: 0.6, lane: 31 });
  add("mu-d", "assets/music/bringhome.mp3", 53.0, { ms: 60.0, dur: 33.8, vol: 0.11, fin: 1.0, fout: 1.8, lane: 32 });
  // I01 subscribe
  hit("a-wave", "whoosh-fast", 0.4, { vol: 0.4 });
  hit("a-real", "pop-b", 7.2, { vol: 0.5 });
  hit("a-click", "click", 11.66, { vol: 0.9 });
  hit("a-bell", "ship-bell", 11.9, { dur: 1.6, vol: 0.35, fout: 0.8 });
  hit("a-next", "pop-b", 13.0, { vol: 0.5 });
  hit("a-swell", "synth-rise", 15.0, { dur: 2.0, vol: 0.4, fin: 0.6, fout: 0.4 });
  hit("a-lock", "padlock", 16.5, { dur: 1.0, vol: 0.6 });
  // I02 two attempts
  add("b-trac", "tractor", 21.2, { ms: 20.0, dur: 7.0, vol: 0.25, fin: 0.4, fout: 0.6, lane: 33 });
  hit("b-q", "pop-b", 23.0, { vol: 0.5 });
  add("b-wind", "wind-gusts", 24.4, { ms: 10.0, dur: 4.0, vol: 0.25, fin: 0.4, fout: 0.8, lane: 34 });
  hit("b-grind", "clang", 26.3, { dur: 0.8, vol: 0.5 });
  hit("b-buzz", "buzzer", 26.35, { dur: 0.5, vol: 0.4 });
  hit("b-s1", "stamp", 27.6, { vol: 0.8 });
  hit("b-badge", "pop-a", 30.6, { vol: 0.8 });
  add("b-trac2", "tractor", 31.4, { ms: 12.0, dur: 2.0, vol: 0.25, fin: 0.3, fout: 0.3, lane: 33 });
  hit("b-stall", "power-off", 33.3, { dur: 1.0, vol: 0.5 });
  hit("b-hiss", "gas-hiss", 33.35, { dur: 1.4, vol: 0.4, fout: 0.5 });
  hit("b-s2", "stamp", 34.2, { vol: 0.8 });
  // I03 the cold dark
  add("c-static", "static", 35.5, { dur: 17.4, vol: 0.12, fin: 0.8, fout: 1.0, lane: 33 });
  add("c-beat", "heartbeat", 38.0, { dur: 14.6, vol: 0.3, fin: 1.0, fout: 0.8, lane: 34 });
  hit("c-weak", "pop-b", 38.6, { vol: 0.5 });
  [46.15, 46.65, 47.15].forEach((t, i) => hit(`c-m${i}`, "telegraph", t, { dur: 0.4, vol: 0.45 }));
  hit("c-race", "synth-rise", 48.2, { dur: 3.2, vol: 0.4, fin: 1.0, fout: 0.3 });
  hit("c-drop", "sub-drop", 51.4, { vol: 0.8 });
  // I04 Part 6
  hit("d-chime", "chime", 53.3, { vol: 0.8 });
  hit("d-dock", "pop-a", 54.58, { vol: 1.0 });
  [59.9, 64.45, 66.1].forEach((t, i) => hit(`d-card${i}`, "pop-a", t, { vol: 0.7 }));
  hit("d-bp", "whoosh-tech", 68.7, { vol: 0.4 });
  [71.2, 72.5, 74.0].forEach((t, i) => hit(`d-k${i}`, "pop-b", t, { vol: 0.5 }));
  add("d-wind", "wind-steady", 76.3, { ms: 30.0, dur: 10.5, vol: 0.2, fin: 0.6, fout: 1.0, lane: 34 });
  add("d-trac", "tractor", 76.3, { ms: 22.0, dur: 6.2, vol: 0.28, fin: 0.6, fout: 0.4, lane: 33 });
  hit("d-ice", "ice-crack", 82.4, { vol: 0.6 });
  [83.3, 83.74, 84.18, 84.62, 85.06].forEach((t, i) => hit(`d-chip${i}`, "anvil", t, { dur: 0.3, vol: 0.25 }));
  add("d-trac2", "tractor", 86.0, { ms: 30.0, dur: 0.8, vol: 0.25, fin: 0.3, lane: 33 });
}
