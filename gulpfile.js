const gulp = require('gulp');
const paths = require('./gulp/config/paths');

const {
  clean,
  data,
  templates,
  scss,
  javascript,
  images,
  favicon,
  server,
} = require('./gulp/tasks');

function watcher() {
  gulp.watch(paths.watch.data, data);
  gulp.watch(paths.watch.html, templates);
  gulp.watch(paths.watch.css, scss);
  gulp.watch(paths.watch.js, javascript);
  gulp.watch(paths.watch.images, images);
}

const tasks = gulp.parallel(favicon, data, templates, scss, javascript, images);

const build = gulp.series(clean, tasks);
const dev = gulp.series(build, gulp.parallel(watcher, server));

gulp.task('default', dev);

module.exports = { build, dev };
