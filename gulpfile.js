const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const webpack = require('gulp-webpack');

const paths = {
  sass: 'sass/**/*.scss',
  js: 'js/**/*.js',
  html: 'public/**/*.html',
  out: './public/',
};

// Serve the app
gulp.task('serve', ['sass', 'js'], () => {
  browserSync.init({
    server: './public',
  });

  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html).on('change', browserSync.reload);
});

// Compiles sass files into a single css file
gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('index.css'))
    .pipe(gulp.dest(paths.out))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src('js/index.js')
    .pipe(webpack())
    .pipe(rename('index.js'))
    .pipe(gulp.dest(paths.out))
    .pipe(browserSync.stream());
});

// Default task
gulp.task('default', ['serve']);
