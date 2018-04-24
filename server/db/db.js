// 数据库
// 安装sha1, 请求线上数据库的签名
const sha1 = require('sha1')
const axios = require('axios')

// 线上数据库的命名空间
const className = 'todo'

// 创建requres对象
const request = axios.create({
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

// 请求结果处理
const handleRequest = ({status, data, ...rest}) => {
  console.log('handle request')
  if (status === 200) {
    return data
  } else {
    throw createError(rest)
  }
}

// 初始化db对象
module.exports = (appId, appKey) => {
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
      console.log('get all todos')
      console.log(request)
      const result = await request.get(`/${className}`, {
        headers: getHeaders()
      })
      console.log(result)
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },

    async addTodo (todo) {
      return handleRequest(await request.post(`/${className}`,
        todo,
        {headers: getHeaders()}
      ))
    }
  }
}
