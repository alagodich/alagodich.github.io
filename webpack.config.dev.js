const config = require('./webpack.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

config.optimization = {
    minimize: false
};

config.devtool = 'eval-cheap-source-map';
config.watch = true;
config.mode = 'development';
config.plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}));

module.exports = config;
