import { animationStateTypes } from "../_utils/types";

export const pageTransitions = {
  // Reset
  [animationStateTypes.reset]: {
    position: {
      x: 0,
      y: 0,
      z: 0,
      duration: 0,
      ease: "none",
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 0,
      ease: "none",
    },
  },
  // PreOpen
  [animationStateTypes.preOpen]: {
    position: {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },
  // Open
  [animationStateTypes.open]: {
    position: {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
    rotation: {
      x: Math.PI / 2,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },
  // Close
  [animationStateTypes.close]: {
    position: {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
    rotation: {
      x: Math.PI / 2,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },
};
