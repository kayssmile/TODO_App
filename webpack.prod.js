const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require('mini-css-exctract-plugin');


module.exports = merge(common, {
  mode: "production",
  output: {
      filename: "main.[contenthash].js",
      path: path.resolve(__dirname, "dist")
  },
  plugins: [
    
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ]
  }
}
);


