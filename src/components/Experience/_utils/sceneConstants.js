import { animationStateTypes } from "./types";

export const initialTransitionState = [
  animationStateTypes.preOpen,
  animationStateTypes.preOpen,
  animationStateTypes.preOpen,
  animationStateTypes.preOpen,
];

export const defaultActionProps = {
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

export const defaultSceneBackgrounds = [
  {
    bottomColor: 0x3eccaf,
    topColor: 0x7dded2,
    contactShadowColor: 0x3c9f8b,
  },
  {
    bottomColor: 0xd1a22d,
    topColor: 0xffe9d2,
    contactShadowColor: 0xae8732,
  },
  {
    bottomColor: 0x3b4a78,
    topColor: 0x676f6b,
    contactShadowColor: 0x171d4f,
  },
  {
    bottomColor: 0xe6606e,
    topColor: 0xcde5df,
    contactShadowColor: 0x9f3c3c,
  },
];
