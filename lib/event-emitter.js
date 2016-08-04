var EventEmitter = require('events').EventEmitter
var cakeEventEmitter = new EventEmitter()
module.exports = {
  unsubscribe: function (channel, fn) {
    cakeEventEmitter.removeListener(channel, fn)
  },
  subscribe: function (channel, fn, once) {
    if (once) {
      cakeEventEmitter.once(channel, fn)
    } else {
      cakeEventEmitter.on(channel, fn)
    }
  },
  publish: function (channel) {
    var args = Array.prototype.slice.call(arguments, 1)
    cakeEventEmitter.emit.apply(cakeEventEmitter, [channel].concat(args))
  }
}