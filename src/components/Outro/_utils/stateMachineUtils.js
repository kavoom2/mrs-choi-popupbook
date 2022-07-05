import { outro } from "@lib/constants/stageMachineStates";

export function outroContextSelector(state) {
  const outroContext = state["context"][outro];

  return outroContext;
}
