var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	gutil = require('gulp-util');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
	'components/scripts/tagline.js',
	'components/scripts/template.js'];
var sassSources = ['components/sass/style.scss'];


gulp.task('coffee', function(){
	gulp.src(coffeeSources)
		.pipe(coffee({bare: true})
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))
			
});

/*gulp.task('log', function(){
	gutil.log('Anxiety tools are great!');
});*/



gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass', //where is sass directory?
			image: 'builds/development/images', //where the images are?
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
});



gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
});

gulp.task('default', ['coffee', 'js', 'compass', 'watch']);