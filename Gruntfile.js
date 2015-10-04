module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
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
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);
};