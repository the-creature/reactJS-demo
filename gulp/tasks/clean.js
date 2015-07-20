'use strict';

var del = require('del')
var gulp = require('gulp')

var argv = require('yargs')
  .default('dist', './dist')
  .default('port', 8000)
  .default('env', 'dev')
  .argv

gulp.task('clean', function(cb) {
  del(argv.dist, cb)
})