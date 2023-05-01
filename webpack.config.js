const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: "./src/main/index.tsx",
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "auto",
    filename: "js/bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|svg|ttf)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "/assets/img",
          outputPath: "/assets/img",
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: "./public",
    },
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: {
      index: "index.html",
    },
    port: 8080,
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./template.html",
    }),
    new DotEnv({
      path: `${__dirname}/.env`,
    }),
  ],
};
