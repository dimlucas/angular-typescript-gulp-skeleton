var srcRoot = "src/";
var appDir = srcRoot + "app/";
var scssDir = "scss/";
var scssFiles = scssDir + "**/*.scss";
var cssOutput = "styles/";
var outputDir = "dist/";
var tsFiles = appDir + "**/*.ts";
var htmlFiles = appDir + "**/*.html";

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sass = require('gulp-sass');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var minifier = require('gulp-clean-css');
var browserSync = require('browser-sync').create();


//Clean the output directory
gulp.task('clean', () => {
    del([outputDir + "*"]);
});

//Initialize Browser Sync
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

//Compile TypeScript into ES5
gulp.task('build-ts', () => {
    var tsProject = tsc.createProject('tsconfig.json');
    gulp.src(tsFiles)
        .pipe(tsProject())
        .pipe(gulp.dest(outputDir));
});

//Move HTML files to the output directory
gulp.task('build-html', () => {
    gulp.src(htmlFiles).pipe(gulp.dest(outputDir));
});

//Compile SCSS to CSS minify it and add source maps
gulp.task('build-css', () => {
    gulp.src(scssFiles)
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(minifier())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssOutput));
});

gulp.task('build', ['build-ts', 'build-html', 'build-css']);

gulp.task('watch', ['build-ts', 'build-html', 'build-css', 'serve'] , () => {
    gulp.watch(tsFiles, ['build-ts', browserSync.reload]);

    gulp.watch(htmlFiles, ['build-html', browserSync.reload]);

    gulp.watch(scssFiles, ['build-css', browserSync.reload]);
});

