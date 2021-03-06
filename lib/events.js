'use strict'

var curry = require('lodash').curry
var debounce = require('lodash').debounce
var CakeException = require('./exception')
var mediator = require('./event-emitter')

var events = module.exports = {
  publish: curry(function (prefix, scope, name, data) {
    mediator.publish(prefix + '-' + scope + ':' + name, data)
  }),
  subscribe: curry(function (prefix, scope, name, fn, options) {
    var once = options && options.once ? options.once : false
    if (options && typeof options.debounce === 'number') {
      fn = debounce(fn, options.debounce)
    }
    var names = name.trim().split(/\s+/)
    names.forEach(function (name) {
      mediator.subscribe(prefix + '-' + scope + ':' + name, fn, once)
    })
  }),
  unsubscribe: curry(function (prefix, scope, name, fn, options) {
    var once = options && options.once ? options.once : false
    var names = name.trim().split(/\s+/)
    names.forEach(function (name) {
      mediator.unsubscribe(prefix + '-' + scope + ':' + name, fn, once)
    })
  }),
  request: function (event, data) {
    if (event === 'start') {
      new CakeException().throw('Error! You can\'t call %s event. This event can be called only by app\'s start method', event)
    } else {
      events.publish('app', 'event', event, data)
    }
  },
  reply: function (event, fn) {
    var prefixes = event.trim().split(/\s+/)
    prefixes.forEach(function (event) {
      events.subscribe('app', 'event', event, fn, {})
    })
  },
  forget: function (event, fn) {
    var prefixes = event.trim().split(/\s+/)
    prefixes.forEach(function (event) {
      events.unsubscribe('app', 'event', event, fn, {})
    })
  }
}
