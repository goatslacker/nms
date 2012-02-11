var ignore = require('./models/ignore');

// `nms ignore` is meant to ignore packages you don't wish
// to track for sync and update.
//
// You call it with `nms ignore <package name>`
//
// If the package is already ignored, it is taken off the ignore list.
// If the package is __not__ ignored, it will be added to the list.
// If no arguments are provided, nms will return a list of ignored packages.
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
