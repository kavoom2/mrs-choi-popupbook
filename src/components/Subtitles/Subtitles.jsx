import { scene } from "@lib/constants/stageMachineStates";
import {
  subtitleColorProps,
  subtitleDelay,
  subtitles,
  subtitleTimeout,
} from "@lib/constants/subtitles";
import { GlobalServiceContext } from "@pages/home/GlobalServiceProvider";
import { useSelector } from "@xstate/react";
import classNames from "classnames";
import { useContext, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled, { css } from "styled-components";
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

  const book = useSelector(globalService.stageService, bookSelector);
  const subtitle = useSelector(globalService.stageService, subtitleSelector);

  const { page, isAnimating: isPageAnimating } = book;
  const { curIdx, isAnimating: isSubtitleAnimating } = subtitle;

  /**
   * 페이지, 자막 인덱스에 따른 애니메이션 속성값 변경
   *
   * Timout: enter, exit
   * Delay: enter, exit
   *
   */
  const timeoutRef = useRef({
    enter: subtitleTimeout.enter,
    exit: subtitleTimeout.exit,
    enterDelay: 0,
    exitDelay: 0,
  });

  const prevPageRef = useRef(null);
  const prevCurIdxRef = useRef(null);

  let enter, exit, enterDelay, exitDelay;
  if (curIdx !== prevCurIdxRef.current && isSubtitleAnimating) {
    enter = subtitleTimeout.enter;
    exit = subtitleTimeout.exit;
    enterDelay = 0;
    exitDelay = 0;

    timeoutRef.current = {
      enter,
      exit,
      enterDelay,
      exitDelay,
    };
    prevCurIdxRef.current = curIdx;
  }

  if (page !== prevPageRef.current && isPageAnimating) {
    enter = subtitleTimeout.enter + subtitleDelay.pageTransitionDelay;
    exit = subtitleTimeout.exit;
    enterDelay = subtitleDelay.pageTransitionDelay;
    exitDelay = 0;

    timeoutRef.current = {
      enter,
      exit,
      enterDelay,
      exitDelay,
    };
    prevPageRef.current = page;
  }

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
        <TransitionGroup component={SubtitleList} className={listClassNames}>
          {/* // Dummy text for pos-aboluste litem */}
          <CSSTransition key={`subtitle-item-dummy`} timeout={0}>
            <DummtText>
              <p>_dummy_</p>
            </DummtText>
          </CSSTransition>

          {subtitleContent && (
            <CSSTransition
              key={`subtitle-item-${page}-${curIdx}-${subtitleContent}`}
              classNames={transitionClassName}
              timeout={{
                enter: timeoutRef.current.enter,
                exit: timeoutRef.current.exit,
              }}
            >
              <SubtitlePositioner
                enterDelay={timeoutRef.current.enterDelay}
                exitDelay={timeoutRef.current.exitDelay}
              >
                <Subtitle
                  content={subtitleContent}
                  mainTextShadow={mainTextShadow}
                  subTextShadow={subTextShadow}
                  className={itemClassName}
                />
              </SubtitlePositioner>
            </CSSTransition>
          )}
        </TransitionGroup>
      </ResponsiveContainer>
    </Section>
  );
}

function subtitleSelector(state) {
  const subtitle = state["context"][scene]["subtitle"];

  return subtitle;
}

function bookSelector(state) {
  const book = state["context"][scene]["book"];

  return book;
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

    transition-property: opacity;
    transition-duration: ${subtitleTimeout.enter}ms;
    transition-timing-function: ease;
  }

  .${transitionClassName}-exit {
    opacity: 1;
  }

  .${transitionClassName}-exit-active {
    opacity: 0;

    transition-property: opacity;
    transition-duration: ${subtitleTimeout.exit}ms;
    transition-timing-function: ease;
  }
`;

const ResponsiveContainer = styled.div`
  width: 1220px;
  height: 800px;

  @media (max-width: 1279.98px) {
    width: 680px;
    height: 800px;
  }

  @media (max-width: 899.98px) {
    width: 480px;
    height: 640px;
  }

  @media (max-width: 599.98px) {
    width: 94vw;
    height: 125vw;
  }

  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const SubtitleList = styled.ul`
  font-family: "UhBeenamsoyoung";

  position: relative;
  width: 100%;

  padding: 0 0 60px 0;

  font-size: 28px;
  line-height: 1.6;

  text-align: center;
  word-break: keep-all;

  will-change: opacity;
  user-select: none;

  li {
    padding: 0;
    margin: 0;
    list-style: none;

    p {
      margin: 0px;
    }
  }

  @media (max-width: 899.98px) {
    padding: 0 0 40px 0;
    font-size: 22px;
  }

  @media (max-width: 599.98px) {
    padding: 0 0 30px 0;
    font-size: 18px;
  }
`;

const DummtText = styled.li`
  color: transparent;
`;

const SubtitlePositioner = styled.li`
  ${(props) => {
    const { enterDelay, exitDelay } = props;

    return css`
      position: absolute;

      width: 100%;

      top: 0;
      left: 50%;

      transform: translateX(-50%);

      &.${transitionClassName}-enter-active {
        transition-delay: ${enterDelay}ms;
      }

      &.${transitionClassName}-exit-active {
        transition-delay: ${exitDelay}ms;
      }
    `;
  }}
`;
