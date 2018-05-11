import axios from 'axios'

// 从util工具类中导入创建错误的方法
import {
  createError
} from './util'

/*
{
    "success": true,
    "data": {
        "username": "lance"
    }
}

{
      success: false,
      message: '用户名或密码错误'
    }

{
    "success": true,
    "data": [
        {
            "id": "5af2b5a3bf7b37a41801cd60",
            "createdAt": "2018-05-09T08:47:31.684Z",
            "updatedAt": "2018-05-09T08:47:31.684Z",
            "content": "hello",
            "completed": false
        },
        {
            "id": "5af2b5bd383750e83d3b734b",
            "createdAt": "2018-05-09T08:47:57.651Z",
            "updatedAt": "2018-05-09T08:47:57.651Z",
            "content": "hello2",
            "completed": false
        }
    ]
}

*/

/**
 * handleRequest 处理请求后的promise
 * @param {Promise} request 传入的promise
 * @returns {Promise} 返回一个promise
 */
const handleRequest = request => {
  // 返回一个新promise
  return new Promise((resolve, reject) => {
    // 处理传入的promise
    request.then(res => {
      const data = res.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      // 将data resolve
      resolve(data.data)
    }).catch(err => {
      // 如果在传入的promise创建的过程中发生错误, 会到这里; 401状态axios也会处理为错误
      const resp = err.response
      if (resp.status === 401) {
        reject(createError(401, resp.data))
      }
    })
  })
}

// 创建axios请求对象
const request = axios.create({
  // 给自己的服务发送请求
  baseURL: '/'
})

// 导出请求对象, 对象上挂载了各种数据接口请求方法
export default {
  /**
   * 登录
   * @username
   * @returns {Promise} 返回handleRequest处理的promise
   */
  login(username, password) {
    return handleRequest(request.post('/user/login', {
      username,
      password
    }))
  },

  /**
   * 创建一个todo
   * @param {any} todo - 新创建的todo
   * @returns {Promise} 使用handleRequest处理后的promise
   */
  createTodo(todo) {
    return handleRequest(request.post(`/api/todo`, todo))
  },

  /**
   * 删除一个todo
   * @param {any} id - 需要删除的todoid
   * @returns {Promise} 使用handleRequest处理后的promise
   */
  deleteTodo(id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },

  /**
   * 删除完成的todo
   * @param {Array} ids - 需要删除的todo的id组成的数组
   * @returns {Promise} 使用handleRequest处理后的promise
   */
  deleteCompleted(ids) {
    return handleRequest(request.post(`/api/delete/completed`, {
      ids
    }))
  },

  /**
   * 更新一个todo
   * @param {any} id - 需要更新的todo的id
   * @param {any} todo - 更新后的todo
   * @returns {Promise} 使用handleRequest处理后的promise
   */
  updateTodo(id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },

  /**
   * 获取所有的todos
   * @returns {Promise} 返回handleRequest处理的promise
   */
  getAllTodos() {
    // 使用handleRequest处理请求后的promise
    return handleRequest(request.get('/api/todos'))
  }
}
