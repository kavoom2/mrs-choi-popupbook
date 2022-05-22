import GUI from "lil-gui";
import { useEffect, useRef, useState } from "react";

/**
 * WebGL Scene 디버깅 용도로 만들어진 커스텀 훅입니다.
 * 실제로 조작하며 Constant 값을 설정하기 위해 사용합니다.
 *
 * 적용 대상: Camera, Light, Mesh, Material, Scene State(custom hook)
 */

const initialState = {};
initialState.page = {
  navigateToNext: function () {
    if (window.navigateToNext) window.navigateToNext();
  },
  navigateToPrev: function () {
    if (window.navigateToPrev) window.navigateToPrev();
  },
};

function usePopupDebugger() {
  const guiRef = useRef(null);
  const [state, setState] = useState(initialState);

  // * Debugger
  useEffect(() => {
    const gui = new GUI();
    guiRef.current = gui;

    /**
     * Popup Book Page Debugger
     */
    const page = gui.addFolder("page");

    page.add(initialState.page, "navigateToNext");
    page.add(initialState.page, "navigateToPrev");

    return () => guiRef.current.destroy();
  }, []);

  return state;
}

export default usePopupDebugger;
