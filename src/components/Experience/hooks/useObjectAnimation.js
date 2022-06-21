import gsap from "gsap";
import React, { useRef } from "react";
import { useDidMount, useDidUpdate } from "../../../hooks";
import { ActionProps, AnimationState } from "../_utils/types";

function useObjectAnimation(
  ref: React.ElementRef,
  state: AnimationState,
  actionProps: ActionProps
): void {
  const posTweenId = useRef(null);
  const rotTweenId = useRef(null);

  useDidMount(() => {
    /**
     * Initialize Position and Rotation
     */
    const { position, rotation } = valueSelector(state, actionProps);

    if (position) {
      ref.current.position.x = position.x;
      ref.current.position.y = position.y;
      ref.current.position.z = position.z;
    }

    if (rotation) {
      ref.current.rotation.x = rotation.x;
      ref.current.rotation.y = rotation.y;
      ref.current.rotation.z = rotation.z;
    }
  });

  useDidUpdate(() => {
    /**
     * Change Position and Rotation By State
     */
    if (ref.current) {
      const { position, rotation } = valueSelector(state, actionProps);

      if (position && ref.current?.position) {
        if (posTweenId.current) posTweenId.current.kill();

        const nextPositionId = gsap.to(ref.current.position, {
          x: position.x,
          y: position.y,
          z: position.z,
          ease: position?.ease ?? "none",
          delay: position?.delay ?? 0,
          duration: position.duration ?? 0,
          // onComplete: () => {
          //   if (nextPositionId === posTweenId.current)
          //     posTweenId.current = null;
          // },
        });

        posTweenId.current = nextPositionId;
      }

      if (rotation && ref.current?.rotation) {
        if (rotTweenId.current) rotTweenId.current.kill();

        const nextRotationId = gsap.to(ref.current.rotation, {
          x: rotation.x,
          y: rotation.y,
          z: rotation.z,
          ease: rotation?.ease ?? "none",
          delay: rotation?.delay ?? 0,
          duration: rotation.duration ?? 0,
          // onComplete: () => {
          //   if (nextRotationId === rotTweenId.current)
          //     rotTweenId.current = null;
          // },
        });

        rotTweenId.current = nextRotationId;
      }
    }
  }, [state]);
}

const valueSelector = (actionName, actionProps) =>
  actionProps[actionName] ?? {};

export default useObjectAnimation;
