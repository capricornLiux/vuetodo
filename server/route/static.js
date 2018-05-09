// 处理服务端的资源请求问题
const path = require('path')
const Router = require('koa-router')
const send = require('koa-send')
const router = new Router({
  // 只处理/public开头的路径
  prefix: '/public'
})

router.get('/*', async ctx => {
  await send(ctx, ctx.path, {root: path.join(__dirname, '../../')})
})

module.exports = router
