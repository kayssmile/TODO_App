const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {

  entry: "./js/JS_todo.js",
  experiments: {"topLevelAwait": true},
  
  /*
  module: {
    
    rules: [
     
      { test: /\.html$/,
        use: ["html-loader"]
      },

      { test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
             name: "[name].[ext]",
             //outputPath: "images"
          }
        }
      }
    ]
  },
   */

  plugins: [
      new HTMLWebpackPlugin({template: "./src/index.html"}),
      new CleanWebpackPlugin(),
    ]
   
};
