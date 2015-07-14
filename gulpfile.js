"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');

var scriptsDir = 'public_html/scripts';

gulp.task('concatScripts', function(){
	return gulp.src(['js/counted_set.js', 'js/data_viz.js', 'js/app.js'])
		.pipe(maps.init())
		.pipe(concat('app.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(scriptsDir));
});

gulp.task('minifyScripts', ['concatScripts'], function(){
	return gulp.src(scriptsDir + '/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest(scriptsDir));
});
gulp.task('watchScripts', function(){
	gulp.watch('js/**/*.js', ['minifyScripts']);
});

gulp.task('build', ['minifyScripts']);
gulp.task('default', ['build']);
