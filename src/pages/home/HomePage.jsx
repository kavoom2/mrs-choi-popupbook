import ExperienceInterface from "@components/ExperienceInterface";
import IntroLoader from "@components/IntroLoader/IntroLoader";
import Subtitles from "@components/Subtitles/Subtitles";
import { lazy, Suspense } from "react";
import styled from "styled-components";
import { GlobalServiceProvider } from "./GlobalServiceProvider";

const Experience = lazy(() => import("@components/Experience"));

function HomePage(props) {
  return (
    <GlobalServiceProvider>
      <Main>
        {/* Gltf Model이 불러오기 전까지 빈 화면만 보이지 않도록 Lazy loading합니다. */}
        <Suspense fallback={null}>
          <Experience />
        </Suspense>

        <Subtitles />

        <IntroLoader />

        <ExperienceInterface />
      </Main>
    </GlobalServiceProvider>
  );
}

export default HomePage;

const Main = styled.main`
  position: relative;

  width: 100%;
  height: 100%;

  overflow: hidden;
`;
