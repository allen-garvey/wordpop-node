"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var outputDir = 'public_html/';
var scriptsOutputDir = outputDir + 'scripts';
var sassOutputDir = outputDir + 'styles';
var sassOptions = {
					  errLogToConsole: true,
					  // sourceComments: true, //turns on line number comments 
					  outputStyle: 'compressed' //options: expanded, nested, compact, compressed
					};

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
gulp.task('watchScripts', ['minifyScripts'], function(){
	gulp.watch('js/**/*.js', ['minifyScripts']);
});

/*
* Sass/Styles Tasks
*/
gulp.task('sass', function() {
    gulp.src('sass/' + '**/*.scss')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest(sassOutputDir));
});

gulp.task('watchSass', ['sass'], function() {
    gulp.watch(config.styles.SOURCE_DIR + '**/*.scss', ['sass']);
});

gulp.task('watch', ['watchSass', 'watchScripts']);
gulp.task('build', ['minifyScripts', 'sass']);
gulp.task('default', ['build']);
