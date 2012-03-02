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

// `nms update` installs or updates missing packages on your system.
function update(done) {
//  if (process.env.USER !== 'root' || !process.env.hasOwnProperty('SUDO_USER')) {
//    return done(new Error('Run this command with sudo'));
//  }

  var stat = require('./models/status');
  var local = require('./models/local');
  var stop = done.wait('Retrieving data from gist');

  function doInstall(item) {
    local.install(item);
  }

  local.on('installed', function (pkg) {
    collect('installed', pkg, stop);
  });

  local.on('error', function (err, pkg) {
    collect('failed', pkg, stop);
  });


  stat(function (modules) {
    stop();

    var installs = prepareInstallables(modules);
    if (installs.length > 0) {
      stop = done.wait('Installing modules via npm');
      collect.items = installs.length;
      installs.forEach(doInstall);
    } else {
      done.write('Nothing to update');
    }
  });
}

module.exports = update;
