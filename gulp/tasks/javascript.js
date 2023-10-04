const { src, dest } = require('gulp');
const paths = require('../config/paths');
const plugins = require('./../config/plugins');
const webpack = require('webpack-stream');

function js() {
  return src(paths.src.js)
    .pipe(plugins.changed(paths.build.js))
    .pipe(plugins.plumber(plugins.plumberNotify('JavaScript Error')))
    .pipe(webpack(require('./../config/webpack.config.js')))
    .pipe(dest(paths.build.js))
    .pipe(plugins.browserSync.stream());
}

module.exports = js;
