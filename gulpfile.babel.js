import gulp from 'gulp'
import eslint from 'gulp-eslint'

gulp.task('lint', () =>
  gulp.src(['gulpfile.babel.js', 'src/**/*.js', 'test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
)

gulp.task('default', ['lint'])
