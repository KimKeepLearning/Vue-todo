const router = require('koa-router')
const axios = require('axios')
const path = require('path')
const MemoryFS = require('memory-fs')
const fs = require('fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS() // 不输入在磁盘上，二是在内存中
serverCompiler.outputFileSystem = mfs


let bundle
serverCompiler.watch({}, (err, stats)=>{
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn=>console.warn(err))

    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'
    )
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))   
})

const handleSSR = async (ctx) => {
    if(bundle) {
        ctx.body = '等一下，别急'
        return
    }

    const clientManifestResp = await axios.get(
        'https://127.0.0.1:8000/vue-ssr-client-manifest.json'
    )

    const template = fs.readFileSync(
        path.join(__dirname, '../server.template.ejs')
    )
    const renderer = VueServerRenderer.createBundleRenderer(bundle, {
        inject: false,

    })
}

