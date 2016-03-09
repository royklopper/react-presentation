'use strict'

/* Dependencies */
const webpack = require('webpack')

/* @type {Object} */
const config = require('./webpack.config')

/* Add plugins */
config.plugins.push(
  new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
  })
)

/* Expose config */
module.exports = config;
