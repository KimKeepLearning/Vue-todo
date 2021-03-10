const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const baseConfig = require('./webpack.config.base')
const { merge } = require('webpack-merge')

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV:'"development"' 
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin({
        template: path.join(__dirname, './template.html')
    })
]

let config
const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true,
    },
    hot: true
}

config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
    devtool: '#cheap-module-eval-source-map',
    module :{
        rules:[
        {
            test: /\.styl(us)?$/,
            use: [
                'vue-style-loader',// 可以实现模块热更新
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        }]
    },
    devServer,
    resolve:{
        alias:{
            // import Vue from 'vue'
            'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins:defaultPlugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ])
})



module.exports = config