
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackCommonConfig = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { distPath } = require('./paths.js')

module.exports = smart(webpackCommonConfig, {
    mode: 'production',

    output: {

        // 打包代码时，加上 哈希 后， 如果文件没有变动，
        // 则生成的哈希值也不会变，就会使用缓存，加快响应速度
        filename: 'bundle.[contentHash:8].js',

        path: distPath,
        // publicPath: 'http://cdn.abc.com'    // 修改所有静态文件 url
    },

    module: {
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用base64 格式产出,直接以html格式写入， 减少 http 请求
                        // 否则， 依然采用 file-loader 的形式产出 url
                        limit: 5 * 1024,

                        // 打包到 img 目录下
                        outputPath: '/img1/',

                        // 设置图片的 cdn 地址（也可以统一采用外面的 output）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },

            //抽離 css
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader,   // 注意，這裡不再用style-loader
                    'css-loader',
                    'postcss-loader'
                ]
            },

            // 抽離 less  ->  css
            {
                test: /\.less$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),               // 会默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        }),

        // 抽離 css 文件的存放路徑
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        })
    ],

    optimization: {
        // 壓縮 css
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
})