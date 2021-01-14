const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  devServer: {
    contentBase: './docs',
  },
  plugins: [
    new HtmlWebpackPlugin({  // generate a index.html
        filename: 'index.html',
        template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }
};