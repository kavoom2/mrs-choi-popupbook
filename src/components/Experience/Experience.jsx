import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { lazy, Suspense } from "react";
import * as THREE from "three";
import useControl from "./useControl";

const Scenes = lazy(() => import("./Scenes"));

export default function Experience() {
  const state = useControl();

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        // Default Position!
        position: [state.camera.x, state.camera.y, state.camera.z],
        fov: state.camera.fov,
        up: [0, 1, 0],
        enableZoom: true,
        zoom: state.camera.zoom,
      }}
      gl={{
        antialias: true,
      }}
    >
      <ambientLight intensity={0.2} />
      <spotLight
        position={[0, 0, 30]}
        angle={0.3}
        penumbra={1}
        castShadow
        intensity={0.25}
        shadow-bias={-0.0001}
      />
      <Suspense>
        <Scenes />
        <Environment preset="city" />
      </Suspense>
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["hotpink", "aquamarine", "#3498DB"]}
          labelColor="black"
        />
      </GizmoHelper>
      <OrbitControls
        target={[state.orbit.x, state.orbit.y, state.orbit.z]}
        enableZoom
        enablePan
      />
      <CameraDebugger
        debug={state.camera.debug}
        position={state.camera}
        target={state.orbit}
        fov={state.camera.fov}
        up={[0, 1, 0]}
        enableZoom
        zoom={state.camera.zoom}
      />
    </Canvas>
  );
}

const CameraDebugger = (props) => {
  useFrame(({ camera }) => {
    if (props.debug) {
      camera.position.lerp(
        new THREE.Vector3(props.position.x, props.position.y, props.position.z),
        0.05
      );

      camera.zoom = props.zoom;

      camera.updateProjectionMatrix();
    }
  });

  return null;
};
