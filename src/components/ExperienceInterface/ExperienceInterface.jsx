import { interfaceImages } from "@assets/images";
import {
  GO_NEXT_PAGE,
  GO_NEXT_SUBTITLE,
  GO_PREV_PAGE,
  GO_PREV_SUBTITLE,
  STEP,
} from "@lib/constants/stateMachineActions";
import { GlobalServiceContext } from "@pages/home/GlobalServiceProvider";
import { useSelector } from "@xstate/react";
import classNames from "classnames";
import { Fragment, useCallback, useContext } from "react";
import styled from "styled-components";
import ControlButton from "./ControlButton";
import Frame from "./Frame";
import {
  bookContextSelector,
  isStageSceneSelector,
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

  const isStageScene = useSelector(
    globalService.stageService,
    isStageSceneSelector
  );

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

  const isInterfaceHidden = !isStageScene || isPageAnimating;

  const isPrevButtonHidden = (page === -1 && curIdx === 0) || isInterfaceHidden;
  const isNextButtonHidden = page === maxPages || isInterfaceHidden;

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

  /* 프레임은 이전 Fixed 요소의 클릭 이벤트를 방해하면 안됩니다. */
  pointer-events: none;
  touch-action: none;

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
