const { src, dest } = require('gulp');
const paths = require('../config/paths');
const plugins = require('./../config/plugins');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function scss() {
  return src(paths.src.css)
    .pipe(plugins.changed(paths.build.css))
    .pipe(sourcemaps.init())
    .pipe(plugins.plumber(plugins.plumberNotify('SCSS Error')))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer())
    .pipe(dest(paths.build.css))
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: '.min',
        extname: '.css',
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.build.css))
    .pipe(plugins.browserSync.stream());
}

module.exports = scss;
