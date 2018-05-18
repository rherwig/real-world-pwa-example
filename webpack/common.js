const { join } = require('path');

module.exports = {
    output: {
        path: join(__dirname, '../public/assets'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            join(__dirname, '../node_modules'),
            join(__dirname, '../src')
        ]
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }, {
            test: /\.(png|jpg|jpeg|svg|gif|ico|webp)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }
        }, {
            test: /\.(woff|woff2|ttf|eot|otf)/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    }
};
