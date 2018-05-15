// 生产模式下webpack.config.client打包的入口文件
import CreateApp from './create-app'
import bus from './util/eventBus'

// 从CreateApp中解构app, router
const {
  app,
  router
} = CreateApp()

bus.$on('navLogin', () => {
  router.push('/login')
})

// 等待异步加载路由组件加载完成
router.onReady(() => {
  app.$mount('#root')
})
