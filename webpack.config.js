const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  mode: "development",
  entry:{
    app: "./public/index.js",
    db: "./public/db.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: "my-domain-cache-id",
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
    }),
    new WebpackPwaManifest({
      name: "Notes app",
      short_name: "Notes",
      description: "An application that allows you to view different news articles and save your favorites.",
      background_color: "#01579b",
      theme_color: "#ffffff",
      "theme-color": "#ffffff",
      start_url: "/",
      // icons: [{
      //   src: path.resolve("assets/images/icons/android-chrome-192x192.png"),
      //   sizes: [96, 128, 192, 256, 384, 512],
      //   destination: path.join("assets", "icons")
      // }]
    })
  ]
};

module.exports = config;
