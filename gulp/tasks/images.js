const { src, dest } = require('gulp');
const paths = require('../config/paths');
const plugins = require('./../config/plugins');
const imagemin = require('gulp-imagemin');

function images() {
  return src(paths.src.images)
    .pipe(plugins.changed(paths.build.images))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(paths.build.images))
    .pipe(src(paths.src.svg))
    .pipe(dest(paths.build.images))
    .pipe(plugins.browserSync.stream());
}

module.exports = images;
