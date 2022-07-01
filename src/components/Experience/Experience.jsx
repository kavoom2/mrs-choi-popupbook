import { defaultCameraPos } from "@lib/constants/cameraTransitions";
import { home, intro, outro, scene } from "@lib/constants/stageMachineStates";
import { GlobalServiceContext } from "@pages/home/GlobalServiceProvider";
import { Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSelector } from "@xstate/react";
import { lazy, Suspense, useContext } from "react";
import Background from "./Background";
import Camera from "./Camera";
import Stats from "./Stats";

const Popupbook = lazy(() => import("./PopupBook"));

export default function Experience() {
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
        antialias: true,
      }}
      className={`experience-section`}
    >
      {/* Conditional Render Controller */}
      {!isWebGLReady && <DisableRender />}

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
        <Background stageValue={stageValue} page={page} />
        <Popupbook
          page={page}
          maxPages={maxPages}
          stageValue={stageValue}
          isStageScene={isStageScene}
        />
        <Environment preset="city" />
        <Camera stageValue={stageValue} />
      </Suspense>

      {/* Debugger */}
      {/* <AxisDebugger /> */}
      <Stats />
    </Canvas>
  );
}

function DisableRender() {
  /**
   * 페이지 불러오기 직 후, WebGL Renderer를 바로 사용하게 되면 급격한 프레임 드랍 이슈가 발생합니다.
   * 따라서, XState의 isAssetLoaded가 TRUE가 된 이후에 WebGL Renderer를 사용하도록 합니다.
   *
   * - HTML preload 요소가 불러와진 이후에 렌더링을 허용해도 되지만, Network Water Flow상으로 크게 유의미하지는 않습니다.
   *
   * [Reference] https://github.com/pmndrs/react-three-fiber/discussions/769
   *
   */
  useFrame(() => null, 1000);

  return null;
}

function bookContextSelector(state) {
  const { maxPages, page } = state["context"][scene]["book"];

  return {
    maxPages,
    page,
  };
}

function isWebGLReadySelector(state) {
  return (
    state.matches(home) ||
    state.matches(intro) ||
    state.matches(scene) ||
    state.matches(outro)
  );
}

function isStageSceneSelector(state) {
  return state.matches(scene);
}

function stageValueSelector(state) {
  return state.value;
}
