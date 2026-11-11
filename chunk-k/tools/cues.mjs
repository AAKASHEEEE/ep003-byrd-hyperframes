// Ep 003 Chunk K cue sheet (abs seconds). VO pause inserted: 39.32 +0.7 (before the quote).
// Music: The Letter (Part 7, the book, the quote), Out There (today's stations).
export const END = 66.8;
export function cues(add, hit) {
  add("vo", "assets/vo/chunk-k-vo.mp3", 0, { dur: 66.52, vol: 1.6, lane: 30 });
  add("mu-a", "assets/music/letter.mp3", 0.2, { ms: 50.0, dur: 44.6, vol: 0.12, fin: 1.0, fout: 1.2, lane: 31 });
  add("mu-b", "assets/music/outthere.mp3", 44.4, { ms: 60.0, dur: 22.4, vol: 0.11, fin: 1.0, fout: 1.8, lane: 32 });
  // K01
  hit("a-chime", "chime", 0.25, { vol: 0.9 });
  hit("a-dock", "pop-a", 1.55, { vol: 1.0 });
  [5.05, 6.55, 13.05].forEach((t, i) => hit(`a-t${i}`, "pop-b", t, { vol: 0.5 }));
  add("a-beat", "heartbeat", 9.0, { dur: 3.4, vol: 0.35, fin: 0.4, fout: 0.8, lane: 33 });
  hit("a-pub", "pop-a", 17.85, { vol: 0.8 });
  hit("a-book", "thud-a", 19.7, { vol: 0.9 });
  hit("a-ttl", "chime", 24.05, { vol: 0.6 });
  // K02
  hit("b-page", "page", 25.2, { dur: 1.0, vol: 0.6 });
  hit("b-need", "pop-b", 32.4, { vol: 0.5 });
  hit("b-card", "whoosh-med", 35.2, { vol: 0.4 });
  hit("b-swell", "synth-rise", 38.6, { dur: 2.2, vol: 0.35, fin: 1.0, fout: 0.6 });
  // K03
  hit("c-log", "page", 46.2, { dur: 0.8, vol: 0.5 });
  hit("c-draw", "whoosh-tech", 47.6, { vol: 0.4 });
  hit("c-rare", "pop-b", 48.55, { vol: 0.5 });
  hit("c-today", "chime", 52.8, { vol: 0.6 });
  [55.9, 57.3, 58.5].forEach((t, i) => hit(`c-p${i}`, "pop-a", t, { vol: 0.6 }));
  [60.8, 62.1, 63.9, 65.0].forEach((t, i) => hit(`c-g${i}`, `arp${i + 3}`, t, { vol: 0.5 }));
}
