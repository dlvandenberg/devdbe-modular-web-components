const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 4201
    },
    output: {
        publicPath: 'auto'
    },
    module: {
        rules: [
            {
                test: /bootstrap\.js$/,
                loader: 'bundle-loader',
                options: {
                    lazy: true
                }
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-react'
                    ]
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'shell',
            remotes: {
                // key must match first part of import in application, e.g. `import(<key>/<remoteKey>)`
                // where <remoteKey> is the key in the exposes object of the remote module webpack config
                // url prefix (before the `@`) must match the library name in the the remote module webpack config
                vanilla: 'wc1@http://localhost:4210/vanilla-wc.js',
                angular: 'wc2@http://localhost:4220/angular-wc.js'
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './public/assets',
                    to: './assets'
                }
            ]
        })
    ]
};