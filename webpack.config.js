const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const SpritesmithPlugin = require('webpack-spritesmith')
// const Fontmin = require('fontmin');

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle-[hash:8].js'
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        hot: true,
        overlay: true,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'webpack-px-to-rem',
                        options: {
                            basePx: 100,
                            min: 1
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader',
                    {
                        loader: 'webpack-px-to-rem',
                        options: {
                            basePx: 100,
                            min: 1
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|git|svg|jpeg)$/,
                use: [
                    'url-loader?name=image/[hash:8].[name].[ext]&limit=10000'
                ]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                include: path.resolve(__dirname, 'app.js'),
                loader: 'babel-loader?cacheDirectory',
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2|TTF)$/,
                use: ['url-loader', 'file-loader']
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: '魔力抓抓机',
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new UglifyJsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles-[contentHash:8].css'
        }),
        // new SpritesmithPlugin({
        //     // 目标小图标，这里就是你要生成的图片的目录
        //     src: {
        //         cwd: path.resolve(__dirname, './src/assets/icon3'),
        //         glob: '*.png'
        //     },
        //     // 输出雪碧图文件及样式文件，这个是打包后，自动生成的雪碧图和样式，自己配置想生成去哪里就去哪里
        //     target: {
        //         image: path.resolve(__dirname, './src/assets/sprites/sprite3.png'),
        //         css: path.resolve(__dirname, './src/assets/sprites/sprite3.css')
        //     },
        //     // 样式文件中调用雪碧图地址写法
        //     apiOptions: {
        //         cssImageRef: '../assets/sprites/sprite3.png'
        //     },
        //     spritesmithOptions: {
        //         // algorithm: 't'
        //     }
        // })
        // new Fontmin()
        // .src('assets/fonts/FZY4JW.TTF')
        // .dest('dist/fonts/')
        // .use(Fontmin.glyph({
        //     text: "",
        //     hinting: false
        // }))
    ],
}