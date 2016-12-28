const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    config = {
        cache: true,
        entry: {
            app: path.resolve('app/main.jsx'),
            metronome: path.resolve('app/metronome.jsx'),
            realbook: path.resolve('app/realbook.jsx'),
            vendors: [
                'jquery',
                './semantic/dist/semantic.css',
                './semantic/dist/semantic.js',
                './app/style.less',
                'react',
                'slick-carousel',
                'slick-carousel/slick/slick.css',
                'slick-carousel/slick/slick-theme.css'
            ]
        },
        output: {
            path: path.resolve('public'),
            filename: '[name].js'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
                filename: 'vendors.js',
                minChunks: Infinity
            }),
            new ExtractTextPlugin('app.css'),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ],
        module: {
            loaders: [
                /**
                 * Load jsx components with babel loader
                 */
                {
                    test: /\.jsx$/,
                    loader: 'babel'
                },
                // {
                //     /**
                //      * Exposing Snap
                //      */
                //     test: /Snap\.svg/,
                //     loader: 'expose?Snap'
                // },
                /**
                 * Extract all css to the separate file using ExtractTextPlugin
                 * Do the same for less
                 */
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css')
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract('style', 'css!less')
                },
                /**
                 * The following are for fonts and icons
                 */
                {
                    test: /\.(woff|woff2)$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
                },
                {
                    test: /\.ttf$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.eot$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.svg$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url?limit=25000'
                }
            ],
            noParse: []
        },
        resolve: {alias: {}},
        addVendor(name, path) {
            this.resolve.alias[name] = path;
            this.module.noParse.push(new RegExp(path));
        }
    };

// config.addVendor('snap-svg', path.resolve('bower_components/Snap.svg/dist/snap.svg.js'));

module.exports = config;
