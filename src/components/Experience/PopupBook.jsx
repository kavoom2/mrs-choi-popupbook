import {
  bookPositionTransitions,
  bookRotationTranstitions,
  pageRotationTransitions,
} from "@lib/constants/bookTransitions";
import { pageDepthMaterialNames } from "@lib/constants/materials";
import { materialTransitions } from "@lib/constants/materialTransitions";
import { pageMeshes } from "@lib/constants/meshs";
import { sceneTransitions } from "@lib/constants/sceneTransitions";
import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import useObjectAnimation from "./hooks/useObjectAnimation";
import { pageList } from "./_utils/pageList";
import {
  getPopupBookAnimationStates,
  popupBookPropsSelector,
} from "./_utils/popupBookUtils";

function PopupBook({ isStageScene, page, maxPages, stageValue }) {
  const animationStates = getPopupBookAnimationStates(
    isStageScene,
    page,
    maxPages
  );

  /**
   * Node and Materials
   */
  const { nodes, materials } = useGLTF("/static/models/glb/popup_book.glb");

  const depthMaterials = useMemo(
    () =>
      pageDepthMaterialNames.reduce((acc, materialName) => {
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
      pageList.reduce((acc, { pageKey }) => {
        const _nodes = popupBookPropsSelector(nodes, pageMeshes[pageKey].nodes);
        const _materials = popupBookPropsSelector(
          materials,
          pageMeshes[pageKey].materials
        );

        acc[pageKey] = {
          nodes: _nodes,
          materials: _materials,
        };

        return acc;
      }, {}),
    [nodes, materials]
  );

  /**
   * Side Effect: (Main) Book Animation
   */
  const bookGroupPositionRef = useRef(null);
  const bookGroupRotationRef = useRef(null);

  useObjectAnimation(bookGroupPositionRef, stageValue, bookPositionTransitions);
  useObjectAnimation(
    bookGroupRotationRef,
    stageValue,
    bookRotationTranstitions
  );

  /**
   * Side Effect: (Inner) PopupBook Animation
   */
  const page1RotationRef = useRef(null);
  const page2RotationRef = useRef(null);
  const page3RotationRef = useRef(null);
  const page4RotationRef = useRef(null);

  const pageRotationRefs = [
    page1RotationRef,
    page2RotationRef,
    page3RotationRef,
    page4RotationRef,
  ];

  useObjectAnimation(
    page1RotationRef,
    animationStates[0],
    pageRotationTransitions
  );
  useObjectAnimation(
    page2RotationRef,
    animationStates[1],
    pageRotationTransitions
  );
  useObjectAnimation(
    page3RotationRef,
    animationStates[2],
    pageRotationTransitions
  );
  useObjectAnimation(
    page4RotationRef,
    animationStates[3],
    pageRotationTransitions
  );

  /**
   * 페이지 렌더링
   */
  const renderPageNode = pageList.map((item, idx) => (
    <item.AxisMesh key={item.uid} pageRotationRef={pageRotationRefs[idx]}>
      <item.Mesh
        pageState={animationStates[idx]}
        nodes={gltfs[item.pageKey]["nodes"]}
        materials={gltfs[item.pageKey]["materials"]}
        depthMaterials={depthMaterials}
        meshTransitionProps={sceneTransitions[item.pageKey]}
        materialTransitionProps={materialTransitions[item.pageKey]}
      />
    </item.AxisMesh>
  ));

  return (
    <group ref={bookGroupRotationRef}>
      <group ref={bookGroupPositionRef}>{renderPageNode}</group>
    </group>
  );
}

useGLTF.preload("/static/models/glb/popup_book.glb");

export default PopupBook;
