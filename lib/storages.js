'use strict'
var curry = require('lodash').curry
var CakeException = require('./exception')
var Storage = require('./storage-constructor')

var storages = {}
module.exports = {
  get: function(name) {
    if (typeof name !== 'string') {
      new CakeException(null, true).throw('Error! Storage name should be specified')
    }
    if (typeof storages[name] === 'undefined') {
      storages[name] = new Storage(name)
    }
    return storages[name]
  }
}