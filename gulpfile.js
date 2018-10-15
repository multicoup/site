var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var notifier = require('node-notifier');
var imageop = require('gulp-image-optimization');
var babel = require('gulp-babel');


gulp.task('css', function() {
	return gulp.src('src/scss/app.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass())
		.pipe(plugins.csso()) //minify
		.pipe(plugins.rename({
			suffix: '.min'
		}))
		.pipe(plugins.sourcemaps.write('maps', {
			sourceRoot: '/src/scss'
		}))
		.pipe(gulp.dest('dist/css/'))
});


gulp.task('js', function(cb) {
	return gulp.src('src/js/**/*.js')
		.pipe(plugins.sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(plugins.uglify())
		.pipe(plugins.rename({
			suffix: '.min'
		}))
		.pipe(plugins.sourcemaps.write('maps', {
			sourceRoot: '/src/js'
		}))
		.pipe(gulp.dest('dist/js/'))
});



gulp.task('watch', function() {
	gulp.watch('src/**', function() {
		runSequence('css', 'js', function() {
			console.log('Gulpifiage terminé.');
			notifier.notify({
				title: 'Gulp Production Build',
				message: 'CLEAN, CSS, JS IN FRONT DIR files/dir are gulpified.'
			});
		});

	});
});