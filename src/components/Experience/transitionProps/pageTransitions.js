import { animationStateTypes } from "../_utils/types";

export const pageTransitions = {
  // Reset
  [animationStateTypes.reset]: {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },

  // PreOpen
  [animationStateTypes.preOpen]: {
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
    rotation: {
      x: Math.PI / 2,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },
};
