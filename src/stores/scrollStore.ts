// Global scroll state — mutable refs for performance (no re-renders)
// Consumed by 3D components via direct import

export const scrollState = {
  progress: 0,      // 0–1 normalized scroll progress
  speed: 0,         // current scroll velocity
  direction: 1,     // 1 = down, -1 = up
  currentSection: 0, // index of current section in viewport
};

export const mouseState = {
  x: 0, // -1 to 1 normalized
  y: 0, // -1 to 1 normalized
  clientX: 0,
  clientY: 0,
};
