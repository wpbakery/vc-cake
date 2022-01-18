'use strict'

const curry = require('lodash').curry
const CakeException = require('./exception')
let items = {}
module.exports = {
  add: function (name, obj) {
    if (typeof items[name] !== 'undefined') {
      new CakeException(null, true).throw('Error! Service with a name %s already exists', name)
    }
    if (typeof obj !== 'object') {
      new CakeException(null, true).throw('Error! Object for service %s is incorrect', name)
    }

    items[name] = {
      loader: curry(function (obj, load) {
        return load ? obj : null
      })(obj)
    }
  },
  get: function (name) {
    let value = null
    if (typeof items[name] === 'undefined') {
      value = new CakeException().throw('Error! Service with a name %s doesn\'t exists', name)
    } else if (typeof items[name].instance !== 'undefined') {
      value = items[name].instance
    } else if (typeof items[name].loader === 'function') {
      items[name].instance = items[name].loader(true)
      value = items[name].instance
    }
    return value || new CakeException().throw('Error! Can\'t handle with a service %s.', name)
  },
  clear: function () {
    items = {}
  }
}
