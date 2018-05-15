const config = require('../../app.config.js')
const createDb = require('../../server/db/db.js')

// 创建db对象
const db = createDb(config.db.appId, config.db.appKey)

export default {
  getAllTodos () {
    return db.getAllTodos()
  }
}
