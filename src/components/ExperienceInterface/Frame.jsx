import classNames from "classnames";
import { memo } from "react";
import styled, { css } from "styled-components";
import { interfaceImages } from "../../assets/images";

function Frame() {
  const wrapperClassNames = classNames({
    [`frame-wrapper`]: true,
  });

  const imageClassNames = classNames({
    [`frame-image`]: true,
  });

  const frameAlt = `interface-frame-image`;

  return (
    <FrameWrapper className={wrapperClassNames}>
      <BlankFiller flexOrder={1} />

      <BlankFiller flexOrder={3} />

      <Picture flexOrder={2} className={imageClassNames}>
        <source
          media="(min-width: 1280px)"
          srcSet={interfaceImages.frameDesktop1920}
          alt={frameAlt}
        />
        <source
          media="(min-width: 900px)"
          srcSet={interfaceImages.frameDesktop1080}
          alt={frameAlt}
        />
        <source
          media="(min-width: 600px)"
          srcSet={interfaceImages.frameMobile900}
          alt={frameAlt}
        />
        <img src={interfaceImages.frameMobile600} alt={frameAlt} />
      </Picture>
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

  @media (max-width: 599.98px) {
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

      @media (max-width: 599.98px) {
        transform: scaleY(1.1);
      }

      z-index: 1900;
    `;
  }}
`;

const Picture = styled.picture`
  ${(props) => {
    const { flexOrder } = props;

    return css`
      flex-grow: 0;
      flex-shrink: 0;
      ${flexOrder && `order: ${flexOrder};`}

      width: 100%;
      height: auto;

      @media (min-width: 600px) {
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
