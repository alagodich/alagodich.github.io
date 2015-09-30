module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                src: ['jquery/dist/jquery.min.js', 'semantic/dist/semantic.min.*'],
                dest: 'assets/',
                expand: true,
                flatten: true,
                cwd: 'bower_components'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);
};