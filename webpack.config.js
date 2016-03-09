'use strict'

/* Dependencies */
const path = require('path')

/* @type {Object} Default paths for this project */
const paths = {
  src:  path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  npm:  path.resolve(__dirname, 'node_modules')
}

/* Plugins */
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/* Expose `configuration` */
module.exports = {
  entry: [
    'bootstrap-loader/extractStyles',
    path.join(paths.src, '/index.js')
  ],
  output: {
    path: paths.dist,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: paths.src,
  },
  module: {
    loaders: [
      {
        test:     /\.js$/,
        loader:   'babel',
        exclude:  /node_modules/,
        include:  paths.src
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap'
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {allChunks: true})
  ]
}
