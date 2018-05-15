const Router = require('koa-router')

// 创建router, 只处理/user开始的路由请求
const userRouter = new Router({
  prefix: '/user'
})

userRouter.post('/login', async ctx => {
  // 获取请求体重的参数对象
  const user = ctx.request.body
  // 如果用户名和密码正确, 设置session, 返回正确的response
  if (user.username === 'lance' && user.password === '896328') {
    // 如果用户名密码匹配, 设置session
    ctx.session.user = {
      username: 'lance'
    }
    // 设置响应体
    ctx.body = {
      success: true,
      data: {
        username: 'lance'
      }
    }
  } else {
    // 设置错误的响应体
    ctx.body = {
      success: false,
      message: '用户名或密码错误'
    }
  }
})

module.exports = userRouter
