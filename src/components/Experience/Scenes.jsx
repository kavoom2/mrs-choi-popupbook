import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import Background from "./Background";
import useObjectAnimation from "./hooks/useObjectAnimation";
import useTransitionState from "./hooks/useTransitionState";
import Scene01 from "./Scene_01";
import Scene02 from "./Scene_02";
import Scene03 from "./Scene_03";
import Scene04 from "./Scene_04";
import { pageTransitions } from "./transitionProps/pageTransitions";
import { initialTransitionState } from "./_utils/sceneConstants";

function Scenes(props) {
  const { nodes, materials } = useGLTF("/static/models/glb/popup_book.glb");

  const gltf01 = useMemo(
    () => ({
      nodes: propsSelector(nodes, meshKeys.scene01.nodes),
      materials: propsSelector(materials, meshKeys.scene01.materials),
    }),
    [nodes, materials]
  );

  const gltf02 = useMemo(
    () => ({
      nodes: propsSelector(nodes, meshKeys.scene02.nodes),
      materials: propsSelector(materials, meshKeys.scene02.materials),
    }),
    [nodes, materials]
  );

  const gltf03 = useMemo(
    () => ({
      nodes: propsSelector(nodes, meshKeys.scene03.nodes),
      materials: propsSelector(materials, meshKeys.scene03.materials),
    }),
    [nodes, materials]
  );
  const gltf04 = useMemo(
    () => ({
      nodes: propsSelector(nodes, meshKeys.scene04.nodes),
      materials: propsSelector(materials, meshKeys.scene04.materials),
    }),
    [nodes, materials]
  );

  const [
    transitionStates,
    { reset, navigatePageByNum, navigateToNextPage, navigateToPrevPage },
  ] = useTransitionState(initialTransitionState);

  const scene1Ref = useRef(null);
  const scene2Ref = useRef(null);
  const scene3Ref = useRef(null);
  const scene4Ref = useRef(null);

  useObjectAnimation(scene1Ref, transitionStates[0], pageTransitions);
  useObjectAnimation(scene2Ref, transitionStates[1], pageTransitions);
  useObjectAnimation(scene3Ref, transitionStates[2], pageTransitions);
  useObjectAnimation(scene4Ref, transitionStates[3], pageTransitions);

  useEffect(() => {
    window.reset = reset;
    window.navigateByNum = navigatePageByNum;
    window.navigateToNext = navigateToNextPage;
    window.navigateToPrev = navigateToPrevPage;
  }, [transitionStates]);

  return (
    <>
      {/* Background */}
      <Background states={transitionStates} />

      {/* Popup Objects (Each page) */}
      <group>
        {/* Scene 01 */}
        <group ref={scene1Ref} rotation={[(Math.PI * 0) / 2, 0, 0]}>
          <group position={[0, 0.2, 0.24]}>
            <Scene01
              transitionState={transitionStates[0]}
              nodes={gltf01.nodes}
              materials={gltf01.materials}
            />
          </group>
        </group>

        {/* Scene 02 */}
        <group ref={scene2Ref} rotation={[(Math.PI * 0) / 2, 0, 0]}>
          <group position={[0, 0.2, 0.08]}>
            <Scene02
              transitionState={transitionStates[1]}
              nodes={gltf02.nodes}
              materials={gltf02.materials}
            />
          </group>
        </group>

        {/* Scene 03 */}
        <group ref={scene3Ref} rotation={[(Math.PI * 0) / 2, 0, 0]}>
          <group position={[0, 0.2, -0.08]}>
            <Scene03
              transitionState={transitionStates[2]}
              nodes={gltf03.nodes}
              materials={gltf03.materials}
            />
          </group>
        </group>

        {/* Scene 04 */}
        <group ref={scene4Ref} rotation={[(Math.PI * 0) / 2, 0, 0]}>
          <group position={[0, 0.2, -0.24]}>
            <Scene04
              transitionState={transitionStates[3]}
              nodes={gltf04.nodes}
              materials={gltf04.materials}
            />
          </group>
        </group>
      </group>
    </>
  );
}

function propsSelector(object, keys = []) {
  const selectedProps = {};

  keys.forEach((key) => {
    if (object[key]) selectedProps[key] = object[key];
  });

  return selectedProps;
}

const meshKeys = {
  scene01: {
    nodes: ["ceil_01", "floor_01", "front_01", "main_01", "back_01"],
    materials: [
      "content_back",
      "sheet_ceil",
      "sheet_floor",
      "content_front",
      "content_main",
    ],
  },
  scene02: {
    nodes: [
      "ceil_02",
      "floor_02",
      "front_02",
      "main_02",
      "ceil_stripetent",
      "ceil_stripetent_tail",
    ],
    materials: [
      "sheet_ceil_02",
      "sheet_floor_02",
      "content_front",
      "content_main",
      "ceil_stripetent",
      "ceil_stripetent_tail",
    ],
  },
  scene03: {
    nodes: ["ceil_03", "floor_03", "front_03", "main_03"],
    materials: [
      "sheet_ceil_03",
      "sheet_floor_03",
      "content_front",
      "content_main",
    ],
  },
  scene04: {
    nodes: ["ceil_04", "floor_04", "front_04", "main_04", "back_04"],
    materials: [
      "content_back",
      "sheet_ceil_04",
      "sheet_floor_04",
      "content_front",
      "content_main",
    ],
  },
};

export default Scenes;
