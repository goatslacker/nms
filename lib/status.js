var stat = require('./models/status');
var util = require('util');

// `nms status` fetchus the current status of your modules
//
// It will look remotely and on your machine to see if the packages
// are properly synced.
//
// Useful information will be returned such as which modules need to be updated
// and which need to be installed.
function status(done) {
  var stop = done.wait('Fetching status');
  stat(function (modules) {
    var len = (modules.install.length + modules.remote.length + modules.local.length + modules.sync.length);
    return stop('status', { modules: len ? modules : null });
  });
}

module.exports = status;
