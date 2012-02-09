var info = require('../package.json');

function v(done) {
  done('version', { version: info.version });
}

module.exports = v;
