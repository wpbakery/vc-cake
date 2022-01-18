'use strict'

const Immutable = require('immutable')
let state = new Immutable.Map({})
const events = require('./events')
const CakeException = require('./exception')
const eventScope = 'state-change'
module.exports = {
  set: function (key, value, data) {
    state = state.set(key, Immutable.fromJS(value))
    events.publish('app', eventScope, key, [value].concat(data))
  },
  get: function (key) {
    const data = state.get(key)
    return data instanceof Immutable.Collection ? data.toJS() : data
  },
  delete: function (key) {
    state = state.delete(key)
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
