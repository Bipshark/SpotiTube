var gulp = require('gulp')
, 	source = require('vinyl-source-stream')
, 	browserify = require('browserify')
, 	watchify = require('watchify')
, 	reactify = require('reactify')
, 	gulpif = require('gulp-if')
, 	uglify = require('gulp-uglify')
, 	streamify = require('gulp-streamify')
, 	notify = require('gulp-notify')
, 	concat = require('gulp-concat')
, 	cssmin = require('gulp-cssmin')
, 	gutil = require('gulp-util')
, 	shell = require('gulp-shell')
, 	glob = require('glob')
, 	livereload = require('gulp-livereload')
, 	jasminePhantomJs = require('gulp-jasmine2-phantomjs')
, 	webserver = require('./server/main.js');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
	'react-addons',
	'flux-react'
];

var browserifyTask = function (options) {
	var appBundler = browserify({
		entries: [options.src], // Only need initial file, browserify finds the rest
		transform: [reactify], // We want to convert JSX to normal javascript
		debug: options.development, // Gives us sourcemapping
		cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
	});

	appBundler.external(options.development ? dependencies : []);

	var rebundle = function () {
		var start = Date.now();
		console.log('Building APP bundle');
		appBundler.bundle()
		.on('error', gutil.log)
		.pipe(source('main.js'))
		.pipe(gulpif(!options.development, streamify(uglify())))
		.pipe(gulp.dest(options.dest))
		.pipe(gulpif(options.development, livereload()))
		.pipe(notify(function () {
			console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
		}));
	};

	if (options.development) {
		appBundler = watchify(appBundler);
		appBundler.on('update', rebundle);
	}

	rebundle();

	if (options.development) {
		var testFiles = glob.sync('./specs/**/*-spec.js');
		var testBundler = browserify({
			entries: testFiles,
			debug: true,
			transform: [reactify],
			cache: {}, packageCache: {}, fullPaths: true
		});

		testBundler.external(dependencies);

		var rebundleTests = function () {
			var start = Date.now();
			console.log('Building TEST bundle');
			testBundler.bundle()
			.on('error', gutil.log)
			.pipe(source('specs.js'))
			.pipe(gulp.dest(options.dest))
			.pipe(livereload())
			.pipe(notify(function () {
				console.log('TEST bundle built in ' + (Date.now() - start) + 'ms');
			}));
		};

		testBundler = watchify(testBundler);
		testBundler.on('update', rebundleTests);
		rebundleTests();

		if (!options.development) {
			dependencies.splice(dependencies.indexOf('react-addons'), 1);
		}

		var vendorsBundler = browserify({
			debug: true,
			require: dependencies
		});

		var start = new Date();
		console.log('Building VENDORS bundle');
		vendorsBundler.bundle()
		.on('error', gutil.log)
		.pipe(source('vendors.js'))
		.pipe(gulpif(!options.development, streamify(uglify())))
		.pipe(gulp.dest(options.dest))
		.pipe(notify(function () {
			console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
		}));
	}
}

var cssTask = function (options) {
	if (options.development) {
		var run = function () {
			console.log(arguments);
			var start = new Date();
			console.log('Building CSS bundle');
			gulp.src(options.src)
			.pipe(concat('main.css'))
			.pipe(gulp.dest(options.dest))
			.pipe(notify(function () {
				console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
			}));
		};
		run();
		gulp.watch(options.src, run);
	} else {
		gulp.src(options.src)
		.pipe(concat('main.css'))
		.pipe(cssmin())
		.pipe(gulp.dest(options.dest));
	}
}

// Starts our development workflow
gulp.task('default', function () {
	browserifyTask({
		development: true,
		src: './app/main.js',
		dest: './build'
	});

	cssTask({
		development: true,
		src: './styles/**/*.css',
		dest: './build'
	});

	webserver.start({
		livereload: true,
		hostname: "localhost",
		port: 4567,
		directory: "./build"
	});
});

gulp.task('webserver', ['deploy'], function() {
	webserver.start({
		livereload: false,
		hostname: "localhost",
		port: 4567,
		directory: "./dist"
	});
});

gulp.task('deploy', function () {

	browserifyTask({
		development: false,
		src: './app/main.js',
		dest: './dist'
	});

	cssTask({
		development: false,
		src: './styles/**/*.css',
		dest: './dist'
	});

});

gulp.task('test', function () {
	return gulp.src('./build/testrunner-phantomjs.html').pipe(jasminePhantomJs());
});
