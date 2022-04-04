const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    output: {
        uniqueName: 'counterWriter',
        publicPath: 'auto'
    },
    optimization: {
        runtimeChunk: false
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'wc2',
            library: {
                type: 'var',
                name: 'wc2' // This name is used in the host as prefix in the URL: wc1@http://localhost:4220/angular-wc.js
            },
            filename: 'angular-wc.js', // This filename is used in the host when defining the URL of the remote
            exposes: {
                // Note: key must be in format `./<key>` when it is used in the host // TODO find reason?
                './web-components': path.join(__dirname, './src/bootstrap') // The key is used in the host when importing the code in the application
            },
            shared: {
                '@angular/core': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: '~12.2.8'
                },
                '@angular/elements': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: '~12.2.8'
                },
                '@angular/platform-browser': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: '~12.2.8'
                },
                '@angular/platform-browser-dynamic': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: '~12.2.8'
                },
                'rxjs': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: '^7.4.0'
                }
            }
        })
    ]
};