function parallel(tasks, cb) {
  var args = [];
  var counter = 0;
  var replies = [];

  if (!Array.isArray(tasks)) {
    if (arguments.length > 2) {
      args = Array.prototype.slice.call(arguments, 0);
      cb = args.pop();
      tasks = args;
    } else {
      tasks = [tasks];
    }
  }

  counter = tasks.length;

  function done() {
    var reply = [];
    counter -= 1;
    replies[this.index] = Array.prototype.slice.call(arguments, 0);

    if (counter === 0) {

      if (parallel.flatten) {
        replies.forEach(function (r) {
          reply = reply.concat(r);
        });
      } else {
        reply = replies;
      }

      cb.apply(cb, reply);
    }
  }

  tasks.forEach(function (task, index) {
    var context = { index: index };
    task(done.bind(context));
  });
}

parallel.flatten = false;

module.exports = parallel;
