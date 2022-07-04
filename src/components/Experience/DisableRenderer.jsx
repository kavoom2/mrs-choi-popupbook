import { useFrame } from "@react-three/fiber";

function DisableRender() {
  /**
   * 페이지 불러오기 직 후, WebGL Renderer를 바로 사용하게 되면 급격한 프레임 드랍 이슈가 발생합니다.
   * 따라서, XState의 isAssetLoaded가 TRUE가 된 이후에 WebGL Renderer를 사용하도록 합니다.
   *
   * - HTML preload 요소가 불러와진 이후에 렌더링을 허용해도 되지만, Network Water Flow상으로 크게 유의미하지는 않습니다.
   *
   * [Reference] https://github.com/pmndrs/react-three-fiber/discussions/769
   *
   */
  useFrame(() => null, 1000);

  return null;
}

export default DisableRender;
