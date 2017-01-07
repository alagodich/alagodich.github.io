'use strict';

const loader = require('load-grunt-tasks'),
    webpackConfig = require('./webpack.config.js'),
    webpack = require('webpack');

module.exports = function (grunt) {
    loader(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: ['app/**/*.js*']
        },
        eslint: {
            options: {
                config: './eslintrc.json'
            },
            src: ['app/**/*.js*']
        },
        webpack: {
            options: webpackConfig,
            prod: {
                plugins: webpackConfig.plugins.concat(
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
                )
            },
            dev: {
                devtool: 'source-map',
                plugins: webpackConfig.plugins.concat(
                    new webpack.LoaderOptionsPlugin({
                        debug: true
                    })
                )
            }
        },
        jekyll: {
            options: {
                bundleExec: true
                // src: '<%= app %>'
            },
            dist: {
                options: {
                    dest: '<%= dist %>',
                    config: '_config.yml,_config.build.yml'
                }
            },
            serve: {
                options: {
                    serve: true,
                    dest: '.jekyll',
                    drafts: true,
                    future: true
                }
            }
        },
        clean: {
            public: ['public']
        },
        exec: {
            // Touch file to make jekyll rebuild the site
            touch: {
                stdout: true,
                command: 'touch -am _layouts/default.html'
            }
        },
        watch: {
            frontend: {
                files: ['app/components/**/*.jsx', 'app/*.jsx', 'app/style.less'],
                tasks: ['webpack:dev', 'exec:touch'],
                options: {
                    spawn: false
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['_site/**']
                },
                options: {
                    proxy: 'localhost:4000'
                }
            }
        }
    });

    grunt.registerTask('dev', ['webpack:dev', 'watch:frontend']);
    grunt.registerTask('default', ['jscs', 'eslint']);
    grunt.registerTask('build', ['clean:public', 'webpack:prod']);
};
