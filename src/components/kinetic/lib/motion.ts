// Pure, framework-free helpers shared by kinetic components.

// Split a string into word groups, each word an array of chars; spaces are markers.
// Used by SpringHeadline so wrapping happens between words only.
export type WordToken = { type: "word"; chars: string[] } | { type: "space" };

export function splitIntoWords(text: string): WordToken[] {
  const tokens: WordToken[] = [];
  let current: string[] | null = null;
  for (const ch of text) {
    if (ch === " ") {
      if (current) { tokens.push({ type: "word", chars: current }); current = null; }
      tokens.push({ type: "space" });
    } else {
      if (!current) current = [];
      current.push(ch);
    }
  }
  if (current) tokens.push({ type: "word", chars: current });
  return tokens;
}

export function easeOutCubic(p: number): number {
  return 1 - Math.pow(1 - p, 3);
}

// Cap particle count by viewport width to protect performance.
export function particleCount(viewportWidth: number): number {
  return Math.min(90, Math.floor(viewportWidth / 16));
}

// Read prefers-reduced-motion once per page load — avoids repeated MediaQueryList
// allocations across ParticleField, SpringHeadline, TiltCard, CountUp, FramedImage.
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
