// Ep 003 Chunk L cue sheet (abs seconds). VO pauses inserted: 15.08 +0.8, 48.84 +0.7, 59.15 +0.7.
// Music: Out There (today's rule), Miasma (May 31 again), Bring Him Home (count it up → the stove → the end).
export const END = 90.0;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-l-vo.mp3", 0, { dur: 88.84, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/outthere.mp3", 0, { ms: 82.4, dur: 16.0, vol: 0.11, fin: 0.3, fout: 1.2, lane: 31 });
  add("mu-b", "assets/music/miasma.mp3", 16.0, { ms: 20.0, dur: 21.4, vol: 0.13, fin: 0.8, fout: 0.8, lane: 32 });
  add("mu-c", "assets/music/bringhome.mp3", 37.2, { ms: 40.0, dur: 52.8, vol: 0.12, fin: 1.0, fout: 3.0, lane: 31 });
  // L01
  hit("a-hard", "pop-b", 0.8, { vol: 0.5 });
  [5.38, 6.63, 7.75].forEach((t, i) => hit(`a-c${i}`, `arp${i + 3}`, t, { vol: 0.55 }));
  hit("a-ban", "chime", 9.75, { vol: 0.7 });
  hit("a-chord", "piano-low", 12.6, { dur: 3.0, vol: 0.8, fout: 1.4 });
  // L02
  add("b-rumble", "rumble", 16.0, { ms: 1.0, dur: 9.8, vol: 0.32, fin: 0.6, fout: 1.0, lane: 33 });
  add("b-beat", "heartbeat", 16.6, { dur: 9.0, vol: 0.32, fin: 0.6, fout: 1.0, lane: 34 });
  hit("b-badge", "pop-a", 17.95, { vol: 0.8 });
  hit("b-morse", "morse", 24.1, { dur: 2.0, vol: 0.25, fout: 0.8 });
  add("b-wind", "wind-steady", 25.8, { ms: 10.0, dur: 11.6, vol: 0.2, fin: 1.0, fout: 1.0, lane: 37 });
  hit("b-sos", "pop-b", 29.4, { vol: 0.5 });
  hit("b-x", "stamp", 31.1, { vol: 0.6 });
  hit("b-brass", "brass", 32.0, { dur: 3.5, vol: 0.5, fin: 0.4, fout: 1.4 });
  // L03
  hit("c-h", "pop-a", 37.5, { vol: 0.7 });
  [38.62, 41.1, 43.68, 45.58, 47.67].forEach((t, i) => hit(`c-k${i}`, `arp${i + 2}`, t, { vol: 0.55 }));
  add("c-count", "counter", 47.8, { dur: 1.6, vol: 0.3, fout: 0.3, lane: 34 });
  hit("c-sub", "sub-drop", 49.4, { vol: 0.7 });
  // L04
  hit("d-st1", "stamp", 51.9, { vol: 0.6 });
  hit("d-st2", "stamp", 53.95, { vol: 0.6 });
  add("d-fire", "fire", 55.0, { ms: 4.0, dur: 13.0, vol: 0.26, fin: 1.0, fout: 1.6, lane: 33 });
  hit("d-hiss", "gas-hiss", 57.1, { dur: 2.3, vol: 0.35, fin: 0.6, fout: 0.8 });
  hit("d-chord", "piano-low", 65.8, { dur: 3.0, vol: 0.9, fout: 1.4 });
  // L05
  [70.1, 71.85].forEach((t, i) => hit(`e-opt${i}`, "pop-a", t, { vol: 0.7 }));
  hit("e-cm", "pop-b", 74.2, { vol: 0.6 });
  hit("e-click", "click", 82.0, { vol: 0.9 });
  hit("e-bell", "ship-bell", 82.2, { dur: 1.6, vol: 0.35, fout: 0.8 });
  hit("e-next", "chime", 87.5, { vol: 0.6 });
  add("e-wind", "wind-steady", 86.0, { ms: 40.0, dur: 4.0, vol: 0.18, fin: 1.2, fout: 1.6, lane: 37 });
}
