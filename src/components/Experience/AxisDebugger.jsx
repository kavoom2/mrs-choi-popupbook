import { GizmoHelper, GizmoViewport } from "@react-three/drei";

/**
 * Debugger
 *
 * 현재 화면의 3차원 상 X, Y, Z 상대 좌표를 판단할 수 있습니다.
 *
 */

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
