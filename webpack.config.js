const nodeExternals = require('webpack-node-externals')
module.exports = {
  output: {
    filename: './index.js'
  },
  output: {
    filename: './index.es5.js',
    libraryTarget: 'umd'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      }
    ]
  },
  target: 'node',
  externals: {
    chalk: {
      commonjs: 'chalk',
      commonjs2: 'chalk',
      amd: 'chalk',
      root: '_' // 指向全局变量
    }
  }
}