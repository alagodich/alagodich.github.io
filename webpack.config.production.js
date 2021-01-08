const config = require('./webpack.config'),
    CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

config.mode = 'production';

config.optimization = {
    minimize: true,
    minimizer: [
        '...',
        new CssMinimizerPlugin()
    ]
};

module.exports = config;
