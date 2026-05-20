import type { Transition, Variants } from "framer-motion";

export const springGentle: Transition = {
  type: "spring",
  stiffness: 60,
  damping: 20,
  mass: 1.2,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 28,
};

export const easeSlow: Transition = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeSlow,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};
