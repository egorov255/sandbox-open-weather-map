const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        loader: 'babel',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
