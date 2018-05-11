import model from '../../model/client-model'
import bus from '../../util/eventBus'

const handleErr = err => {
  if (err.code === 401) {
    alert('尚未登录或已超时, 请先登录后再操作') // eslint-disable-line
    // 使用event bus发布事件
    bus.$emit('navLogin')
  }
}

export const login = ({commit}, {username, password}) => {
  return new Promise((resolve, reject) => {
    model.login(username, password).then(res => {
      commit('doLogin', res)
      // alert('登录成功') // eslint-disable-line
      resolve()
    }).catch(err => {
      handleErr(err)
      reject(err)
    })
  })
}

export const fetchTodos = ({commit}) => {
  model.getAllTodos().then(res => {
    commit('getTodos', res)
  }).catch(err => {
    handleErr(err)
  })
}

export const addTodo = ({commit}, todo) => {
  model.createTodo(todo).then(res => {
    commit('addTodo', res)
  }).catch(err => {
    handleErr(err)
  })
}

export const deleteTodo = ({commit}, id) => {
  model.deleteTodo(id).then(res => {
    commit('deleteTodo', id)
  }).catch(err => {
    handleErr(err)
  })
}

export const deleteCompleted = ({commit, state}) => {
  const ids = state.todos.filter(todo => todo.completed).map(todo => todo.id)
  model.deleteCompleted(ids).then(res => {
    commit('deleteCompleted')
  }).catch(err => {
    handleErr(err)
  })
}

export const updateTodo = ({commit}, {id, todo}) => {
  model.updateTodo(id, todo).then(res => {
    commit('updateTodo', {id, todo: res})
  }).catch(err => {
    handleErr(err)
  })
}
