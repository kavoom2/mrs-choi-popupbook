import classNames from "classnames";
import styled, { keyframes } from "styled-components";

function Outro() {
  /**
   * 클래스 명 선언
   */
  const sectionClassNames = classNames({
    [`outro-section`]: true,
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

const curtainFadeIn = keyframes`
    0% {
        opacity: 0;
        visibility: hidden;
    }

    100% {
        opacity: 1;
        visibility: visible;
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

  animation-name: ${curtainFadeIn};
  animation-timing-function: ease;
  animation-delay: 500ms;
  animation-duration: 2000ms;
  animation-fill-mode: both;
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
