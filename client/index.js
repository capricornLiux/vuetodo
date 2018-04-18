import Vue from 'vue'
import App from './app.vue'

import Router from 'vue-router'

// 使用全局样式
import './assets/styles/global.styl'

import createRouter from './config/router'

// 导入store
// import store from './store/index'

import createStore from './store/index'

Vue.use(Router)

const router = createRouter()

// 创建store
const store = createStore()

// 实例化的时候没有收到el, 处于'未挂载'状态, 没有关联的dom元素, 使用$mount手动挂载
new Vue({
  router,
  // 使用store
  store,
  render: (h) => h(App)
}).$mount('#root')
