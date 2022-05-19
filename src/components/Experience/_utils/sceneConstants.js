import { animationStateTypes } from "./types";

export const initialTransitionState = [
  animationStateTypes.preOpen,
  animationStateTypes.preOpen,
  animationStateTypes.preOpen,
  animationStateTypes.preOpen,
];

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

export const sceneNames = ["scene01", "scene02", "scene03", "scene04"];

export const meshKeys = {
  scene01: {
    nodes: ["ceil_01", "floor_01", "front_01", "main_01", "back_01"],
    materials: [
      "content_back",
      "sheet_ceil",
      "sheet_floor",
      "content_front",
      "content_main",
    ],
  },
  scene02: {
    nodes: [
      "ceil_02",
      "floor_02",
      "front_02",
      "main_02",
      "ceil_stripetent",
      "ceil_stripetent_tail",
    ],
    materials: [
      "sheet_ceil_02",
      "sheet_floor_02",
      "content_front",
      "content_main",
      "ceil_stripetent",
      "ceil_stripetent_tail",
    ],
  },
  scene03: {
    nodes: ["ceil_03", "floor_03", "front_03", "main_03"],
    materials: [
      "sheet_ceil_03",
      "sheet_floor_03",
      "content_front",
      "content_main",
    ],
  },
  scene04: {
    nodes: ["ceil_04", "floor_04", "front_04", "main_04", "back_04"],
    materials: [
      "content_back",
      "sheet_ceil_04",
      "sheet_floor_04",
      "content_front",
      "content_main",
    ],
  },
};
