var stat = require('./models/status');

function status(done) {
  stat(function (modules) {
    var len = (modules.install.length + modules.remote.length + modules.local.length + modules.sync.length);
    return done('status', { modules: len ? modules : null });
  });
}

module.exports = status;
