const del = require('del');
const paths = require('./../config/paths');

function clean() {
  return del(paths.clean);
}

module.exports = clean;
