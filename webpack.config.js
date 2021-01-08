const path = require('path'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    config = {
        target: 'web',
        cache: true,
        entry: {
            site: path.resolve('client/main.jsx'),
            metronome: path.resolve('client/metronome.jsx'),
            // realbook: path.resolve('client/realbook.jsx'),
            map: path.resolve('client/map.jsx')
            // vendors: [
            //     'jquery',
            //     'react',
            //     './semantic/dist/semantic.css',
            //     'semantic-ui-react',
            //     './client/style.less',
            //     'slick-carousel',
            //     'slick-carousel/slick/slick.css',
            //     'slick-carousel/slick/slick-theme.css'
            // ]
        },
        output: {
            publicPath: '',
            path: path.resolve('public'),
            filename: '[name].js'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ],
        module: {
            rules: [
                /**
                 * Load jsx components with babel loader
                 */
                {
                    test: /\.(jsx|js)$/,
                    loader: 'babel-loader'
                },
                /**
                 * Extract all css to the separate file using ExtractTextPlugin
                 * Do the same for less
                 */
                {
                    test: /\.(css|less)$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
                },
                {
                    test: /\.(woff(2)?|ttf|png|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192
                            }
                        }
                    ]
                }
                // Get rid of snap, use something else
                // {
                //     test: require.resolve('snapsvg/dist/snap.svg.js'),
                //     loader: 'imports-loader',
                //     options: {
                //         wrapper: {
                //             thisArg: 'window'
                //         }
                //     }
                //     // use: 'imports-loader?this=>window,fix=>module.exports=0'
                // }
            ]
        }
        // resolve: {
        //     alias: {
        //         snapsvg: 'snapsvg/dist/snap.svg.js'
        //     }
        // }
    };

module.exports = config;
