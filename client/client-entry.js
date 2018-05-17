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
  // 替换 store 的根状态，仅用状态合并或时光旅行调试
  store.replaceState(window.__INITIAL_STATE__)
}

// 监听action中触发的navLogin事件, 没有登录, 跳转到登录路由界面
bus.$on('navLogin', () => {
  router.push('/login')
})

// 等待异步加载路由组件加载完成
router.onReady(() => {
  app.$mount('#root')
})
