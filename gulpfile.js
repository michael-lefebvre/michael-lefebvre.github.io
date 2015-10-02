var buildFolder  = './assets/'
  , gulp         = require('gulp')
  , fs           = require('fs')
  , rename       = require('gulp-rename')
  , sass         = require('gulp-sass')
  , sourcemaps   = require('gulp-sourcemaps')
  , autoprefixer = require('gulp-autoprefixer')
  , concat       = require('gulp-concat')
  , uglify       = require('gulp-uglify')
  , filesize     = require('gulp-filesize')
  , argv         = require('yargs').argv
  , gulpif       = require('gulp-if')
  , minify       = require('gulp-minify-css')

gulp.task('default', [
    'sass'
  , 'watch'
])

// Compile Sass
gulp.task('sass', function ()
{
  gulp.src('./scss/michael-lefebvre.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass({
      includePaths: require('node-bourbon').includePaths
    }) )
    .pipe( sourcemaps.write() )
    .pipe( autoprefixer(
    {
        browsers: ['last 2 versions']
      , cascade: false
    } ) )
    .pipe( rename('styles.css') )
    .pipe( gulpif( argv.production, minify( {compatibility: 'ie8'} ) ) )
    .pipe( gulpif( argv.production, rename({suffix: '.min'}) ) )
    .pipe( gulpif( !argv.production, sourcemaps.write() ) )
    .pipe( filesize() )
    .pipe( gulp.dest( buildFolder + 'css') )
})

gulp.task('watch', function ()
{
  gulp.watch(
      ['./scss/*.scss']
    , ['sass']
  )
})
