var enVars = require('../config/settings').env;
var uf = require('util').format;

var CakeException = function(message) {
  this.message = message;
  this.name = 'VcCakeException';
};
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
  return this.returnValue || null;
};
