import { CLOSE, OPEN, PREOPEN, RESET } from "@lib/constants/pageStatus";

export function getPopupBookAnimationStates(isStageScene, page, maxPages) {
  return Array(maxPages)
    .fill(null)
    .map((_, idx) => {
      if (!isStageScene) return RESET;

      if (idx > page) return PREOPEN;

      if (idx === page) return OPEN;

      return CLOSE;
    });
}

export function popupBookPropsSelector(object, keys = []) {
  const selectedProps = {};

  keys.forEach((key) => {
    if (object[key]) selectedProps[key] = object[key];
  });

  return selectedProps;
}
