// Shared Chunk B tokens carried over from Chunk A.
import { C } from "../lib.mjs";

export const BLUEPRINT_CSS = `
    background-color: ${C.navy};
    background-image:
      linear-gradient(rgba(0,245,212,.13) 2px, transparent 2px), linear-gradient(90deg, rgba(0,245,212,.13) 2px, transparent 2px),
      linear-gradient(rgba(0,245,212,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,.06) 1px, transparent 1px);
    background-size: 240px 240px, 240px 240px, 60px 60px, 60px 60px;`;

// Orange-bar header tag (Chunk A quadrant labels).
export const TAG_CSS = `
  .tag { position: absolute; display: flex; align-items: center; height: 60px; padding: 0 22px 0 16px; border-radius: 10px;
    background: rgba(17,24,39,.92); border-left: 8px solid ${C.amber}; font-family: Inter, sans-serif; font-weight: 800;
    font-size: 30px; letter-spacing: .08em; color: ${C.frost}; white-space: nowrap; }`;
