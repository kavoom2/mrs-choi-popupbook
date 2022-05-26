import { GizmoHelper, GizmoViewport } from "@react-three/drei";

function AxisDebugger({ debug = false }) {
  if (!debug) return null;

  return (
    <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
      <GizmoViewport
        axisColors={["hotpink", "aquamarine", "#3498DB"]}
        labelColor="black"
      />
    </GizmoHelper>
  );
}

export default AxisDebugger;
