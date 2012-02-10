var config = require('./models/config');

function nms_firstuse(done) {
  function thanks() {
    var nms = require('./index');
    config.write();
    done.write('Thanks! Settings saved to ~/.nmsrc');
    nms.api.status([]);
  }

  function getGistId() {
    done.prompt('Enter your gist ID, or leave blank if you do not have one', function (gist_id) {
      gist_id && config.set('gist_id', gist_id);
      thanks();
    });
  }

  function getToken() {
    done.prompt('What is your GitHub token?', function (token) {
      token && config.set('token', token);
      getGistId();
    });
  }

  function getName() {
    done.prompt('What is your GitHub username?', function (name) {
      name && config.set('username', name);
      getToken();
    });
  }

  done.prompt('Hello! Let\'s take a second to set up nms [Press ANY key]', function () {
    getName();
  });

}

module.exports = nms_firstuse;
