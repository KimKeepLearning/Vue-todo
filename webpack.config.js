const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
}

if (isDev) {
    config.module.rules.push(
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
        }
    )
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
} else{
    config.entry={
        app:path.join(__dirname, 'src/index.js'),
        vendor:['vue']
    }
    config.output.filename = '[name].[chunkHash:8].js'
    config.module.rules.push(
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
    )
    config.plugins.push(
        new MiniExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        })
    )
    // config.plugins.push(
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name:'vendor'
    //     })
    // )
}

module.exports = config