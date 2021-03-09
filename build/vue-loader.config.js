// const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev)=>{
    return {
        preserveWhitespace: true, // 防止标签中的空格对页面造成影响
        extractCSS: !isDev, // Vue文件中的css单独打包
        cssModules: {},
        // hotReload: false
        // loaders: {
        //     'docs':docsLoader // 给自定义的模块指定自定义的loader
        // },
        // preLoaders: { // 使用babel-loader之前，先用这个loader解析
        // },
        // postLoader:{
        // }
    }
}