 // Require modules
var gulp       = require('gulp'),
    browserify = require("browserify"),
    notify     = require('gulp-notify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif     = require('gulp-if'),
    config     = require('../config');

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
}

// Compile JS
gulp.task('scripts', function () {
    return browserify(['./' + config.scripts.src])
            .transform("babelify")
            .bundle()
            .on('error', handleErrors)
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(sourcemaps.init({ loadMaps : true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.scripts.dest));
});
