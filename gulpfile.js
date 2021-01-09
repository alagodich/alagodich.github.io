const gulp = require('gulp'),
    path = require('path');

/**
 * Fomantic UI tasks
 * @see https://fomantic-ui.com/introduction/build-tools.html
 */
// read user config to know what task to load
require('./semantic/tasks/config/user');

require('./semantic/tasks/collections/build')(gulp);
require('./semantic/tasks/collections/various')(gulp);
require('./semantic/tasks/collections/install')(gulp);

gulp.task('copy-overrides', () =>
    gulp.src(path.resolve('./client/site/**'))
        .pipe(
            gulp.dest(path.resolve('./semantic/src/site/'))
        ));

gulp.task('build-fomantic', gulp.series(
    'clean',
    'copy-overrides',
    gulp.parallel(['build-css', 'build-assets']))
);
