process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3005,
    historyApiFallback: true,
  },
});
