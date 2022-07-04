import { intro, outro, scene } from "@lib/constants/stageMachineStates";

export function subtitleContextSelector(state) {
  const subtitle = state["context"][scene]["subtitle"];

  return subtitle;
}

export function introContextSelector(state) {
  const introContext = state["context"][intro];

  return introContext;
}

export function outroContextSelector(state) {
  const outroContext = state["context"][outro];

  return outroContext;
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

export function isOutroStageSelector(state) {
  return state.matches(outro);
}
