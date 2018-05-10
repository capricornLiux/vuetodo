// 定义mutation, mutation中是更新state中数据的方法
const mutations = {
  getTodos (state, todos) {
    state.todos = todos
  },
  doLogin (state, userInfo) {
    state.user = userInfo
  }
}

export default mutations
