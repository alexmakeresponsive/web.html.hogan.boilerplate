'use strict';

/**
 * Constants
 * */

/*common consts*/
const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const debug         = require('gulp-debug');
const del           = require('del');
const concat        = require('gulp-concat');
const concatUtil    = require('gulp-concat-util');
const runSequence   = require('run-sequence');
const rename        = require("gulp-rename");
const nodemon       = require('gulp-nodemon');
const shell         = require('gulp-shell');
/*common consts*/

/*styles consts*/
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const cssnano       = require('gulp-cssnano');
/*styles consts*/

/*javascript consts*/
const pump          = require('pump');
const uglify        = require('gulp-uglify');
/*javascript consts*/

/*html consts*/
const htmlbeautify  = require('gulp-html-beautify');
/*html consts*/

/*assets consts*/
const gulpImagemin = require('gulp-imagemin');
/*assets consts*/

/**
 * Constants
 * */




/**
 * Theme tasks
 * */

    /**
     * Styles
     * */

    gulp.task( 'styles:clean', function() {
        del(
            [
                './public/design/theme/styles.theme.css',
                './public/design/theme/styles.theme.min.css',
            ]
        ).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });


    gulp.task('styles:build', function () {
        return gulp.src(
            [
                './src/design/theme/styles/variables.scss',

                './src/design/theme/styles/mixins.scss',

                './src/design/theme/styles/parts/font-faces.scss',

                './src/design/theme/styles/parts/normalize.scss',

                './src/design/theme/styles/parts/common.scss',

                './src/design/theme/styles/parts/pages/**/*.scss',
                './src/design/theme/styles/parts/parts/**/*.scss',

                './src/templates/pages/**/*.scss',
                './src/templates/parts/**/*.scss',
            ]
        )
            .pipe(concat('styles.theme.scss'))
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('./public/design/theme'));
    });


    gulp.task( 'styles:nano', function() {
        return gulp.src( './public/design/theme/styles.theme.css' )
            .pipe( cssnano() )
            .pipe( rename({
                suffix: ".min"
            }))
            .pipe( gulp.dest( './public/design/theme' ) );
    });


    gulp.task( 'styles', function() {
        runSequence(
            'styles:clean',
            'styles:build',
            'styles:nano'
        );
    });


    /**
     * Styles
     * */

    /**
     * Scripts
     * */

    gulp.task( 'scripts:clean', function() {
        del(
            [
                './public/design/theme/scripts.theme.js',
                './public/design/theme/scripts.theme.min.js',
            ]
        ).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });


    gulp.task('scripts:build', function () {
        return gulp.src(
            [
                './src/design/theme/scripts/scripts.js'
            ]
        )
            .pipe(concat('scripts.theme.js'))
            .pipe(gulp.dest('./public/design/theme'));
    });


    gulp.task('scripts:uglify', function (cb) {
        pump([
                gulp.src('./public/design/theme/scripts.theme.js'),
                uglify(),
                rename({
                    suffix: ".min"
                }),
                gulp.dest('./public/design/theme')
            ],
            cb
        );
    });

    gulp.task( 'scripts', function() {
        runSequence(
            'scripts:clean',
            'scripts:build',
            'scripts:uglify'
        );
    });

    /**
     * Scripts
     * */

/**
 * Theme tasks
 * */



