// 所有webpack配置的公共部分
const path = require('path');

const config = {
    // webpack编译为类浏览器环境
    target: 'web',

    entry: path.join(__dirname, '../src/index.js'),
     
    output: {
        filename: '[name].[hash:8].js',
        // 开发环境不能使用chunkHash, 会报错
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

module.exports = config;
