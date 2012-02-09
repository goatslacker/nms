function help(done) {
  return done('help', null, {
    c1: {
      width: 8
    },
    c2: {
      width: 8
    },
    c3: true
  });
}

module.exports = help;
