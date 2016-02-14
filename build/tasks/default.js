 // Require modules
var gulp   = require('gulp'),
    reload = require('browser-sync').reload,
    config = require('../config');

// Build and watch a project
gulp.task('default', ['build', 'browser-sync'], function () {
    gulp.watch(config.images.src, ['images', reload]);
    gulp.watch(config.fonts.src, ['fonts', reload]);
    gulp.watch(config.styles.watch, ['styles', reload]);
    gulp.watch(config.scripts.watch, ['scripts', reload]);
});
