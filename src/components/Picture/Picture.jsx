import { Fragment, memo } from "react";
import { getWebpPath } from "./_utils/paths";

/**
 * Production 환경에서 Webpack의 "ImageminWebpWebpackPlugin"으로 생성한 webp를 사용하도록 합니다.
 */
const isProduction = process.env.NODE_ENV === "production";

function Picture({ src, alt, srcSets = [], className, ...restProps }) {
  /**
   * 컴포넌트 노드 선언 및 렌더링
   */
  const sourceNodes = srcSets.map(({ srcSet, ...restSourceProps }, idx) => (
    <Fragment key={`picture-optimized-${idx}-${srcSet}`}>
      {isProduction && (
        <source
          {...restSourceProps}
          srcSet={getWebpPath(srcSet)}
          type="image/webp"
        />
      )}
      <source {...restSourceProps} srcSet={srcSet} />
    </Fragment>
  ));

  return (
    <picture className={className}>
      {sourceNodes}
      {isProduction && <source srcSet={getWebpPath(src)} type="image/webp" />}
      <img src={src} alt={alt} />
    </picture>
  );
}

export default memo(Picture);
