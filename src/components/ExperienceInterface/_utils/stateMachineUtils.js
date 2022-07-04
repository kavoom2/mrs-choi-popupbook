import { scene } from "@lib/constants/stageMachineStates";

export function subtitleContextSelector(state) {
  const subtitle = state["context"][scene]["subtitle"];

  return subtitle;
}

export function bookContextSelector(state) {
  const book = state["context"][scene]["book"];

  return book;
}

export function isStageSceneSelector(state) {
  return state.matches(scene);
}
