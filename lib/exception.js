'use strict'

const enVars = require('../config/settings').env
const uf = require('util').format
/**
 * Used as exception
 *
 * @param {string} message - message to throw as a reason of error
 * @constructor
 */
const CakeException = function (message) {
  this.message = message
  this.name = 'VcCakeException'
}
CakeException.prototype = Object.create(Error.prototype)
CakeException.prototype.name = 'CakeException'
CakeException.prototype.constructor = CakeException
/**
 * @constructor
 * @type {Handler}
 */
const Handler = module.exports = function (returnValue, anyway) {
  this.returnValue = returnValue
  this.anyway = !!anyway
}
Handler.prototype.throw = function () {
  const message = uf.apply(this, arguments)
  if (enVars.get('debug') === true || this.anyway === true) {
    throw new CakeException(message)
  }
  return this.returnValue
}