/**
 * Vendor tasks
 * */

    /**
     * Styles
     * */

    gulp.task( 'vendor:styles:clean', function () {
        del(
            [
                './public/design/vendor/styles.vendor.min.css',
            ]
        ).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });

    //Build styles without minify files
    gulp.task( 'vendor:styles:part1', function() {
        return gulp.src(
            [
                '!./src/design/vendor/someLib1/**/*.css',
                '!./src/design/vendor/someLib2/**/*.css',

                './src/design/vendor/**/*.css'
            ]
        )
            .pipe( cssnano() )
            .pipe(concatUtil('styles.part1.min.css', { sep: '\n/*--separator--*/\n' }))
            .pipe( gulp.dest( './src/design/vendor' ) );
    });

    //Build styles from minify files
    gulp.task('vendor:styles:part2', function () {
        return gulp.src(
            [
                './src/design/vendor/someLib1/**/*.css',
                './src/design/vendor/someLib2/**/*.css',
            ]
        )
            .pipe(concatUtil('styles.part2.min.css', { sep: '\n/*--separator minify--*/\n' }))
            .pipe(gulp.dest('./src/design/vendor'));
    });


    gulp.task('vendor:styles:build', function () {
        return gulp.src(
            [
                './src/design/vendor/styles.part1.min.css',
                './src/design/vendor/styles.part2.min.css'
            ]
        )
            .pipe(concat('styles.vendor.min.css', { sep: '\n/*--separator parts--*/\n' }))
            .pipe(gulp.dest('./public/design/vendor'))
    });


    gulp.task( 'vendor:styles:del:parts', function () {
        del(
            [
                './src/design/vendor/styles.part1.min.css',
                './src/design/vendor/styles.part2.min.css'
            ]
        ).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });


    gulp.task( 'vendor:styles', function () {
        runSequence(
            'vendor:styles:clean',
            [ 'vendor:styles:part1', 'vendor:styles:part2' ],
            'vendor:styles:build',
            'vendor:styles:del:parts'
        );
    });

    /**
     * Styles
     * */

    /**
     * Scripts
     * */

    gulp.task( 'vendor:scripts:clean', function () {
        del(
            [
                './public/design/vendor/scripts.vendor.min.js',
            ]
        ).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });


    gulp.task( 'vendor:scripts:part1', function() {
        return gulp.src(
            [
                '!./src/design/vendor/someLib1/**/*.js',
                '!./src/design/vendor/someLib2/**/*.js',

                './src/design/vendor/**/*.js'
            ]
        )
            .pipe( uglify() )
            .pipe(concatUtil('scripts.part1.min.js', { sep: '\n/*--separator--*/\n' }))
            .pipe( gulp.dest( './src/design/vendor' ) );
    });


    gulp.task('vendor:scripts:part2', function () {
        return gulp.src(
            [
                './src/design/vendor/someLib1/**/*.js',
                './src/design/vendor/someLib2/**/*.js',
            ]
        )
            .pipe(concatUtil('scripts.part2.min.js', { sep: '\n/*--separator--*/\n' }))
            .pipe(gulp.dest('./src/design/vendor'));
    });


    gulp.task('vendor:scripts:build', function () {
        return gulp.src(
            [
                './src/design/vendor/scripts.part1.min.js',
                './src/design/vendor/scripts.part2.min.js'
            ]
        )
            .pipe(concatUtil('scripts.vendor.min.js', { sep: '\n/*--separator--*/\n' }))
            .pipe(gulp.dest('./public/design/vendor'))
    });


    gulp.task( 'vendor:scripts:del:parts', function () {
        del(
            [
                './src/design/vendor/styles.part1.min.js',
                './src/design/vendor/styles.part2.min.js'
            ]
        ).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });


    gulp.task( 'vendor:scripts', function () {
        runSequence(
            'vendor:scripts:clean',
            [ 'vendor:scripts:part1', 'vendor:scripts:part2' ],
            'vendor:scripts:build',
            'vendor:scripts:del:parts',
        );
    });

    /**
     * Scripts
     * */

/**
 * Vendor tasks
 * */




/**
 * Template tasks
 * */

gulp.task( 'templates:clean', function() {
    del(['./public/templates/*.js']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task( 'templates:build', shell.task(
    [
        'browserify -t brfs ./src/templates/pages/Home/Home.js > ./public/templates/home.templates.js',
        'browserify -t brfs ./src/templates/pages/About/About.js > ./public/templates/about.templates.js',
        'browserify -t brfs ./src/templates/pages/Home/single/PostHome/PostHome.js > ./public/templates/posthome.templates.js',
    ]
));

gulp.task( 'templates', function() {
    runSequence(
        'templates:clean',
        'templates:build',
    );
});

/**
 * Template tasks
 * */




/**
 * Watch tasks
 * */

gulp.task( 'watch:styles', function () {
    gulp.watch(
        [
            './src/design/theme/styles/**/*.scss',
            './src/templates/pages/**/*.scss',
            './src/templates/parts/**/*.scss'
        ],
        ['styles']
    );
});


gulp.task( 'watch:scripts', function () {
    gulp.watch(
        [
            './src/design/theme/scripts/scripts.js',
        ],
        ['scripts']
    );
});

gulp.task( 'watch:templates', function () {
    gulp.watch(
        [
            './src/templates/pages/**/*.js',
            './src/templates/pages/**/*.html',
            './src/templates/parts/**/*.js',
            './src/templates/parts/**/*.html',
        ],
        ['templates']
    );
});

gulp.task( 'watch:data', function () {
    gulp.watch(
        [
            './src/data/*.js',
        ],
        ['templates']
    );
});

/**
 * Watch tasks
 * */




 /**
  * Watch tasks
  * */

 gulp.task('server', ['browser-sync'], function () {
 });


 gulp.task('browser-sync', ['nodemon'], function() {
 	browserSync.init(null, {
 		proxy: "http://localhost:5000",
         files: [
           './public/*.html',
           './public/design/*.js',
           './public/design/*.css',
           './public/templates/*.js',
         ],
         browser: "google chrome",
         port: 7000,
 	});
 });


 gulp.task('nodemon', function (cb) {
 	var started = false;

 	return nodemon({
 		script: 'server.js'
 	}).on('start', function () {
 		// to avoid nodemon being started multiple times
 		// thanks @matthisk
 		if (!started) {
 			cb();
 			started = true;
 		}
 	});
 });

 /**
 * Start tasks
 * */




 /**
 * Start tasks
 * */

gulp.task( 'start', [
    'styles',
    'watch:styles',
    'scripts',
    'watch:scripts',
    'templates',
    'watch:templates',
    'watch:data',
    'server'
] );

/**
 * Start tasks
 * */
