import { useDidMount } from "@hooks";

/**
 * 화면 너비에 따라 렌더링 요소의 크기를 반응형으로 적용하기 위한 커스텀 훅입니다.
 */
function useCameraZoom(camera) {
  useDidMount(() => {
    const onResizeHandler = () => {
      const width = window.innerWidth;
      const nextZoom = zoomConfigs.calZooms(width);

      if (camera) camera.zoom = nextZoom;
    };

    onResizeHandler();
    window.addEventListener("resize", onResizeHandler);

    return () => window.removeEventListener("resize", onResizeHandler);
  });
}

export default useCameraZoom;

const zoomConfigs = {
  maxWidth: 1280,
  minWidth: 550,
  maxZoom: 1.0,
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
