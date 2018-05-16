// 开发时候的ssr和生产环境的ssr通用的配置
const ejs = require('ejs')

// 导出一个响应中间件
module.exports = async (ctx, renderer, template) => {
  // 设置响应头
  ctx.header['Content-Type'] = 'text/html'

  // 声明context vue-server-renderer的时候使用
  console.log('before render.renderToString')
  console.log(ctx)
  console.log(ctx.session)

  // 通过ctx能够拿到session, 将这个session放到context中
  const context = {
    url: ctx.path,
    user: ctx.session.user
  }
  // vue-server-renderre渲染完成之后, 在html中插入, 包括client的js路径, css路径

  try {
    // 生成body部分
    console.log('render.renderToString')
    console.log(context)
    const appString = await renderer.renderToString(context)

    console.log('after render.renderToString')
    console.log(context)

    // 获取meta信息
    const {title} = context.meta.inject()

    // 使用ejs模板引擎渲染
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      // 设置meta的title
      title: title.text(),
      // 通过context上下文中存储的state, 渲染之后拿到renderState(), 放到模板中
      initialState: context.renderState()
    })

    // 设置response的body
    ctx.body = html
  } catch (error) {
    throw error
  }
}
