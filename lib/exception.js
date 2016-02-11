'use strict';

var enVars = require('../config/settings').env;
var uf = require('util').format;
/**
 * Used as exception
 *
 * @param {string} message - message to throw as a reason of error
 * @constructor
 */
var CakeException = function(message) {
  this.message = message;
  this.name = 'VcCakeException';
};
CakeException.prototype = Object.create(Error.prototype);
CakeException.prototype.name = 'CakeException';
CakeException.prototype.constructor = CakeException;
/**
 * @constructor
 * @type {Handler}
 */
var Handler = module.exports = function(returnValue, anyway) {
  this.returnValue = returnValue;
  this.anyway = !!anyway;
};
Handler.prototype.throw = function() {
  var message = uf.apply(this, arguments);
  if (true === enVars.get('debug') || true === this.anyway) {
    throw new CakeException(message);
  }
  return this.returnValue;
};
