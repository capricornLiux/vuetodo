// ssr webpack.config.server打包的入口文件
import CreateApp from './create-app'

// vue-server-renderer传递进来的context
export default context => {
  // 因为有可能是一个异步路由钩子函数或组件, 所以返回一个promise
  // 以便服务器在渲染前就已经就绪了所有内容
  return new Promise((resolve, reject) => {
    // 解构app, router
    const {app, router} = CreateApp()

    // 设置服务器端的router位置
    router.push(context.url)

    // 执行一些异步的操作...
    router.onReady(() => {
      // 根据路由跳转获取匹配的路由
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        // 没有匹配到对应的组件, reject一个错误
        return reject(new Error('no matched component'))
      }
      // ssr的时候进行meta设置
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
