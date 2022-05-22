import { animationStateTypes, materialNames } from "../_utils/types";

export const materialTransitions = {
  // Reset
  [animationStateTypes.reset]: {
    [`${materialNames.sheet_ceil}_04`]: {
      opacity: {
        value: 0.2,
        duration: 0,
        ease: "none",
      },
    },
    [`${materialNames.sheet_floor}_04`]: {
      opacity: {
        value: 0.2,
        duration: 0,
        ease: "none",
      },
    },
  },
  // PreOpen
  [animationStateTypes.preOpen]: {
    [`${materialNames.sheet_ceil}_04`]: {
      opacity: {
        value: 0.2,
        delay: 1.2,
        duration: 1.2,
        ease: "power3.inOut",
      },
    },
    [`${materialNames.sheet_floor}_04`]: {
      opacity: {
        value: 0.2,
        delay: 1.2,
        duration: 1.2,
        ease: "power3.inOut",
      },
    },
  },
  // Open
  [animationStateTypes.open]: {
    [`${materialNames.sheet_ceil}_04`]: {
      opacity: {
        value: 1,
        duration: 0.5,
        ease: "power3.inOut",
      },
    },
    [`${materialNames.sheet_floor}_04`]: {
      opacity: {
        value: 1,
        duration: 0.5,
        ease: "power3.inOut",
      },
    },
  },
  // Close
  [animationStateTypes.close]: {
    [`${materialNames.sheet_ceil}_04`]: {
      opacity: {
        value: 1,
        delay: 0,
        duration: 0,
        ease: "power3.inOut",
      },
    },
    [`${materialNames.sheet_floor}_04`]: {
      opacity: {
        value: 1,
        delay: 0,
        duration: 0,
        ease: "power3.inOut",
      },
    },
  },
};
