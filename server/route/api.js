// api路由
const Router = require('koa-router')
// 创建路由对象, api开头的请求才处理
const apiRouter = new Router({
  prefix: '/api'
})

const successResponse = data => {
  return {
    success: true,
    data
  }
}

apiRouter.get('/todos', async ctx => {
  console.log('get todos')
  const todos = await ctx.db.getAllTodos()
  // ctx.body = todos
  ctx.body = successResponse(todos)
})

apiRouter.post('/todo', async ctx => {
  const data = await ctx.db.addTodo(ctx.request.body)
  ctx.body = successResponse(data)
})

module.exports = apiRouter
