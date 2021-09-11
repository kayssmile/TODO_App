const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-exctract-plugin");
const path = require("path");

module.exports = {

  entry: "./js/JS_todo.js",
  experiments: {"topLevelAwait": true},
//   entry: ['@babel/polyfill', './js/JS_todo.js'],
   

    plugins: [
      new HTMLWebpackPlugin({template: "./src/index.html"}),
      new CleanWebpackPlugin(),
    ]
   
};
