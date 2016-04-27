var gulp = require('gulp');
var sass = require('gulp-sass');

/*
 * PATHS
 */

var paths = {
    sass: ['./common/scss/**/*.scss'],
    css: ['./common/css/']
};

/*
 * GULP
 */

gulp.task('default', ['sass', 'watch']);


/*
 * SASS
 */
gulp.task('sass', function (done) {
    gulp.src(paths.sass)
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./common/css/'))
        .on('end', done);
});


/*
 * WATCH
 */

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});