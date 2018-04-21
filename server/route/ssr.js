// 处理生产环境的ssr
const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const VueServerRenderer = require('vue-server-renderer')
const serverRenderer = require('./server-render')

const clientManifest = require('../../dist/vue-ssr-client-manifest.json')

const renderer = VueServerRenderer.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

const pageRouter = new Router()

// 获取模板
const template = fs.readFileSync('../server.template.ejs', 'utf-8')

pageRouter.get('*', async (ctx) => {
  await serverRenderer(ctx, renderer, template)
})

module.exports = pageRouter
