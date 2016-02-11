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
  Object.defineProperty(this, 'actions', {
    enumerable: false,
    configurable: false,
    get: function() {
      return Object.keys(scopes.actions[this.name]);
    }
  });
};
API.prototype.on = function (event, fn) {
  events.subscribe(constants.MODULE_TYPE, this.name, event, fn);
  return this;
};
API.prototype.once = function (event, fn) {
  tevents.subscribe(constants.MODULE_TYPE, this.name, event, fn, true);
  return this;
};
API.prototype.do = function () {
  var name = arguments[0];
  var attr = Array.prototype.slice.call(arguments, 1);
  scopes.actions[this.name][name].apply(this, attr);
  return this;
};