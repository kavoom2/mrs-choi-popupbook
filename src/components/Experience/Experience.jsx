import { defaultCameraPos } from "@lib/constants/cameraTransitions";
import { GlobalServiceContext } from "@pages/home/GlobalServiceProvider";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useSelector } from "@xstate/react";
import { lazy, memo, Suspense, useContext } from "react";
import Background from "./Background";
import Camera from "./Camera";
import DisableRender from "./DisableRenderer";
import Stats from "./Stats";
import {
  bookContextSelector,
  isStageSceneSelector,
  isWebGLReadySelector,
  stageValueSelector,
} from "./_utils/stateMachineUtils";

const PopupBook = lazy(() => import("./PopupBook"));

function Experience() {
  /**
   * XState State and Context
   */
  const globalService = useContext(GlobalServiceContext);

  /**
   * 불필요한 Rerender가 발생하지 않도록, XState useSelector를 사용해야 합니다.
   */
  const stageValue = useSelector(
    globalService.stageService,
    stageValueSelector
  );

  const { page, maxPages } = useSelector(
    globalService.stageService,
    bookContextSelector
  );
  const isStageScene = useSelector(
    globalService.stageService,
    isStageSceneSelector
  );
  const isWebGLReady = useSelector(
    globalService.stageService,
    isWebGLReadySelector
  );

  /**
   * Render WebGL Elements
   */
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: 50,
        position: [defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z],
      }}
      gl={{
        antialias: false,
      }}
      className={`experience-section`}
    >
      {/* 0. Conditional Render Controller */}
      {!isWebGLReady && <DisableRender />}

      {/* 1. Environments */}
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
        <Background stageValue={stageValue} page={page} />

        {/* 2. Main Scenes */}
        <PopupBook
          page={page}
          maxPages={maxPages}
          stageValue={stageValue}
          isStageScene={isStageScene}
        />

        <Environment preset="city" />
        <Camera stageValue={stageValue} />
      </Suspense>

      {/* 3. Debugger */}
      {/* <AxisDebugger /> */}
      <Stats />
    </Canvas>
  );
}

export default memo(Experience);
