// Ep 003 Chunk J cue sheet (abs seconds). VO pause inserted: 47.40 +1.2 (quiet beat before "Hello, fellows").
// Music: Shadowfall (the climb, the flare), Bring Him Home (the light; the greeting), The Letter (the host; going home).
export const END = 94.2;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-j-vo.mp3", 0, { dur: 93.92, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/shadowfall.mp3", 0.2, { ms: 150.0, dur: 18.4, vol: 0.12, fin: 0.6, fout: 0.8, lane: 31 });
  add("mu-b", "assets/music/bringhome.mp3", 18.4, { ms: 0.0, dur: 28.8, vol: 0.12, fin: 1.4, fout: 0.8, lane: 32 });
  add("mu-c", "assets/music/letter.mp3", 48.6, { ms: 0.0, dur: 45.6, vol: 0.12, fin: 1.6, fout: 2.0, lane: 31 });
  // J01 radio, ladder, hatch, fire, flare; the light on the horizon
  add("a-static", "static", 1.8, { dur: 2.6, vol: 0.18, fin: 0.3, fout: 0.6, lane: 33 });
  hit("a-beep", "morse", 1.9, { dur: 1.4, vol: 0.4 });
  [5.95, 6.48, 7.01, 7.54, 8.07, 8.6, 9.13].forEach((t, i) => hit(`a-rung${i}`, "ladder", t, { dur: 0.4, vol: 0.45 }));
  hit("a-hatch", "thud-b", 10.0, { vol: 0.8 });
  add("a-wind", "wind-gusts", 10.2, { ms: 20.0, dur: 8.3, vol: 0.22, fin: 0.6, fout: 0.8, lane: 34 });
  hit("a-ign", "ignite", 12.9, { dur: 1.2, vol: 0.6 });
  add("a-fire", "fire", 13.0, { ms: 2.0, dur: 5.5, vol: 0.3, fin: 0.3, fout: 0.8, lane: 37 });
  hit("a-flare", "spark", 13.3, { dur: 2.0, vol: 0.5, fout: 0.8 });
  add("a-trac", "tractor", 18.5, { ms: 5.0, dur: 7.1, vol: 0.24, fin: 0.6, fout: 0.8, lane: 33 });
  hit("a-badge", "pop-a", 18.7, { vol: 0.8 });
  hit("a-swell", "synth-rise", 21.6, { dur: 2.0, vol: 0.45, fin: 0.8, fout: 0.4 });
  hit("a-saw", "chime", 23.5, { vol: 0.8 });
  // J02 the gaunt man and the greeting
  add("b-trac", "tractor", 25.6, { ms: 14.0, dur: 2.4, vol: 0.24, fout: 0.8, lane: 33 });
  add("b-steps", "footsteps-snow", 27.8, { dur: 1.8, vol: 0.4, fin: 0.2, fout: 0.4, lane: 34 });
  hit("b-ladder", "ladder", 28.6, { dur: 2.0, vol: 0.4 });
  [33.45, 35.35, 37.5].forEach((t, i) => hit(`b-t${i}`, "pop-b", t, { vol: 0.5 }));
  hit("b-lock", "whoosh-med", 40.4, { vol: 0.5 });
  hit("b-unlock", "padlock", 42.5, { dur: 1.0, vol: 0.8 });
  hit("b-card", "chime", 43.0, { vol: 0.6 });
  hit("b-hello", "piano-low", 48.8, { dur: 4.0, vol: 0.9, fout: 2.0 });
  [56.3, 58.3, 60.25].forEach((t, i) => hit(`b-p${i}`, "pop-b", t, { vol: 0.55 }));
  hit("b-host", "chime", 61.6, { vol: 0.8 });
  // J03 136 days, two months, flown out
  add("c-count", "counter", 64.7, { dur: 2.4, vol: 0.35, fout: 0.3, lane: 34 });
  hit("c-lock", "stamp", 67.2, { vol: 0.7 });
  hit("c-weak", "buzzer", 70.25, { dur: 0.5, vol: 0.35 });
  add("c-room", "crackle", 74.8, { dur: 9.0, vol: 0.2, fin: 0.6, fout: 0.8, lane: 37 });
  hit("c-sun", "synth-rise", 79.4, { dur: 2.6, vol: 0.4, fin: 0.8, fout: 0.6 });
  add("c-plane", "plane", 83.9, { ms: 2.0, dur: 10.3, vol: 0.32, fin: 1.0, fout: 1.6, lane: 33 });
  hit("c-badge", "pop-a", 83.95, { vol: 0.8 });
  hit("c-pil", "pop-b", 86.55, { vol: 0.5 });
  hit("c-out", "pop-b", 89.4, { vol: 0.5 });
  add("c-trac", "tractor", 91.5, { ms: 20.0, dur: 2.7, vol: 0.22, fin: 0.4, fout: 0.8, lane: 36 });
}
