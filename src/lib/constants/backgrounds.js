import { home, intro, outro, scene } from "./stageMachineStates";

/**
 * * 현재 페이지에 따른 배경화면 색상을 정의합니다.
 *
 * 배경 색상 전환은 컴포넌트의 Side Effect가 담당합니다.
 * (lerp 함수 사용)
 */

export const sceneBackgrounds = {
  [home]: {
    bottomColor: 0xe3cc94,
    topColor: 0xcde5df,
  },
  [intro]: {
    bottomColor: 0xe3cc94,
    topColor: 0xcde5df,
  },
  [scene]: {
    children: [
      {
        bottomColor: 0x3eccaf,
        topColor: 0x7dded2,
      },
      {
        bottomColor: 0xd1a22d,
        topColor: 0xffe9d2,
      },
      {
        bottomColor: 0x3b4a78,
        topColor: 0x676f6b,
      },
      {
        bottomColor: 0xe6606e,
        topColor: 0xcde5df,
      },
      {
        bottomColor: 0xe6606e,
        topColor: 0xcde5df,
      },
    ],
  },
  [outro]: {
    bottomColor: 0xe3cc94,
    topColor: 0xcde5df,
  },
};
