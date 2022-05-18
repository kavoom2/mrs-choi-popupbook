import { useEffect, useRef } from "react";
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
            <Scene01 transitionState={transitionStates[0]} />
          </group>
        </group>

        {/* Scene 02 */}
        <group ref={scene2Ref} rotation={[(Math.PI * 0) / 2, 0, 0]}>
          <group position={[0, 0.2, 0.08]}>
            <Scene02 transitionState={transitionStates[1]} />
          </group>
        </group>

        {/* Scene 03 */}
        <group ref={scene3Ref} rotation={[(Math.PI * 0) / 2, 0, 0]}>
          <group position={[0, 0.2, -0.08]}>
            <Scene03 transitionState={transitionStates[2]} />
          </group>
        </group>

        {/* Scene 04 */}
        <group ref={scene4Ref} rotation={[(Math.PI * 0) / 2, 0, 0]}>
          <group position={[0, 0.2, -0.24]}>
            <Scene04 transitionState={transitionStates[3]} />
          </group>
        </group>
      </group>
    </>
  );
}

export default Scenes;
