import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import useCameraZoom from "./hooks/useCameraZoom";

import {
  cameraTransitions,
  defaultCameraLookAt,
  defaultCameraPos,
} from "@lib/constants/cameraTransitions";

function Camera({ stageValue }) {
  const { camera } = useThree();

  /**
   * use Camera Zoom: 반응형을 고려하여, 화면 크기에 따라 적정 비율로 보이도록 합니다.
   */
  useCameraZoom(camera);

  /**
   * use Camera Position & lookAt
   */
  const posRef = useRef(defaultCameraPos);

  const lookAtRef = useRef(defaultCameraLookAt);
  const lookAtVec3 = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const { lookAt, position } = valueSelector(stageValue, cameraTransitions);

    if (position) {
      gsap.to(posRef.current, {
        ...position,
        onUpdate: () => {
          camera.position.set(
            posRef.current.x,
            posRef.current.y,
            posRef.current.z
          );
        },
      });
    }

    if (lookAt) {
      gsap.to(lookAtRef.current, {
        ...lookAt,
        onUpdate: () =>
          camera.lookAt(
            lookAtVec3.set(
              lookAtRef.current.x,
              lookAtRef.current.y,
              lookAtRef.current.z
            )
          ),
      });
    }
  }, [stageValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(({ camera }) => {
    camera.updateProjectionMatrix();
  });

  return null;
}

const valueSelector = (actionName, actionProps) =>
  actionProps[actionName] ?? {};

export default Camera;
