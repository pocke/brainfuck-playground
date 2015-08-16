var gulp       = require('gulp');
var ts         = require('gulp-typescript');
var tsd        = require('gulp-tsd');
var tsconfig   = require('gulp-tsconfig-files');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var glob       = require('glob');

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
    .pipe(gulp.dest('./dst/'));
});

gulp.task('browserify', ['ts'] ,function () {
  return browserify({
    entries: glob.sync('./dst/**/*.js')
  }).bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.ts', ['browserify']);
});

gulp.task('tsconfig', function () {
  return gulp.src(['src/**/*.ts'])
    .pipe(tsconfig({newline_eof: true}));
});

gulp.task('default', ['tsconfig', 'browserify', 'watch']);
