import { interfaceImages } from "@assets/images";
import {
  breakpointsMax,
  breakpointsMin,
  resToMax,
} from "@components/@design-language";
import Picture from "@components/Picture";
import useImagePreload from "@hooks/sideEffects/useImagePreload";
import classNames from "classnames";
import styled, { css, keyframes } from "styled-components";

const preloadImages = [
  interfaceImages.loaderBearNormal,
  interfaceImages.loaderBearSmall,
  interfaceImages.loaderRabbitNormal,
  interfaceImages.loaderRabbitSmall,
];

function LoaderScreen({
  isCharacterIdle,
  isCharacterExit,
  fallback,
  children,
  ...restProps
}) {
  /**
   * Side effect
   */
  useImagePreload(preloadImages);

  /**
   * 클래스 이름 선언
   */
  const sectionClassNames = classNames({
    [`loader-section`]: true,
  });

  const bearWrapperClassName = classNames({
    "character-bear-wrapper": true,
    bear: true,
  });

  const rabbitWrapperClassName = classNames({
    "character-rabbit-wrapper": true,
    rabbit: true,
  });

  const commonPositionerClassNames = classNames({
    "character-positioner": true,
    "animation-paused": isCharacterIdle,
  });

  const bearClassNames = classNames({
    "character-bear": true,
    [`position-abs bottom-0 left-0`]: true,
    "animation-paused": isCharacterExit,
    ltr: true,
  });

  const rabbitClassNames = classNames({
    "character-rabbit": true,
    [`position-abs bottom-0 right-0`]: true,
    "animation-paused": isCharacterExit,
    rtl: true,
  });

  /**
   * Props 선언
   */
  const bearCharProps = {
    animationDuration: 2600,
    animationDelay: 0,
  };

  const rabbitCharProps = {
    animationDuration: 2400,
    animationDelay: 0,
  };

  const bearAlt = "moving character(bear)";
  const rabbitAlt = "moving character(rabbit)";

  /**
   * 컴포넌트 렌더링
   */
  return (
    <Screen className={sectionClassNames}>
      <PositionProvider>
        {fallback}

        <CharacterAnimationOrigin className={bearWrapperClassName}>
          <CharacterPositioner
            className={commonPositionerClassNames}
            outroDirection="ttb"
          >
            <CharacterImg
              {...bearCharProps}
              className={bearClassNames}
              src={interfaceImages.loaderBearSmall}
              alt={bearAlt}
              srcSets={[
                {
                  srcSet: interfaceImages.loaderBearNormal,
                  media: `(min-width:${breakpointsMin.tablet}px)`,
                },
              ]}
            />
          </CharacterPositioner>
        </CharacterAnimationOrigin>

        <CharacterAnimationOrigin className={rabbitWrapperClassName}>
          <CharacterPositioner
            className={commonPositionerClassNames}
            outroDirection="btt"
          >
            <CharacterImg
              {...rabbitCharProps}
              className={rabbitClassNames}
              src={interfaceImages.loaderRabbitSmall}
              alt={rabbitAlt}
              srcSets={[
                {
                  srcSet: interfaceImages.loaderRabbitNormal,
                  media: `(min-width:${breakpointsMin.tablet}px)`,
                },
              ]}
            />
          </CharacterPositioner>
        </CharacterAnimationOrigin>

        {children}
      </PositionProvider>
    </Screen>
  );
}

export default LoaderScreen;

const Screen = styled.section`
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
      transform: rotate(200deg);
    }

    100% {
      transform: rotate(250deg);
    }
`;

const characterRotateLtr = keyframes`
    0% {
      transform: rotate(10deg);
    }

    100% {
      transform: rotate(40deg);
    }
`;

const characterPositionBtt = keyframes`
0% {
  transform: translate3d(0, 0px, 0);
} 100% {
  transform: translate3d(250px, -500px, 0);
}
`;

const characterPositionBttMax500 = keyframes`
0% {
  transform: translate3d(0, 0px, 0);
} 100% {
  transform: translate3d(125px, -250px, 0);
}
`;

const characterPositionTtb = keyframes`
0% {
  transform: translate3d(0, 0px, 0);
} 100% {
  transform: translate3d(-250px, 500px, 0);
}
`;

const characterPositionTtbMax500 = keyframes`
0% {
  transform: translate3d(0, 0px, 0);
} 100% {
  transform: translate3d(-125px, 250px, 0);
}
`;

const CharacterAnimationOrigin = styled.div`
  position: absolute;

  &.rabbit {
    top: -100px;
    right: -160px;

    ${resToMax(breakpointsMax.laptopL)} {
      top: -100px;
      right: -160px;
    }

    ${resToMax(breakpointsMax.tablet)} {
      top: -90px;
      right: -160px;
    }

    ${resToMax(breakpointsMax.mobile)} {
      top: -40px;
      right: -120px;
    }
  }

  &.bear {
    bottom: -80px;
    left: -130px;

    ${resToMax(breakpointsMax.laptopL)} {
      bottom: -80px;
      left: -130px;
    }

    ${resToMax(breakpointsMax.tablet)} {
      bottom: -120px;
      left: -160px;
    }

    ${resToMax(breakpointsMax.mobile)} {
      bottom: -80px;
      left: -140px;
    }
  }
`;

const CharacterPositioner = styled.div`
  ${(props) => {
    const { outroDirection } = props;

    return css`
      position: relative;
      width: 30px;
      height: 30px;

      transform-origin: center;

      ${outroDirection === "ttb" &&
      css`
        animation-name: ${characterPositionTtb};
      `}
      ${outroDirection === "btt" &&
      css`
        animation-name: ${characterPositionBtt};
      `}

      ${resToMax(breakpointsMax.mobile)} {
        ${outroDirection === "ttb" &&
        css`
          animation-name: ${characterPositionTtbMax500};
        `}

        ${outroDirection === "btt" &&
        css`
          animation-name: ${characterPositionBttMax500};
        `}
      }

      animation-duration: 1200ms;
      animation-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);

      animation-direction: alternate;
      animation-iteration-count: 1;
      animation-fill-mode: both;

      &.animation-paused {
        animation-play-state: paused;
      }
    `;
  }}
`;

const CharacterImg = styled(Picture)`
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

      &.animation-paused {
        animation-play-state: paused;
      }
    `;
  }}
`;
