// 开发时候的ssr和生产环境的ssr通用的配置
// const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.header['Content-Type'] = 'text/html'

  // 声明context vue-server-renderer的时候使用
  const context = {
    url: ctx.path
  }
  // vue-server-renderre渲染完成之后, 在html中插入, 包括client的js路径, css路径

  try {
    // const appString = await renderer.renderToString(context)

    // const html = ejs.render(template, {
    //   appString,
    //   style: context.renderStyles(),
    //   scripts: context.renderScripts()
    // })

    renderer.renderToString(context, (err, html) => {
      if (err) {
        ctx.body = err.message
      } else {
        ctx.body = html
      }
    })

    // ctx.body = html
  } catch (error) {
    console.log(error)
    throw error
  }
}
