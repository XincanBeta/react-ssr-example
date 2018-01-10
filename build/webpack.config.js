const ENV_DEV = process.env.NODE_ENV !== "production";
const path = require('path');
const webpack = require('webpack');

const publicPath = '/static';
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const config = {
  entry: {
    app: ['./src/index.jsx', hotMiddlewareScript],
  },
  // devtool: ENV_DEV ? "inline-sourcemap" : null,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: publicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      server: path.resolve(__dirname, '../server'),
      src: path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: ENV_DEV ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};

module.exports = config;
