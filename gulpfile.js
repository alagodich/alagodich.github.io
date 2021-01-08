const gulp = require('gulp');

/**
 * Fomantic UI tasks
 * @see https://fomantic-ui.com/introduction/build-tools.html
 */
// read user config to know what task to load
require('./semantic/tasks/config/user');

require('./semantic/tasks/collections/build')(gulp);
require('./semantic/tasks/collections/various')(gulp);
require('./semantic/tasks/collections/install')(gulp);

gulp.task('build-fomantic', gulp.series('clean', gulp.parallel(['build-css', 'build-assets'])));
