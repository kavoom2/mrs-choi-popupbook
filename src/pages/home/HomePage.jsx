import ExperienceInterface from "@components/ExperienceInterface";
import IntroLoader from "@components/IntroLoader/IntroLoader";
import Subtitles from "@components/Subtitles/Subtitles";
import { assetLoader, home } from "@lib/constants/stageMachineStates";
import { useSelector } from "@xstate/react";
import { lazy, Suspense, useContext } from "react";
import styled from "styled-components";
import {
  GlobalServiceContext,
  GlobalServiceProvider
} from "./GlobalServiceProvider";
import { stageValueSelector } from "./_utils/stateMachineUtils";

const Experience = lazy(() => import("@components/Experience"));

function HomePage(props) {
  return (
    <GlobalServiceProvider>
      <HomePageContextProvided />
    </GlobalServiceProvider>
  );
}

function HomePageContextProvided(props) {
  /**
   * XState State and Context
   */
  const globalService = useContext(GlobalServiceContext);

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
  const isLoaderRendered = stageValue === assetLoader || stageValue === home;

  return (
    <Main>
      {/* Gltf Model이 불러오기 전까지 빈 화면만 보이지 않도록 Lazy loading합니다. */}
      <Suspense fallback={null}>
        <Experience />
      </Suspense>

      <Subtitles />

      {isLoaderRendered && <IntroLoader />}

      <ExperienceInterface />
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
