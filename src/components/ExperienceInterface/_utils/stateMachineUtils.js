import { intro, scene } from "@lib/constants/stageMachineStates";

export function subtitleContextSelector(state) {
  const subtitle = state["context"][scene]["subtitle"];

  return subtitle;
}

export function bookContextSelector(state) {
  const book = state["context"][scene]["book"];

  return book;
}

export function isIntroStageSelector(state) {
  return state.matches(intro);
}

export function isSceneStageSelector(state) {
  return state.matches(scene);
}
