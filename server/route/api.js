// api路由
const Router = require('koa-router')
// 创建路由对象, api开头的请求才处理
const apiRouter = new Router({
  prefix: '/api'
})

// 对成功响应的封装
const successResponse = data => {
  return {
    success: true,
    data
  }
}

apiRouter.get('/todo', async ctx => {
  // 从ctx上下文中获取db对象, 并请求数据
  const todos = await ctx.db.getAllTodos()
  // ctx.body = todos
  ctx.body = successResponse(todos)
})

apiRouter.post('/todo', async ctx => {
  const data = await ctx.db.addTodo(ctx.request.body)
  ctx.body = successResponse(data)
})

module.exports = apiRouter
