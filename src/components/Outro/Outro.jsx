import { interfaceImages } from "@assets/images";
import { breakpointsMax, resToMax } from "@components/@design-language";
import { useSelector } from "@xstate/react";
import classNames from "classnames";
import styled, { keyframes } from "styled-components";
import { outroContextSelector } from "./_utils/stateMachineUtils";

function Outro({ stageService }) {
  /**
   * XSstate State and Context
   */
  const { isExiting, isExitEnd } = useSelector(
    stageService,
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

  /**
   * 컴포넌트 렌더링
   */
  return (
    <CurtainScreen className={sectionClassNames}>
      <PositionProvider>
        <Curtain />

        <SectionSpacer>
          <Paragraphs>
            <p>우리가 함께 만든 100일 동안의 이야기</p>
            <p>Made by</p>
            <p>
              Mr.JUNG{" & "}Ms.CHOI{" :)"}
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

  ${resToMax(breakpointsMax.laptopL)} {
    min-width: auto;
    min-height: auto;

    max-width: 680px;
    max-height: 800px;
  }

  ${resToMax(breakpointsMax.tablet)} {
    max-width: 480px;
    max-height: 640px;
  }

  ${resToMax(breakpointsMax.mobile)} {
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
    animation-delay: 50ms;
    animation-duration: 900ms;
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

  background-color: #f5544d;

  background-image: url(${interfaceImages.outroCurtainPattern});
  background-size: 80px auto;
  background-repeat: repeat repeat;
  background-position: center center;

  ${resToMax(breakpointsMax.desktop)} {
    background-size: 70px auto;
  }

  ${resToMax(breakpointsMax.laptopL)} {
    background-size: 60px auto;
  }

  ${resToMax(breakpointsMax.tablet)} {
    background-size: 50px auto;
  }

  ${resToMax(breakpointsMax.mobile)} {
    background-size: 40px auto;
  }
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
    color: #ffffff;
  }

  ${resToMax(breakpointsMax.desktopL)} {
    p {
      font-size: 40px;
    }
  }

  ${resToMax(breakpointsMax.tablet)} {
    p {
      font-size: 30px;
    }
  }

  ${resToMax(breakpointsMax.mobile)} {
    p {
      font-size: 20px;
    }
  }
`;
