// Ep 003 Chunk A cue sheet (abs seconds). VO has the three dramatic pauses inserted (25.72 +0.8, 50.87 +0.6, 68.88 +0.8).
// Music (Epidemic Sound): Out There (A01–A02), Out of Service (A03), Miasma Shapes (A04), Bring Them Home (A05–A06).
export const END = 106.0;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-a-vo.mp3", 0, { dur: 105.79, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/outthere.mp3", 0, { ms: 0, dur: 25.5, vol: 0.12, fin: 0.8, fout: 0.6, lane: 31 });
  add("mu-b", "assets/music/outofservice.mp3", 28.0, { ms: 24.0, dur: 25.8, vol: 0.11, fin: 0.1, fout: 0.8, lane: 32 });
  add("mu-c", "assets/music/miasma.mp3", 53.6, { ms: 18.0, dur: 17.6, vol: 0.16, fin: 0.6, fout: 0.8, lane: 31 });
  add("mu-d", "assets/music/bringhome.mp3", 71.0, { ms: 56.0, dur: 22.7, vol: 0.12, fin: 0.8, fout: 0.4, lane: 32 });
  add("mu-e", "assets/music/bringhome.mp3", 93.5, { ms: 78.5, dur: 12.5, vol: 0.08, fin: 0.3, fout: 0.6, lane: 31 });
  // A01 surface -> buried hut -> 123 miles
  hit("a-sub", "sub-drop", 0.05, { vol: 0.8 });
  add("a-wind", "wind-steady", 0, { ms: 5.0, dur: 6.6, vol: 0.5, fin: 0.4, fout: 0.6, lane: 33 });
  add("a-wind2", "wind-steady", 6.6, { ms: 12.0, dur: 2.6, vol: 0.14, fin: 0.1, fout: 0.8, lane: 33 });
  hit("a-badge", "pop-a", 1.0, { vol: 1.0 });
  add("a-hook", "heartbeat", 0.3, { dur: 5.8, vol: 0.45, fin: 0.3, fout: 0.8, lane: 34 });
  hit("a-dive", "whoosh-med", 6.2, { vol: 0.6 });
  add("a-beat", "heartbeat", 9.2, { dur: 6.4, vol: 0.5, fin: 0.5, fout: 0.6, lane: 33 });
  add("a-hum", "hum", 9.2, { dur: 16.3, vol: 0.22, fin: 0.8, fout: 0.3, lane: 34 });
  add("a-morse", "morse", 13.6, { dur: 2.0, vol: 0.4, fout: 0.4 });
  add("a-static", "static", 13.6, { ms: 4.0, dur: 1.8, vol: 0.15, fout: 0.4 });
  hit("a-msg", "pop-b", 13.7, { vol: 0.6 });
  hit("a-pull", "whoosh-fast", 15.6, { vol: 0.7 });
  hit("a-pill", "pop-a", 15.7, { vol: 1.0 });
  add("a-gust", "wind-gusts", 15.9, { ms: 30.0, dur: 3.5, vol: 0.45, fin: 0.4, fout: 1.0, lane: 33 });
  hit("a-dist", "pop-b", 17.2, { vol: 0.6 });
  hit("a-camp", "pop-b", 17.8, { vol: 0.6 });
  // A02 the choice (dead silence 25.5–26.8)
  hit("b-one", "pop-b", 19.7, { vol: 0.6 });
  hit("b-c1", "clamp-a", 21.3, { dur: 0.7, vol: 0.9, fout: 0.2 });
  hit("b-c2", "clamp-b", 24.5, { dur: 0.7, vol: 0.9, fout: 0.2 });
  hit("b-piano", "piano-low", 26.8, { dur: 2.8, vol: 1.2, fout: 1.2 });
  hit("b-glass", "glass", 26.82, { vol: 0.6 });
  hit("b-drop", "thud-a", 27.2, { vol: 0.5 });
  // A03 Admiral Byrd
  hit("c-whip", "whoosh-fast", 28.0, { vol: 0.7 });
  hit("c-flash", "flashbulb", 28.3, { vol: 1.0 });
  hit("c-id", "pop-a", 28.5, { vol: 0.9 });
  hit("c-spin", "whoosh-med", 30.85, { vol: 0.5 });
  hit("c-src", "pop-b", 32.0, { vol: 0.5 });
  hit("c-flash2", "flashbulb", 36.3, { vol: 0.8 });
  hit("c-np", "pop-b", 37.0, { vol: 0.6 });
  hit("c-sp", "pop-b", 37.6, { vol: 0.6 });
  add("c-gust", "wind-gusts", 38.95, { ms: 60.0, dur: 2.6, vol: 0.6, fin: 0.1, fout: 1.0, lane: 33 });
  add("c-wind", "wind-steady", 39.3, { ms: 20.0, dur: 14.4, vol: 0.3, fin: 0.8, fout: 0.8, lane: 34 });
  hit("c-alone", "pop-b", 41.7, { vol: 0.5 });
  hit("c-buried", "ice-crack", 44.1, { vol: 0.5 });
  hit("c-cold", "pop-a", 45.7, { vol: 0.9 });
  hit("c-st1", "thud-a", 48.85, { vol: 0.9 });
  hit("c-x1", "whoosh-tech", 49.3, { vol: 0.3 });
  hit("c-st2", "thud-b", 50.3, { vol: 0.9 });
  hit("c-x2", "whoosh-tech", 50.9, { vol: 0.3 });
  hit("c-st3", "stamp", 52.5, { vol: 1.0 });
  hit("c-chime", "chime", 52.55, { vol: 0.7 });
  // A04 suspects
  hit("d-hd", "pop-b", 54.0, { vol: 0.5 });
  hit("d-sub", "pop-a", 54.0, { vol: 0.8 });
  hit("d-click", "click", 55.1, { vol: 1.0 });
  hit("d-bell", "chime", 55.15, { vol: 0.6 });
  [56.7, 57.65, 58.55].forEach((t, i) => hit(`d-spot${i}`, "flashlight-click", t, { vol: 1.0 }));
  hit("d-x", "stamp", 62.6, { vol: 0.9 });
  hit("d-push", "whoosh-fast", 63.65, { vol: 0.6 });
  add("d-fire", "fire", 64.2, { ms: 2.0, dur: 6.9, vol: 0.25, fin: 0.4, fout: 0.6, lane: 33 });
  [66.1, 67.9, 68.9].forEach((t, i) => { hit(`d-hiss${i}`, "gas-hiss", t, { dur: 1.2, vol: 0.45, fout: 0.4 }); hit(`d-tag${i}`, "pop-b", t, { vol: 0.4 }); });
  // A05 roadmap
  add("e-count", "counter", 71.6, { dur: 3.2, vol: 0.5, fout: 0.3 });
  hit("e-lock", "sub-drop", 74.8, { vol: 0.7 });
  hit("e-ross", "pop-b", 73.0, { vol: 0.6 });
  hit("e-p1", "pop-a", 77.2, { vol: 0.9 });
  hit("e-tape", "tape", 77.7, { vol: 0.9 });
  hit("e-crack", "ice-crack", 80.7, { vol: 0.7 });
  hit("e-p2", "pop-a", 83.25, { vol: 0.9 });
  add("e-beat", "heartbeat", 84.0, { dur: 4.0, vol: 0.55, fout: 0.6, lane: 34 });
  hit("e-p3", "pop-a", 87.9, { vol: 0.9 });
  hit("e-expand", "whoosh-med", 88.5, { vol: 0.6 });
  add("e-engine", "tractor", 87.9, { ms: 10.0, dur: 5.7, vol: 0.55, fin: 0.5, fout: 0.8, lane: 33 });
  hit("e-crew", "pop-b", 89.3, { vol: 0.6 });
  // A06 first words + 7 parts
  add("f-wind", "wind-steady", 93.6, { ms: 30.0, dur: 9.5, vol: 0.3, fin: 0.6, fout: 0.6, lane: 34 });
  hit("f-hatch", "thud-c", 93.9, { dur: 1.5, vol: 0.5, fout: 0.5 });
  hit("f-lock", "padlock", 96.0, { vol: 1.0 });
  add("f-shimmer", "synth-rise", 96.0, { dur: 2.5, vol: 0.3, fout: 0.8 });
  hit("f-dock", "whoosh-med", 100.7, { vol: 0.5 });
  hit("f-pin", "chime", 101.1, { vol: 0.7 });
  hit("f-whip", "whoosh-fast", 102.95, { vol: 0.7 });
  [0, 1, 2, 3, 4, 5, 6].forEach((i) => hit(`f-arp${i}`, `arp${i + 1}`, 103.6 + i * 0.25, { vol: 0.5 }));
  hit("f-dive", "whoosh-fast", 105.35, { vol: 0.7 });
}
