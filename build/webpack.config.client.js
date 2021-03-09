const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')
const { merge } = require('webpack-merge')

const isDev = process.env.NODE_ENV === 'development'


const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
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
if (isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module :{
            rules:[
            {
                test: /\.styl(us)?$/,
                use: [
                    'style-loader',
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
        plugins:defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin()
        ])
    })
} else{
    config = merge(baseConfig, {
        entry:{
            app:path.join(__dirname, '../client/index.js'),
            vendor:['vue']
        },
        output: {
            filename:  '[name].[chunkHash:8].js'
        },
        module:{
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
        plugins: defaultPlugins.concat([
            new MiniExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
                ignoreOrder: false,
            })
        ])
    })
}

module.exports = config