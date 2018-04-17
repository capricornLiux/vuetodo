import Router from 'vue-router'
import routes from './routes'

// const router = new Router({
//   routes
// })

// export default router

// 解决服务端渲染内存溢出的问题
export default () => {
  return new Router({
    routes
  })
}
