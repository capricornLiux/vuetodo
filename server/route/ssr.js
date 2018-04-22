// 处理生产环境的ssr
const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const VueServerRenderer = require('vue-server-renderer')
const serverRenderer = require('./server-render')

// 获取client打包生成的json
const clientManifest = require('../../public/vue-ssr-client-manifest.json')

// 利用vue-ssr-server-bundle.json和clientManifest生成 bundle
const renderer = VueServerRenderer.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

const pageRouter = new Router()

// 获取模板
const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

// 路由拦截, 执行渲染方法
pageRouter.get('*', async (ctx) => {
  await serverRenderer(ctx, renderer, template)
})

module.exports = pageRouter
