import { assetLoader, home } from "@lib/constants/stageMachineStates";

export function assetLoaderContextSelector(state) {
  const isAssetLoaded = state["context"][assetLoader]["isAssetLoaded"];

  return isAssetLoaded;
}

export function homeContextSelector(state) {
  const homeContext = state["context"][home];

  return homeContext;
}
