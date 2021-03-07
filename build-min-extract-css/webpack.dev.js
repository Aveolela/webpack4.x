const path = require('path')
const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { distPath } = require('./paths.js')



module.exports = smart(webpackCommonConfig, {
    mode: 'development',

    module: {
        rules: [
            // 引入圖片url
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            },
            
            // 基础版
            // {
            //     test: /\.css$/,
            //     // loader 調用順序，從后往前
            //     // webpack 不认识css文件的，需要先使用 css-loader 解析为js文件
            //     // 再使用 style-loader 将解析后的文件插入到 页面 中
            //     loader: ['style-loader', 'css-loader']
            // },

            // 升级版 
            // postcss-loader 兼容性更好
            {
                test: /\.css$/,
                // loader 調用順序，從后往前
                loader: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            // 定义一个变量， window.ENV = 'development'
            ENV: JSON.stringify('development')
        })
    ],

    devServer: {
        port: 8080,
        progress: true,        // 显示打包进度
        contentBase: distPath, // 根目录, 启动服务的时候，根据这个目录去访问文件
        open: true,            // 自动打开浏览器
        compress: true,        // 启动 gzip 压缩

        // 涉及到跨域时，设置代理
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                // 接口本身没有api2时，用pathRewrite来重写路径
                pathRewrite: {
                    '^/api2': ''
                }
            }
        }
    },

    //  对webpack输出信息的配置，可以减少一些不必要的输出
    stats: {
        entrypoints: false,
        children: false
    }
})