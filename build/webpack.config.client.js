const merge = require('webpack-merge')

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 添加ssr插件
const VueServerClientPlugin = require('vue-server-renderer/client-plugin')

// 导入基础配置
const webpackBaseConfig = require('./webpack.config.base')

// 判断是否是开发模式
const isDev = process.env.NODE_ENV === 'development'

// 最终导出的webpack配置
let config

// 单独拿出 webpack dev server的配置, 方便管理
const devServer = {
  port: 9000,
  host: '0.0.0.0',
  open: true,
  overlay: {
    errors: true
  },
  hot: true,
  // 添加historyApiFallback: true
  // historyApiFallback: true
  historyApiFallback: {
    index: '/index.html'
  }
}

// 默认的plugins
const defaultPlugins = [
  // 配置前端代码中的环境变量
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),

  // 自动生成html
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './template.html')
  }),

  new VueServerClientPlugin()
]

// 判断是否是开发模式
if (isDev) {
  // 是开发模式

  // 进行合并 (合并基础配置和开发配置)
  config = merge(webpackBaseConfig, {

    // 配置loader
    module: {
      rules: [
        // 处理样式文件
        {
          test: /\.styl$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[hash:base64:5]',
                camelCase: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
                // 使用stylus-loader生成的sourcemap
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },

    // 开启调试模式
    devtool: '#cheap-module-eval-source-map',

    // 配置dev server
    devServer,

    // 配置plugins
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  // 生产环境
  config = merge(webpackBaseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      // 单独打包
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                  // 使用stylus-loader生成的sourcemap
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },

    plugins: defaultPlugins.concat([
      // 提取css
      new ExtractTextPlugin('style.[contentHash:8].css'),

      // 提取第三方库
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),

      // 中间插入的模块, 分配编号, 导致后面的模块编号发生变化, 导致长缓存失效, 解决这个问题
      // 顺序在vendor后面
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime',
        minChunks: Infinity
      })
    ])
  })
}

module.exports = config
