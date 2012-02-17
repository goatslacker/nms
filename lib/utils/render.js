var util = require('util');
var mix = require('./mix');
var mss = require('../../mss/app.json');
var mustard = require('mustard');
var prompt = require('prompt');
var path = require('path');
mustard.templates = path.join(__dirname, '..', '..', 'views');

function render(template, data, styles) {
  styles = mix(mss, styles || {});

  var text = mustard(template, data, styles).split('\n');
  text.pop();
  render.write(text);
}

render.write = function (text) {
  if (!Array.isArray(text)) {
    text = [text];
  }
  var data = mustard('index', { content: text }, mss);
  util.puts(data);
};

render.prompt = function (message, cb) {
  if (render.prompt.init === false) {
    prompt.start();
    prompt.message = 'nms';
    render.prompt.init = true;
  }

  prompt.get({ name: 'data', message: message }, function (err, res) {
    if (err) {
      throw err;
    }

    cb(res.data);
  });
};

render.prompt.init = false;

module.exports = render;
