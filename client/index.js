import Vue from 'vue'
import App from './app.vue'

import Router from 'vue-router'

// 使用全局样式
import './assets/styles/global.styl'

import createRouter from './config/router'

Vue.use(Router)

const router = createRouter()

// 实例化的时候没有收到el, 处于'未挂载'状态, 没有关联的dom元素, 使用$mount手动挂载
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
