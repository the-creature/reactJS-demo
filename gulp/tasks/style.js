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

gulp.task('style', function() {
  return emit(gulp.src('./src/**/*.scss')
    .pipe(gp.sass().on('error', gp.sass.logError))
    .pipe(gp.concat('style.css')))
})