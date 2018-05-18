const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const { join } = require('path');
const nodeExternals = require('../scripts/node-externals');

module.exports = merge(common, {
    mode: 'production',
    name: 'server',
    target: 'node',
    externals: nodeExternals,
    entry: [
        'babel-polyfill',
        join(__dirname, '../src/server/index')
    ],
    devtool: 'hidden-source-map',
    output: {
        filename: 'app.server.js',
        libraryTarget: 'commonjs2'
    },
    stats: {
        performance: false
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
});
