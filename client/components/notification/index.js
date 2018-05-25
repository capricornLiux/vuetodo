// 将vue 组件做成插件的形式
import Notification from './notification.vue'
export default (Vue) => {
  Vue.component(Notification.name, Notification)
}
