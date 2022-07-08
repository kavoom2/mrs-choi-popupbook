const defaultBackgrounds = {
  bottomColor: 0xe3cc94,
  topColor: 0xcde5df,
};

export function backgroundColorSelector(sceneBackgrounds, stageState, page) {
  const currentStageProps = sceneBackgrounds?.[stageState] ?? null;

  let backgroundProps = sceneBackgrounds[stageState];

  if (currentStageProps?.children) {
    backgroundProps = currentStageProps.children[page];
  }

  const { bottomColor, topColor } = {
    ...defaultBackgrounds,
    ...backgroundProps,
  };

  return {
    bottomColor,
    topColor,
  };
}
