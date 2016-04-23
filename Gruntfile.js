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
            src: ['app/**/*', '!app/experiments/**/*']
        },
        eslint: {
            options: {
                config: '.eslintrc.json'
            },
            src: ['app/**/*', '!app/experiments/**/*']
        },
        webpack: {
            options: webpackConfig,
            prod: {
                plugins: webpackConfig.plugins.concat(
                    // FIXME: doesn't work
                    new webpack.DefinePlugin({
                        'process.env': {
                            //This has effect on the react lib size
                            NODE_ENV: JSON.stringify('production')
                        }
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                    //FIXME: It break the app for some reason
                    new webpack.optimize.OccurenceOrderPlugin()
                )
            },
            dev: {
                devtool: 'source-map',
                debug: true
            }
        },
        jekyll: { // Task
            options: { // Universal options
                bundleExec: true
                // src: '<%= app %>'
            },
            dist: { // Target
                options: { // Target options
                    dest: '<%= dist %>',
                    config: '_config.yml,_config.build.yml'
                }
            },
            serve: { // Another target
                options: {
                    serve: true,
                    dest: '.jekyll',
                    drafts: true,
                    future: true
                }
            }
        },
        clean: {
            ember: ['experiments']
        },
        copy: {
            bower: {
                src: ['Snap.svg/dist/snap.svg-min.js'],
                dest: 'public/',
                expand: true,
                flatten: true,
                cwd: 'bower_components'
            },
            ember: {
                src: '**',
                dest: 'experiments/',
                expand: true,
                cwd: 'app/experiments/dist'
            }
        },
        exec: {
            // Touch file to make jekyll rebuild the site
            touch: {
                stdout: true,
                command: 'touch -am _data/params.json'
            },
            ember: {
                stdout: true,
                command: 'ember build --environment=production',
                cwd: 'app/experiments'
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
    grunt.registerTask('build', ['copy:bower', 'webpack:prod']);
//grunt.registerTask('default', ['copy:bower', 'copy:fonts', 'concat']);
    grunt.registerTask('compile', ['babel', 'browserify', 'uglify', 'less']);
    grunt.registerTask('deploy-ember', ['exec:ember', 'clean:ember', 'copy:ember']);
};
