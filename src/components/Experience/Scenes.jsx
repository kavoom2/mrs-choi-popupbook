import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import Background from "./Background";
import useObjectAnimation from "./hooks/useObjectAnimation";
import useTransitionState from "./hooks/useTransitionState";
import Scene01 from "./Scene_01";
import Scene02 from "./Scene_02";
import Scene03 from "./Scene_03";
import Scene04 from "./Scene_04";
import { pageTransitions } from "./transitionProps/pageTransitions";
import {
  initialTransitionState,
  meshKeys,
  sceneNames,
} from "./_utils/sceneConstants";
import { depthMaterialNames } from "./_utils/types";

function Scenes(props) {
  const { nodes, materials } = useGLTF("/static/models/glb/popup_book.glb");

  const depthMaterials = useMemo(
    () =>
      depthMaterialNames.reduce((acc, materialName) => {
        const material = materials[materialName];

        if (material)
          acc[materialName] = new THREE.MeshDepthMaterial({
            depthPacking: THREE.RGBADepthPacking,
            map: material.map,
            alphaTest: 0.5,
            opacity: 0,
          });

        return acc;
      }, {}),
    [materials]
  );

  const gltfs = useMemo(
    () =>
      sceneNames.reduce((acc, sceneName) => {
        const _nodes = propsSelector(nodes, meshKeys[sceneName].nodes);
        const _materials = propsSelector(
          materials,
          meshKeys[sceneName].materials
        );

        acc[sceneName] = {
          nodes: _nodes,
          materials: _materials,
        };

        return acc;
      }, {}),
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
        <group ref={scene1Ref}>
          <group position={[0, 0.2, 0.24]}>
            <Scene01
              transitionState={transitionStates[0]}
              nodes={gltfs.scene01.nodes}
              materials={gltfs.scene01.materials}
              depthMaterials={depthMaterials}
            />
          </group>
        </group>

        {/* Scene 02 */}
        <group ref={scene2Ref}>
          <group position={[0, 0.2, 0.08]}>
            <Scene02
              transitionState={transitionStates[1]}
              nodes={gltfs.scene02.nodes}
              materials={gltfs.scene02.materials}
              depthMaterials={depthMaterials}
            />
          </group>
        </group>

        {/* Scene 03 */}
        <group ref={scene3Ref}>
          <group position={[0, 0.2, -0.08]}>
            <Scene03
              transitionState={transitionStates[2]}
              nodes={gltfs.scene03.nodes}
              materials={gltfs.scene03.materials}
              depthMaterials={depthMaterials}
            />
          </group>
        </group>

        {/* Scene 04 */}
        <group ref={scene4Ref}>
          <group position={[0, 0.2, -0.24]}>
            <Scene04
              transitionState={transitionStates[3]}
              nodes={gltfs.scene04.nodes}
              materials={gltfs.scene04.materials}
              depthMaterials={depthMaterials}
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

// useGLTF.preload("/static/models/glb/popup_book.glb");

export default Scenes;
