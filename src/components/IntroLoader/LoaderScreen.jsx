import { interfaceImages } from "@assets/images";
import classNames from "classnames";
import styled, { css, keyframes } from "styled-components";

function LoaderScreen() {
  const bearAlt = "moving character(bear)";
  const rabbitAlt = "moving character(rabbit)";
  /**
   * 클래스 이름 선언
   */
  const bearWrapperClassName = classNames({
    "character-bear-wrapper": true,
    bear: true,
  });

  const rabbitWrapperClassName = classNames({
    "character-rabbit-wrapper": true,
    rabbit: true,
  });

  const bearClassNames = classNames({
    "character-bear": true,
    [`position-abs bottom-0 left-0`]: true,
    ltr: true,
  });

  const rabbitClassNames = classNames({
    "character-rabbit": true,
    [`position-abs bottom-0 right-0`]: true,
    rtl: true,
  });

  /**
   * Props 선언
   */
  const bearCharProps = {
    animationDuration: 2600,
    animationDelay: 100,
  };

  const rabbitCharProps = {
    animationDuration: 2400,
    animationDelay: 0,
  };

  /**
   * 컴포넌트 렌더링
   */
  return (
    <Screen>
      <PositionProvider>
        <AnimationPositioner className={bearWrapperClassName}>
          <CharacterImg {...bearCharProps} className={bearClassNames}>
            <source
              media="(min-width:600px)"
              srcSet={interfaceImages.loaderBearNormal}
              alt={bearAlt}
            />
            <img src={interfaceImages.loaderBearSmall} alt={bearAlt} />
          </CharacterImg>
        </AnimationPositioner>

        <AnimationPositioner className={rabbitWrapperClassName}>
          <CharacterImg {...rabbitCharProps} className={rabbitClassNames}>
            <source
              media="(min-width:600px)"
              srcSet={interfaceImages.loaderRabbitNormal}
              alt={rabbitAlt}
            />
            <img src={interfaceImages.loaderRabbitSmall} alt={rabbitAlt} />
          </CharacterImg>
        </AnimationPositioner>
      </PositionProvider>
    </Screen>
  );
}

export default LoaderScreen;

const Screen = styled.div`
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 1220px;
  height: 800px;

  user-select: none;

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

  .position-abs {
    position: absolute;
  }

  .bottom-0 {
    bottom: 0;
  }

  .left-0 {
    left: 0;
  }

  .right-0 {
    right: 0;
  }
`;

const PositionProvider = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

const characterRotateRtl = keyframes`
    0% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(230deg);
    }
`;

const characterRotateLtr = keyframes`
    0% {
      transform: rotate(-20deg);
    }

    100% {
      transform: rotate(28deg);
    }
`;

const AnimationPositioner = styled.div`
  position: absolute;

  &.rabbit {
    top: -100px;
    right: -160px;

    @media (max-width: 1279.98px) {
      top: -100px;
      right: -160px;
    }

    @media (max-width: 899.98px) {
      top: -90px;
      right: -160px;
    }

    @media (max-width: 599.98px) {
      top: -40px;
      right: -120px;
    }
  }

  &.bear {
    bottom: -80px;
    left: -130px;

    @media (max-width: 1279.98px) {
      bottom: -80px;
      left: -130px;
    }

    @media (max-width: 899.98px) {
      bottom: -120px;
      left: -160px;
    }

    @media (max-width: 599.98px) {
      bottom: -80px;
      left: -140px;
    }
  }
`;

const CharacterImg = styled.picture`
  ${(props) => {
    const { animationDuration, animationDelay } = props;

    return css`
      transform-origin: center bottom;

      &.ltr {
        animation-name: ${characterRotateLtr};
      }

      &.rtl {
        animation-name: ${characterRotateRtl};
      }

      ${animationDuration && `animation-duration: ${`${animationDuration}ms`};`}
      ${animationDuration && `animation-delay: ${`${animationDelay}ms`};`}
      animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
      animation-direction: alternate;
      animation-iteration-count: infinite;
      animation-fill-mode: both;
    `;
  }}
`;
