const path = require('path'),
    webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    config = {
        entry: {
            site: path.resolve('client/main.jsx'),
            metronome: path.resolve('client/metronome.jsx'),
            realbook: path.resolve('client/realbook.jsx'),
            map: path.resolve('client/map.jsx')
        },
        output: {
            publicPath: '/public/',
            path: path.resolve('public'),
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
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
            ]
        }
    };

module.exports = config;
