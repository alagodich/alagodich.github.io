module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            bower: {
                src: ['jquery/dist/jquery.min.*', 'semantic/dist/semantic.min.*'],
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
            npm: {
                src: ['react/dist/react.*'],
                dest: 'assets/',
                expand: true,
                flatten: true,
                cwd: 'node_modules'
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
                    "dest": "temp/build",
                    "ext": ".js"
                }]
            }
        },
        uglify: {
            build: {
                src: 'js/app.js',
                dest: 'js/app.min.js'
            }
        },
        watch: {
            less: {
                files: ['app/*.js'],
                tasks: ['compile'],
                options: {
                    spawn: false
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    'js/app.js': ['temp/build/app.js']
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['copy']);
    grunt.registerTask('compile', ['babel', 'browserify', 'uglify']);
};