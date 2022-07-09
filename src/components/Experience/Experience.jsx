import { defaultCameraPos } from "@lib/constants/cameraTransitions";
import { isPostBuild } from "@lib/utils/postbuild";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useSelector } from "@xstate/react";
import { Fragment, lazy, memo, Suspense } from "react";
import AxisDebugger from "./AxisDebugger";
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

const isDevelopment = process.env.NODE_ENV === "development";

function Experience({ stageService }) {
  /**
   * XState State and Context
   *
   * 불필요한 Rerender가 발생하지 않도록, XState useSelector를 사용해야 합니다.
   */

  const stageValue = useSelector(stageService, stageValueSelector);

  const { page, maxPages } = useSelector(stageService, bookContextSelector);
  const isStageScene = useSelector(stageService, isStageSceneSelector);
  const isWebGLReady = useSelector(stageService, isWebGLReadySelector);

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
        antialias: true,
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
      <DevModeUtils />
    </Canvas>
  );
}

function ExperienceMock() {
  /**
   * SEO 관련 ReactSnap postbuild issue
   * PostBuild에서 ThreeJS의 MathUtils 라이브러리 함수를 제대로 참조하지 못합니다.
   * 따라서, PostBuild 단계에서는 Mock Element를 참조하도록 해야 합니다.
   *
   * [Reference] https://github.com/stereobooster/react-snap/issues/392
   */
  return null;
}

function DevModeUtils() {
  if (!isDevelopment) return null;

  return (
    <Fragment>
      <AxisDebugger />
      <Stats />
    </Fragment>
  );
}

export default isPostBuild ? ExperienceMock : memo(Experience);
