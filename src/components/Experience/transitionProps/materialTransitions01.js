import { animationStateTypes, materialNames } from "../_utils/types";

export const materialTransitions = {
  // Reset
  [animationStateTypes.reset]: {
    [materialNames.sheet_ceil]: {
      opacity: {
        value: 1,
        duration: 0,
        ease: "none",
      },
    },
    [materialNames.sheet_floor]: {
      opacity: {
        value: 1,
        duration: 0,
        ease: "none",
      },
    },
  },
  // PreOpen
  [animationStateTypes.preOpen]: {
    [materialNames.sheet_ceil]: {
      opacity: {
        value: 1,
        duration: 0,
        ease: "power3.inOut",
      },
    },
    [materialNames.sheet_floor]: {
      opacity: {
        value: 1,
        duration: 0,
        ease: "power3.inOut",
      },
    },
  },
  // Open
  [animationStateTypes.open]: {
    [materialNames.sheet_ceil]: {
      opacity: {
        value: 1,
        duration: 0.5,
        ease: "power3.inOut",
      },
    },
    [materialNames.sheet_floor]: {
      opacity: {
        value: 1,
        duration: 0.5,
        ease: "power3.inOut",
      },
    },
  },
  // Close
  [animationStateTypes.close]: {
    [materialNames.sheet_ceil]: {
      opacity: {
        value: 0.2,
        delay: 1.6,
        duration: 0.8,
        ease: "power3.inOut",
      },
    },
    [materialNames.sheet_floor]: {
      opacity: {
        value: 0.2,
        delay: 1.6,
        duration: 0.8,
        ease: "power3.inOut",
      },
    },
  },
};
