'use strict'

var state = {}
var events = require('./events')
var CakeException = require('./exception')
var eventScope = 'state-change'
module.exports = {
  set: function (key, value, data) {
    state[key] = value
    events.publish('app', eventScope, key, [value].concat(data))
  },
  get: function (key) {
    return state[key]
  },
  delete: function (key) {
    delete state[key]
  },
  info: function () {
    return state
  },
  onChange: function (key, fn, options) {
    if (fn instanceof Function) {
      events.subscribe('app', eventScope, key, fn, options)
    } else {
      throw new CakeException(null, true).throw('Wrong callback for onChange event with key %s', key)
    }
  },
  ignoreChange: function (key, fn, options) {
    if (fn instanceof Function) {
      events.unsubscribe('app', eventScope, key, fn, options)
    } else {
      throw new CakeException(null, true).throw('Wrong callback for onChange event with key %s', key)
    }
  }
}
