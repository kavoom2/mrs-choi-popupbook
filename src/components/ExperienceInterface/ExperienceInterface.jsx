import { useActor } from "@xstate/react";
import classNames from "classnames";
import { Fragment, useCallback, useContext } from "react";
import styled from "styled-components";
import { interfaceImages } from "../../assets/images";
import { scene } from "../../lib/constants/stageMachineStates";
import {
  GO_NEXT_PAGE,
  GO_NEXT_SUBTITLE,
  GO_PREV_PAGE,
  GO_PREV_SUBTITLE,
  STEP,
} from "../../lib/constants/stateMachineActions";
import { GlobalServiceContext } from "../../pages/home/GlobalServiceProvider";
import ControlButton from "./ControlButton";
import Frame from "./Frame";

function ExperienceInterface() {
  /**
   * XState State and Context
   */
  const globalService = useContext(GlobalServiceContext);

  const [stageState] = useActor(globalService.stageService);
  const { send } = globalService.stageService;

  const { book, subtitle } = sceneContextSelector(stageState);
  const { page, maxPages, isAnimating: isPageAnimating } = book;
  const { curIdx, maxIdx, isAnimating: isSubtitleAnimating } = subtitle;

  const isStageScene = isStageSceneSelector(stageState);

  /**
   * 함수 선언
   */
  const goNextStep = useCallback(() => {
    // 다음 진행 버튼의 Action 함수
    if (page === maxPages - 1 && curIdx === maxIdx) send(STEP);
    else if (curIdx < maxIdx) send(GO_NEXT_SUBTITLE);
    else send(GO_NEXT_PAGE);
  }, [page, maxPages, curIdx, maxIdx, send]);

  const goPrevStep = useCallback(() => {
    // 이전 진행 버튼의 Action 함수
    if (curIdx > 0) send(GO_PREV_SUBTITLE);
    else send(GO_PREV_PAGE);
  }, [curIdx, send]);

  /**
   * 변수 선언
   */
  const isInterfaceHidden = !isStageScene;
  const isPrevButtonHidden = page === -1 && curIdx === 0;
  const isNextButtonHidden = page === maxPages;

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
    hidden: isInterfaceHidden,
  });

  /**
   * 컴포넌트
   */
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
          <ControlButton
            imagePath={interfaceImages.buttonArrowRtl}
            imageAlt="Go to prev page button"
            onClick={goPrevStep}
            visible={!isPrevButtonHidden}
            loading={isPageAnimating || isSubtitleAnimating}
          />

          <ControlButton
            imagePath={interfaceImages.buttonArrowLtr}
            imageAlt="Go to next page button"
            onClick={goNextStep}
            visible={!isNextButtonHidden}
            loading={isPageAnimating || isSubtitleAnimating}
          />
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

  padding: 45px 45px;

  @media (max-width: 599.98px) {
    padding: 3vh 2vw;
  }
`;

const Aside = styled.aside`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

function sceneContextSelector(state) {
  const { book, subtitle } = state["context"][scene];

  return {
    book,
    subtitle,
  };
}

function isStageSceneSelector(state) {
  return state.matches(scene);
}
