import { interfaceImages } from "@assets/images";
import { breakpointsMax, resToMax } from "@components/@design-language";
import {
  GO_NEXT_PAGE,
  GO_NEXT_SUBTITLE,
  GO_PREV_PAGE,
  GO_PREV_SUBTITLE,
  REPLAY_APP,
  STEP,
} from "@lib/constants/stateMachineActions";
import { AudioContext } from "@pages/home/AudioContextProvider";
import { useSelector } from "@xstate/react";
import classNames from "classnames";
import { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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

const transitionClassName = "css-transition-button";

function ExperienceInterface({ stageService }) {
  /**
   * XState State and Context
   */
  const { send } = stageService;

  const book = useSelector(stageService, bookContextSelector);
  const subtitle = useSelector(stageService, subtitleContextSelector);

  const { page, maxPages, isAnimating: isPageAnimating } = book;
  const { curIdx, maxIdx, isAnimating: isSubtitleAnimating } = subtitle;

  const { isAnimationEnd: isIntroAnimationEnded } = useSelector(
    stageService,
    introContextSelector
  );

  const { isEnterEnd, isExiting, isExited } = useSelector(
    stageService,
    outroContextSelector
  );

  const isIntroStage = useSelector(stageService, isIntroStageSelector);
  const isSceneStage = useSelector(stageService, isSceneStageSelector);
  const isOutroStage = useSelector(stageService, isOutroStageSelector);

  /**
   * Audio Context
   */
  const { audio, controls, state: audioState } = useContext(AudioContext);

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

  const unmuteAudio = () => controls.unmute();

  const muteAudio = () => controls.mute();

  /**
   * 변수 선언
   */

  // 1 - 1. Intro
  const isIntroButtonRendered = isIntroStage && isIntroAnimationEnded;

  // 1 - 2. Scene
  const isSceneButtonRendered = isSceneStage && !isPageAnimating;

  const isScenePrevButtonHidden = page === 0 && curIdx === 0;

  const isSceneNextButtonHidden = page === maxPages;

  const isSceneButtonLoading = isSubtitleAnimating;

  // 1 -3. Outro
  const isOutroButtonRendered =
    isOutroStage && isEnterEnd && (!isExiting || isExited);

  // 2. Audio
  const isAudioMuted = audioState.muted;

  const audioImagePath = isAudioMuted
    ? interfaceImages.buttonAudioOff
    : interfaceImages.buttonAudioOn;

  const audioImageAlt = isAudioMuted ? "unmute audio" : "mute audio";

  const audioToggle = isAudioMuted ? unmuteAudio : muteAudio;

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
   * Props 선언
   */
  const cssTransitionProps = {
    classNames: transitionClassName,
    timeout: {
      enter: 300,
      exit: 300,
    },
  };

  /**
   * 컴포넌트 렌더링
   */
  const renderAsideTopNodes = (
    <Fragment>
      <Dummy />

      <ControlButton
        imagePath={audioImagePath}
        imageAlt={audioImageAlt}
        onClick={audioToggle}
      />
    </Fragment>
  );

  /**
   * 버튼 렌더링 여부에 따른 Enter, Exit 애니메이션은
   * TransitionGroup + CSSTransition에 위임합니다.
   */
  const renderAsideBottomNodes = (
    <TransitionGroup component={TransitionStyleProvider}>
      {/* Phase 1. 인트로 */}
      {isIntroButtonRendered && (
        <CSSTransition {...cssTransitionProps}>
          <Dummy />
        </CSSTransition>
      )}

      {isIntroButtonRendered && (
        <CSSTransition {...cssTransitionProps}>
          <ControlButton
            imagePath={interfaceImages.buttonArrowLtr}
            imageAlt="go to read popup book :)"
            onClick={startApp}
          />
        </CSSTransition>
      )}

      {/* Phase 2. 막 */}
      {isSceneButtonRendered && (
        <CSSTransition {...cssTransitionProps}>
          <ControlButton
            imagePath={interfaceImages.buttonArrowRtl}
            imageAlt="Go to prev page button"
            onClick={goPrevStep}
            visible={!isScenePrevButtonHidden}
            loading={isSceneButtonLoading}
          />
        </CSSTransition>
      )}

      {isSceneButtonRendered && (
        <CSSTransition {...cssTransitionProps}>
          <ControlButton
            imagePath={interfaceImages.buttonArrowLtr}
            imageAlt="Go to next page button"
            onClick={goNextStep}
            visible={!isSceneNextButtonHidden}
            loading={isSceneButtonLoading}
          />
        </CSSTransition>
      )}

      {isOutroButtonRendered && (
        <CSSTransition {...cssTransitionProps}>
          <Dummy />
        </CSSTransition>
      )}

      {isOutroButtonRendered && (
        <CSSTransition {...cssTransitionProps}>
          <ControlButton
            imagePath={interfaceImages.buttonReplay}
            imageAlt="Replay popup book :)"
            onClick={replayApp}
          />
        </CSSTransition>
      )}
    </TransitionGroup>
  );

  return (
    <Fragment>
      {audio}

      {/* 이미지 프레임 */}
      <Frame />

      {/* 조작 가능한 UI 레이아웃 */}
      <Section className={sectionClassNames}>
        <Aside className={asideTopClassNames}>{renderAsideTopNodes}</Aside>

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

  ${resToMax(breakpointsMax.desktopL)} {
    padding: 45px 55px;
  }

  ${resToMax(breakpointsMax.mobile)} {
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

const TransitionStyleProvider = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  .${transitionClassName}-enter {
    transform: scale(0.0001);

    user-select: none;
    pointer-events: none;
    touch-action: none;
  }

  .${transitionClassName}-enter-active {
    transform: scale(1);

    transition: transform 300ms cubic-bezier(0.54, 1.66, 0.81, 1) !important;
  }

  .${transitionClassName}-exit {
    transform: scale(1);
  }

  .${transitionClassName}-exit-active {
    transform: scale(0.0001);

    transition: transform 300ms cubic-bezier(0.36, 0, 0.66, -0.56) !important;

    user-select: none;
    pointer-events: none;
    touch-action: none;
  }
`;

const Dummy = styled.div`
  width: 0px;
  height: 0px;

  visibility: hidden;
`;
