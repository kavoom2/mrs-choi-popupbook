import { Loader } from "@react-three/drei";
import styled from "styled-components";
import Experience from "../../components/Experience";
import ExperienceInterface from "../../components/ExperienceInterface";
import Subtitles from "../../components/Subtitles/Subtitles";
import { GlobalServiceProvider } from "./GlobalServiceProvider";

function HomePage(props) {
  return (
    <GlobalServiceProvider>
      <Main>
        <Experience />
        <Subtitles />
        <ExperienceInterface />
        <Loader initialState={(active) => false} />
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
