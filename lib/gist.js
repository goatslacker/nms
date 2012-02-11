var config = require('./models/config');

// This method adds a gist_id to your .nmsrc config file.
//
// It's a convenience method so you won't have to open up your .nmsrc file
//
// If `nms gist` is called without any arguments it will print the current
// gist_id on file and then exit.
function nms_gist(done, id) {
  if (!id) {
    return done('gist_id', {
      gist_id: config.get().gist_id
    });
  }

  config.set('gist_id', id);
  config.write();

  return done('gist_added', {
    gist_id: id
  });
}

module.exports = nms_gist;
