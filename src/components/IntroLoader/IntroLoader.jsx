import { interfaceImages } from "@assets/images";
import ControlButton from "@components/ExperienceInterface/ControlButton";
import {
  PLAY_APP,
  SUCCEED_ASSET_LOAD,
} from "@lib/constants/stateMachineActions";
import { GlobalServiceContext } from "@pages/home/GlobalServiceProvider";
import { useProgress } from "@react-three/drei";
import { useSelector } from "@xstate/react";
import { useContext } from "react";
import styled from "styled-components";
import LoaderScreen from "./LoaderScreen";

import classNames from "classnames";
import { useEffect } from "react";
import {
  assetLoaderContextSelector,
  homeContextSelector,
} from "./_utils/stateMachineUtils";

// TODO: Asset이 불러와 지기 전, 로딩 화면을 구성해야 합니다.
// 1. 전경 색상을 로딩 화면 색상과 동일하게 하여 빈 화면이 아니도록 판단하게 해야 합니다.
// 2. 로딩 상태 완료 이후 사용자가 Start를 조작하게 하여 Intro 진입 | 소리 출력을 유도합니다.
// 3. 로딩 페이지 UI 작업

function IntroLoader() {
  /**
   * WebGL Asset Loader
   */
  const { progress, errors, loaded, total } = useProgress();

  const isSuccess = loaded === total && errors?.length === 0 && total > 0;
  const isLoading = loaded < total && errors?.length === 0 && total > 0;

  /**
   * XState
   */
  const globalService = useContext(GlobalServiceContext);

  const { send } = globalService.stageService;

  const isAssetLoaded = useSelector(
    globalService.stageService,
    assetLoaderContextSelector
  );

  const home = useSelector(globalService.stageService, homeContextSelector);

  const {
    isAnimating: isHomeExitAnimating,
    isAnimationEnd: isHomeExitAnimationEnd,
  } = home;

  /**
   * 내부 함수 선언
   */
  const playApp = (event) => {
    if (isSuccess && !isHomeExitAnimating) send(PLAY_APP);
  };

  /**
   * 변수 선언
   */
  const isCharacterIdle = !(isHomeExitAnimating || isHomeExitAnimationEnd);
  const isCharacterExit = isHomeExitAnimating || isHomeExitAnimationEnd;
  const isUiFaded = isHomeExitAnimating || isHomeExitAnimationEnd;

  const isPlayButtonHidden = !isSuccess || isUiFaded;

  /**
   * 클래스 명 선언
   */
  const fallbackBgClassNames = classNames({
    "loader-fallback-background": true,
    hidden: isUiFaded,
  });

  const progressTextClassNames = classNames({
    "loader-progress-text": true,
    hidden: isUiFaded,
  });

  /**
   * Side Effect
   */
  useEffect(() => {
    if (isSuccess && !isAssetLoaded) send(SUCCEED_ASSET_LOAD);
    // eslint-disable-next-line
  }, [isSuccess]);

  /**
   * 노드 선언 및 컴포넌트 렌더링
   */
  const loadingRenderNode = (
    <span className="content">
      우리의 <span className="dear">예쁜 추억</span>을{" "}
      <span className="percent">{parseInt(progress, 10)}%</span>만큼 불러왔어요!
    </span>
  );

  return (
    <LoaderScreen
      isCharacterIdle={isCharacterIdle}
      isCharacterExit={isCharacterExit}
    >
      <FallbackBackgrounds />

      <ProgressTextContainer>
        {(isLoading || isSuccess) && loadingRenderNode}
      </ProgressTextContainer>

      <ButtonWrapper>
        {/* // TODO: 기능에 적합한 버튼 asset을 제작해야 합니다. */}
        {/* 또는, 필요에 맞게 사용합니다. */}
        <ControlButton
          imagePath={interfaceImages.buttonArrowLtr}
          imageAlt="Play game"
          onClick={playApp}
          visible={!isPlayButtonHidden}
        />
      </ButtonWrapper>
    </LoaderScreen>
  );
}

export default IntroLoader;

const FallbackBackgrounds = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transform-origin: center center;
  transform: scale(1.2);

  background-color: #d6d2bc;
`;

const ProgressTextContainer = styled.div`
  font-family: "UhBeenamsoyoung";

  width: 90%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  word-break: keep-all;
  text-align: center;

  .content {
    font-size: 40px;
    line-height: 1.6;
    color: #d2ab5b;

    .dear {
      color: #d66d63;
    }

    .percent {
      color: #8dc557;
    }
  }

  @media (max-width: 899.98px) {
    .content {
      font-size: 30px;
    }
  }

  @media (max-width: 599.98px) {
    .content {
      font-size: 20px;
    }
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 2000;
`;
