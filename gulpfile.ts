"use strict";

const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest("build"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["html","scss"],() => {
    console.log("Resources completed");
});

gulp.task("html", () => {
    return gulp.src(["src/**/*.html","src/**/*.js"])
        .pipe(gulp.dest("build"));

});

gulp.task("scss", () =>{
    gulp.src("src/css/*.scss")
        .pipe(sass(
            {
                linefeed: 'lf',
                outputStyle: 'compressed',
                precision: 3,
            }
        ))
        .pipe(gulp.dest("build/css"));
});


/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            '@angular/**/bundles/**',
            'angular-4-data-table/**',
            'ng-sidebar/**/*.js',
            'ng2-dropdown/**/*.js',
            '@qontu/ngx-inline-editor/**/*.js'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css", "src/**/*.scss"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
    
});

/**
 * Build the project.
 */
gulp.task("build", ['compile', 'resources', 'libs'], () => {
    console.log("Building the project ...");
});

gulp.task("start", ["build", "watch"]);