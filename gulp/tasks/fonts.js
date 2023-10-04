const { src, dest } = require('gulp');
const paths = require('../config/paths');
const plugins = require('./../config/plugins');

function fonts() {
  return src(paths.src.fonts)
    .pipe(plugins.changed(paths.build.fonts))
    .pipe(dest(paths.build.fonts))
    .pipe(plugins.browserSync.stream());
}

module.exports = fonts;
