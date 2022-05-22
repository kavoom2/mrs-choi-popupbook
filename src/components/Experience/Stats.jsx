import { Stats as StatsDebugger } from "@react-three/drei";
import { useEffect, useRef } from "react";

function Stats() {
  const node = useRef(document.createElement("div"));

  useEffect(() => {
    node.current.id = "stats";

    document.body.appendChild(node.current);

    return () => document.body.removeChild(node.current);
  }, []);

  return <StatsDebugger parent={node.current} />;
}

export default Stats;
