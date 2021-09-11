const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist")
  },
  module: {

    rules: [
   /*   {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },*/ 
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader',
        ]
      }
    ]
  }
});
