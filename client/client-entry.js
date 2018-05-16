// 生产模式下webpack.config.client打包的入口文件
import CreateApp from './create-app'
import bus from './util/eventBus'

// 从CreateApp中解构app, router
const {
  app,
  router,
  store
} = CreateApp()

// 判断window.__INITIAL_STATE__
if (window.__INITIAL_STATE__) {
  // 状态替换
  store.replaceState(window.__INITIAL_STATE__)
}

bus.$on('navLogin', () => {
  router.push('/login')
})

// 等待异步加载路由组件加载完成
router.onReady(() => {
  app.$mount('#root')
})
