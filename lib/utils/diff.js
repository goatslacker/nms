var semver = require('semver');

function diff(local, remote) {
  var result = {
    unchanged: [],
    install: [],
    remote: [],
    local: [],
    sync: []
  };

  // iterate through all old packages
  Object.keys(local).forEach(function (key) {
    var item = local[key];

    // we have a match
    if (remote.hasOwnProperty(key)) {

      // do semver...
      // to figure out which one is unchanged
      if (item !== remote[key]) {
        // if local copy is greater version
        if (semver.gt(item, remote[key])) {
          result.remote.push({ module: key, version: item, xmodule: key, xversion: remote[key] });

        // server is greater version
        } else {
          result.local.push({ module: key, version: remote[key], xmodule: key, xversion: item });
        }
      } else {
        result.unchanged.push({ module: key, version: remote[key] });
      }

      delete remote[key];
    } else {
      result.sync.push({ module: key, version: item });
    }

    // if
    // package doesn't exist in new.
    // must be an unsynced package
    // or one that was deleted.
    // we'll ignore those for now.
  });

  // iterate through whatever is left from new
  // if these are left over then that means they're all new
  Object.keys(remote).forEach(function (key) {
    result.install.push({ module: key, version: remote[key] });
  });

  return result;
}

module.exports = diff;
