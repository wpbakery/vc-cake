'use strict'
var pick = require('lodash').pick

var Storage = require('./storage-constructor')
var CakeException = require('./exception')

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
StoragePublic.prototype = Object.create(pick(Storage.prototype, ['state', 'trigger']))
