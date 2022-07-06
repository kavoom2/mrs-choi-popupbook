import { Stats as StatsDebugger } from "@react-three/drei";
import { useRef } from "react";
import { useEffectOnce } from "react-use";

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
