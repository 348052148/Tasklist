/**
 * Created by msbox on 2018/2/4.
 */
var webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const vueLoaderConfig = require('./vue-loader.conf');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry:{
        drawjs:["./src/index.js"]
    },

    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name][hash].js"
    },

    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist',
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use:[
                    'babel-loader'
                ],
                include: [resolve('src')]

            },
            {
                test: /\.(png|jpe?g|gif|ico|ttf|woff)(\?\S*)?$/,
                loader: 'file-loader',
            }
        ]
    },

    externals: {
        jquery: 'jQuery'
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },

    plugins:[
        new webpack.BannerPlugin('Draw2.js'),
        new HtmlWebpackPlugin({
            title: 'Draw2.js',
            template: path.join(__dirname,'template/index.html')
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'})
    ]

}