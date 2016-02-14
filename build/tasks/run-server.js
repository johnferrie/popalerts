 // Require modules
var gulp        = require('gulp'),
    nodemon = require('gulp-nodemon'),
    config      = require('../config');

gulp.task('run-server', function (cb) {
    var started = false;

    return nodemon({
        script: './bin/www'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});
