const Koa = require('koa')

// 导入开发时候的dev-ssr router
const router = require('./route/dev-ssr')

// 创建application
const app = new Koa()

// 判断开发/生产环境, ssr是区分开发/生产环境的
const isDev = process.env.NODE_ENV === 'development'

// 创建容错的中间件
app.use(async (ctx, next) => {
  try {
    // 记录请求路径
    console.log(`request with path ${ctx.path}`)
    // 执行下一个中间件
    await next()
  } catch (error) {
    console.log(error)
    ctx.status = 500
    if (isDev) {
      ctx.body = error.message
    } else {
      ctx.body = `Please try again later`
    }
  }
})

// 使用dev-ssr-router
app.use(router.routes()).use(router.allowedMethods())

// 监听服务启动
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`ssr server at ${HOST}:${PORT}`)
})
