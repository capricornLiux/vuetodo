// 每次ssr渲染都创建一个新的app
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import CreateStore from './store/index'
import CreateRouter from './config/router'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)

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
