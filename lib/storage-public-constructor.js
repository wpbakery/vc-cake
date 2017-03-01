'use strict'
var curry = require('lodash').curry
var events = require('./events')
var CakeException = require('./exception')
var StorageState = require('./storage-state-constructor')
var constants = require('../config/settings').constants
var enVars = require('../config/settings').env

var states = {}
/**
 * @constructor
 */
var StoragePublic = module.exports = function (name) {
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
StoragePublic.prototype.state = function (state) {
  if (typeof state !== 'string') {
    new CakeException(null, true).throw('Error! Storage state key should be specified with a string')
  }
  var stateName = this.name + ':' + state
  if (typeof states[stateName] === 'undefined') {
    states[stateName] = new StorageState(this.name, state)
  }
  return states[stateName]
}
StoragePublic.prototype.trigger = function (event) {
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
