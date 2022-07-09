import { interfaceImages } from "@assets/images";
import ControlButton from "@components/ExperienceInterface/ControlButton";
import {
  PLAY_APP,
  SUCCEED_ASSET_LOAD,
} from "@lib/constants/stateMachineActions";
import { useProgress } from "@react-three/drei";
import { useSelector } from "@xstate/react";
import { useContext } from "react";
import styled from "styled-components";
import LoaderScreen from "./LoaderScreen";

import { breakpointsMax, resToMax } from "@components/@design-language";
import { AudioContext } from "@pages/home/AudioContextProvider";
import classNames from "classnames";
import { useEffect } from "react";
import {
  assetLoaderContextSelector,
  homeContextSelector,
} from "./_utils/stateMachineUtils";

function AssetLoader({ stageService }) {
  /**
   * WebGL Asset Loader
   */
  const { progress, errors, loaded, total } = useProgress();
  const isSuccess = loaded === total && errors?.length === 0 && total > 0;

  /**
   * XState
   */

  const { send } = stageService;

  const isAssetLoaded = useSelector(stageService, assetLoaderContextSelector);

  const home = useSelector(stageService, homeContextSelector);

  const {
    isAnimating: isHomeExitAnimating,
    isAnimationEnd: isHomeExitAnimationEnd,
  } = home;

  /**
   * Audio Context
   */
  const { controls, state: audioState } = useContext(AudioContext);

  /**
   * 내부 함수 선언
   */
  const playApp = (event) => {
    if (isSuccess && !isHomeExitAnimating) {
      send(PLAY_APP);

      // 약간의 딜레이를 음악을 주면서 시작합니다.
      if (audioState.paused) {
        setTimeout(() => {
          controls.play();
        }, 750);
      }
    }
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
      fallback={<FallbackBackgrounds className={fallbackBgClassNames} />}
    >
      <Contents>
        <ProgressTextContainer className={progressTextClassNames}>
          {loadingRenderNode}
        </ProgressTextContainer>

        <ControlButton
          imagePath={interfaceImages.buttonStart}
          imageAlt="Play game"
          onClick={playApp}
          visible={!isPlayButtonHidden}
        />
      </Contents>
    </LoaderScreen>
  );
}

export default AssetLoader;

const FallbackBackgrounds = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transform-origin: center center;
  transform: scale(1.2);

  background-color: #d6d2bc;

  transition: opacity 800ms ease, visibility 800ms ease;

  &.hidden {
    visibility: hidden;
    opacity: 0;
  }
`;

const Contents = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  z-index: 1;

  > :last-child {
    margin-top: 32px;
  }

  ${resToMax(breakpointsMax.tablet)} {
    > :last-child {
      margin-top: 20px;
    }
  }

  ${resToMax(breakpointsMax.mobile)} {
    > :last-child {
    }
  }
`;

const ProgressTextContainer = styled.div`
  font-family: "UhBeenamsoyoung";

  width: 90%;

  word-break: keep-all;
  text-align: center;

  .content {
    font-size: 60px;
    line-height: 1.6;
    color: #d2ab5b;

    .dear {
      color: #d66d63;
    }

    .percent {
      color: #8dc557;
    }
  }

  ${resToMax(breakpointsMax.desktopL)} {
    .content {
      font-size: 36px;
    }
  }

  ${resToMax(breakpointsMax.tablet)} {
    .content {
      font-size: 30px;
    }
  }

  ${resToMax(breakpointsMax.mobile)} {
    .content {
      font-size: 20px;
    }
  }

  transition: opacity 400ms ease, visibility 400ms ease;

  &.hidden {
    visibility: hidden;
    opacity: 0;
  }
`;
