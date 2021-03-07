const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath } = require('./paths')

module.exports = {
    entry: path.join(srcPath, 'index'),

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],      // 配置babel时还需要配置 .babelrc 文件
                include: srcPath,
                exclude: /node_modules/        // 排除掉一些文件
            }
            // css 處理 區分 dev 和 prod
            // dev 不抽離
            // prod 抽離 壓縮
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ]
}