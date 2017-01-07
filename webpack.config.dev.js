const config = require('./webpack.config'),
    webpack = require('webpack');

config.plugins = config.plugins.concat(
    new webpack.LoaderOptionsPlugin({
        debug: true
    })
);

config.watch = true;

module.exports = config;
