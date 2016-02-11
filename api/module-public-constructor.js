'use strict';

var events = require('../lib/events');
var scopes = require('../lib/scopes');
var constants = require('../config/settings').constants;
/**
 * @constructor
 * @type {API}
 */
var API = module.exports = function (name) {
  this.name = name;
  /**
   * var subscribe function
   */
  this.subscribe = events.subscribe(constants.MODULE_TYPE, this.name);
};
API.prototype.on = function (event, fn) {
  this.subscribe(event, fn, false);
  return this;
};
API.prototype.once = function (event, fn) {
  this.subscribe(event, fn, true);
  return this;
};
API.prototype.do = function () {
  var name = arguments[0];
  var attr = Array.prototype.slice.call(arguments, 1);
  scopes.actions[this.name][name].apply(this, attr);
  return this;
};