var compact  = require('lodash').compact;

var mediator = {
  channels: {}
};
module.exports = {
  subscribe: function(channel, fn, once, context) {
    if (!mediator.channels[channel]) {
      mediator.channels[channel] = [];
    }
    mediator.channels[channel].push({context: context, callback: fn, once: !!once});
    return this;
  },
  publish: function(channel) {
    if (!mediator.channels[channel]) {
      return this;
    }
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
      var subscription = mediator.channels[channel][i];
      if (subscription.context) {
        args.push(subscription.context);
      }
      subscription.callback.apply(this, args);
      if (true === subscription.once) {
        delete mediator.channels[channel][i];
      }
    }
    mediator.channels[channel] = compact(mediator.channels[channel]);
    return this;
  }
};
