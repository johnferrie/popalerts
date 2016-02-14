 // Require modules
var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    config      = require('../config');

// Browser-sync task for starting the server.
gulp.task('browser-sync', ['run-server'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["static/**/*.*"],
        browser: "google chrome",
        port: 7000,
    });
});
