import { useEffect } from "react";

function useCameraZoom(camera) {
  useEffect(() => {
    const onResizeHandler = () => {
      const width = window.innerWidth;
      const nextZoom = zoomConfigs.calZooms(width);

      if (camera) camera.zoom = nextZoom;
    };

    onResizeHandler();
    window.addEventListener("resize", onResizeHandler);

    return () => window.removeEventListener("resize", onResizeHandler);
  }, []);
}

export default useCameraZoom;

const zoomConfigs = {
  maxWidth: 1100,
  minWidth: 550,
  maxZoom: 1.1,
  minZoom: 0.6,
};

zoomConfigs.calResponsiveFuns = function (width) {
  return (
    (width - this.minWidth) *
      ((this.maxZoom - this.minZoom) / (this.maxWidth - this.minWidth)) +
    this.minZoom
  );
}.bind(zoomConfigs);

zoomConfigs.calZooms = function (width) {
  if (width >= this.maxWidth) return this.maxZoom;
  if (width <= this.minWidth) return this.minZoom;

  return this.calResponsiveFuns(width);
}.bind(zoomConfigs);
