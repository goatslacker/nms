var ignore = require('./models/ignore');

function nms_ignore(done, pkg) {
  if (pkg) {

    if (ignore.is_ignored(pkg)) {
      ignore.unignore(pkg);
      return done('ignore_rm', { module: pkg });
    } else {
      ignore.ignore(pkg);
      return done('ignore_add', { module: pkg });
    }

  } else {
    return done('ignore_list', { modules: ignore.getList() });
  }
}

module.exports = nms_ignore;
