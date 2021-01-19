const path = require('path'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    config = {
        entry: {
            site: path.resolve('client/main.tsx'),
            metronome: path.resolve('client/metronome.tsx'),
            metronomeworker: path.resolve('client/components/metronome/metronomeworker.js'),
            realbook: path.resolve('client/realbook.tsx'),
            map: path.resolve('client/map.tsx'),
            csound: path.resolve('client/csound.tsx'),
            tensorflow: path.resolve('client/tensorflow.tsx')
        },
        output: {
            publicPath: '/public/',
            path: path.resolve('docs/public'),
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ],
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
                {test: /\.(css|less)$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']},
                {test: /\.(woff(2)?|ttf|png|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader']},
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
                },
                {
                    test: /\.csd$/i,
                    use: 'raw-loader'
                }
            ]
        }
    };

module.exports = config;
