import { interfaceImages } from "@assets/images";
import {
  breakpointsMax,
  breakpointsMin,
  resToMax,
  resToMin,
} from "@components/@design-language";
import PictureOrigin from "@components/Picture";
import { useImagePreload } from "@hooks/sideEffects";
import classNames from "classnames";
import { memo } from "react";
import styled, { css } from "styled-components";

const preloadImages = [
  interfaceImages.frameDesktop1080,
  interfaceImages.frameDesktop1920,
  interfaceImages.frameMobile600,
  interfaceImages.frameMobile900,
];

function Frame() {
  /**
   * 클래스 이름 선언
   */
  const wrapperClassNames = classNames({
    [`frame-section`]: true,
  });

  const imageClassNames = classNames({
    [`frame-image`]: true,
  });

  const frameAlt = `interface-frame-image`;

  /**
   * Side effect
   */
  useImagePreload(preloadImages);

  /**
   * 노드 선언 및 컴포넌트 렌더링
   */
  return (
    <FrameWrapper className={wrapperClassNames}>
      <BlankFiller flexOrder={1} />

      <BlankFiller flexOrder={3} />

      <Picture
        flexOrder={2}
        className={imageClassNames}
        src={interfaceImages.frameMobile600}
        alt={frameAlt}
        srcSets={[
          {
            srcSet: interfaceImages.frameDesktop1920,
            media: `(min-width: ${breakpointsMin.desktop}px)`,
          },
          {
            srcSet: interfaceImages.frameDesktop1080,
            media: `(min-width: ${breakpointsMin.laptop}px)`,
          },
          {
            srcSet: interfaceImages.frameMobile900,
            media: `(min-width: ${breakpointsMin.tablet}px)`,
          },
        ]}
      />
    </FrameWrapper>
  );
}

export default memo(Frame);

const FrameWrapper = styled.section`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  overflow: hidden;

  /* 이미지 프레임 외의 영역은 색상으로 덮습니다. */

  display: flex;
  align-items: center;
  justify-content: center;

  user-select: none;
  pointer-events: none;

  ${resToMax(breakpointsMax.mobile)} {
    flex-direction: column;
  }
`;

const BlankFiller = styled.div`
  ${(props) => {
    const { flexOrder } = props;

    return css`
      /* 여백 색상을 채우기 위해 사용합니다. */
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0px;
      ${flexOrder && `order: ${flexOrder};`}

      width: 100%;
      height: 100%;

      background-color: #ebcd7b;

      transform-origin: center;
      transform: scaleX(1.1);

      ${resToMax(breakpointsMax.mobile)} {
        transform: scaleY(1.1);
      }

      z-index: 1900;
    `;
  }}
`;

const Picture = styled(PictureOrigin)`
  ${(props) => {
    const { flexOrder } = props;

    return css`
      flex-grow: 0;
      flex-shrink: 0;
      ${flexOrder && `order: ${flexOrder};`}

      width: 100%;
      height: auto;

      ${resToMin(breakpointsMin.tablet)} {
        height: 100%;
        width: auto;

        object-fit: contain;
        object-position: center center;
      }

      * {
        width: 100%;
        height: 100%;
      }

      z-index: 1950;
    `;
  }}
`;
