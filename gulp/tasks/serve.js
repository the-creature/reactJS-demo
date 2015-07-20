'use strict';

var gulp = require('gulp')
var gp = require('gulp-load-plugins')()

var argv = require('yargs')
  .default('dist', './dist')
  .default('port', 8000)
  .default('env', 'dev')
  .argv

gulp.task('serve', ['watch'], function() {
  gp.connect.server({
    port: argv.port,
    root: argv.dist,
    livereload: true
  })
})

