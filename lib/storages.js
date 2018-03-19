'use strict'
var CakeException = require('./exception')
var Storage = require('./storage-constructor')

var publicStorages = {}
var storages = {}
module.exports = {
  get: function (name) {
    if (typeof name !== 'string') {
      new CakeException(null, true).throw('Error! Storage name should be specified')
    }
    if (typeof publicStorages[name] === 'undefined') {
      publicStorages[name] = new Storage(name)
    }
    return publicStorages[name]
  },
  add: function (name, fn) {
    if (typeof name !== 'string') {
      new CakeException(null, true).throw('Error! Storage name should be specified')
    }
    if (typeof storages[name] === 'undefined') {
      storages[name] = new Storage(name)
      fn(storages[name])
      return
    }
    new CakeException(null, true).throw('Error! Storage already defined. Storage can be created only once')
  }
}
