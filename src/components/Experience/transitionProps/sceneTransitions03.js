import { animationStateTypes } from "../_utils/types";

export const ceilHingeProps = {
  // Reset
  [animationStateTypes.reset]: {
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
      x: 0,
      y: 0,
      z: -Math.PI / 2,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },
  // Close
  [animationStateTypes.close]: {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },
};

export const contentMainProps = {
  // Reset
  [animationStateTypes.reset]: {
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
      x: 0,
      y: 0,
      z: -Math.PI / 2,
      delay: 1.2,
      duration: 2.4,
      ease: "power3.inOut",
    },
  },
  // Close
  [animationStateTypes.close]: {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.0,
      ease: "power3.inOut",
    },
  },
};

export const contentFrontProps = {
  // Reset
  [animationStateTypes.reset]: {
    rotation: {
      x: 0,
      y: 0,
      z: -Math.PI,
      duration: 0,
      ease: "none",
    },
  },
  // PreOpen
  [animationStateTypes.preOpen]: {
    rotation: {
      x: 0,
      y: 0,
      z: -Math.PI,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },
  // Open
  [animationStateTypes.open]: {
    rotation: {
      x: 0,
      y: 0,
      z: -Math.PI / 2,
      delay: 0.2,
      duration: 2.8,
      ease: "power3.inOut",
    },
  },
  // Close
  [animationStateTypes.close]: {
    rotation: {
      x: 0,
      y: 0,
      z: -Math.PI,
      duration: 1.5,
      ease: "power3.inOut",
    },
  },
};
