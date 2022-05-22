import { useCallback, useState } from "react";
import { animationStateTypes, SceneTransitionStates } from "../_utils/types";

function useTransitionState(initialState: SceneTransitionStates = []): [
  SceneTransitionStates,
  {
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
  const navigateToNextPage = useCallback(() => {
    const prevOpened = states.lastIndexOf(animationStateTypes.open);
    let nextOpened = prevOpened + 1;

    if (nextOpened > states.length - 1) {
      setStates(
        generateUniformState(states.length, animationStateTypes.preOpen)
      );
      return;
    }

    setStates(generateNextState(nextOpened, states.length));
  }, [states]);

  const navigateToPrevPage = useCallback(() => {
    const prevOpened = states.lastIndexOf(animationStateTypes.open);
    let nextOpened = prevOpened - 1;

    if (nextOpened < -1) {
      setStates(generateNextState(states.length - 1, states.length));
      return;
    }

    setStates(generateNextState(nextOpened, states.length));
  }, [states]);

  const navigatePageByNum = useCallback(
    (pageIdx) => {
      if (pageIdx < -1) {
        setStates(
          generateUniformState(states.length, animationStateTypes.close)
        );
        return;
      }

      if (pageIdx > states.length - 1) {
        setStates(
          generateUniformState(states.length, animationStateTypes.preOpen)
        );
        return;
      }

      setStates(generateNextState(pageIdx, states.length));
    },
    [states.length]
  );

  /**
   * Returned
   */
  return [
    states,
    {
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

function generateUniformState(length, type) {
  return Array(length)
    .fill(null)
    .map((_, idx) => {
      return type;
    });
}

export default useTransitionState;
