'use strict'

var gulp = require('gulp')
var gp = require('gulp-load-plugins')()
var requireDir  = require('require-dir');


requireDir('./gulp/tasks', { recurse: true });
