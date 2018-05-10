import model from '../../model/client-model'
import bus from '../../util/eventBus'

const handleErr = err => {
  if (err.code === 401) {
    alert('尚未登录或已超时, 请先登录后再操作') // eslint-disable-line
    // 使用event bus发布事件
    bus.$emit('navLogin')
  }
}

export const fetchTodos = ({commit}) => {
  model.getAllTodos().then(res => {
    commit('getTodos', res)
  }).catch(err => {
    handleErr(err)
  })
}

export const login = ({commit}, {username, password}) => {
  return new Promise((resolve, reject) => {
    model.login(username, password).then(res => {
      commit('doLogin', res)
      // alert('登录成功') // eslint-disable-line
      // this.$message({
      //   message: '恭喜你，这是一条成功消息',
      //   type: 'success'
      // })
      resolve()
    }).catch(err => {
      handleErr(err)
      reject(err)
    })
  })
}
