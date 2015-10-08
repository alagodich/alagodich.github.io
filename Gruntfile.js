module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            bower: {
                src: ['jquery/dist/jquery.min.map', 'semantic/dist/semantic.min.css'],
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
            }
        },
        concat: {
            options: {
                separator: "\n;",
                stripBanners: true
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/semantic/dist/semantic.min.js',
                    'node_modules/react/dist/react.min.js'
                ],
                dest: 'assets/vendor.min.js'
            }
        },
        babel: {
            options: {
                sourceMap: false,
                comments: false
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "app/",
                    "src": ["*.js"],
                    "dest": "app/build",
                    "ext": ".js"
                }]
            }
        },
        browserify: {
            dist: {
                files: {
                    'assets/app.js': ['app/build/app.js']
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
            }
        },
        watch: {
            assets: {
                files: ['app/*.js', 'less/*.less'],
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
                    "assets/style.css": "less/style.less"
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

    grunt.registerTask('default', ['copy', 'concat']);
    grunt.registerTask('compile', ['babel', 'browserify', 'uglify', 'less']);
};