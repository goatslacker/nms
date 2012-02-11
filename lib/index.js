// The nms Object
var nms = {};
nms.api = {};

// Our internal rendering tool
nms.render = require('./utils/render');

// The commands that are available to nms
var commands = ['firstuse', 'gist', 'help', 'ignore', 'status', 'sync', 'update', 'version'];

// Require each file for every command and bind a function
// that will call the function requested with our rendering tool as it's first parameter
// and any parameters passed via shell appended to the arguments.
commands.forEach(function (command) {
  nms.api[command] = function (params) {
    var cmd = require('./' + command);
    params.unshift(nms.render);
    cmd.apply(null, params);
  };
});

module.exports = nms;
