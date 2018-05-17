// ssr webpack.config.server打包的入口文件
import CreateApp from './create-app'

// vue-server-renderer传递进来的context
export default context => {
  console.log('server-entry')
  console.log(context)
  // 因为有可能是一个异步路由钩子函数或组件, 所以返回一个promise
  // 以便服务器在渲染前就已经就绪了所有内容
  return new Promise((resolve, reject) => {
    // 解构app, router
    const {app, router, store} = CreateApp()

    // 获取context上的user
    if (context.user) {
      // 有的话, 将user放到store.state中
      store.state.user = context.user
    }

    // 设置服务器端的router位置
    router.push(context.url)

    // 执行一些异步的操作...
    router.onReady(() => {
      // 根据路由跳转获取匹配的路由
      const matchedComponents = router.getMatchedComponents()

      console.log('matchedComponent')
      console.log(matchedComponents)

      if (!matchedComponents.length) {
        // 没有匹配到对应的组件, reject一个错误
        return reject(new Error('no matched component'))
      }
      // 有匹配的路由
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          // 匹配的组件有asyncData方法
          return Component.asyncData({
            route: router.currentRoute,
            store
          })
        }
      })).then(data => {
        // 将store中的state挂载到上下文中
        context.state = store.state
        // ssr的时候进行meta设置
        // 将meta信息挂载到context上下文中
        context.meta = app.$meta()
        resolve(app)
      })
    })
  })
}
