import GUI from "lil-gui";
import { useEffect, useRef, useState } from "react";

/**
 * WebGL Scene 디버깅 용도로 만들어진 커스텀 훅입니다.
 * 실제로 조작하며 Constant 값을 설정하기 위해 사용합니다.
 *
 * 적용 대상: Camera, Light, Mesh, Material, Scene State(custom hook)
 */

const themes = {
  scene01: {
    bottomColor: "#3eccaf",
    topColor: "#7dded2",
    contactShadowColor: "#3c9f8b",
  },
  scene02: {
    bottomColor: "#d1a22d",
    topColor: "#ffe9d2",
    contactShadowColor: "#ae8732",
  },
  scene03: {
    bottomColor: "#3b4a78",
    topColor: "#676f6b",
    contactShadowColor: "#171d4f",
  },
  scene04: {
    bottomColor: "#e6606e",
    topColor: "#cde5df",
    contactShadowColor: "#9f3c3c",
  },
};

const lights = {
  scene01: {
    ambientIntensity: 0.2,
    spotLightIntersity: 0.25,
  },
  scene02: {
    ambientIntensity: 0.2,
    spotLightIntersity: 0.25,
  },
  scene03: {
    ambientIntensity: 0.1,
    spotLightIntersity: 0.2,
  },
  scene04: {
    ambientIntensity: 0.2,
    spotLightIntersity: 0.25,
  },
};

const initialState = {
  background: {
    bottomColor: themes.scene04.bottomColor,
    topColor: themes.scene04.topColor,
    contactShadowColor: themes.scene04.contactShadowColor,
  },
  camera: {
    debug: false,
    x: 0,
    y: 1.5,
    z: 13,
    // zoom: 1.1,
    fov: 50,
  },
  orbit: {
    x: 0,
    y: 2.5,
    z: 0,
  },
};

// Add Page debugger and binding context
initialState.page = {
  currentPage: -1,
  navigateToNext: function () {
    if (this.page.currentPage > 4) return;

    if (window.navigateByNum) window.navigateByNum(++this.page.currentPage);
  }.bind(initialState),
  navigateToPrev: function () {
    if (this.page.currentPage < -1) return;

    if (window.navigateByNum) window.navigateByNum(--this.page.currentPage);
  }.bind(initialState),
  navigateByNum: function (pageIdx) {
    if (pageIdx < -1 || pageIdx > 4) return;

    if (window.navigateByNum) {
      window.navigateByNum(pageIdx);
    }
  },
};

//Zoom Configs
const zoomConfigs = {
  maxWidth: 1100,
  minWidth: 550,
  maxZoom: 1.1,
  minZoom: 0.55,
  calFuns: (width) => {
    return (
      (width - zoomConfigs.minWidth) *
        ((zoomConfigs.maxZoom - zoomConfigs.minZoom) /
          (zoomConfigs.maxWidth - zoomConfigs.minWidth)) +
      zoomConfigs.minZoom
    );
  },
};

function calZoom(width) {
  if (width >= zoomConfigs.maxWidth) return zoomConfigs.maxZoom;
  if (width <= zoomConfigs.minWidth) return zoomConfigs.minZoom;

  return zoomConfigs.calFuns(width);
}

function useControl() {
  const guiRef = useRef(null);
  const [state, setState] = useState(initialState);

  // * Zoom by resize
  useEffect(() => {
    const onResizeHandler = () => {
      const width = window.innerWidth;
      const nextZoom = calZoom(width);

      initialState.camera.zoom = nextZoom;
      setState(Object.assign({}, initialState));
    };

    onResizeHandler();

    window.addEventListener("resize", onResizeHandler);

    return () => window.removeEventListener("resize", onResizeHandler);
  }, []);

  // * Debugger
  useEffect(() => {
    const gui = new GUI();
    guiRef.current = gui;

    const onChangeHandler = () => setState(Object.assign({}, initialState));

    /**
     * Page Controller
     */
    const page = gui.addFolder("page");

    page
      .add(initialState.page, "currentPage")
      .min(-1)
      .max(4)
      .step(1)
      .onChange(() =>
        initialState.page.navigateByNum(initialState.page.currentPage)
      );
    page.add(initialState.page, "navigateToNext");
    page.add(initialState.page, "navigateToPrev");

    /**
     * Background
     */
    const background = gui.addFolder("background");

    background
      .addColor(initialState.background, "bottomColor")
      .onChange(onChangeHandler);
    background
      .addColor(initialState.background, "topColor")
      .onChange(onChangeHandler);
    background
      .addColor(initialState.background, "contactShadowColor")
      .onChange(onChangeHandler);

    /**
     * Camera
     */
    const camera = gui.addFolder("camera");

    camera.add(initialState.camera, "debug").onChange(onChangeHandler);

    camera
      .add(initialState.camera, "x")
      .min(-50)
      .max(50)
      .step(1)
      .onChange(onChangeHandler);
    camera
      .add(initialState.camera, "y")
      .min(-50)
      .max(50)
      .step(1)
      .onChange(onChangeHandler);
    camera
      .add(initialState.camera, "z")
      .min(-50)
      .max(50)
      .step(1)
      .onChange(onChangeHandler);
    // camera
    //   .add(initialState.camera, "zoom")
    //   .min(0)
    //   .max(20)
    //   .step(0.001)
    //   .onChange(onChangeHandler);

    /**
     * Orbit
     */
    const orbit = gui.addFolder("orbit");

    orbit
      .add(initialState.orbit, "x")
      .min(-100)
      .max(100)
      .step(1)
      .onChange(onChangeHandler);
    orbit
      .add(initialState.orbit, "y")
      .min(-100)
      .max(100)
      .step(1)
      .onChange(onChangeHandler);
    orbit
      .add(initialState.orbit, "z")
      .min(-100)
      .max(100)
      .step(1)
      .onChange(onChangeHandler);

    return () => guiRef.current.destroy();
  }, []);

  return state;
}

export default useControl;
