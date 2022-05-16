import gsap from "gsap";
import React, { useRef } from "react";
import useDidMount from "./useDidMount";
import useDidUpdate from "./useDidUpdate";
import { defaultActionProps } from "./_utils/sceneConstants";
import { ActionProps, AnimationState } from "./_utils/types";

function useSceneAnimation(
  ref: React.ElementRef,
  state: AnimationState,
  actionProps: ActionProps = defaultActionProps
): void {
  const posTweenId = useRef(null);
  const rotTweenId = useRef(null);

  useDidMount(() => {
    /**
     * Initialize Position and Rotation
     */
    const { position, rotation } = valueSelector(state, actionProps);

    ref.current.position.x = position.x;
    ref.current.position.y = position.y;
    ref.current.position.z = position.z;

    ref.current.rotation.x = rotation.x;
    ref.current.rotation.y = rotation.y;
    ref.current.rotation.z = rotation.z;
  });

  useDidUpdate(() => {
    /**
     * Change Position and Rotation By State
     */
    if (ref.current) {
      const { position, rotation } = valueSelector(state, actionProps);

      if (posTweenId.current) posTweenId.current.kill();
      if (rotTweenId.current) rotTweenId.current.kill();

      const nextRotationId = gsap.to(ref.current.rotation, {
        x: rotation.x,
        y: rotation.y,
        z: rotation.z,
        ease: rotation?.ease ?? "none",
        delay: rotation?.delay ?? 0,
        duration: rotation.duration,
        onComplete: () => {
          if (nextRotationId === rotTweenId.current) rotTweenId.current = null;
        },
      });

      const nextPositionId = gsap.to(ref.current.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        ease: position?.ease ?? "none",
        delay: position?.delay ?? 0,
        duration: position.duration,
        onComplete: () => {
          if (nextPositionId === posTweenId.current) posTweenId.current = null;
        },
      });

      rotTweenId.current = nextRotationId;
      posTweenId.current = nextPositionId;
    }
  }, [state]);
}

const valueSelector = (actionName, actionProps) => actionProps[actionName];

export default useSceneAnimation;
