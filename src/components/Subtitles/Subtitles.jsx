import { useActor } from "@xstate/react";
import classNames from "classnames";
import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { usePreviousImmediate } from "rooks";
import styled from "styled-components";
import { scene } from "../../lib/constants/stageMachineStates";
import {
  subtitleColorProps,
  subtitleDelay,
  subtitles,
  subtitleTimeout,
} from "../../lib/constants/subtitles";
import { GlobalServiceContext } from "../../pages/home/GlobalServiceProvider";
import Subtitle from "./Subtitle";

const transitionClassName = "subtitle-item";

/**
 * 자막들을 스테이지 상태에 따라 렌더링합니다.
 */
function Subtitles({ className, ...restProps }) {
  /**
   * XState State and Context
   */
  const globalService = useContext(GlobalServiceContext);

  const [stageState] = useActor(globalService.stageService);

  const { page, curIdx, isBookAnimating, isSubtitleAnimating } =
    subtitleContextSelector(stageState);
  const prevPage = usePreviousImmediate(page);

  console.log(isBookAnimating, isSubtitleAnimating);

  /**
   * 변수 선언
   */
  const subtitleContent = subtitles?.[page]?.[curIdx] ?? null;
  const { mainTextShadow, subTextShadow } = {
    mainTextShadow: null,
    subTextShadow: null,
    ...(subtitleColorProps?.[page] ?? null),
  };

  /**
   * 스타일, 클래스 선언부
   */
  const sectionClassNames = classNames(
    {
      [`subtitle-section`]: true,
    },
    className
  );

  const responsiveClassName = classNames({
    [`subtitle-responsive-container`]: true,
  });

  const listClassNames = classNames({
    [`subtitles-list`]: true,
  });

  const itemClassName = classNames({
    [transitionClassName]: true,
  });

  /**
   * 컴포넌트 렌더링
   *
   * 자막 fade in, fade out은 Transtition Group과 CSS Transtition에 위임합니다.
   */
  return (
    <Section {...restProps} className={sectionClassNames}>
      <ResponsiveContainer className={responsiveClassName}>
        <TransitionGroup className={listClassNames}>
          {subtitleContent && (
            <CSSTransition
              key={`subtitle-item-${page}-${curIdx}-${subtitleContent}`}
              classNames={transitionClassName}
              timeout={subtitleTimeout}
            >
              <Subtitle
                content={subtitleContent}
                mainTextShadow={mainTextShadow}
                subTextShadow={subTextShadow}
                className={itemClassName}
                style={{
                  transitionDelay:
                    prevPage !== page
                      ? `${subtitleDelay.pageTransitionDelay}ms`
                      : "0ms",
                }}
              />
            </CSSTransition>
          )}
        </TransitionGroup>
      </ResponsiveContainer>
    </Section>
  );
}

function subtitleContextSelector(state) {
  const { page, isAnimating: isBookAnimating } =
    state["context"][scene]["book"];
  const {
    curIdx,
    maxSubtitles,
    isAnimating: isSubtitleAnimating,
  } = state["context"][scene]["subtitle"];

  return {
    page,
    curIdx,
    maxSubtitles,
    isBookAnimating,
    isSubtitleAnimating,
  };
}

export default Subtitles;

const Section = styled.section`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .${transitionClassName}-enter {
    opacity: 0;
  }

  .${transitionClassName}-enter-active {
    opacity: 1;
    transition: opacity ${subtitleTimeout.enter}ms ease;
  }

  .${transitionClassName}-exit {
    opacity: 1;
  }

  .${transitionClassName}-exit-active {
    opacity: 0;
    transition: opacity ${subtitleTimeout.exit}ms ease;
  }
`;

const ResponsiveContainer = styled.div`
  width: 70vw;
  min-width: 400px;
  max-width: 760px;

  height: 50vw;
  min-height: 290px;
  max-height: 540px;

  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
