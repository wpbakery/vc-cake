'use strict'

const curry = require('lodash').curry
const debounce = require('lodash').debounce
const CakeException = require('./exception')
const mediator = require('./event-emitter')

const events = module.exports = {
  publish: curry(function (prefix, scope, name, data) {
    mediator.publish(prefix + '-' + scope + ':' + name, data)
  }),
  subscribe: curry(function (prefix, scope, name, fn, options) {
    const once = options && options.once ? options.once : false
    if (options && typeof options.debounce === 'number') {
      fn = debounce(fn, options.debounce)
    }
    const names = name.trim().split(/\s+/)
    names.forEach(function (name) {
      mediator.subscribe(prefix + '-' + scope + ':' + name, fn, once)
    })
  }),
  unsubscribe: curry(function (prefix, scope, name, fn, options) {
    const once = options && options.once ? options.once : false
    const names = name.trim().split(/\s+/)
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
    const prefixes = event.trim().split(/\s+/)
    prefixes.forEach(function (event) {
      events.subscribe('app', 'event', event, fn, {})
    })
  },
  forget: function (event, fn) {
    const prefixes = event.trim().split(/\s+/)
    prefixes.forEach(function (event) {
      events.unsubscribe('app', 'event', event, fn, {})
    })
  }
}
