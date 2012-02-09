var Gist = require('gister');

function preparePayload(modules) {
  var ignore = require('./models/ignore');

  var payload = {};
  var send = false;

  function addToPayload(item) {
    if (!ignore.is_ignored(item.module)) {
      send = true;
      payload[item.module] = item.version;
    }
  }

  Object.keys(modules).forEach(function (key) {
    modules[key].forEach(addToPayload);
  });

  return send ? payload : null;
}

function sync(done) {
  var stat = require('./models/status');
  var config = require('./models/config');
  var gist = new Gist(config.get());

  gist.on('error:credentials', function () {
    done('sync', { message: 'GitHub username and token missing' });
  });

  gist.on('updated', function (body) {
    done('sync', { message: 'Updated gist' });
  });

  gist.on('created', function (body, res) {
    var gisty = /(\d+)/;
    var location = res.headers.location;
    var output;

    if (gisty.test(location)) {
      config.set('gist_id', gisty.exec(location)[0]);
      config.write();
    }

    done('sync', { message: 'Posted to GitHub' });
  });


  stat(function (modules) {
    var payload = preparePayload(modules);
    payload && gist.sync(JSON.stringify(payload), 'nms.json');
  });
}

module.exports = sync;
