const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common');
const { join, resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    name: 'client',
    target: 'web',
    entry: [
        join(__dirname, '../src/client/index')
    ],
    devtool: 'hidden-source-map',
    output: {
        filename: 'app.client.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            CACHE_NAME: JSON.stringify(`pstore-${+new Date()}`)
        }),
        new ExtractTextPlugin('app.bundle.css'),
        new StatsWebpackPlugin('stats.json'),
        new WebpackPwaManifest({
            name: 'PStore',
            short_name: 'PStore',
            description: 'A Progressive WebApp Demo Store',
            theme_color: '#2c3e50',
            background_color: '#2c3e50',
            start_url: 'https://localhost:3000',
            display: 'standalone',
            icons: [{
                src: resolve(__dirname, '../src/assets/pwa/android-chrome-192x192.png'),
                sizes: [192]
            }, {
                src: resolve(__dirname, '../src/assets/pwa/android-chrome-512x512.png'),
                sizes: [512]
            }],
            filename: 'app.webmanifest',
            fingerprints: false,
            inject: false
        }),
        new ServiceWorkerPlugin({
            entry: join(__dirname, '../src/client/sw.js'),
            excludes: [
                '**/.*',
                '**/*.map',
                '**/*.hot-update.json'
            ]
        })
    ]
});
