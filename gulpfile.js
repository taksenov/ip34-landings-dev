/**
 * Created by taksenov on 12.09.2014.
 */
'use strict';

var gulp         = require('gulp'),
    concatCSS    = require('gulp-concat-css'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    minifyCSS    = require('gulp-minify-css'),
    minifyJS     = require('gulp-jsmin'),
    concatJS     = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    less         = require('gulp-less');

// компиляция из LESS в CSS
gulp.task('less', function () {
    gulp.src('./dev/css/main.less')
        .pipe(less())
        .pipe(gulp.dest('./dev/less-compilation'))
        .pipe(notify('LESS compilation -- All done!'));
});

// обработка основных CSS
gulp.task('css', function () {
    gulp.src([
              //'./dev/css/jquery-ui.css',
              './dev/css/*.css',
              './dev/less-compilation/*.css',
              //'!./dev/css/vendors/jquery-ui.theme.css',
              //'!./dev/css/vendors/*.min.css',
              '!./dev/css/bootstrap-theme.css'
              ])
        .pipe(concatCSS('bundle.css'))
        .pipe(minifyCSS())
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('./app/css'))
        .pipe(notify('Css -- All done!'));
});

// обработка CSS под ie8
/*gulp.task('ie8Css', function () {
    gulp.src('./css/ie8support/ie8main.css')
        .pipe(concatCSS('ie8bundle.css'))
        .pipe(minifyCSS())
        .pipe(rename('ie8bundle.min.css'))
        .pipe(gulp.dest('./app/css/ie8support'))
        .pipe(notify('ie8Css -- All done!'));
});*/

// обработка JS-файлов
// минификация и конкатенация JS
// обязательное условие подключить сначала jquery
// а потом bootstrap
gulp.task('js', function() {
    gulp.src([
              './dev/js/jquery-2.1.1.js',
              './dev/js/bootstrap.js',
              './dev/js/*.js',
              //'./dev/js/parallax.js',
              './dev/js/modernizr-2.6.2.min.js',
              '!./dev/js/*.min.js',
              '!./dev/js/less.min.js',
              '!./dev/js/npm.js'
             ])
        .pipe(uglify())
        .pipe(concatJS('bundle.min.js'))
        .pipe(gulp.dest('./app/js'))
        .pipe(notify('JS -- All done!'));
});


//watch
//gulp.task('watch' , function() {
//    gulp.watch('./css/*.less', ['less'])
//    gulp.watch('./css/ie8support/ie8main.css', ['ie8Css'])
//    gulp.watch('./js/parallax.js', ['js'])
//});


// default
gulp.task('default', [
                      'less',
                      'css',
                      'js'
                     // 'ie8Css',
                     ]);
