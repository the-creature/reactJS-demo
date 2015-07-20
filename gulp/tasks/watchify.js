'use strict';

var gulp = require('gulp')
var watchify = require('watchify')
var source = require('vinyl-source-stream')
var gp = require('gulp-load-plugins')()
var browserify = require('browserify')
var babelify = require('babelify')

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

function logError(error) {
  gp.util.log(gp.util.colors.red('ERROR'), error.message)
  this.emit('end')
}

gulp.task('watchify', function() {
  bundler = watchify(bundler)
  function bundle() {
    return emit(bundler.bundle()
      .on('error', logError)
      .pipe(source('app.js')))
  }
  bundler.on('update', bundle)
  bundler.on('log', gp.util.log)
  return bundle()
})