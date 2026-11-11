// Ep 003 Chunk D cue sheet (abs seconds). VO pauses inserted: 53.81 +0.5, 63.63 +0.8, 75.94 +0.7.
// Music: Núna (interior + science), Out of Service (routine), Shadowfall (locked outside, drops on "ends right there"), Miasma Shapes (the darkness).
export const END = 82.8;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-d-vo.mp3", 0, { dur: 82.58, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/nuna.mp3", 0, { ms: 30.0, dur: 26.3, vol: 0.1, fin: 0.5, fout: 0.8, lane: 31 });
  add("mu-b", "assets/music/outofservice.mp3", 26.0, { ms: 50.0, dur: 29.6, vol: 0.11, fin: 0.4, fout: 0.8, lane: 32 });
  add("mu-c", "assets/music/shadowfall.mp3", 55.4, { ms: 40.0, dur: 20.2, vol: 0.12, fin: 0.6, fout: 0.3, lane: 31 });
  add("mu-d", "assets/music/miasma.mp3", 77.0, { ms: 18.0, dur: 5.8, vol: 0.15, fin: 0.8, fout: 0.3, lane: 32 });
  // D01 inside the box
  [1.2, 2.15, 3.15, 4.15, 5.5].forEach((t, i) => hit(`a-it${i}`, `arp${i + 1}`, t, { vol: 0.45 }));
  add("a-swell", "synth-rise", 6.6, { dur: 2.4, vol: 0.3, fout: 0.8 });
  add("a-fire", "fire", 7.0, { ms: 1.0, dur: 4.5, vol: 0.3, fin: 0.4, fout: 0.6, lane: 33 });
  hit("a-star", "pop-a", 7.2, { vol: 0.9 });
  // D02 science
  add("b-wind", "wind-steady", 11.5, { ms: 40.0, dur: 14.7, vol: 0.12, fin: 0.5, fout: 0.8, lane: 34 });
  hit("b-job", "pop-a", 11.8, { vol: 0.9 });
  [13.75, 16.15, 17.3].forEach((t, i) => hit(`b-tick${i}`, "click", t, { vol: 0.9 }));
  hit("b-cut", "whoosh-med", 18.4, { vol: 0.5 });
  hit("b-jam", "clamp-a", 20.7, { dur: 0.6, vol: 0.8, fout: 0.2 });
  hit("b-ice", "ice-crack-b", 21.85, { vol: 0.8 });
  hit("b-warn", "pop-a", 21.9, { vol: 0.8 });
  [24.6, 24.95, 25.35].forEach((t, i) => hit(`b-tink${i}`, "click", t, { vol: 0.45 }));
  // D03 routine
  hit("c-title", "pop-a", 26.5, { vol: 0.9 });
  [29.6, 34.9, 42.2, 44.65].forEach((t, i) => hit(`c-col${i}`, "whoosh-med", t, { vol: 0.4 }));
  hit("c-hatch", "thud-c", 36.3, { dur: 1.0, vol: 0.6, fout: 0.3 });
  add("c-wind", "wind-gusts", 37.6, { ms: 100.0, dur: 5.0, vol: 0.45, fin: 0.2, fout: 1.0, lane: 33 });
  hit("c-torch", "flashlight-click", 42.4, { vol: 1.0 });
  hit("c-pen1", "pencil", 46.6, { dur: 2.0, vol: 0.7 });
  hit("c-pen2", "pencil", 48.7, { dur: 2.0, vol: 0.6 });
  hit("c-note", "pop-b", 48.2, { vol: 0.5 });
  add("c-ticks", "ticks", 51.7, { dur: 3.6, vol: 0.5, fin: 0.2, fout: 0.4 });
  hit("c-rep", "pop-a", 51.75, { vol: 0.8 });
  [53.1, 54.45].forEach((t, i) => hit(`c-flip${i}`, "pop-b", t, { vol: 0.6 }));
  // D04 locked outside
  hit("d-mist", "pop-a", 57.3, { vol: 0.9 });
  hit("d-ladder", "ladder", 59.9, { dur: 1.6, vol: 0.5, fout: 0.4 });
  add("d-storm", "wind-gusts", 61.4, { ms: 10.0, dur: 16.6, vol: 0.45, fin: 0.5, fout: 1.5, lane: 33 });
  hit("d-slam", "thud-c", 62.25, { dur: 1.2, vol: 0.9, fout: 0.4 });
  hit("d-weld", "ice-crack", 62.5, { vol: 0.9 });
  add("d-beat", "heartbeat", 65.3, { dur: 8.4, vol: 0.55, fin: 0.3, fout: 0.8, lane: 34 });
  hit("d-alone", "pop-a", 68.5, { vol: 0.8 });
  hit("d-spot", "flashlight-click", 70.8, { vol: 0.8 });
  hit("d-scrape", "shovel", 72.9, { dur: 2.0, vol: 0.8 });
  hit("d-shatter", "ice-crack-b", 73.65, { vol: 1.0 });
  hit("d-glass", "glass", 73.67, { vol: 0.45 });
  hit("d-pop", "thud-a", 73.75, { vol: 0.6 });
  hit("d-few", "pop-a", 75.4, { vol: 0.8 });
  hit("d-low", "piano-low", 75.5, { dur: 3.0, vol: 1.0, fout: 1.4 });
  // D05 the darkness
  hit("e-swipe", "whoosh-fast", 78.25, { vol: 0.6 });
  hit("e-sub", "sub-drop", 80.5, { vol: 0.9 });
  add("e-whistle", "wind-steady", 80.4, { ms: 70.0, dur: 2.4, vol: 0.3, fin: 0.3, fout: 0.2 });
}
