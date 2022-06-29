import { interfaceImages } from "@assets/images";
import ControlButton from "@components/ExperienceInterface/ControlButton";
import { assetLoader, home } from "@lib/constants/stageMachineStates";
import { GlobalServiceContext } from "@pages/home/GlobalServiceProvider";
import { useProgress } from "@react-three/drei";
import { useActor } from "@xstate/react";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import LoaderScreen from "./LoaderScreen";

// TODO: Asset이 불러와 지기 전, 로딩 화면을 구성해야 합니다.
// 1. 전경 색상을 로딩 화면 색상과 동일하게 하여 빈 화면이 아니도록 판단하게 해야 합니다.
// 2. 로딩 상태 완료 이후 사용자가 Start를 조작하게 하여 Intro 진입 | 소리 출력을 유도합니다.
// 3. 로딩 페이지 UI 작업

function IntroLoader() {
  /**
   * WebGL Asset 로더
   */
  const { active, progress, errors, item, loaded, total } = useProgress();

  const isSuccess = loaded === total && errors?.length === 0;
  const isLoading = loaded < total && errors?.length === 0;
  const isError = errors?.length > 0;

  /**
   * XState
   */
  const globalService = useContext(GlobalServiceContext);

  const [stageState] = useActor(globalService.stageService);
  const { send } = globalService.stageService;

  const {
    isAssetLoaded: isAssetContextLoaded,
    isLoading: isAssetContextLoading,
    isError: isAssetContextError,
  } = assetLoaderContextSelector(stageState);

  const isAssetLoaderOrHome = isAssetLoaderOrHomeSelector(stageState);

  /**
   * 함수 선언
   */
  const playApp = (event) => {
    // XState
    if (isSuccess) {
    }
  };

  const retryApp = (event) => {
    if (isError) window.location.reload();
  };

  /**
   * 변수 선언
   */

  const isPlayButtonHidden = !isSuccess;
  const isRetryHidden = !isError;

  /**
   * Side Effect
   */
  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  /**
   * 노드 선언 및 컴포넌트 렌더링
   */
  const loadingRenderNode = (
    <span className="content">
      우리의 <span className="dear">예쁜 추억</span>을{" "}
      <span className="percent">{progress}%</span>만큼 불러왔어요!
    </span>
  );

  return (
    <LoaderScreen>
      <FallbackBackgrounds />
      <ProgressTextContainer>
        {!errors && loadingRenderNode}
      </ProgressTextContainer>
      <ButtonWrapper>
        <ControlButton
          imagePath={interfaceImages.buttonArrowLtr}
          imageAlt="Play game"
          onClick={playApp}
          visible={!isPlayButtonHidden}
        />
      </ButtonWrapper>

      <ButtonWrapper>
        <ControlButton
          imagePath={interfaceImages.buttonArrowLtr}
          imageAlt="Retry "
          onClick={retryApp}
          visible={!isRetryHidden}
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
`;

function assetLoaderContextSelector(state) {
  const { isAssetLoaded, isLoading, isError } = state["context"][assetLoader];

  return {
    isAssetLoaded,
    isLoading,
    isError,
  };
}

function isAssetLoaderOrHomeSelector(state) {
  return state.matches(assetLoader) || state.matches(home);
}
