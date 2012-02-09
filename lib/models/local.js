var npm = require('npm');
var EventEmitter = require('events').EventEmitter;

function Local() {
  EventEmitter.call(this);
}

Local.prototype = Object.create(EventEmitter.prototype);

Local.prototype.load = function (callback) {
  npm.load({ global: true, _exit: true, loglevel: 'silent' }, function (err) {
    if (err) {
      throw err;
    }

    callback();
  });
};

Local.prototype.get = function () {
  var self = this;

  this.load(function () {
    npm.commands.ls([], true, function (err, pkgs) {
      if (err) {
        throw err;
      }

      var packages = {};

      Object.keys(pkgs.dependencies).forEach(function (pkgKey) {
        var pkg = pkgs.dependencies[pkgKey];
        if (pkg.hasOwnProperty('name') && pkg.hasOwnProperty('version')) {
          packages[pkg.name] = pkg.version;
        }
      });

      self.emit('get', packages);
    });
  });
};

Local.prototype.install = function (pkg) {
  var self = this;

  this.load(function () {
    var pkgs = (Array.isArray(pkg)) ? pkg : [pkg];

    npm.commands.install(pkgs, function (err) {
      if (err) {
        return self.emit('error', err, pkg);
      }

      self.emit('installed', pkg);
    });
  });
};

module.exports = new Local();
