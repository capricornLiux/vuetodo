// 每次ssr渲染都创建一个新的app
import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import App from './app.vue'
import CreateStore from './store/index'
import CreateRouter from './config/router'

import './assets/styles/global.styl'

Vue.use(Router)
Vue.use(Vuex)
Vue.use(Meta)
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
