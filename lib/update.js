function collect(i, m, done) {
  collect.items -= 1;
  collect.data[i].push(m);

  if (collect.items === 0) {
    done('update', collect.data);
  }
}

collect.items = 0;

collect.data = {
  installed: [],
  failed: []
};

function prepareInstallables(modules) {
  var ignore = require('./models/ignore');
  var payload = [];

  function addToInstall(item) {
    if (!ignore.is_ignored(item.module)) {
      payload.push(item.module + '@' + item.version);
    }
  }

  modules.local.forEach(addToInstall);
  modules.install.forEach(addToInstall);

  return payload;
}

function update(done) {
//  if (process.env.USER !== 'root' || !process.env.hasOwnProperty('SUDO_USER')) {
//    return done(new Error('Run this command with sudo'));
//  }

  var stat = require('./models/status');
  var local = require('./models/local');

  function doInstall(item) {
    local.install(item);
  }

  local.on('installed', function (pkg) {
    collect('installed', pkg, done);
  });

  local.on('error', function (err, pkg) {
    collect('failed', pkg, done);
  });


  stat(function (modules) {
    var installs = prepareInstallables(modules);
    collect.items = installs.length;
    installs.forEach(doInstall);
  });
}

module.exports = update;
