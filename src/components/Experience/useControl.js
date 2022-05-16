import GUI from "lil-gui";
import { useEffect, useRef, useState } from "react";

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

const initalState = {
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
  const [state, setState] = useState(initalState);

  // * Zoom by resize
  useEffect(() => {
    const onResizeHandler = () => {
      const width = window.innerWidth;
      const nextZoom = calZoom(width);

      initalState.camera.zoom = nextZoom;
      setState(Object.assign({}, initalState));
    };

    onResizeHandler();

    window.addEventListener("resize", onResizeHandler);

    return () => window.removeEventListener("resize", onResizeHandler);
  }, []);

  // * Debugger
  useEffect(() => {
    const gui = new GUI();
    guiRef.current = gui;

    const onChangeHandler = () => setState(Object.assign({}, initalState));

    /**
     * Background
     */
    const background = gui.addFolder("background");

    background
      .addColor(initalState.background, "bottomColor")
      .onChange(onChangeHandler);
    background
      .addColor(initalState.background, "topColor")
      .onChange(onChangeHandler);
    background
      .addColor(initalState.background, "contactShadowColor")
      .onChange(onChangeHandler);

    /**
     * Camera
     */
    const camera = gui.addFolder("camera");

    camera.add(initalState.camera, "debug").onChange(onChangeHandler);

    camera
      .add(initalState.camera, "x")
      .min(-50)
      .max(50)
      .step(1)
      .onChange(onChangeHandler);
    camera
      .add(initalState.camera, "y")
      .min(-50)
      .max(50)
      .step(1)
      .onChange(onChangeHandler);
    camera
      .add(initalState.camera, "z")
      .min(-50)
      .max(50)
      .step(1)
      .onChange(onChangeHandler);
    // camera
    //   .add(initalState.camera, "zoom")
    //   .min(0)
    //   .max(20)
    //   .step(0.001)
    //   .onChange(onChangeHandler);

    /**
     * Orbit
     */
    const orbit = gui.addFolder("orbit");

    orbit
      .add(initalState.orbit, "x")
      .min(-100)
      .max(100)
      .step(1)
      .onChange(onChangeHandler);
    orbit
      .add(initalState.orbit, "y")
      .min(-100)
      .max(100)
      .step(1)
      .onChange(onChangeHandler);
    orbit
      .add(initalState.orbit, "z")
      .min(-100)
      .max(100)
      .step(1)
      .onChange(onChangeHandler);

    return () => guiRef.current.destroy();
  }, []);

  return state;
}

export default useControl;
