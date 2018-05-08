// 开发时候的ssr和生产环境的ssr通用的配置
const ejs = require('ejs')

// 导出一个响应中间件
module.exports = async (ctx, renderer, template) => {
  // 设置响应头
  ctx.header['Content-Type'] = 'text/html'

  // 声明context vue-server-renderer的时候使用
  const context = {
    url: ctx.path
  }
  // vue-server-renderre渲染完成之后, 在html中插入, 包括client的js路径, css路径

  try {
    // 生成body部分
    const appString = await renderer.renderToString(context)

    // 获取meta信息
    const {title} = context.meta.inject()

    // 使用ejs模板引擎渲染
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      // 设置meta的title
      title: title.text()
    })

    // 设置response的body
    ctx.body = html
  } catch (error) {
    throw error
  }
}
