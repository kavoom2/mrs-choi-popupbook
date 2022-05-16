import { Loader } from "@react-three/drei";
import React from "react";
import Experience from "../../components/Experience";

function HomePage(props) {
  return (
    <>
      <Experience />
      <Loader />
    </>
  );
}

export default HomePage;
