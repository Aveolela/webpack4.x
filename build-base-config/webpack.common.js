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
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ]
}