import { pageKeys } from "./scenes";

/**
 * * 각 Page마다 사용해야 할 Node, Material을 정의합니다.
 *
 * 중복된 Node 명칭을 사용할 수 없으므로 Material 명칭과 동일하지 않습니다.
 *
 *
 */

export const pageMeshes = {
  [pageKeys.PAGE_01]: {
    nodes: ["ceil_01", "floor_01", "front_01", "main_01", "back_01"],
    materials: [
      "content_back",
      "sheet_ceil",
      "sheet_floor",
      "content_front",
      "content_main",
    ],
  },
  [pageKeys.PAGE_02]: {
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
  [pageKeys.PAGE_03]: {
    nodes: ["ceil_03", "floor_03", "front_03", "main_03"],
    materials: [
      "sheet_ceil_03",
      "sheet_floor_03",
      "content_front",
      "content_main",
    ],
  },
  [pageKeys.PAGE_04]: {
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
