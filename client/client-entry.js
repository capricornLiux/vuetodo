// 生产模式下webpack.config.client打包的入口文件
import CreateApp from './create-app'
import bus from './util/eventBus'

const {
  app,
  router
} = CreateApp()

bus.$on('navLogin', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
