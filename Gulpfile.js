var gulp = require('gulp');
var sass = require('gulp-sass');

var input = './static/css/*.scss';
var output = './static/css/';

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(output));
});

gulp.task('sass--watch', function () {
  gulp.watch(input, ['sass']);
});