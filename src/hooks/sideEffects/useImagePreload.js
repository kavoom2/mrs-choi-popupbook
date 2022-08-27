import { getWebpPath } from "@components/Picture/_utils/paths";
import { useDidMount } from "rooks";
import { checkWebPSupport } from "./_utils/webp";

const assetPreloader = {
  _cache: new Set(),
};

let isWebpSupported =
  navigator.userAgent != "ReactSnap" ? true : checkWebPSupport();

assetPreloader.preload = async function (nextAssets = []) {
  const promiseList = nextAssets
    .filter((asset) => !this._cache.has(asset))
    .map(
      (asset) =>
        new Promise((resolve, reject) => {
          const img = new Image();

          img.onload = () =>
            resolve({
              domNode: img,
              asset: asset,
            });
          img.onerror = img.onabort = () => reject();
          img.src = isWebpSupported ? getWebpPath(asset) : asset;
        })
    );

  try {
    const settled = await Promise.allSettled(promiseList);

    settled.forEach(({ status, value }) => {
      if (status === "fulfilled") {
        const { asset } = value;
        this._cache.add(asset);
      }
    });
  } catch (error) {
    console.error("image preload error occured", error);
  }
}.bind(assetPreloader);

function useImagePreload(assets: string[] = []) {
  useDidMount(() => {
    assetPreloader.preload(assets);
  });
}

export default useImagePreload;
