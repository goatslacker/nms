var config = require('./models/config');

// If this is your first time installing nms
// you should have this function be called automatically
//
// The goal of this function is to help set you up with git
// to sync your node modules.
//
// Workflow:
//
// * Let the user know what's going on.
// * Ask for their GitHub username.
// * Ask for GitHub token.
// * Ask for a gist_id if they have one already.
// * Thank them, save their settings in the home directory.
// * Request a status of all their modules.
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

  if (!config.get('gist_id')) {
    done.prompt('Hello! Let\'s take a second to set up nms [Press ANY key]', function () {
      getName();
    });
  }

}

module.exports = nms_firstuse;
