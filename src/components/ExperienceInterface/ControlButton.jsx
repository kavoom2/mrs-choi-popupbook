import classNames from "classnames";
import styled from "styled-components";

function ControlButton({
  imagePath,
  imageAlt,
  onClick,
  className,
  visible = true,
  disabled = false,
  loading = false,
  ...restProps
}) {
  /**
   * 변수 선언부
   */
  const mergedDisabled = disabled || !visible || loading;

  /**
   * 내부 함수 선언부
   */
  const clickButton = mergedDisabled ? noop : onClick;

  /**
   * 클래스 명 선언부
   */
  const buttonClassNames = classNames(
    {
      [`interface-button`]: true,
      [`visible`]: visible,
      [`hidden`]: !visible,
      [`loading`]: loading,
      [`disabled`]: disabled,
    },
    className
  );

  /**
   * 컴포넌트 렌더링
   */
  return (
    <Button
      {...restProps}
      onClick={clickButton}
      className={buttonClassNames}
      disabled={mergedDisabled}
    >
      <img src={imagePath} alt={imageAlt} loading="lazy" />
    </Button>
  );
}

function noop(event) {
  event.preventDefault();
}

export default ControlButton;

const Button = styled.button`
  width: 100px;
  height: 100px;

  padding: 0;

  outline: none;
  border: none;
  background-color: transparent;

  outline: none;
  border: none;
  user-select: none;

  img {
    width: 100%;
    height: 100%;
  }

  cursor: pointer;

  @media (max-width: 899.98px) {
    width: 90px;
    height: 90px;
  }

  @media (max-width: 599.98px) {
    width: 70px;
    height: 70px;
  }

  /* 애니메이션 스타일 정의 */
  transform: scale(0.0001);
  transition: 500ms ease, filter 200ms ease;

  opacity: 1;
  visibility: visible;
  filter: drop-shadow(0px 2px 3px rgba(30, 50, 0, 0.65));

  /* 버튼 상태 정의 */
  @media (hover: hover) and (pointer: fine) {
    /* Mobile device hover issue: https://stackoverflow.com/questions/23885255/how-to-remove-ignore-hover-css-style-on-touch-devices */
    &:hover:not(a.loading):not(.disabled) {
      transform: translateY(-5px);
      transition: 200ms ease;
      filter: drop-shadow(0px 4px 5px rgba(30, 50, 0, 0.5));
    }
  }

  &.loading {
    opacity: 0.9;
    transform: scale(0.9);
    filter: drop-shadow(0px 2px 3px rgba(30, 50, 0, 0.65)) contrast(0.9);
    cursor: default;
  }

  &.disabled {
    filter: drop-shadow(0px 2px 3px rgba(30, 50, 0, 0.65)) contrast(0.8);
    cursor: not-allowed;
  }

  &.visible {
    transform: scale(1);
  }

  &.visible:not(:hover) {
    transition: transform 300ms cubic-bezier(0.54, 1.66, 0.81, 1);
  }

  &.hidden {
    transform: scale(0.0001);
    transition: transform 300ms cubic-bezier(0.36, 0, 0.66, -0.56);

    user-select: none;
    pointer-events: none;
    touch-action: none;
  }
`;
