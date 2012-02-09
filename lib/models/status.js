var config = require('./config');

function getDiff(modules) {
  var diff = require('../utils/diff');
  return diff(modules.local, modules.remote);
}

function removeIgnoredModules(modules) {
  var args = [modules.local, modules.remote];
  var ignore_list = config.get().ignore;

  args.forEach(function (modules) {
    ignore_list.forEach(function (pkg) {
      if (modules[pkg]) {
        delete modules[pkg];
      }
    });
  });

  return modules;
}

function retrieveLocal(cb) {
  var local = require('./local');

  local.on('get', function (modules) {
    cb(modules);
  });

  local.get();
}

function retrieveRemote(cb) {
  var Gist = require('gister');
  var gist = new Gist(config.get());

  gist.on('get', function (body) {
    cb(JSON.parse(body.content));
  });

  gist.on('error:gist_id', function () {
    cb({});
  });

  gist.get('nms.json');
}

function status(done) {
  var parallel = require('../utils/parallel');
  parallel.flatten = true;

  function onModulesRetrieved(localModules, remoteModules) {
    var m = removeIgnoredModules({
      local: localModules,
      remote: remoteModules
    });
    var difference = getDiff(m);

    done(difference);
  }

  parallel(retrieveLocal, retrieveRemote, onModulesRetrieved);
}

module.exports = status;
