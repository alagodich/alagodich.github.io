module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            ember: ['experiments']
        },
        copy: {
            bower: {
                src: ['jquery/dist/jquery.min.map', 'Snap.svg/dist/snap.svg-min.js'],
                dest: 'assets/',
                expand: true,
                flatten: true,
                cwd: 'bower_components'
            },
            fonts: {
                src: 'default/**',
                dest: 'assets/themes',
                expand: true,
                cwd: 'bower_components/semantic/dist/themes'
            },
            ember: {
                src: '**',
                dest: 'experiments/',
                expand: true,
                cwd: 'app/experiments/dist'
            }
        },
        concat: {
            options: {
                separator: '\\n;',
                stripBanners: true
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/semantic/dist/semantic.min.js',
                    'node_modules/react/dist/react.min.js',
                    'bower_components/owl.carousel/dist/owl.carousel.min.js'
                ],
                dest: 'assets/vendor.min.js'
            },
            styles: {
                src: [
                    'bower_components/semantic/dist/semantic.min.css',
                    'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
                    'bower_components/owl.carousel/dist/assets/owl.theme.default.min.css',
                    'bower_components/animate.css/animate.min.css'
                ],
                dest: 'assets/vendor.min.css'
            },
            highmaps: {
                src: [
                    'app/highmaps/highmaps.js',
                    'app/highmaps/drilldown.js',
                    'app/highmaps/world.js',
                    'app/highmaps/ru-all.js',
                    'app/highmaps/br-all.js',
                    'app/highmaps/us-all.js'
                ],
                dest: 'assets/highmaps.js'
            }
        },
        babel: {
            options: {
                sourceMap: false,
                comments: false
            },
            dist: {
                files: [{
                    'expand': true,
                    'cwd': 'app/',
                    'src': ['components/*.js', 'app.js'],
                    'dest': 'app/tmp',
                    'ext': '.js'
                }]
            }
        },
        browserify: {
            dist: {
                files: {
                    'assets/app.js': ['app/tmp/app.js']
                }
            }
        },
        uglify: {
            build: {
                src: 'assets/app.js',
                dest: 'assets/app.min.js'
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
            assets: {
                files: ['app/**/*.js', 'less/*.less', '!app/tmp/**', '!app/experiments/**'],
                tasks: ['compile', 'exec:touch'],
                options: {
                    spawn: false
                }
            }
        },
        less: {
            main: {
                options: {
                    compress: true
                },
                files: {
                    'assets/style.css': 'less/style.less'
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

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['copy:bower', 'copy:fonts', 'concat']);
    grunt.registerTask('compile', ['babel', 'browserify', 'uglify', 'less']);
    grunt.registerTask('deploy-ember', ['exec:ember', 'clean:ember', 'copy:ember']);
};