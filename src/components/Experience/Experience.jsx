import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { lazy, Suspense, useEffect } from "react";
import AxisDebugger from "./AxisDebugger";
import Camera from "./Camera";
import usePopupDebugger from "./hooks/usePopupDebugger";
import useTransitionState from "./hooks/useTransitionState";
import Stats from "./Stats";
import { defaultCameraPos } from "./transitionProps/mainObjectTransitions";
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
        position: [defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z],
      }}
      gl={{
        antialias: true,
      }}
    >
      {/* Environments */}
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
        {/* Main Scenes */}
        <Scenes transitionStates={transitionStates} />
        <Environment preset="city" />
        <Camera transitionState={transitionStates[0]} />
      </Suspense>

      {/* Debugger */}
      <AxisDebugger />
      <Stats />
    </Canvas>
  );
}
