const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 判断是否是开发模式
const isDev = process.env.NODE_ENV === 'development'

const config = {
    // webpack编译为类浏览器环境
    target: 'web',

    entry: path.join(__dirname, 'src/index.js'),
    
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
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
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // 给webpack在编译过程中以及js代码中能够引用
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HtmlWebpackPlugin()
    ]
}

// 判断是否是开发模式
if (isDev) {
    // 是开发模式

    // 开启调试模式
    config.devtool = '#cheap-module-eval-source-map'

    // 配置devserver
    config.devServer = {
        port: 9000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        // open: true,
        // historyFallback: { 
        // }

        // hotModuleReplacement
        // 模块热替换, 代码更新的时候, 只更新对应的部分, 不刷新页面
        hot: true // 开启之后还要添加插件
    }

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;