const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/main',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 4210
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        publicPath: 'auto'
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin({
            name: 'wc1',
            library: {
                type: 'var',
                name: 'wc1' // This name is used in the host as prefix in the URL: wc1@http://localhost:4210/vanilla-wc.js
            },
            filename: 'vanilla-wc.js', // This filename is used in the host when defining the URL of the remote
            exposes: {
                // Note: key must be in format `./<key>` when it is used in the host // TODO find reason?
                './component': './src/counter-reader' // The key is used in the host when importing the code in the application
            },
            shared: {
                'rxjs': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: '^7.4.0'
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        })
    ]
    
}