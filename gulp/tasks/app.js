'use strict';

var gulp = require('gulp')
var babelify = require('babelify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
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

var bundler = browserify('./src/main.js', {
  paths: ['./node_modules', './src', './src/env/' + argv.env],
  debug: true,
  verbose: true
}).transform(babelify)


gulp.task('app', function() {
  return emit(bundler.bundle()
    .pipe(source('app.js')))
})
