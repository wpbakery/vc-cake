var compact = require('lodash').compact
var murmurhash = require('murmurhash')
var mediator = {
  channels: {},
  subscriptionHashes: {},
  generateHashCode: function (object) {
    var objectToStringify = Object.keys(object).map(function (k) {
      return typeof object[k] === 'function' ? object[k].toString() : object[k]
    })
    return murmurhash.v3(JSON.stringify(objectToStringify))
  }
}
module.exports = {
  unsubscribe: function (channel, fn, once, context) {
    var subscription = {context: context, callback: fn, once: !!once, channel: channel}
    var hash = mediator.generateHashCode(subscription)
    if (mediator.channels[channel] !== undefined && mediator.subscriptionHashes[hash] !== undefined) {
      mediator.channels[channel].splice(mediator.subscriptionHashes[hash], 1)
      delete mediator.subscriptionHashes[hash]
    }
  },
  subscribe: function (channel, fn, once, context) {
    if (!mediator.channels[channel]) {
      mediator.channels[channel] = []
    }
    mediator.channels[channel].push({context: context, callback: fn, once: !!once})
    mediator.subscriptionHashes[mediator.generateHashCode({context: context, callback: fn, once: !!once, channel: channel})] = mediator.channels[channel].length - 1
    return this
  },
  publish: function (channel) {
    if (!mediator.channels[channel]) {
      return this
    }
    var args = Array.prototype.slice.call(arguments, 1)
    for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
      var subscription = mediator.channels[channel][i]
      if (subscription.context) {
        args.push(subscription.context)
      }
      subscription.callback.apply(this, args)
      if (subscription.once === true) {
        delete mediator.channels[channel][i]
      }
    }
    mediator.channels[channel] = compact(mediator.channels[channel])
    return this
  }
}
