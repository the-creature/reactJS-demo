'use strict';

var gulp = require('gulp')

gulp.task('watch', ['assets', 'style', 'html', 'watchify'], function() {
  gulp.watch('./src/**/*.scss', ['style'])
  gulp.watch('./src/*.jade', ['html'])
})