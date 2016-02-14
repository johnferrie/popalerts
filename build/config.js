 // Base paths
var src  = 'frontend',
    static_dir = 'static';

// Export configuration object
module.exports = {
    // Image asset paths
    images : {
        src  : src + '/img/**/*.*',
        dest : static_dir + '/img',
    },

    // Font asset paths
    fonts : {
        src  : src + '/fonts/**/*.*',
        dest : static_dir + '/fonts'
        // vendor : ['node_modules/font-awesome/fonts/**.*']
    },

    // JavaScript paths
    scripts : {
        src    : src + '/js/main.js',
        watch  : [src + '/js/**/*.js'],
        dest   : static_dir + '/js',
        vendor : [],
    },

    // Stylesheet paths
    styles : {
        src   : src + '/sass/styles.scss',
        watch : src + '/sass/**/*.scss',
        dest  : static_dir + '/css',
    },
};
