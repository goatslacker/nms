var config = require('./config');
var ignore_list = config.get().ignore;

function is_ignored(pkg) {
  return ignore_list.indexOf(pkg) > -1;
}

function setIgnore(pkg) {
  ignore_list.push(pkg);
  config.write();
}

function unsetIgnore(pkg) {
  var index = ignore_list.indexOf(pkg);
  ignore_list.splice(index, 1);
  config.write();
}

function getList() {
  return ignore_list.slice(0);
}

var ignoreAPI = {
  is_ignored: is_ignored,
  ignore: setIgnore,
  unignore: unsetIgnore,
  getList: getList
};

module.exports = ignoreAPI;
