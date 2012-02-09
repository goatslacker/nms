function mix(base, obj) {
  Object.keys(obj).forEach(function (key) {
    base[key] = obj[key];
  });

  return base;
}

module.exports = mix;
