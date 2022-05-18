export const animationStateTypes = {
  reset: "reset",
  preOpen: "preOpen",
  open: "open",
  close: "close",
};

export const materialNames = {
  sheet_ceil: "sheet_ceil",
  sheet_floor: "sheet_floor",
  ceil_stripetent_tail: "ceil_stripetent_tail",
  ceil_stripetent: "ceil_stripetent",
  content_back: "content_back",
  content_main: "content_main",
  content_front: "content_front",
};

export type AnimationState = "reset" | "preOpen" | "open" | "close";

export type OrientKey = "position" | "rotation";

export type OrientProps = {
  x: number,
  y: number,
  z: number,
  duration: number,
  delay?: number,
  ease?: string,
};

export interface ActionProps {
  [animationState: AnimationState]: {
    [orientKey: OrientKey]: OrientProps,
  };
}

export type MaterialKey =
  | "sheet_ceil"
  | "sheet_floor"
  | "content_back"
  | "content_main"
  | "content_front"
  | "ceil_stripetent_tail"
  | "ceil_stripetent";

export type MaterialActionProp = {
  value: number,
  delay?: number,
  duration: number,
};
export interface MaterialActionProps {
  [animationState: AnimationState]: {
    [materialKey: MaterialKey]: {
      [materialProp: string]: MaterialActionProp,
    },
  };
}

export type SceneTransitionStates = AnimationState[];
