import { animationStateTypes } from "../_utils/types";

/**
 * 장면 구성 요소의 Animation을 정의합니다.
 */

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
      delay: 1.3,
      duration: 2.0,
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
      duration: 2.3,
      ease: "power3.inOut",
    },
  },
  // Open
  [animationStateTypes.open]: {
    rotation: {
      x: 0,
      y: 0,
      z: -Math.PI / 2,
      delay: 2.2,
      duration: 2.0,
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
