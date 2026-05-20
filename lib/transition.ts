// Scroll-driven, bidirectional.
// progress = scrollY / innerHeight, clamped [0, 1]
// 0 = full cube grid · 1 = full glass disc (section 2 visible)
export const transitionRef = {
  progress: 0,
  scrollY:  0,
};
