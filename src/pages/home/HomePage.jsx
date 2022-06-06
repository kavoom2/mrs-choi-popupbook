import { Loader } from "@react-three/drei";
import React from "react";
import styled from "styled-components";
import Experience from "../../components/Experience";
import ExperienceLayout from "../../components/ExperienceLayout";
import Subtitle from "../../components/Subtitle/Subtitle";

function HomePage(props) {
  return (
    <Main>
      <Experience />
      <Subtitle />
      <ExperienceLayout></ExperienceLayout>
      <Loader initialState={(active) => false} />
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
