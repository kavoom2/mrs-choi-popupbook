/**
 * * Page 모델의 Material 고유 명칭입니다.
 *
 * 특정한 Material을 조정하거나,
 * alpha값에 따라 Opacity를 조정하기 위해 Depth Material을 생성하는 경우 사용합니다.
 *
 * Node와 명칭이 유사하여 헷갈릴 수 있으나,
 * Node 이름과 Material 이름은 다릅니다.
 */

export const pageMaterialNames = {
  sheet_ceil: "sheet_ceil",
  sheet_floor: "sheet_floor",
  ceil_stripetent_tail: "ceil_stripetent_tail",
  ceil_stripetent: "ceil_stripetent",
  content_back: "content_back",
  content_main: "content_main",
  content_front: "content_front",
};

export const pageDepthMaterialNames = [
  pageMaterialNames.content_back,
  pageMaterialNames.content_main,
  pageMaterialNames.content_front,
  pageMaterialNames.ceil_stripetent,
  pageMaterialNames.ceil_stripetent_tail,
];
