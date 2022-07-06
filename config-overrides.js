const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
} = require("customize-cra");
const path = require("path");

// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const HtmlWebpackInjectPreload = require("@principalstudio/html-webpack-inject-preload");

/**
 * 2. Setup webpack configs
 *
 * CRA에서 eject를 사용하지 않고 Webpack 설정을 덮어 씌우려면
 * customize-cra와 react-app-rewired를 사용해야 합니다.
 *
 * [Github: react-app-rewired] https://github.com/timarney/react-app-rewired
 * [Github: customize-cra] https://github.com/arackaf/customize-cra
 *
 *
 */
module.exports = override(
  /**
   * Plugin: Bundle analyzer
   */
  // addWebpackPlugin(new BundleAnalyzerPlugin()),

  /**
   * Plugin: Html link preload injector
   * [Reference] https://www.wiktorwisniewski.dev/blog/preloading-assets-with-webpack5
   *
   * 로딩 화면에서 사용하는 Asset들은 js파일보다 먼저 불러와야 합니다.
   */
  addWebpackPlugin(
    new HtmlWebpackInjectPreload({
      files: [
        // Preload: 이미지
        {
          match: /^(preload1280)+.+(.png)$/,
          attributes: { as: "image", media: "(min-width: 1280px)" },
        },
        {
          match: /^(preload900)+.+(.png)$/,
          attributes: { as: "image", media: "(min-width: 900px)" },
        },
        {
          match: /^(preload600)+.+(.png)$/,
          attributes: { as: "image", media: "(min-width: 600px)" },
        },
        {
          match: /^(preload0)+.+(.png)$/,
          attributes: { as: "image", media: "(max-width: 599.98px)" },
        },

        // Preload: 폰트
        // TODO: 웹 폰트를 Preload하여 사용할 경우, 경량화가 필요합니다.
        // woff - > woff2
        // [Reference 1] https://spoqa.github.io/2015/10/14/making-spoqa-han-sans.html
        // [Refernece 2] https://web.dev/i18n/ko/optimize-webfont-loading/#lighthouse-webfont
        {
          match: /.+(.woff)$/,
          attributes: {
            as: "font",
            crossorigin: "anonymous",
            type: "font/woff",
          },
        },
      ],
    })
  ),

  /**
   * Alias
   */
  addWebpackAlias({
    "@src": path.resolve(__dirname, "./src"),
    "@components": path.resolve(__dirname, "./src/components"),
    "@pages": path.resolve(__dirname, "./src/pages"),
    "@routes": path.resolve(__dirname, "./src/routes"),
    "@hooks": path.resolve(__dirname, "./src/hooks"),
    "@lib": path.resolve(__dirname, "./src/lib"),
    "@assets": path.resolve(__dirname, "./src/assets"),
  })
);
