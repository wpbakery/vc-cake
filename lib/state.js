'use strict'

const state = {}
const events = require('./events')
const CakeException = require('./exception')
const eventScope = 'state-change'
module.exports = {
  set: function (key, value, data) {
    state[key] = value
    events.publish('app', eventScope, key, [value].concat(data))
  },
  get: function (key) {
    if (state[key]) {
      return JSON.parse(JSON.stringify(state[key]))
    }
    return null
  },
  delete: function (key) {
    delete state[key]
  },
  info: function () {
    return JSON.parse(JSON.stringify(state))
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
