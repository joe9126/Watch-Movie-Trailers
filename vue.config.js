const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: "TrailerzDB",
      template: "./public/index.html",
    }),
  ],
};
