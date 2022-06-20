import classNames from "classnames";
import styled, { css } from "styled-components";

/**
 * 자막 컴포넌트는 XState의 상태에 따라 적합한 자막을 렌더링합니다.
 */

function Subtitle({
  content,
  className,
  mainTextShadow,
  subTextShadow,
  ...restProps
}) {
  const paragraphClassNames = classNames({
    [`subtitle-paragraph`]: true,
  });

  return (
    <Paragraph
      mainTextShadow={mainTextShadow}
      subTextShadow={subTextShadow}
      className={paragraphClassNames}
      {...restProps}
    >
      {content}
    </Paragraph>
  );
}

export default Subtitle;

const Paragraph = styled.p`
  ${(props) => {
    const { mainTextShadow, subTextShadow } = props;

    return css`
      font-family: "UhBeenamsoyoung";
      margin: 0px;

      position: absolute;
      left: 50%;
      transform: translateX(-50%);

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
    `;
  }}
`;
