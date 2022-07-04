import { interfaceImages } from "@assets/images";
import {
  GO_NEXT_PAGE,
  GO_NEXT_SUBTITLE,
  GO_PREV_PAGE,
  GO_PREV_SUBTITLE,
  REPLAY_APP,
  STEP,
} from "@lib/constants/stateMachineActions";
import { GlobalServiceContext } from "@pages/home/GlobalServiceProvider";
import { useSelector } from "@xstate/react";
import classNames from "classnames";
import { Fragment, useContext } from "react";
import styled from "styled-components";
import ControlButton from "./ControlButton";
import Frame from "./Frame";
import {
  bookContextSelector,
  introContextSelector,
  isIntroStageSelector,
  isOutroStageSelector,
  isSceneStageSelector,
  outroContextSelector,
  subtitleContextSelector,
} from "./_utils/stateMachineUtils";

function ExperienceInterface() {
  /**
   * XState State and Context
   */
  const globalService = useContext(GlobalServiceContext);

  const { send } = globalService.stageService;

  const book = useSelector(globalService.stageService, bookContextSelector);
  const subtitle = useSelector(
    globalService.stageService,
    subtitleContextSelector
  );

  const { page, maxPages, isAnimating: isPageAnimating } = book;
  const { curIdx, maxIdx, isAnimating: isSubtitleAnimating } = subtitle;

  const { isAnimationEnd: isIntroAnimationEnded } = useSelector(
    globalService.stageService,
    introContextSelector
  );

  const { isEntering, isEnterEnd, isExiting, isExitEnd } = useSelector(
    globalService.stageService,
    outroContextSelector
  );

  const isIntroStage = useSelector(
    globalService.stageService,
    isIntroStageSelector
  );

  const isSceneStage = useSelector(
    globalService.stageService,
    isSceneStageSelector
  );

  const isOutroStage = useSelector(
    globalService.stageService,
    isOutroStageSelector
  );

  /**
   * 함수 선언
   */
  const startApp = (event) => {
    if (isIntroStage && isIntroAnimationEnded) send(STEP);
  };

  const goNextStep = (event) => {
    if (page === maxPages - 1 && curIdx === maxIdx) send(STEP);
    else if (curIdx < maxIdx) send(GO_NEXT_SUBTITLE);
    else send(GO_NEXT_PAGE);
  };

  const goPrevStep = (event) => {
    if (curIdx > 0) send(GO_PREV_SUBTITLE);
    else send(GO_PREV_PAGE);
  };

  const replayApp = (event) => {
    if (isOutroStage && isEnterEnd) send(REPLAY_APP);
  };

  /**
   * 변수 선언
   */

  // 1. Intro
  const isIntroButtonHidden = !(isIntroStage && isIntroAnimationEnded);

  // 2. Scene
  const isSceneInterfaceHidden = !isSceneStage || isPageAnimating;

  const isScenePrevButtonHidden =
    (page === -1 && curIdx === 0) || isSceneInterfaceHidden;

  const isSceneNextButtonHidden = page === maxPages || isSceneInterfaceHidden;

  const isSceneButtonLoading = isPageAnimating || isSubtitleAnimating;

  // 3. Outro
  const isReplayAppButtonHidden = !(isOutroStage && isEnterEnd);

  /**
   * 클래스 명 선언
   */
  const sectionClassNames = classNames({
    [`interface-section`]: true,
  });

  const asideTopClassNames = classNames({
    [`interface-aside-top`]: true,
  });

  const asideBottomClassNames = classNames({
    [`interface-aside-bottom`]: true,
  });

  /**
   * 컴포넌트
   */

  const renderAsideBottomNodes = (
    <Fragment>
      {isIntroStage && (
        <Fragment>
          <Dummy />

          <ControlButton
            imagePath={interfaceImages.buttonArrowLtr}
            imageAlt="go to read popup book :)"
            onClick={startApp}
            visible={!isIntroButtonHidden}
          />
        </Fragment>
      )}

      {(isSceneStage || isEntering) && (
        <Fragment>
          <ControlButton
            imagePath={interfaceImages.buttonArrowRtl}
            imageAlt="Go to prev page button"
            onClick={goPrevStep}
            visible={!isScenePrevButtonHidden}
            loading={isSceneButtonLoading}
          />

          <ControlButton
            imagePath={interfaceImages.buttonArrowLtr}
            imageAlt="Go to next page button"
            onClick={goNextStep}
            visible={!isSceneNextButtonHidden}
            loading={isSceneButtonLoading}
          />
        </Fragment>
      )}

      {isOutroStage && !isEntering && (
        <Fragment>
          <Dummy />

          <ControlButton
            imagePath={interfaceImages.buttonArrowLtr}
            imageAlt="Replay popup book :)"
            onClick={replayApp}
            visible={!isReplayAppButtonHidden}
          />
        </Fragment>
      )}
    </Fragment>
  );

  return (
    <Fragment>
      {/* 이미지 프레임 */}
      <Frame />

      {/* 조작 가능한 UI 레이아웃 */}
      <Section className={sectionClassNames}>
        <Aside className={asideTopClassNames}>
          {/* //TODO: 홈 버튼 UI가 들어갑니다. */}
        </Aside>

        <Aside className={asideBottomClassNames}>
          {renderAsideBottomNodes}
        </Aside>
      </Section>
    </Fragment>
  );
}

export default ExperienceInterface;

const Section = styled.section`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: stretch;

  /* 프레임은 이전 Fixed 요소의 클릭 이벤트를 방해하면 안됩니다. */
  pointer-events: none;
  touch-action: none;

  padding: 6vh 3vw;

  @media (max-width: 2560px) {
    padding: 45px 55px;
  }

  @media (max-width: 599.98px) {
    padding: 3vh 2vw;
  }
`;

const Aside = styled.aside`
  width: 100%;

  display: flex;
  justify-content: space-between;

  pointer-events: auto;
  touch-action: auto;
`;

const Dummy = styled.div`
  width: 0px;
  height: 0px;

  visibility: hidden;
`;
