const config = require('./webpack.config');

config.optimization = {
    minimize: false
};

config.devtool = 'eval-cheap-source-map';
config.watch = true;
config.mode = 'development';

module.exports = config;
