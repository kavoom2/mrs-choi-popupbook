import { GlobalServiceContext } from "@pages/home/GlobalServiceProvider";
import { useSelector } from "@xstate/react";
import classNames from "classnames";
import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { outroContextSelector } from "./_utils/stateMachineUtils";

function Outro() {
  /**
   * XSstate
   */
  const globalService = useContext(GlobalServiceContext);

  const { isExiting, isExitEnd } = useSelector(
    globalService.stageService,
    outroContextSelector
  );

  /**
   * 변수 선언
   */
  const isOutroHidden = isExiting || isExitEnd;

  /**
   * 클래스 명 선언
   */
  const sectionClassNames = classNames({
    [`outro-section`]: true,
    "slide-out": isOutroHidden,
    "slide-in": !isOutroHidden,
  });

  return (
    <CurtainScreen className={sectionClassNames}>
      <PositionProvider>
        <Curtain />

        <SectionSpacer>
          <Paragraphs>
            <p>우리가 함께 만든 100일 동안의 이야기</p>
            <p>Made by</p>
            <p>
              <span className="red">Mr.JUNG</span>
              {" & "}
              <span className="green">Ms.CHOI</span>
              {" :)"}
            </p>
          </Paragraphs>
        </SectionSpacer>
      </PositionProvider>
    </CurtainScreen>
  );
}

export default Outro;

const curtainSlideIn = keyframes`
    0% {
      transform: translate3d(-50%, -180%, 0);
    }
    100% {
      transform: translate3d(-50%, -50%, 0);
    }
`;

const curtainSlideOut = keyframes`
    0% {
      transform: translate3d(-50%, -50%, 0);
    }
    100% {
      transform: translate3d(-50%, -180%, 0);
    }
`;

const CurtainScreen = styled.section`
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;

  min-width: 1220px;
  min-height: 800px;

  max-width: 130vh;
  max-height: 88vh;

  user-select: none;

  @media (max-width: 1279.98px) {
    min-width: auto;
    min-height: auto;

    max-width: 680px;
    max-height: 800px;
  }

  @media (max-width: 899.98px) {
    max-width: 480px;
    max-height: 640px;
  }

  @media (max-width: 599.98px) {
    max-width: 94vw;
    max-height: 125vw;
  }

  &.slide-in {
    animation-name: ${curtainSlideIn};
    animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
    animation-delay: 1000ms;
    animation-duration: 1500ms;
    animation-fill-mode: both;
  }

  &.slide-out {
    animation-name: ${curtainSlideOut};
    animation-timing-function: cubic-bezier(0.36, 0, 0.66, -0.56);
    animation-delay: 100ms;
    animation-duration: 1000ms;
    animation-fill-mode: both;
  }
`;

const PositionProvider = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

const Curtain = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transform-origin: center center;
  transform: scale(1.2);

  background-color: #d6d2bc;
`;

const SectionSpacer = styled.div`
  padding: 5vh 5vw;

  width: 100%;
  height: 100%;

  display: flex;
  justify-items: center;
  align-items: center;
`;

const Paragraphs = styled.div`
  position: relative;
  font-family: "UhBeenamsoyoung";

  width: 100%;

  word-break: keep-all;
  text-align: center;

  p {
    margin: 0;

    font-size: 60px;
    line-height: 1.8;
    color: #d2ab5b;

    .red {
      color: #d66d63;
    }

    .green {
      color: #8dc557;
    }
  }

  @media (max-width: 1920px) {
    p {
      font-size: 40px;
    }
  }

  @media (max-width: 899.98px) {
    p {
      font-size: 30px;
    }
  }

  @media (max-width: 599.98px) {
    p {
      font-size: 20px;
    }
  }
`;
