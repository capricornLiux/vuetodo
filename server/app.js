const path = require('path')

const Koa = require('koa')

// 静态文件服务中间件
const send = require('koa-send')

// 使用koa-body, 处理ctx的body内容
const koaBody = require('koa-body')

// 使用koa-session
const session = require('koa-session')

// 静态文件路由
const staticRouter = require('./route/static')

// vuetodo的api路由
const apiRouter = require('./route/api')

// user/login路由
const userRouter = require('./route/user')

// 导入创建数据库对象的方法
const createDb = require('./db/db')
// 导入app配置信息
const dbConfig = require('../app.config')
// 使用app配置信息创建数据库对象
const db = createDb(dbConfig.db.appId, dbConfig.db.appKey)

// 创建application
const app = new Koa()

// 使用session
app.keys = ['vue ssr demo']
const CONFIG = {
  key: 'vue-ssr-id',
  maxAge: 1000 * 2 * 60 * 60
}
app.use(session(CONFIG, app))

// 使用koaBody
app.use(koaBody())

// 判断开发/生产环境, ssr是区分开发/生产环境的
const isDev = process.env.NODE_ENV === 'development'

// 创建容错的中间件
app.use(async (ctx, next) => {
  try {
    // 记录请求路径
    console.log(`request with path ${ctx.path}`)
    // 没有错误, 执行下一个中间件
    await next()
  } catch (error) {
    // 出现了错误
    console.log(error)
    ctx.status = 500
    if (isDev) {
      // 开发状态的时候直接将错误显示在界面上
      ctx.body = error.message
    } else {
      // 生产环境, 给一个友好提示
      ctx.body = `Please try again later`
    }
  }
})

// 数据库的中间件
app.use(async (ctx, next) => {
  // 将数据库对象挂载到ctx上下文中, 方便其他路由模块使用, 此时ctx相当于一个载体
  ctx.db = db
  // 执行下一个中间件
  await next()
})

// 静态文件服务的中间件, 处理favicon
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})

// 使用user/login路由
app.use(userRouter.routes()).use(userRouter.allowedMethods())

// 使用静态文件路由
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

// 使用api路由
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

// 判断环境, 使用不同的router
let pageRouter
if (isDev) {
  // 使用开发的router
  pageRouter = require('./route/dev-ssr')
} else {
  pageRouter = require('./route/ssr')
}

// 使用dev-ssr-router
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

// 监听服务启动
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`ssr server at ${HOST}:${PORT}`)
})
