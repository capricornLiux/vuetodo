import axios from 'axios'

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
 * @param {Promise} request 请求后的promise
 * @returns {Promise} 返回一个promise
 */
const handleRequest = request => {
  return new Promise((resolve, reject) => {
    request.then(res => {
      const data = res.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      resolve(data.data)
    }).catch(err => {
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

// 导出请求对象
export default {
  /**
   * 获取所有的todos
   * @returns {Promise} 返回handleRequest处理的promise
   */
  getAllTodos () {
    // 使用handleRequest处理请求后的promise
    return handleRequest(request.get('/api/todos'))
  },

  /**
   * 登录
   * @returns {Promise} 返回handleRequest处理的promise
   */
  login (username, password) {
    return handleRequest(request.post('/user/login', {username, password}))
  }
}
