var config = require('./models/config');

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
