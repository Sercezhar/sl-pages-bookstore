const { src, dest } = require('gulp');
const paths = require('../config/paths');

function favicon() {
  return src(`${paths.srcFolder}/favicon.ico`).pipe(dest(paths.buildFolder));
}

module.exports = favicon;
