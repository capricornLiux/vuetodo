const Router = require('koa-router')

const userRouter = new Router({
  prefix: '/user'
})

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  // 如果用户名和密码正确, 设置session, 返回正确的response
  if (user.name === 'lance' && user.pwd === 896328) {
    ctx.session.user = {
      username: 'lance'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'lance'
      }
    }
  } else {
    ctx.body = {
      success: false,
      message: '用户名或密码错误'
    }
  }
})

module.exports = userRouter
