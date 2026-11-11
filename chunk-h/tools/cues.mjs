// Ep 003 Chunk H cue sheet (abs seconds). VO pauses inserted: 33.27 +0.6, 63.95 +0.7.
// Music: Out of Service tail (callback), Shadowfall (the winter rescue in his mind), Miasma (hiding it), Bring Him Home (Poulter's plan).
export const END = 91.3;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-h-vo.mp3", 0, { dur: 91.02, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/outofservice.mp3", 0, { ms: 67.2, dur: 3.4, vol: 0.1, fout: 1.6, lane: 31 });
  add("mu-b", "assets/music/shadowfall.mp3", 3.3, { ms: 110.0, dur: 30.4, vol: 0.12, fin: 0.8, fout: 0.8, lane: 32 });
  add("mu-c", "assets/music/miasma.mp3", 33.8, { ms: 40.0, dur: 31.4, vol: 0.13, fin: 0.6, fout: 1.0, lane: 31 });
  add("mu-d", "assets/music/bringhome.mp3", 65.0, { ms: 20.0, dur: 26.3, vol: 0.11, fin: 1.0, fout: 1.6, lane: 32 });
  // H01 callback, Part 5, the projection, the shield
  hit("a-dec", "pop-a", 0.6, { vol: 0.7 });
  hit("a-chime", "chime", 3.4, { vol: 0.8 });
  hit("a-dock", "pop-a", 4.7, { vol: 1.0 });
  add("a-wind", "wind-gusts", 6.9, { ms: 5.0, dur: 14.8, vol: 0.28, fin: 0.6, fout: 1.0, lane: 33 });
  add("a-trac", "tractor", 7.0, { ms: 4.0, dur: 15.0, vol: 0.26, fin: 0.8, fout: 0.6, lane: 34 });
  [13.1, 15.7, 19.1].forEach((t, i) => hit(`a-t${i}`, "pop-b", t, { vol: 0.5 }));
  hit("a-ice", "ice-crack", 20.7, { vol: 0.8 });
  hit("a-fz", "ice-crack-b", 21.3, { vol: 0.6 });
  hit("a-stall", "power-off", 22.0, { dur: 1.2, vol: 0.5 });
  hit("a-warn", "stamp", 25.6, { vol: 0.9 });
  hit("a-brass", "brass", 27.9, { dur: 3.5, vol: 0.5, fin: 0.3, fout: 1.2 });
  hit("a-ban", "pop-a", 30.6, { vol: 0.7 });
  // H02 sent vs hid
  add("b-morse", "morse", 34.0, { dur: 9.4, vol: 0.28, fin: 0.3, fout: 0.6, lane: 37 });
  add("b-beat", "heartbeat", 34.0, { dur: 9.4, vol: 0.32, fin: 0.6, fout: 0.8, lane: 38 });
  [37.95, 39.05].forEach((t, i) => hit(`b-w${i}`, "pop-b", t, { vol: 0.5 }));
  [40.15, 41.55, 42.4].forEach((t, i) => hit(`b-st${i}`, "stamp", t + 0.35, { vol: 0.6 }));
  // H03 Little America notices
  hit("c-sig", "sonar", 43.8, { dur: 2.4, vol: 0.4, fout: 0.8 });
  add("c-static", "static", 46.5, { dur: 18.6, vol: 0.12, fin: 0.6, fout: 1.0, lane: 33 });
  [50.95, 53.36, 55.58, 58.19].forEach((t, i) => hit(`c-tg${i}`, "telegraph", t + 0.4, { dur: 0.6, vol: 0.5 }));
  hit("c-chord", "piano-low", 62.0, { dur: 3.0, vol: 0.9, fout: 1.2 });
  // H04 Poulter's plan
  hit("d-id", "pop-a", 65.5, { vol: 0.7 });
  hit("d-bub", "pop-b", 74.65, { vol: 0.6 });
  hit("d-no", "buzzer", 76.6, { dur: 0.6, vol: 0.45 });
  hit("d-prop", "whoosh-med", 78.25, { vol: 0.5 });
  hit("d-star", "chime", 79.2, { vol: 0.5 });
  hit("d-real", "stamp", 83.8, { vol: 0.6 });
  add("d-key", "morse", 86.8, { dur: 3.6, vol: 0.25, fin: 0.2, fout: 0.6, lane: 37 });
  hit("d-ok", "pop-a", 88.0, { vol: 0.7 });
}
