const browserSync = require('browser-sync').create();
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

function plumberNotify(title) {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error: <%= error.message %>',
    }),
  };
}

const plugins = { browserSync, changed, plumber, plumberNotify };

module.exports = plugins;
