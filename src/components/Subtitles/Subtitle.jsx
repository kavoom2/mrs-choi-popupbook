import { useActor } from "@xstate/react";
import classNames from "classnames";
import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { scene } from "../../lib/constants/stageMachineStates";
import { subtitles } from "../../lib/constants/subtitles";
import { GlobalServiceContext } from "../../pages/home/GlobalServiceProvider";

/**
 * 자막 컴포넌트는 XState의 상태에 따라 적합한 자막을 렌더링합니다.
 */

function Subtitle({
  content,
  visible = true,
  className,
  mainTextShadow,
  subTextShadow,
  ...restProps
}) {
  const globalService = useContext(GlobalServiceContext);
  const [state] = useActor(globalService.stageService);

  const { page, curIdx, maxSubtitles, isAnimating } = subtitleSelector(state);

  const sectionClassNames = classNames(
    {
      [`subtitle-section`]: true,
    },
    className
  );

  const responsiveClassName = classNames({
    [`subtitle-responsive-container`]: true,
  });

  const paragraphClassNames = classNames({
    [`subtitle-paragraph`]: true,
    [`entered`]: visible,
    [`exited`]: !visible,
  });

  /**
   * 자막 컴포넌트 렌더링
   * page가 유효하지 않으면 렌더링하지 않습니다.
   */
  if (page === -1) return null;

  /**
   * 페이지에 해당하는 자막 컨텐츠를 보여줍니다.
   */
  const subtitleContent = subtitles[page][curIdx];

  return (
    <Section {...restProps} className={sectionClassNames}>
      <ResponsiveContainer className={responsiveClassName}>
        <Paragraph
          key={`subtitle-page-${page}-content-${curIdx}`}
          mainTextShadow={mainTextShadow}
          subTextShadow={subTextShadow}
          className={paragraphClassNames}
        >
          {content}
        </Paragraph>
      </ResponsiveContainer>
    </Section>
  );
}

export default Subtitle;

function subtitleSelector(state) {
  const { page } = state["context"][scene]["book"];
  const { curIdx, maxSubtitles, isAnimating } =
    state["context"][scene]["subtitle"];

  return {
    page,
    curIdx,
    maxSubtitles,
    isAnimating,
  };
}

const Section = styled.section`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
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

const Paragraph = styled.p`
  ${(props) => {
    const { mainTextShadow, subTextShadow } = props;

    return css`
      font-family: "UhBeenamsoyoung";
      margin: 0px;

      width: 100%;
      max-height: 44.8px;

      font-size: 28px;
      line-height: 1.6;
      color: #ffffff;
      text-shadow: 0px 0px 16px ${mainTextShadow}, 0px 0px 24px ${subTextShadow},
        0px 0px 32px ${subTextShadow};

      text-align: center;
      word-break: keep-all;

      will-change: opacity;
      user-select: none;

      &.entering {
        opacity: 1;
        transition: 1000ms ease;
      }

      &.entered {
        opacity: 1;
      }

      &.exiting {
        opacity: 0;
        transition: 500ms ease;
      }

      &.exited {
        opacity: 0;
      }
    `;
  }}
`;
