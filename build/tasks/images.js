 // Require modules
var gulp       = require('gulp'),
    // argv       = require('yargs').argv,
    config     = require('../config');
    // debug      = !argv.production;

// Copy images
gulp.task('images', function () {
    return gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.dest));
});
