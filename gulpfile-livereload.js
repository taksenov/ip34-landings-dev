/**
 * Created by taksenov on 12.09.2014.
 */
'use strict';

var gulp         = require('gulp'),
    livereload   = require('gulp-livereload'),
    connect      = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('less', function () {
    gulp.src('./dev/css/*.less')
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./dev/css/*.css')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    livereload.listen();
//    gulp.watch('index.html', ['html']);
//    gulp.watch('./dev/css/*.less', ['less']);
//    gulp.watch('./dev/css/*.css', ['css']);
//    gulp.watch('index.html', ['html']);
//    gulp.watch('./dev/css/*.less', ['less']);
//    gulp.watch('./dev/css/*.css', ['css']);
    gulp.watch('index.html').on('change', livereload.changed);
    gulp.watch('./dev/css/*.less').on('change', livereload.changed);
    gulp.watch('./dev/css/*.css').on('change', livereload.changed);
});

/*
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('build/**').on('change', livereload.changed);
});

*/

gulp.task('default', ['connect', 'html', 'less', 'css', 'watch']);
