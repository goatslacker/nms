var mix = require('./mix');
var mss = require('../../mss/app.json');
var mustard = require('mustard');
var prompt = require('prompt');
var charm = require('charm');
var path = require('path');

var pos = ['|', '/', '-', '\\', '|', '/', '-', '\\'];

mustard.templates = path.join(__dirname, '..', '..', 'views');

function getText(text) {
  if (!Array.isArray(text)) {
    text = [text];
  }
  var data = mustard('index', { content: text }, mss);
  return data;
}

function render(template, data, styles) {
  styles = mix(mss, styles || {});
  var text = mustard(template, data, styles).toString().split('\n');
  text.pop();
  render.write(text);
}

render.wait = function (text, cb) {
  var stream = charm(process);
  stream.on('^C', process.exit);
  var x = 0;
  var interval;

  text = getText(text);

  stream.write(text.valueOf());
  stream.up(0);
  stream.right(text.length + 1);

  function stop(template, msg, styles) {
    interval && clearInterval(interval);
    stream.left(0);
    stream.write('- Done.');
    process.stdin.pause();
    process.stdout.write('\n');
    msg && render(template || 'index', msg, styles);
  }

  interval = setInterval(function () {
    stream.left(0);
    stream.write(pos[x]);
    x += 1;
    if (x >= pos.length) {
      x = 0;
    }
  }, 100);

  cb && cb(stop);

  return stop;
};

render.write = function (text) {
  process.stdout.write(getText(text) + '\n');
};

render.prompt = function (message, cb) {
  if (!render.prompt_started) {
    prompt.start();
    prompt.message = 'nms';
    render.prompt_started = true;
  }

  prompt.get({ name: 'data', message: message }, function (err, res) {
    if (err) {
      throw err;
    }

    cb(res.data);
  });
};

render.prompt_started = false;

module.exports = render;
