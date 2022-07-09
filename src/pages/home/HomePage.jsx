import AssetLoader from "@components/AssetLoader";
import ExperienceInterface from "@components/ExperienceInterface";
import Outro from "@components/Outro";
import Subtitles from "@components/Subtitles/Subtitles";
import {
  assetLoader,
  home,
  intro,
  outro,
  scene,
} from "@lib/constants/stageMachineStates";
import { useSelector } from "@xstate/react";
import { Fragment, lazy, Suspense, useContext } from "react";
import styled from "styled-components";
import { AuidoContextProvider } from "./AudioContextProvider";
import {
  GlobalServiceContext,
  GlobalServiceProvider,
} from "./GlobalServiceProvider";
import Head from "./Head";
import { stageValueSelector } from "./_utils/stateMachineUtils";

const Experience = lazy(() => import("@components/Experience"));

function HomePage(props) {
  return (
    <Fragment>
      <Head />

      <GlobalServiceProvider>
        <HomePageGlobalServiceConsumer />
      </GlobalServiceProvider>
    </Fragment>
  );
}

function HomePageGlobalServiceConsumer(props) {
  /**
   * XState State and Context
   */
  const globalService = useContext(GlobalServiceContext);
  const stageService = globalService.stageService;

  /**
   * 불필요한 Rerender가 발생하지 않도록, XState useSelector를 사용해야 합니다.
   */
  const stageValue = useSelector(
    globalService.stageService,
    stageValueSelector
  );

  /**
   * 변수 선언
   */
  const isSubtitleRendered =
    stageValue === intro || stageValue === scene || stageValue === outro;

  const isLoaderRendered = stageValue === assetLoader || stageValue === home;

  const isOutroRendered = stageValue === outro;

  /**
   * 노드 선언 및 페이지 컴포넌트 렌더링
   */
  return (
    <Main>
      {/* Gltf Model이 불러오기 전까지 빈 화면만 보이지 않도록 Lazy loading합니다. */}
      <Suspense fallback={null}>
        <Experience stageService={stageService} />
      </Suspense>

      <AuidoContextProvider>
        {isSubtitleRendered && <Subtitles stageService={stageService} />}
        {isLoaderRendered && <AssetLoader stageService={stageService} />}
        {isOutroRendered && <Outro stageService={stageService} />}

        <ExperienceInterface stageService={stageService} />
      </AuidoContextProvider>
    </Main>
  );
}

export default HomePage;

const Main = styled.main`
  position: relative;

  width: 100%;
  height: 100%;

  overflow: hidden;
`;
