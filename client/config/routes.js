// 路由映射关系
import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
export default [
  {
    path: '/app',
    component: Todo
  },
  {
    path: '/login',
    component: Login
  }
]
