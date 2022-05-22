import { animationStateTypes } from "../_utils/types";

export const defaultCameraPos = {
  x: 0,
  y: 0,
  z: 18,
};

export const defaultCameraLookAt = {
  x: 0,
  y: 0,
  z: 0,
};

export const cameraTransitions = {
  [animationStateTypes.reset]: {
    position: {
      ...defaultCameraPos,
      duration: 5,
      delay: 0,
      ease: "power3.inOut",
    },
    lookAt: {
      ...defaultCameraLookAt,
      duration: 5,
      delay: 0,
      ease: "power3.inOut",
    },
  },

  [animationStateTypes.preOpen]: {
    position: {
      ...defaultCameraPos,
      duration: 3,
      delay: 0,
      ease: "power3.inOut",
    },
    lookAt: {
      ...defaultCameraLookAt,
      duration: 3,
      delay: 0,
      ease: "power3.inOut",
    },
  },

  [animationStateTypes.open]: {
    position: {
      x: 0,
      y: 1.5,
      z: 13,
      duration: 3,
      delay: 0,
      ease: "power3.inOut",
    },
    lookAt: {
      x: 0,
      y: 2.5,
      z: 0,
      duration: 3,
      delay: 0,
      ease: "power3.inOut",
    },
  },

  [animationStateTypes.close]: {
    position: {
      x: 0,
      y: 1.5,
      z: 13,
      duration: 3,
      delay: 0,
      ease: "power3.inOut",
    },
    lookAt: {
      x: 0,
      y: 2.5,
      z: 0,
      duration: 3,
      delay: 0,
      ease: "power3.inOut",
    },
  },
};

export const bookPosTransitions = {
  [animationStateTypes.reset]: {
    position: {
      x: 0,
      y: -3.5,
      z: 0,
      duration: 5,
      ease: "power3.inOut",
    },
  },

  [animationStateTypes.preOpen]: {
    position: {
      x: 0,
      y: -3.5,
      z: 0,
      duration: 3,
      ease: "power3.inOut",
    },
  },

  [animationStateTypes.open]: {
    position: {
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power3.inOut",
    },
  },

  [animationStateTypes.close]: {
    position: {
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power3.inOut",
    },
  },
};

export const bookRotTransitions = {
  [animationStateTypes.reset]: {
    rotation: {
      x: 0,
      y: 0,
      z: -Math.PI / 2 + Math.PI * 2,
      duration: 5,
      ease: "power3.inOut",
    },
  },

  [animationStateTypes.preOpen]: {
    rotation: {
      x: 0,
      y: 0,
      z: -Math.PI / 2 + Math.PI * 2,
      duration: 3,
      ease: "power3.inOut",
    },
  },

  [animationStateTypes.open]: {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power3.inOut",
    },
  },

  [animationStateTypes.close]: {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power3.inOut",
    },
  },
};
