const webpack = require('webpack')

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: "commons",
  filename: "commons.js"
})

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractCSS = new ExtractTextPlugin('[name].bundle.css')

const config = {
  context: __dirname + "/src",
  entry: {
    app: './app.js',
    admin: './admin.js'
  },
  output: {
    path: __dirname + "/dist",
    publicPath: '/dist/',
    filename: "[name].bundle.js"
  },
  module: {
    rules: [{
      test: /\.scss$/,
      loader: extractCSS.extract(['css-loader','sass-loader'])
    }, {
      test: /\.js$/,
      include: __dirname + "/src",
      use: [{
        loader: "babel-loader",
        options: { presets: ["es2015"] }
      }],
    }, {
      test: /\.(png|jpg)$/,
      use: [{
        loader: 'url-loader',
        options: { limit: 10000 }
      }]
    }]
  },
  plugins: [
    extractCommons,
    extractCSS
  ]
}

module.exports = config;
