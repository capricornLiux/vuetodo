// 定义mutation, mutation中是更新state中数据的方法
const mutations = {
  doLogin (state, userInfo) {
    state.user = userInfo
  },
  getTodos (state, todos) {
    state.todos = todos
  },
  addTodo (state, todo) {
    state.todos.unshift(todo)
  },
  deleteTodo (state, id) {
    state.todos.splice(
      state.todos.findIndex(todo => todo.id === id),
      1
    )
  },
  deleteCompleted (state) {
    state.todos = state.todos.filter(todo => !todo.completed)
  },
  updateTodo (state, {id, todo}) {
    state.todos.splice(
      state.todos.findIndex(todo => todo.id === id),
      1,
      todo
    )
  },
  // loading相关
  startLoading (state) {
    state.loading = true
  },
  stopLoading (state) {
    state.loading = false
  }
}

export default mutations
