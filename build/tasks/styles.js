 // Require modules
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    scsslint     = require('gulp-scss-lint'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    normalize    = require('node-normalize-scss'),
    config       = require('../config');


// Compile SCSS into CSS
gulp.task('styles', function () {
    var sassConfig = {
        sourcemap : true,
        style     : 'compressed',
        loadPath  : 'bower_components/',
    };

    var autoprefixerConfig = {
        browsers: ['last 3 versions', '> 1%'],
    };


    return gulp.src(config.styles.src)
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: normalize.includePaths
         })
        .on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerConfig))
        .pipe(gulp.dest(config.styles.dest));
});
