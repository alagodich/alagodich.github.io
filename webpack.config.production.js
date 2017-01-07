const config = require('./webpack.config'),
    webpack = require('webpack');

config.plugins = config.plugins.concat(
    new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

module.exports = config;
