import Router from 'vue-router'
import routes from './routes'

// const router = new Router({
//   routes
// })

// export default router

// 解决服务端渲染内存溢出的问题
export default () => {
  return new Router({
    // 使用history模式
    mode: 'history',
    // base: '/base/', // 基地址
    // linkActiveClass
    // linkExactActiveClass
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    // parseQuery
    // stringifyQuery
    // fallback
    routes
  })
}
