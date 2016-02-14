 // Require modules
var gulp = require('gulp');

// Build all project components
gulp.task('build', ['images', 'styles', 'scripts', 'fonts'], function () {
    console.log('Build complete.');
});
