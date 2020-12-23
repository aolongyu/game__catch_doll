const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle-[hash:8].js'
    },
    devServer: {
        host: 'localhost',
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
                    'url-loader?name=image/[hash:8].[name].[ext]'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.md$/,
                use: [
                    "html-loader",
                    "markdown-loader"
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
                use: 'url-loader'
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
        })
    ],
}