import { useFrame } from "@react-three/fiber";
import { Depth, LayerMaterial, Noise } from "lamina";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { sceneBackgrounds } from "../../lib/constants/backgrounds";
import {
  sceneBgPropTypes,
  transitionStatesPropTypes,
} from "./_utils/propTypes";
import { defaultSceneBackgrounds } from "./_utils/sceneConstants";

Background.propTypes = {
  states: transitionStatesPropTypes,
  sceneBackgrounds: sceneBgPropTypes,
};

Background.defaultProps = {
  states: [],
  sceneBackgrounds: defaultSceneBackgrounds,
};

function Background({ stageValue, states }) {
  /**
   * 색상 값에 접근하기 위한 Ref 선언
   */
  const depthRef = useRef(null);

  /**
   * 현재 색상에 대한 값과
   * Lerp에 사용할 Singleton Vector 선언
   */
  const { bottomColor, topColor } = colorSelector(sceneBackgrounds, stageValue);

  const [bColor, tColor] = useMemo(
    () => [new THREE.Color(bottomColor), new THREE.Color(topColor)],
    []
  );

  const colorVec = useMemo(() => new THREE.Color(), []);

  /**
   * 색상이 변경될 경우 lerp를 수행합니다.
   */
  useFrame(() => {
    bColor.getHex() !== bottomColor &&
      bColor.lerp(colorVec.set(bottomColor), 0.01);

    tColor.getHex() !== topColor && tColor.lerp(colorVec.set(topColor), 0.01);

    depthRef.current.colorA = tColor;
    depthRef.current.colorB = bColor;
  });

  /**
   * 배경 Object 렌더링
   */
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth
          ref={depthRef}
          colorB={bColor} // BottomColor
          colorA={tColor} // TopColor
          alpha={1}
          mode="normal"
          near={0}
          far={150}
          origin={[0, 100, -100]}
        />
        <Noise
          mapping="local"
          type="white"
          scale={1000}
          colorA="white"
          colorB="black"
          mode="subtract"
          alpha={0.01}
        />
      </LayerMaterial>
    </mesh>
  );
}

function colorSelector(sceneBackgrounds, stageState) {
  const { bottomColor, topColor } =
    sceneBackgrounds[stageState] ?? introBackgrounds;

  return {
    bottomColor,
    topColor,
  };
}

const introBackgrounds = {
  bottomColor: 0xe3cc94,
  topColor: 0xcde5df,
};

export default Background;
