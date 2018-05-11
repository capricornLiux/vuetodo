/**
 * 创建错误
 * @param {number} code - 错误代码
 * @param {any} msg - 错误信息
 * @returns {object} 错误对象
 */
const createError = (code, msg) => {
  const err = new Error(msg)
  err.code = code
  return err
}

export {createError}
