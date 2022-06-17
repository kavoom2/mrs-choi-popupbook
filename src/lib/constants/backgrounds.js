import { sceneKeys } from "./scenes";

/**
 * * 현재 페이지에 따른 배경화면 색상을 정의합니다.
 *
 * 배경 색상 전환은 컴포넌트의 Side Effect가 담당합니다.
 * (lerp 함수 사용)
 */

export const sceneBackgrounds = {
  [sceneKeys.SCENE_INTRO]: {
    bottomColor: 0x3eccaf,
    topColor: 0x7dded2,
  },
  [sceneKeys.SCENE_01]: {
    bottomColor: 0x3eccaf,
    topColor: 0x7dded2,
  },
  [sceneKeys.SCENE_02]: {
    bottomColor: 0xd1a22d,
    topColor: 0xffe9d2,
  },
  [sceneKeys.SCENE_03]: {
    bottomColor: 0x3b4a78,
    topColor: 0x676f6b,
  },
  [sceneKeys.SCENE_04]: {
    bottomColor: 0xe6606e,
    topColor: 0xcde5df,
  },
  [sceneKeys.SCENE_OUTRO]: {
    bottomColor: 0xe6606e,
    topColor: 0xcde5df,
  },
};
