import { home, intro, outro, scene } from "./stageMachineStates";

/**
 * * Camera의 위치, 각도 등을 stage machine의 status에 따라 변경하도록 합니다.
 * 전환 애니메이션은 카메라 컴포넌트에 위임합니다. (Side Effect로 유발합니다.)
 */

export const defaultCameraPos = {
  x: 0,
  y: 0,
  z: 15,
};

export const defaultCameraLookAt = {
  x: 0,
  y: 0,
  z: 0,
};

export const cameraTransitions = {
  // STAGE: HOME에서는 진입 전 대기 상태에 위치합니다.
  [home]: {
    position: {
      ...defaultCameraPos,
      z: 19,
      duration: 0,
      delay: 0,
      ease: "power3.inOut",
    },
    lookAt: {
      ...defaultCameraLookAt,
      duration: 0,
      delay: 0,
      ease: "power3.inOut",
    },
  },

  // STAGE: INTRO에서는 POPUP BOOK 진입 애니메이션을 비춥니다.
  [intro]: {
    position: {
      ...defaultCameraPos,
      duration: 5.1,
      delay: 0.5,
      ease: "power3.inOut",
    },
    lookAt: {
      ...defaultCameraLookAt,
      duration: 5.1,
      delay: 0.5,
      ease: "power3.inOut",
    },
  },

  // STAGE: SCENE에서는 책이 펼쳐지며, 펼쳐진 위치에 따라 카메라 위치를 재조정합니다.
  [scene]: {
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

  // STAGE: OUTRO에서는 막이 종료되며 사라지는 애니메이션과 INTRO로 재진입할 수 있도록 준비할 수 있도록 재조정합니다.
  [outro]: {
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
