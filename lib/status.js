var stat = require('./models/status');
var util = require('util');

function status(done) {
  util.puts('Fetching status...');
  stat(function (modules) {
    var len = (modules.install.length + modules.remote.length + modules.local.length + modules.sync.length);
    return done('status', { modules: len ? modules : null });
  });
}

module.exports = status;
