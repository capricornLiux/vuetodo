// 开发时候的ssr情况
const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRender = require('vue-server-renderer')

// 获取webpack server config
const serverConfig = require('../../build/webpack.config.server')

// 导入渲染配置
const serverRender = require('./server-render')

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

  stats.errors.forEach(err => {
    console.log(err)
  })
  stats.warnings.forEach(warning => {
    console.log(warning)
  })

  // 获取打包生成的vue-ssr-server-bundle.json文件路径
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json' // 使用vue-server-renderer/client-plugin之后的默认文件名
  )

  // 解析vue-ssr-server-bundle.json生成bundle对象
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))

  console.log('ssr bundle generated')
})

// 编写一个中间件...处理ssr要返回的东西
const handleSSR = async (ctx) => {
  if (!bundle) {
    // 第一次打包的时候没有
    ctx.body = '请稍等...'
  }

  // 上面生成的ssr内容, 只有body, 需要借助模板生成完整的html

  // 通过axios获取webpack-dev-server生成的js文件
  const clientManifestResp = await axios.get('http://127.0.0.1:9000/public/vue-ssr-client-manifest.json')

  // 解析clientManifestResp
  const clientManifest = clientManifestResp.data

  // 读取模板文件
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  /**
   * 使用 server bundle 和（可选的）选项创建一个 BundleRenderer 实例
   * webpack + vue-server-renderer/server-plugin 生成的 bundle 对象
   */
  // 生成renderer
  const renderer = VueServerRender.createBundleRenderer(bundle, {
    // 可以指定一个template, 但是限制比较多
    inject: false,
    clientManifest
  })

  // 使用server-render进行渲染
  await serverRender(ctx, renderer, template)
}

// 创建路由
const router = new Router()

// 当匹配到路由的时候, 使用handleSSR中间件进行路由处理
router.get('*', handleSSR)

module.exports = router
