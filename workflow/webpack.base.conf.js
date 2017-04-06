var path = require('path');
var config = require('./config');
var projectRoot = path.resolve(__dirname, '../');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

module.exports = {
  entry: {
    main: path.resolve(projectRoot, 'src/Main.ts')
  },
  context: path.resolve(projectRoot, 'src'),
  output: {
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    path: path.resolve(projectRoot, 'dist')
  },
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     names: ['vendor'],
  //     minChunks: function (module) {
  //       // 该配置假定你引入的 vendor 存在于 node_modules 目录中
  //       return module.context && module.context.indexOf('node_modules') !== -1;
  //     }
  //   })
  // ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};