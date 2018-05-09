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

// 路由匹配到get todos, 调用获取所有的todos方法
apiRouter.get('/todos', async ctx => {
  // 从ctx上下文中获取db对象, 并请求数据
  const todos = await ctx.db.getAllTodos()
  ctx.body = successResponse(todos)
})

// 路由匹配到post todo, 调用添加todo的方法
apiRouter.post('/todo', async ctx => {
  const data = await ctx.db.addTodo(ctx.request.body)
  ctx.body = successResponse(data)
})

// 匹配到put todo, 调用update todo的方法
apiRouter.put('/todo/:id', async ctx => {
  const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
  ctx.body = successResponse(data)
})

// 匹配到delete todo, 调用delete todo的方法
apiRouter.delete('/todo/:id', async ctx => {
  const data = await ctx.db.deleteTodo(ctx.params.id)
  ctx.body = successResponse(data)
})

// 匹配到post api/delete/completed, 调用删除完成的方法
apiRouter.post('/delete/completed', async ctx => {
  const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
  ctx.body = successResponse(data)
})

module.exports = apiRouter
