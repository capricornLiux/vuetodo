const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')

// 使用vue-server-renderer/client-plugin
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./webpack.config.base')

let config

config = merge(baseConfig, {
  // node环境
  target: 'node',

  // 指定服务器端的入口文件
  entry: path.join(__dirname, '../client/server-entry.js'),

  output: {
    // 指定写的代码导出的形式
    libraryTarget: 'commonjs2',

    // 生成的文件不需要hash
    filename: 'server-entry.js',

    // 输出目录
    path: path.join(__dirname, '../server-build')
  },

  // webpack打包的时候将所有依赖都打包到一个文件中, node环境在导出的文件中require第三方依赖就可以了
  // 生产环境的依赖vue vue-router vuex
  externals: Object.keys(require('../package.json').dependencies),

  // vue-server-renderer结合dev-tool提供代码调试的功能
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.styl$/,
        // 不能使用style-loader, 有dom插入动作, node端会报错
        use: ExtractPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      // vue官方推荐的
      'process.env.VUE_ENV': '"server"'
    }),
    // 使用vue-server-renderer/client-plugin
    // 生成一个单独的json文件, 用于ssr
    // 配置这个文件, 打包之后不会有js文件
    new VueServerPlugin()
  ]
})

module.exports = config
