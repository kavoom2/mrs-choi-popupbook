export const animationStateTypes = {
  reset: "reset",
  preOpen: "preOpen",
  open: "open",
  close: "close",
};

export type AnimationState = "reset" | "preOpen" | "open" | "close";

export type OrientProps = {
  x: number,
  y: number,
  z: number,
  duration: number,
  delay?: number,
  ease?: string,
};

export interface ActionProps {
  [key: AnimationState]: OrientProps;
}

export type SceneTransitionStates = AnimationState[];
