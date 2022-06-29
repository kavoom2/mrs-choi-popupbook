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
      color: #ffffff;
      text-shadow: 0px 0px 14px ${mainTextShadow}, 0px 0px 24px ${subTextShadow};
    `;
  }}
`;
