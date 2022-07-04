import { home, intro, outro, scene } from "@lib/constants/stageMachineStates";

export function bookContextSelector(state) {
  const book = state["context"][scene]["book"];

  return book;
}

export function isWebGLReadySelector(state) {
  return (
    state.matches(home) ||
    state.matches(intro) ||
    state.matches(scene) ||
    state.matches(outro)
  );
}

export function isStageSceneSelector(state) {
  return state.matches(scene);
}

export function stageValueSelector(state) {
  return state.value;
}
