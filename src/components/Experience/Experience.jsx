import { defaultCameraPos } from "@lib/constants/cameraTransitions";
import { assetLoader, scene } from "@lib/constants/stageMachineStates";
import { GlobalServiceContext } from "@pages/home/GlobalServiceProvider";
import { Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
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

  const { isAssetLoaded } = assetLoaderSelector(stageState);
  const { page, maxPages } = bookContextSelector(stageState);

  const isStageScene = isStageSceneSelector(stageState);

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
      {!isAssetLoaded && <DisableRender />}

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

function assetLoaderSelector(state) {
  const { isAssetLoaded } = state["context"][assetLoader];

  return {
    isAssetLoaded,
  };
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
