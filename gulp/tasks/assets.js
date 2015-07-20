'use strict';

var gulp = require('gulp')
var gp = require('gulp-load-plugins')()

var argv = require('yargs')
  .default('dist', './dist')
  .default('port', 8000)
  .default('env', 'dev')
  .argv
  
function emit(stream) {
  return stream
    .pipe(gulp.dest(argv.dist))
    .pipe(gp.connect.reload())
}

gulp.task('assets', function() {
  return emit(gulp.src(['./assets/**']))
})