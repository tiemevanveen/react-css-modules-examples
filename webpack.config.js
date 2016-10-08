var webpack,
    path,
    WriteFilePlugin,
    autoprefixer,
    devServer;

webpack = require('webpack');
path = require('path');
autoprefixer = require('autoprefixer');
ExtractTextPlugin = require('extract-text-webpack-plugin');

devServer = {
    contentBase: path.resolve(__dirname, './endpoint'),
    colors: true,
    quiet: false,
    noInfo: false,
    publicPath: '/static/',
    historyApiFallback: false,
    host: '127.0.0.1',
    lazy: true,
    port: 8000,
    hot: false
};

module.exports = {
    devtool: 'source-source-map',
    debug: true,
    devServer: devServer,
    context: path.resolve(__dirname, './src'),
    entry: {
        app: [
            'webpack-dev-server/client?http://' + devServer.host + ':' + devServer.port,
            './'
        ]
    },
    output: {
        path: path.resolve(__dirname, './endpoint/static'),
        filename: '[name].js',
        publicPath: devServer.publicPath
    },
    plugins: [
        new ExtractTextPlugin('app.css', {
            allChunks: true
        }),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                    'postcss-loader',
                    // this also fails:
                    // 'postcss-loader?parser=postcss-scss',
                    'sass'
                ]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                loaders: [
                    'babel'
                ]
            }
        ]
    },
    postcss: [
        autoprefixer({ browsers: ['> 0.5%'] })
    ],
    resolve: {
        extensions: [
            '',
            '.js'
        ]
    }
};
