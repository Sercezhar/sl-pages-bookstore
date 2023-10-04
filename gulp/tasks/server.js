const paths = require('./../config/paths');
const plugins = require('./../config/plugins');

function server() {
  plugins.browserSync.init({
    server: {
      baseDir: paths.buildFolder,
    },
    logLevel: 'info',
    cors: true,
    notify: false,
    port: 3000,
  });
}

module.exports = server;
