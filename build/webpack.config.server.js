const path = require('path')
const webpack = require('webpack')
const MiniExtractPlugin = require('mini-css-extract-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')


const baseConfig = require('./webpack.config.base')
const { merge } = require('webpack-merge')

let config


config = merge(baseConfig, {
    target:'node',
    entry: path.join(__dirname, '../client/server-entry.js'),
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs2',
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies),
    module :{
        rules:[
            {
                test: /\.styl/,
                use: [
                  {
                    loader: MiniExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it uses publicPath in webpackOptions.output
                      publicPath: './',
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                  { 
                    loader: 'postcss-loader', 
                    options: { sourceMap: true } 
                  },
                  'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development')
            'process.env.VUE_ENV': '"server"'
        }),
        new VueServerPlugin({
            // filename: ''
        })

    ]
})



module.exports = config