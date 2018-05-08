import Router from 'vue-router'
import routes from './routes'

// 解决服务端渲染内存溢出的问题, 返回一个工厂方法
export default () => {
  return new Router({
    // 使用history模式
    mode: 'history',
    // 返回滚动
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    routes
  })
}
