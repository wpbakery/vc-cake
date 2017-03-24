'use strict'

var Immutable = require('immutable')
var state = new Immutable.Map({})
var events = require('./events')
var CakeException = require('./exception')
const eventScope = 'state-change'
module.exports = {
  set: function (key, value, data) {
    state = state.set(key, Immutable.fromJS(value))
    events.publish('app', eventScope, key, [value].concat(data))
  },
  get: function (key) {
    var data = state.get(key)
    return data instanceof Immutable.Collection ? data.toJS() : data
  },
  info: function () {
    return state.toJS()
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
