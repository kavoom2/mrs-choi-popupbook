import classNames from "classnames";
import React from "react";
import styled, { css } from "styled-components";

function Subtitle({ content, visible = true, className, ...restProps }) {
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

  const { mainTextShadow, subTextShadow } = {
    mainTextShadow: "#00ffcc",
    subTextShadow: "#036462",
  };

  return (
    <Section {...restProps} className={sectionClassNames}>
      <ResponsiveContainer className={responsiveClassName}>
        <Paragraph
          mainTextShadow={mainTextShadow}
          subTextShadow={subTextShadow}
          className={paragraphClassNames}
        >
          토순이와 곰돌이는 서로 친해지고 싶었어요.
        </Paragraph>
      </ResponsiveContainer>
    </Section>
  );
}

export default Subtitle;

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
