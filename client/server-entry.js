// ssr 打包的入口文件
import CreateApp from './create-app'

// vue-server-renderer传递进来的context
export default context => {
  return new Promise((resolve, reject) => {
    // 解构app, router
    const {app, router} = CreateApp()

    // console.log('server-entry')
    // console.log(context)
    // console.log(context.url)
    router.push(context.url)

    // 执行一些异步的操作...
    router.onReady(() => {
      // 根据路由跳转获取匹配的路由
      const matchedComponent = router.getMatchedComponents()

      // console.log('onReady')
      // console.log(matchedComponent)

      if (!matchedComponent.length) {
        // 没有匹配到对应的组件
        return reject(new Error('no matched component'))
      }
      resolve(app)
    })
  })
}
