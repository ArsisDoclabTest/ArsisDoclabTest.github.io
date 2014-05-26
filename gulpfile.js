var gulp = require('gulp'),
	concat = require('gulp-concat'),
	less = require('gulp-less'),
	uglify = require('gulp-uglify'),
	cssminify = require('gulp-minify-css'),
	bower = require('gulp-bower');

gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest('bower_components/'));
});

gulp.task('jquery', ['bower'], function() {
  	gulp.src(['bower_components/jquery/jquery.js', 
  			  'bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch.js', 
  			  'bower_components/jquery-ui/ui/jquery.ui.core.js', 
  			  'bower_components/jquery-ui/ui/jquery.ui.widget.js',
  			  'bower_components/jquery-ui/ui/jquery.ui.mouse.js',
  			  'bower_components/jquery-ui/ui/jquery.ui.position.js',
  			  'bower_components/jquery-ui/ui/jquery.ui.draggable.js'])
	  	.pipe(concat('all-jquery.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('root/javascript'))
});

gulp.task('less', function() {
    gulp.src('assets/less/index.less')
	  	.pipe(less())
	    .pipe(cssminify())
	    .pipe(gulp.dest('root/css'))
});

gulp.task('css', function() {
    gulp.src('assets/stylesheets')
	  	.pipe(concat('page.css'))
	    .pipe(cssminify())
	    .pipe(gulp.dest('root/css'))
});

gulp.task('default', ['css', 'less', 'jquery']);
