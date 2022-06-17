import { CLOSE, OPEN, PREOPEN, RESET } from "./pageStatus";
import { home, intro, outro, scene } from "./stageMachineStates";

/**
 * * Popup book의 스테이지 상태에 따른 전환 애니메이션을 정의합니다.
 * 전환 애니메이션은 Scenes 컴포넌트에 위임합니다. (Side Effect로 유발합니다.)
 */
export const bookPositionTransitions = {
  [home]: {
    position: {
      x: 0,
      y: -3.5,
      z: 0,
      duration: 5,
      ease: "power3.inOut",
    },
  },

  [intro]: {
    position: {
      x: 0,
      y: -3.5,
      z: 0,
      duration: 3,
      ease: "power3.inOut",
    },
  },

  [scene]: {
    position: {
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power3.inOut",
    },
  },

  [outro]: {
    position: {
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power3.inOut",
    },
  },
};

// Page Rotation Props
export const bookRotationTranstitions = {
  [home]: {
    rotation: {
      x: 0,
      y: 0,
      z: -Math.PI / 2 + Math.PI * 2,
      duration: 5,
      ease: "power3.inOut",
    },
  },

  [intro]: {
    rotation: {
      x: 0,
      y: 0,
      z: -Math.PI / 2 + Math.PI * 2,
      duration: 3,
      ease: "power3.inOut",
    },
  },

  [scene]: {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power3.inOut",
    },
  },

  [outro]: {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power3.inOut",
    },
  },
};

/**
 * * 각 페이지 모델의 Page Status에 따른 전환 애니메이션을 정의합니다.
 * 전환 애니메이션은 Scene 컴포넌트에 위임합니다. (Side Effect로 유발합니다.)
 */
export const pageRotationTransitionts = {
  [RESET]: {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 0,
      ease: "none",
    },
  },

  [PREOPEN]: {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },
  [OPEN]: {
    rotation: {
      x: Math.PI / 2,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },
  [CLOSE]: {
    rotation: {
      x: Math.PI / 2,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power3.inOut",
    },
  },
};
