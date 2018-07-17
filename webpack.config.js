const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8181',
    'webpack/hot/only-dev-server',
    './index.jsx',
  ],
  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'public', 'javascripts'),
    publicPath: '/javascripts',
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, ''),
    publicPath: '/javascripts',
    port: 8181,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
