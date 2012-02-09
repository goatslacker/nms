var prompt = require('prompt');
var config = require('./models/config');
var util = require('util');
var nms = require('./index');

function thanks() {
  config.write();
  util.puts('Thanks! Settings saved to ~/.nmsrc');
  nms.api.status([]);
}

function getGistId() {
  prompt.get({ name: 'gist', message: 'Enter your gist ID, or leave blank if you do not have one' }, function (err, res) {
    if (err) {
      throw err;
    }
    res.gist && config.set('gist_id', res.gist);
    thanks();
  });
}

function getToken() {
  prompt.get({ name: 'token', message: 'What is your GitHub token?' }, function (err, res) {
    if (err) {
      throw err;
    }
    res.token && config.set('token', res.token);
    getGistId();
  });
}

function getName() {
  prompt.get({ name: 'name', message: 'What is your GitHub username?' }, function (err, res) {
    if (err) {
      throw err;
    }
    res.name && config.set('username', res.name);
    getToken();
  });
}

function nms_firstuse(done) {
  prompt.start();
  prompt.message = 'nms';

  prompt.get('Hello! Let\'s take a second to set up nms [Press ANY key]', function (err) {
    if (err) {
      throw err;
    }
    getName();
  });

}

module.exports = nms_firstuse;
