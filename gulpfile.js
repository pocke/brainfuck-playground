var gulp       = require('gulp');
var ts         = require('gulp-typescript');
var tsd        = require('gulp-tsd');
var tsconfig   = require('gulp-tsconfig-files');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var glob       = require('glob');
var espower    = require('gulp-espower');

gulp.task('tsd', function (callback) {
  tsd({
    command: 'reinstall',
    config: 'tsd.json',
  }, callback);
});


gulp.task('ts', function () {
  var tsProject = ts.createProject('tsconfig.json');
  return tsProject.src()
    .pipe(ts(tsProject))
    .js
    .pipe(espower())
    .pipe(gulp.dest('./dst/'));
});

gulp.task('browserify', ['ts'] ,function () {
  return browserify({
    entries: glob.sync('./dst/src/**/*.js')
  }).bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('browserify-test', ['ts'], function () {
  return browserify({
    entries: glob.sync('./dst/test/**/*.js')
  }).bundle()
    .pipe(source('test.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
  gulp.watch('./+(src|test)/**/*.ts', ['browserify', 'browserify-test']);
});

gulp.task('tsconfig', function () {
  return gulp.src(['src/**/*.ts', 'test/**/*.ts'])
    .pipe(tsconfig({newline_eof: true}));
});

gulp.task('default', ['tsconfig', 'browserify', 'browserify-test','watch']);
