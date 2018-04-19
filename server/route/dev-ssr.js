// 开发时候的ssr情况
const path = require('path')
const fs = require('fs')
const router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRender = require('vue-server-renderer')
// const ejs = require('ejs')

const serverConfig = require('../../build/webpack.config.server')

// 1. 在node环境中, 编译webpack
const serverComplier = webpack(serverConfig)

// 2. 使用memory-fs
const mfs = new MemoryFS()
serverComplier.outputFileSystem = mfs

// 3. 声明bundle, 记录webpack打包生成的文件
let bundle
serverComplier.watch({}, (error, stats) => {
  // 如果打包出现错误, 直接抛出错误
  if (error) {
    throw error
  }
  // 不是打包出现的错误, 通过stats发现
  stats = stats.toJson()
  stats.hasErrors.forEach(err => {
    console.log(err)
  })
  stats.hasWarnings.forEach(warning => {
    console.log(warning)
  })

  // 获取打包生成的json文件路径
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  // 解析生成的json
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

// 编写一个中间件...TODO:
const handleSSR = async (ctx) => {
  if (!bundle) {
    // 第一次打包的时候没有
    ctx.body = '请稍等...'
  }

  // 读取模板文件
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs')
  )

  //
  const renderer = VueServerRender.createBundleRenderer(bundle, {
    inject: false
  })
}
