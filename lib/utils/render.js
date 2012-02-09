var util = require('util');
var mix = require('./mix');
var mss = require('../../mss/app.json');
var mustard = require('mustard');
mustard.templates = 'views/';

function render(template, data, styles) {
  styles = mix(mss, styles || {});

  var text = mustard(template, data, styles).split('\n');
  text.pop();
  text = mustard('index', { content: text }, mss);
  util.puts(text);
}

module.exports = render;
