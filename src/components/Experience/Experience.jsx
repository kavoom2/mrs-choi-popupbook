import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  Stats,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { lazy, Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import useControl from "./hooks/useControl";

const Scenes = lazy(() => import("./Scenes"));

export default function Experience() {
  const state = useControl();

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
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
        position={[0, 5, 30]}
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
      <StatsDebugger />
    </Canvas>
  );
}

function CameraDebugger(props) {
  const vec3 = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }) => {
    if (props.debug) {
      camera.position.lerp(
        vec3.set(props.position.x, props.position.y, props.position.z),
        0.05
      );

      camera.zoom = props.zoom;

      camera.updateProjectionMatrix();
    }
  });

  return null;
}

function StatsDebugger() {
  const node = useRef(document.createElement("div"));

  useEffect(() => {
    node.current.id = "stats";

    document.body.appendChild(node.current);

    return () => document.body.removeChild(node.current);
  }, []);

  return <Stats parent={node.current} />;
}
