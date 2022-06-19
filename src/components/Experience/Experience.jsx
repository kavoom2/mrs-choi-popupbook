import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useActor } from "@xstate/react";
import { lazy, Suspense, useContext } from "react";
import { useDidUpdate } from "../../hooks";
import { scene } from "../../lib/constants/stageMachineStates";
import { BOOK_END_ANIMATION } from "../../lib/constants/stateMachineActions";
import { GlobalServiceContext } from "../../pages/home/GlobalServiceProvider";
import AxisDebugger from "./AxisDebugger";
import Background from "./Background";
import Camera from "./Camera";
import usePopupDebugger from "./hooks/usePopupDebugger";
import useTransitionState from "./hooks/useTransitionState";
import Stats from "./Stats";
import { defaultCameraPos } from "./transitionProps/mainObjectTransitions";
import { initialTransitionState } from "./_utils/sceneConstants";

const Popupbook = lazy(() => import("./PopupBook"));

export default function Experience() {
  /**
   * XState State and Context
   */
  const globalService = useContext(GlobalServiceContext);

  const [stageState] = useActor(globalService.stageService);
  const { send } = globalService.stageService;

  const { isAnimating, page, maxPages } = bookContextSelector(stageState);
  const isStageScene = isStageSceneSelector(stageState);

  const debugStates = usePopupDebugger();

  const [
    transitionStates,
    { navigatePageByNum, navigateToNextPage, navigateToPrevPage },
  ] = useTransitionState(initialTransitionState);

  useDidUpdate(() => {
    if (isAnimating) {
      const timeoutId = setTimeout(() => send(BOOK_END_ANIMATION), 2000);

      return () => timeoutId && clearTimeout(timeoutId);
    }
  }, [isAnimating]);

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
        <Background stageValue={stageState.value} />
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
  const { isAnimating, maxPages, page } = state["context"][scene]["book"];

  return {
    isAnimating,
    maxPages,
    page,
  };
}

function isStageSceneSelector(state) {
  return state.matches(scene);
}
