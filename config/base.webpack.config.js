/* global require, module, __dirname */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./webpack.common.js');

const webpackConfig = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: false,
    optimization: {
        minimize: process.env.NODE_ENV === 'production',
        splitChunks: {
            cacheGroups: {
                vendors: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial'
                }
            }
        }
    },
    entry: {
        App: config.paths.entry
    },
    output: {
        filename: 'js/[name].js',
        path: config.paths.public,
        publicPath: config.paths.publicPath,
        chunkFilename: 'js/[name].js'
    },
    resolve: {
        alias: {
            PresentationalComponents: path.join(__dirname, '../src/PresentationalComponents'),
            SmartComponents: path.join(__dirname, '../src/SmartComponents'),
            Utilities: path.join(__dirname, '../src/Utilities'),
            Store: path.join(__dirname, '../src/store')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/i,
            use: [{ loader: 'source-map-loader' }, { loader: 'babel-loader' }, { loader: 'eslint-loader' }]
        }, {
            test: /\.s?[ac]ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development',
                        reloadAll: true
                    }
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }, {
            test: /\.(woff(2)?|ttf|jpg|png|eot|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        }]
    }
};

module.exports = webpackConfig;
