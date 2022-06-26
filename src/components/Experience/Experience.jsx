import { defaultCameraPos } from "@lib/constants/cameraTransitions";
import { scene } from "@lib/constants/stageMachineStates";
import { GlobalServiceContext } from "@pages/home/GlobalServiceProvider";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useActor } from "@xstate/react";
import { lazy, Suspense, useContext } from "react";
import AxisDebugger from "./AxisDebugger";
import Background from "./Background";
import Camera from "./Camera";
import Stats from "./Stats";

const Popupbook = lazy(() => import("./PopupBook"));

export default function Experience() {
  /**
   * XState State and Context
   */
  const globalService = useContext(GlobalServiceContext);

  const [stageState] = useActor(globalService.stageService);

  const { page, maxPages } = bookContextSelector(stageState);
  const isStageScene = isStageSceneSelector(stageState);

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
      className={`experience-section`}
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
        <Background stageValue={stageState.value} page={page} />
        <Popupbook
          page={page}
          maxPages={maxPages}
          stageValue={stageState.value}
          isStageScene={isStageScene}
        />
        <Environment preset="city" />
        <Camera stageValue={stageState.value} />
      </Suspense>

      {/* Debugger */}
      <AxisDebugger />
      <Stats />
    </Canvas>
  );
}

function bookContextSelector(state) {
  const { maxPages, page } = state["context"][scene]["book"];

  return {
    maxPages,
    page,
  };
}

function isStageSceneSelector(state) {
  return state.matches(scene);
}
