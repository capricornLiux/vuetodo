// 所有webpack配置的公共部分
const path = require('path')

// 引入vue-loader配置的方法
// const createVueLoaderOptions = require('./vue-loader.config')

// const isDev = process.env.NODE_ENV === 'development'

const config = {
  // webpack编译为类浏览器环境
  target: 'web',

  // entry: path.join(__dirname, '../client/index.js'),

  // 使用client-entry.js
  entry: path.join(__dirname, '../client/client-entry.js'),

  output: {
    filename: 'bundle.[hash:8].js',
    // 开发环境不能使用chunkHash, 会报错
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:9000/public/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 在其他loader处理之前处理
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config
