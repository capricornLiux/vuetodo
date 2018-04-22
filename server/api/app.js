var Koa = require('koa')
var cors = require('koa2-cors')
var Router = require('koa-router')

var app = new Koa()

var router = new Router()

app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return false
    }
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

router.get('/', async (ctx) => {
  // ctx.body = 'hello world'
  ctx.body = {
    'name': '我是异步的数据😤'
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(4444, () => {
  console.log('koa server at port 4444')
})
