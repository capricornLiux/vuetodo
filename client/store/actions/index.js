// import model from '../../model/client-model'
// 使用打包配置的别名, 区分client和server不同打包环境不同的文件
import model from 'model'
import bus from '../../util/eventBus'

// 错误处理
const handleErr = err => {
  if (err.code === 401) {
    alert('尚未登录或已超时, 请先登录后再操作') // eslint-disable-line
    // 使用event bus发布事件
    bus.$emit('navLogin')
  }
}

export const login = ({commit}, {username, password}) => {
  return new Promise((resolve, reject) => {
    commit('startLoading')
    model.login(username, password).then(res => {
      commit('stopLoading')
      commit('doLogin', res)
      // alert('登录成功') // eslint-disable-line
      resolve()
    }).catch(err => {
      commit('stopLoading')
      handleErr(err)
      reject(err)
    })
  })
}

export const fetchTodos = ({commit}) => {
  commit('startLoading')
  // 设置返回值, asyncData中需要使用
  return model.getAllTodos().then(res => {
    commit('stopLoading')
    commit('getTodos', res)
  }).catch(err => {
    commit('stopLoading')
    handleErr(err)
  })
}

export const addTodo = ({commit}, todo) => {
  commit('startLoading')
  model.createTodo(todo).then(res => {
    commit('stopLoading')
    commit('addTodo', res)
  }).catch(err => {
    commit('stopLoading')
    handleErr(err)
  })
}

export const deleteTodo = ({commit}, id) => {
  commit('startLoading')
  model.deleteTodo(id).then(res => {
    commit('stopLoading')
    commit('deleteTodo', id)
  }).catch(err => {
    commit('stopLoading')
    handleErr(err)
  })
}

export const deleteCompleted = ({commit, state}) => {
  const ids = state.todos.filter(todo => todo.completed).map(todo => todo.id)
  commit('startLoading')
  model.deleteCompleted(ids).then(res => {
    commit('stopLoading')
    commit('deleteCompleted')
  }).catch(err => {
    commit('stopLoading')
    handleErr(err)
  })
}

export const updateTodo = ({commit}, {id, todo}) => {
  commit('startLoading')
  model.updateTodo(id, todo).then(res => {
    commit('stopLoading')
    commit('updateTodo', {id, todo: res})
  }).catch(err => {
    commit('stopLoading')
    handleErr(err)
  })
}
