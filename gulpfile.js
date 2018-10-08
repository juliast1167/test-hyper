var gulp = require('gulp');
var  watch = require('gulp-watch');
var  autoprefixer = require('gulp-autoprefixer');
var  iconfont = require('gulp-iconfont');
var  iconfontCss = require('gulp-iconfont-css');
var  jshint = require('gulp-jshint');
var  stylish = require('jshint-stylish');
var  sass = require('gulp-sass');
var  rename = require('gulp-rename');
var  minifyCss = require('gulp-clean-css');
var  uglify = require('gulp-uglify');
var  imagemin = require('gulp-imagemin');
var  concat = require('gulp-concat');
var  plumber = require('gulp-plumber');
var  concatCss = require('gulp-concat-css');
var  jade = require('gulp-jade');

// собираем html
// Jade
gulp.task('jade', function(done){
 gulp.src('app/*.jade')
  .pipe(jade({pretty: true}))
  .pipe(gulp.dest('./dist/'));
  done();
});

gulp.task('sass-dist', function (done) {
  return gulp.src('app/sass/**/*.scss')
    .pipe(gulp.dest('dist/sass/'));
  done();
});

gulp.task('sass', function (done) {
  return gulp.src('app/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min',}))
    .pipe(gulp.dest('dist/css/'));
  done();
});
var fontName = 'Icons';
gulp.task('iconfont', function(done){
  gulp.src(['app/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'app/sass/templates/_icons.scss',
      targetPath: '../../sass/_icons.scss',
      fontPath: 'fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      normalize:true,
      fontHeight: 1001,
      centerHorizontally: true
    }))
    .pipe(gulp.dest('app/css/fonts/'));
  done();
});

gulp.task('fonts', function(done) {
  return gulp.src('app/css/fonts/**/*')
    .pipe(gulp.dest('dist/css/fonts'));
  done();
});

gulp.task('css', function(done){
  return gulp.src('app/css/*.css')
    .pipe(concatCss('all-plugins.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
  done();
});

// собираем картинки
gulp.task('images', function(done){
  return gulp.src('app/images/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
  done();
});
gulp.task('images-content', function(done){
  return gulp.src('app/assets/images/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/images'));
  done();
});

// проверяем js на наличие ошибок
gulp.task('jshint', function(done){
  return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
done();
});

// собираем js плагины
gulp.task('concat', function(dove) {
  return gulp.src(['app/js/jquery/*.js','app/js/lib/*.js'])
    .pipe(uglify())
    .pipe(concat('all-plugins.js'))
    .pipe(rename('all-plugins.min.js'))
    .pipe(gulp.dest('dist/js/'));
  done();
});


gulp.task('js',function(done){                
  gulp.src('app/js/main.js')
    .pipe(plumber())
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify()) 
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('dist/js/'));
  done();
});


gulp.task('watch', function(done) {
  gulp.watch('app/*.jade', gulp.series('jade'));
  gulp.watch('app/icons/*.svg', gulp.series('iconfont','fonts','sass'));
  gulp.watch('app/sass/*.scss', gulp.series('sass-dist','fonts','sass'));
  gulp.watch('app/css/**/*.css', gulp.series('css'));
  gulp.watch('app/js/**/*.js',  gulp.series('jshint', 'concat', 'js'));
  done();
});


gulp.task('default', gulp.series('jade','iconfont','sass-dist','sass','css','fonts','jshint','concat','js','images','images-content', 'watch', function(done) {
  done();
}));

