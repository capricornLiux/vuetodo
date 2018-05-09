// 数据库
// 安装sha1, 用于生成请求线上数据库的签名
const sha1 = require('sha1')
const axios = require('axios')

// 线上数据库的命名空间
const className = 'todo'

// 创建requres对象
const request = axios.create({
  // 指定baseURL
  baseURL: 'https://d.apicloud.com/mcm/api'
})

/**
 * 创建错误
 * @param {错误码} code
 * @param {错误信息对象} resp
 */
const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

/**
 * 处理请求结果
 * @param {object} - 请求结果对象
 * @returns {any} 返回数据或者抛出错误
 */
const handleRequest = ({
  status,
  data,
  ...rest
}) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

// 初始化db对象
module.exports = (appId, appKey) => {
  // 请求线上数据库的时候需要的header, 每次请求的时候都需要创建
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    // 获取所有的todo
    async getAllTodos () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },

    // 添加todo

    /**
     * 添加todo
     * @param {object} todo - 需要添加的todo对象
     * @returns {any} 返回响应数据或抛出一个错误
     */
    async addTodo (todo) {
      return handleRequest(await request.post(`/${className}`,
        todo, {
          headers: getHeaders()
        }
      ))
    },

    /**
     * 修改todo的状态
     * @param {String} id - 需要修改的todo的id
     * @param {Object} todo - 需要修改的todo对象
     * @returns {any} 返回响应数据或抛出一个错误
     */
    async updateTodo (id, todo) {
      return handleRequest(await request.put(
        `/${className}/${id}`,
        todo, {
          headers: getHeaders()
        }
      ))
    },

    /**
     * 删除一个todo
     * @param {String} id - 需要删除的todo的id
     * @returns {any} 返回响应数据或抛出一个错误
     */
    async deleteTodo (id) {
      return handleRequest(await request.delete(
        `/${className}/${id}`, {
          headers: getHeaders()
        }
      ))
    },

    // 删除多个todo
    async deleteCompleted (ids) {
      // 批处理操作, 按照apicloud的要求进行编写
      console.log(ids)
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })

      return handleRequest(await request.post(
        '/batch', {
          requests
        }, {
          headers: getHeaders()
        }
      ))
    }
  }
}
