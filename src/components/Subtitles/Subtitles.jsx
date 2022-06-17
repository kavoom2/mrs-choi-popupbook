import { useActor } from "@xstate/react";
import { useContext } from "react";
import { scene } from "../../lib/constants/stageMachineStates";
import { subtitleColorProps, subtitles } from "../../lib/constants/subtitles";
import { GlobalServiceContext } from "../../pages/home/GlobalServiceProvider";

/**
 * 자막들을 스테이지 상태에 따라 렌더링합니다.
 */
function Subtitles() {
  const globalService = useContext(GlobalServiceContext);
  const [stageState] = useActor(globalService.stageService);

  const { page, curIdx, maxSubtitles, isAnimating } =
    subtitleSelector(stageState);

  const subtitleContent = subtitles[page][curIdx];
  const { mainTextShadow, subTextShadow } = subtitleColorProps[page];
}

function subtitleSelector(state) {
  const { page } = state["context"][scene]["book"];
  const { curIdx, maxSubtitles, isAnimating } =
    state["context"][scene]["subtitle"];

  return {
    page,
    curIdx,
    maxSubtitles,
    isAnimating,
  };
}

export default Subtitles;
