const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass =  require('gulp-sass');

// compile Sass and Inject Into Browser

gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});

// Move JS Files to src/js

gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream());
});

// watch Sass and Server
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./src"
  });
  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Move fonts folder to src/fonts

gulp.task('font', function(){
  return gulp.src('node_modules/@fortawesome/*')
  .pipe(gulp.dest('src/fonts'));
})

// Move fonts awesome css to src/css

gulp.task('fa', function(){
  return gulp.src('node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css')
  .pipe(gulp.dest('src/css'));
})

//

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);