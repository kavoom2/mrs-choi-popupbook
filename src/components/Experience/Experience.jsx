import { Environment, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { lazy, Suspense, useEffect } from "react";
import Camera from "./Camera";
import usePopupDebugger from "./hooks/usePopupDebugger";
import useTransitionState from "./hooks/useTransitionState";
import Stats from "./Stats";
import { initialTransitionState } from "./_utils/sceneConstants";

const Scenes = lazy(() => import("./Scenes"));

export default function Experience() {
  const debugStates = usePopupDebugger();

  const [
    transitionStates,
    { navigatePageByNum, navigateToNextPage, navigateToPrevPage },
  ] = useTransitionState(initialTransitionState);

  useEffect(() => {
    window.navigateByNum = navigatePageByNum;
    window.navigateToNext = navigateToNextPage;
    window.navigateToPrev = navigateToPrevPage;
  }, [transitionStates]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: 50,
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
        <Scenes transitionStates={transitionStates} />
        <Environment preset="city" />
        <Camera transitionState={transitionStates[0]} />
      </Suspense>

      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["hotpink", "aquamarine", "#3498DB"]}
          labelColor="black"
        />
      </GizmoHelper>

      <Stats />
    </Canvas>
  );
}
