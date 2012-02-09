var fs = require('fs');
var path = require('path');

var NMSRC = path.join(process.env.HOME, '.nmsrc');

try {
  fs.statSync(NMSRC);
} catch (err) {
  if (err.code === 'ENOENT') {
    fs.writeFileSync(NMSRC, '{}', 'utf-8');
  } else {
    throw err;
  }
}

var config = JSON.parse(fs.readFileSync(NMSRC, 'utf-8'));

// defaults
config.username = config.username || process.env.GITHUB_USER || '';
config.token = config.token || process.env.GITHUB_TOKEN || '';
config.ignore = config.ignore || [];

// API
var configAPI = {
  write: function (cb) {
    fs.writeFile(NMSRC, JSON.stringify(this.get()), 'utf-8', function (err) {
      if (err) {
        throw err;
      }
      cb && cb();
    });
  },
  set: function (prop, val) {
    config[prop] = val;
  },
  get: function (prop) {
    if (prop) {
      return config[prop];
    } else {
      return config;
    }
  }
};

module.exports = configAPI;
