// vue-loader的配置项 根据不同的环境配置不同的vue-loader配置项
module.exports = isDev => {
  return {
    // 默认值: true 如果设置为 false，模版中 HTML 标签之间的空格将会被忽略
    preserveWhitespace: true,

    // vue会单独处理css, 使用extract-text默认不会提取
    extractCSS: !isDev, // 异步加载模块, 没必要加载所有的css, 提高速度

    // 使用vue-style-loader热更新样式

    // cssModule

    // postcss

    // hotReload

    // 自定义vue的模块, template, style, script不同的模块,

    cssModules: {
      localIdentName: isDev ? '[path][name]---[local]---[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }

  }
}
