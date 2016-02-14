// Require modules
var gulp       = require('gulp'),
    // argv       = require('yargs').argv,
    config     = require('../config');
    // debug      = !argv.production;

// Copy images
gulp.task('fonts-vendor', function () {
    if (config.fonts.vendor) {
        return gulp.src(config.fonts.vendor)
            .pipe(gulp.dest(config.fonts.dest));
    }
});

// Copy fonts
gulp.task('fonts', ['fonts-vendor'], function () {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
});
