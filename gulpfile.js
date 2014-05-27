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
  			  'bower_components/jquery-ui/ui/jquery.ui.core.js', 
  			  'bower_components/jquery-ui/ui/jquery.ui.widget.js',
  			  'bower_components/jquery-ui/ui/jquery.ui.mouse.js',
  			  'bower_components/jquery-ui/ui/jquery.ui.position.js',
  			  'bower_components/jquery-ui/ui/jquery.ui.draggable.js',
  			  'bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch.js'])
	  	.pipe(concat('all-jquery.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('root/javascript'))
});

gulp.task('less', function() {
    gulp.src('assets/less/styles.less')
	  	.pipe(less())
	    .pipe(cssminify())
	    .pipe(gulp.dest('root/stylesheets'))
});

gulp.task('images', function() {
    gulp.src('assets/images/*')
	    .pipe(gulp.dest('root/images'))
});

gulp.task('closure', ['bower'], function() {
    gulp.src('bower_components/closure-library/**')
	    .pipe(gulp.dest('root/javascript/closure-library'))
});

gulp.task('css', function() {
    gulp.src(['assets/stylesheets/pygment_trac.css', 'assets/stylesheets/stylesheet.css'])
	  	.pipe(concat('page.css'))
	    .pipe(cssminify())
	    .pipe(gulp.dest('root/stylesheets'))
});

gulp.task('default', ['css', 'less', 'images', 'closure', 'jquery']);
