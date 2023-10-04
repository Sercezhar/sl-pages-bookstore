const { src, dest } = require('gulp');
const paths = require('../config/paths');
const plugins = require('./../config/plugins');
const data = require('gulp-data');
const fs = require('fs');
const path = require('path');
const twig = require('gulp-twig');
const htmlmin = require('gulp-htmlmin');

function templates() {
  return src(paths.src.html)
    .pipe(
      plugins.changed(paths.build.html, {
        hasChanged: plugins.changed.compareContents,
      })
    )
    .pipe(plugins.plumber(plugins.plumberNotify('HTML Error')))
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`${paths.src.data}global.twig.json`));
      })
    )
    .pipe(
      data(function (file) {
        return JSON.parse(
          fs.readFileSync(paths.src.data + path.basename(file.path) + '.json')
        );
      })
    )
    .pipe(twig())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.build.html))
    .pipe(plugins.browserSync.stream());
}

module.exports = templates;
