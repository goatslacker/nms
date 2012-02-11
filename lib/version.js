var info = require('../package.json');

// Display version then exit.
function v(done) {
  done('version', { version: info.version });
}

module.exports = v;
