// 数据库
// 安装sha1, 请求线上数据库的签名
const sha1 = require('sha1')
const axios = require('axios')

// 线上数据库的命名空间
const className = 'todo'

// 创建requres对象
const request = axios.create({
  baseUrl: 'http://d.apicloud.com/mcm/api'
})

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
    async getAllTodos () {
      await request.get(`/${className}`, {
        headers: getHeaders()
      })
    }
  }
}
