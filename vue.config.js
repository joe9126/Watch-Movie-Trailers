const { defineConfig } = require("@vue/cli-service");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "TrailerzDb - Watch Latest Movie Trailers", // This sets htmlWebpackPlugin.options.title
    },
  },
};
