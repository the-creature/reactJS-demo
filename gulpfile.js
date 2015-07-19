'use strict'

var del = require('del')
var gulp = require('gulp')
var babelify = require('babelify')
var watchify = require('watchify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var gp = require('gulp-load-plugins')()

var argv = require('yargs')
	.default('dist', './dist')
	.default('port', 8000)
	.default('env', 'dev')
	.argv

var bundler = browserify('./src/main.js', {
	paths: ['./node_modules', './src', './src/env/' + argv.env],
	debug: true,
	verbose: true
}).transform(babelify)

gulp.task('default', ['assets', 'style', 'html', 'app'])
gulp.task('watch', ['assets', 'style', 'html', 'watchify'], function() {
	gulp.watch('./src/**/*.scss', ['style'])
	gulp.watch('./src/*.jade', ['html'])
})
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
gulp.task('serve', ['watch'], function() {
	gp.connect.server({
		port: argv.port,
		root: argv.dist,
		livereload: true
	})
})

gulp.task('assets', function() {
	return emit(gulp.src(['./assets/**']))
})
gulp.task('style', function() {
	return emit(gulp.src('./src/**/*.scss')
		.pipe(gp.sass().on('error', gp.sass.logError))
		.pipe(gp.concat('style.css')))
})
gulp.task('html', function() {
	return emit(gulp.src('./src/*.jade')
		.pipe(gp.jade()))
})
gulp.task('app', function() {
	return emit(bundler.bundle()
		.pipe(source('app.js')))
})

gulp.task('clean', function(cb) {
	del(argv.dist, cb)
})

function logError(error) {
	gp.util.log(gp.util.colors.red('ERROR'), error.message)
	this.emit('end')
}
function emit(stream) {
	return stream
		.pipe(gulp.dest(argv.dist))
		.pipe(gp.connect.reload())
}
