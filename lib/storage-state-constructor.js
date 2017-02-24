'use strict'

var state = require('./state')
var CakeException = require('./exception')
var constants = require('../config/settings').constants

/** @constructor */
var StorageState = module.exports = function (storage, name) {
  if (typeof storage !== 'string') {
    new CakeException(null, true).throw('Error! Storage name should be specified with a string')
  }
  if (typeof name !== 'string') {
    new CakeException(null, true).throw('Error! Storage state name should be specified with a string')
  }
  Object.defineProperties(this, {
    /**
     * @memberOf! StorageState
     */
    scope: {
      enumerable: false,
      configurable: false,
      writable: false,
      value: constants.STORAGE_TYPE + ':' + storage + ':' + name
    }
  })
}
StorageState.prototype.set = function (value) {
  state.set(this.scope, value)
}
StorageState.prototype.get = function () {
  return state.get(this.scope)
}
StorageState.prototype.onChange = function (fn, options) {
  state.onChange(this.scope, fn, options)
}
StorageState.prototype.ignoreChange = function (fn, options) {
  state.ignoreChange(this.scope, fn, options)
}
