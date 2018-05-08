// 生产模式下webpack.config.client打包的入口文件
import Vue from 'vue'

// 导入根组件app
import App from './app.vue'

// 导入路由
import Router from 'vue-router'

// 使用全局样式
import './assets/styles/global.styl'

// 导入创建路由的方法
import createRouter from './config/router'

// 导入创建store的方法
import createStore from './store/index'

// 由于使用的是模块化编程, 所以需要use
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
