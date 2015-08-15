"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');

var scriptsOutputDir = 'public_html/scripts';

gulp.task('concatScripts', function(){
	return gulp.src(['js/wordpop_util.js', 'js/counted_set.js', 'js/counted_category_set.js', 'js/data_viz.js', 'js/cities_comparison.js', 'js/app.js'])
		.pipe(maps.init())
		.pipe(concat('app.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(scriptsOutputDir));
});

gulp.task('minifyScripts', ['concatScripts'], function(){
	return gulp.src(scriptsOutputDir + '/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest(scriptsOutputDir));
});
gulp.task('watchScripts', function(){
	gulp.watch('js/**/*.js', ['minifyScripts']);
});

gulp.task('build', ['minifyScripts']);
gulp.task('default', ['build']);
