// 开发时候的ssr情况
const path = require('path')
const fs = require('fs')
const router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRender = require('vue-server-renderer')

// 获取webpack server config
const serverConfig = require('../../build/webpack.config.server')

// 1. 在node环境中, 编译webpack, 生产的compiler, 可以通过run/watch进行编译
const serverComplier = webpack(serverConfig)

// 2. 使用memory-fs
const mfs = new MemoryFS()

// 指定生成的路径在内存中
serverComplier.outputFileSystem = mfs

// 3. 声明bundle, 记录webpack打包生成的文件
let bundle

// 每次修改重新打包
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
    'vue-ssr-server-bundle.json' // 使用vue-server-renderer/client-plugin之后的默认文件名
  )

  // 解析生成json
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

// 编写一个中间件...处理ssr要返回的东西
const handleSSR = async (ctx) => {
  if (!bundle) {
    // 第一次打包的时候没有
    ctx.body = '请稍等...'
  }

  // 上面生成的ssr内容, 只有body, 需要借助模板生成完整的html

  // 通过axios获取webpack-dev-server生成的js文件
  const clientManifestResp = await axios.get('http://127.0.0.1:9000/vue-ssr-client-manifest.json')

  // 解析clientManifestResp
  const clientManifest = clientManifestResp.data

  // 读取模板文件
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs')
  )

  // 声明一个renderer
  const renderer = VueServerRender.createBundleRenderer(bundle, {
    // 可以指定一个template, 但是限制比较多
    inject: false,
    clientManifest
  })
}
