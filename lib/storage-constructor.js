'use strict'

var curry = require('lodash').curry
var events = require('./events')
var CakeException = require('./exception')
var StorageState = require('./storage-state-constructor')
var StorageAction = require('./storage-action-constructor')
var constants = require('../config/settings').constants
var enVars = require('../config/settings').env

var states = {}
var actions = {}
/**
 * @constructor
 */
var Storage = module.exports = function (name) {
  if (typeof name !== 'string') {
    new CakeException(null, true).throw('Error! Storage name should be specified with a string')
  }
  Object.defineProperties(this, {
    /**
     * @memberOf! Storage
     */
    name: {
      enumerable: false,
      configurable: false,
      writable: false,
      value: name
    }
  })
}
Storage.prototype.state = function (state) {
  if (typeof state !== 'string') {
    new CakeException(null, true).throw('Error! Storage state key should be specified with a string')
  }
  var stateName = this.name + ':' + state
  if (typeof states[stateName] === 'undefined') {
    states[stateName] = new StorageState(this.name, state)
  }
  return states[stateName]
}

Storage.prototype.on = function (event, fn, options) {
  events.subscribe(constants.STORAGE_TYPE, this.name, event, fn, options)
}
Storage.prototype.once = function (event, fn) {
  return this.on(event, fn, {once: true})
}
Storage.prototype.off = function (event, fn, options) {
  events.unsubscribe(constants.STORAGE_TYPE, this.name, event, fn, options)
}
Storage.prototype.offOnce = function (event, fn) {
  return this.off(event, fn, {once: true})
}
Storage.prototype.trigger = function (event) {
  var data = Array.prototype.slice.call(arguments, 1)
  if (enVars.get('started') === true) {
    events.publish(constants.STORAGE_TYPE, this.name, event, data)
  } else {
    events.reply(constants.START_EVENT, curry(function (storage, name, event, data, start) {
      if (start === true) {
        events.publish(storage, name, event, data)
      }
    })(constants.STORAGE_TYPE, this.name, event, data))
  }
  return this
}
Storage.prototype.registerAction = function (key, fn) {
  if (typeof key !== 'string') {
    new CakeException(null, true).throw('Error! Storage action key should be specified with a string')
  }
  if (typeof fn !== 'function') {
    new CakeException(null, true).throw('Error! Storage action callback function must be callable function')
  }
  var actionName = this.name + ':' + key
  actions[actionName] = new StorageAction(this.name, key, fn)
  return actions[actionName]
}
Storage.prototype.action = function (key) {
  if (typeof key !== 'string') {
    new CakeException(null, true).throw('Error! Storage action key should be specified with a string')
  }
  var actionName = this.name + ':' + key
  if (typeof actions[actionName] === 'undefined') {
    new CakeException(null, enVars.get('debug')).throw('Error! Storage action must be register before use')
    return new StorageAction(this.name, key, function () {})
  }
  return actions[actionName]
}
