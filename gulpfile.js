const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const paths = {
  sass: 'sass/**/*.scss',
  html: 'public/**/*.html',
  css: './public/',
};

// Serve the app
gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './public',
  });

  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html).on('change', browserSync.reload);
});

// Compiles sass files into a single css file
gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('index.css'))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

// Default task
gulp.task('default', ['serve']);
