// ssr 打包的入口文件
import CreateApp from './create-app'

// vue-server-renderer传递进来的context
export default context => {
  return new Promise((resolve, reject) => {
    // 解构app, router
    const {app, router, store} = CreateApp()

    router.push(context.url)

    // 执行一些异步的操作...
    router.onReady(() => {
      // 根据路由跳转获取匹配的路由
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        // 没有匹配到对应的组件
        return reject(new Error('no matched component'))
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          console.log('匹配到了')
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
