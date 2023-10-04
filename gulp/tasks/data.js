const { src, dest } = require('gulp');
const paths = require('../config/paths');
const plugins = require('../config/plugins');

function data() {
  return src(`${paths.src.data}**/*.json`)
    .pipe(plugins.changed(paths.build.data))
    .pipe(dest(paths.build.data));
}

module.exports = data;
