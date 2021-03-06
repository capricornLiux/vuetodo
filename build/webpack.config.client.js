const path = require('path')

const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 添加ssr插件
const VueClientPlugin = require('vue-server-renderer/client-plugin')

// 导入基础配置
const webpackBaseConfig = require('./webpack.config.base')

// 判断是否是开发模式
const isDev = process.env.NODE_ENV === 'development'

// 单独拿出 webpack dev server的配置, 方便管理
const devServer = {
  port: 9000,
  host: '0.0.0.0',
  // open: true,
  overlay: {
    errors: true
  },
  hot: true,
  // 添加historyApiFallback: true
  // historyApiFallback: true
  historyApiFallback: {
    index: 'public/index.html'
  },
  // 前端请求代理到node端, 解决前端跨域问题
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
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
    // 借助指定的模板生成html
    template: path.resolve(__dirname, './template.html')
  }),

  // 使用vuessr的client插件生成json
  new VueClientPlugin()
]

// 最终导出的webpack配置
let config

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
            // 使用'vue-style-loader'热更新样式
            'vue-style-loader',
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
        }
      ]
    },

    // 开启调试模式
    devtool: '#cheap-module-eval-source-map',

    // 配置dev server
    devServer,

    // 配置plugins
    plugins: defaultPlugins.concat([
      // 配合devserver的热更新
      new webpack.HotModuleReplacementPlugin(),
      // 启用此插件后，webpack 进程遇到错误代码将不会退出
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  // 生产环境
  config = merge(webpackBaseConfig, {
    entry: {
      // app: path.join(__dirname, '../client/index.js'),
      // 替换为client-entry.js
      app: path.join(__dirname, '../client/client-entry.js'),

      // 单独打包
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [{
        test: /\.styl$/,
        // 生产模式下单独提取样式文件
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
      }]
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

config.resolve = {
  alias: {
    'model': path.resolve(__dirname, '../client/model/client-model.js')
  }
}

module.exports = config
