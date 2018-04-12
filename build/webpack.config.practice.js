const merge = require('webpack-merge')

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 导入基础配置
const webpackBaseConfig = require('./webpack.config.base')

// 最终导出的webpack配置
let config

// 单独拿出 webpack dev server的配置, 方便管理
const devServer = {
  port: 8090,
  host: '0.0.0.0',
  open: true,
  overlay: {
    errors: true
  },
  hot: true
}

// 默认的plugins
const defaultPlugins = [
  // 配置前端代码中的环境变量
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),

  // 自动生成html
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './template.html')
  })
]

config = merge(webpackBaseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),

  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
      // vue的不同版本, 默认runtime, 不可以在vue对象中写template
    }
  },
  // 配置loader
  module: {
    rules: [
      // 处理样式文件
      {
        test: /\.styl$/,
        use: [
          'vue-style-loader',
          //
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

module.exports = config
