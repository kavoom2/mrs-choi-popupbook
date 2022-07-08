import { Stats as StatsDebugger } from "@react-three/drei";
import { useRef } from "react";
import { useEffectOnce } from "react-use";

/**
 * FPS, MS, MB 등의 상태를 확인하는 성능 측정 Debugger입니다.
 *
 * [Details] https://www.npmjs.com/package/stats-js
 */

function Stats() {
  const node = useRef();

  useEffectOnce(() => {
    node.current = document.createElement("div");
    node.current.id = "stats";

    document.body.appendChild(node.current);

    return () => node.current && document.body.removeChild(node.current);
  }); // eslint-disable-line

  return <StatsDebugger parent={node.current} />;
}

export default Stats;
