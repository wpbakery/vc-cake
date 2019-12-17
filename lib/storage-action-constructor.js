'use strict'

var CakeException = require('./exception')
var constants = require('../config/settings').constants
var actions = {}
/** @constructor */
var StorageAction = module.exports = function (storage, name, fn) {
  if (typeof storage !== 'string') {
    new CakeException(null, true).throw('Error! Storage name should be specified with a string')
  }
  if (typeof name !== 'string') {
    new CakeException(null, true).throw('Error! Storage action name should be specified with a string')
  }
  if (typeof fn !== 'function') {
    new CakeException(null, true).throw('Error! Storage action callback function must be callable function')
  }
  Object.defineProperties(this, {
    /**
     * @memberOf! StorageAction
     */
    scope: {
      enumerable: false,
      configurable: false,
      writable: false,
      value: constants.STORAGE_TYPE + ':' + storage + ':' + name
    }
  })
  actions[this.scope] = fn
}

StorageAction.prototype.call = function (args) {
  return actions[this.scope].apply(this, args)
}
