import { useDidMount } from "rooks";

const assetPreloader = {
  _cache: new Set(),
};

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
          img.src = asset;
        })
    );

  try {
    const settled = await Promise.allSettled(promiseList);

    settled.forEach(({ status, value }) => {
      if (status === "fulfilled") {
        const { domNode, asset } = value;
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
