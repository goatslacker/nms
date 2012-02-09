var nms = {};
nms.api = {};
nms.render = require('./utils/render');

(function () {
  var commands = ['firstuse', 'gist', 'help', 'ignore', 'status', 'sync', 'update', 'version'];

  commands.forEach(function (command) {
    nms.api[command] = function (params) {
      var cmd = require('./' + command);
      params.unshift(nms.render);
      cmd.apply(null, params);
    };
  });
}());

process.on('uncaughtException', function (err) {
  console.error(err);
//  nms.template = 'error';
//  nms.render({ message: err.stack });
  process.exit(1);
});

module.exports = nms;
