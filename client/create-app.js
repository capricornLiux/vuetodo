// 每次ssr渲染都创建一个新的app
import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

// 导入 notification/index.js
import Notification from './components/notification/index.js'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import App from './app.vue'
import CreateStore from './store/index'
import CreateRouter from './config/router'

import './assets/styles/global.styl'

Vue.use(Router)
Vue.use(Vuex)
Vue.use(Meta)

// 使用 Notification 插件, Notification 函数会被作为 install 方法, 会将 Vue 传入
Vue.use(Notification)
// 就将 Notification.vue 注册成了全局组件了

// Vue.use(ElementUI)

// 返回一个function防止内存溢出
export default () => {
  const router = CreateRouter()
  const store = CreateStore()

  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return {app, router, store}
}
