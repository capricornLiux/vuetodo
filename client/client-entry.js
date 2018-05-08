// 生产模式下webpack.config.client打包的入口文件
import CreateApp from './create-app'
const {
  app,
  router
} = CreateApp()

router.onReady(() => {
  app.$mount('#root')
})
