import { useCallback, useState } from "react";
import { animationStateTypes, SceneTransitionStates } from "./_utils/types";

function useSceneTransition(initialState: SceneTransitionStates = []): [
  SceneTransitionStates,
  {
    reset: () => void,
    navigatePageByNum: (number) => void,
    navigateToNextPage: (number) => void,
    navigateToPrevPage: (number) => void,
  }
] {
  /**
   * Set Default State List
   */
  const [states, setStates] = useState(initialState);

  /**
   * Transition Handlers
   */
  const reset = useCallback(() => {
    const nextState = Array(states.length).fill(animationStateTypes.reset);

    setStates(nextState);
  }, [states.length]);

  const navigateToNextPage = useCallback(() => {
    console.log(states);
    const prevOpened = states.lastIndexOf(animationStateTypes.open);

    let nextOpened = prevOpened + 1;
    if (nextOpened > states.length - 1) nextOpened = prevOpened;

    const nextState = generateNextState(nextOpened, states.length);

    setStates(nextState);
  }, [states]);

  const navigateToPrevPage = useCallback(() => {
    const prevOpened = states.lastIndexOf(animationStateTypes.open);

    let nextOpened = prevOpened - 1;

    if (nextOpened < 0) nextOpened = -1;

    const nextState = generateNextState(nextOpened, states.length);

    setStates(nextState);
  }, [states]);

  const navigatePageByNum = useCallback(
    (pageIdx) => {
      if (pageIdx < -1 || pageIdx > states.length - 1) {
        console.warn("정상적인 페이지 범위를 벗어난 요청입니다.");
        return;
      }

      const nextState = generateNextState(pageIdx, states.length);

      setStates(nextState);
    },
    [states.length]
  );

  /**
   * Returned
   */
  return [
    states,
    {
      reset,
      navigatePageByNum,
      navigateToNextPage,
      navigateToPrevPage,
    },
  ];
}

function generateNextState(nextOpened = [], length = 0) {
  return Array(length)
    .fill(null)
    .map((_, idx) => {
      if (idx < nextOpened) return animationStateTypes.close;

      if (idx === nextOpened) return animationStateTypes.open;

      return animationStateTypes.preOpen;
    });
}

export default useSceneTransition;
