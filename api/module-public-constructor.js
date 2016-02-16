var isFunction = require('lodash').isFunction;
var events = require('../lib/events');
var scopes = require('../lib/scopes');
var constants = require('../config/settings').constants;
var ProxyEvent = require('./proxy-event-constructor');
/**
 * @constructor
 * @type {API}
 */
var API = module.exports = function(name) {
  this.name = name;
  Object.defineProperty(this, 'actions', {
    enumerable: false,
    configurable: false,
    get: function() {
      return Object.keys(scopes.actions[this.name]);
    }
  });
};
API.prototype.on = function(event, fn, once) {
  delete this.currentEvent;
  if ('undefined' === typeof fn) {
    Object.defineProperty(this, 'currentEvent', new ProxyEvent({name: event, once: !!once}));
  } else if (isFunction(fn)) {
    events.subscribe(constants.MODULE_TYPE, this.name, event, fn, !!once);
  }
  return this;
};
API.prototype.once = function(event, fn) {
  return this.on(event, fn, true);
};
API.prototype.do = function() {
  var action = arguments[0];
  var attr = Array.prototype.slice.call(arguments, 1);
  if (this.currentEvent) {
    this.on(this.currentEvent.getName(), (function(name, action, attr) {
      scopes.actions[this.name][action].apply(this, attr);
    }(name, action, attr)), this.currentEvent.getOnce());
    delete this.currentEvent;
  } else {
    scopes.actions[this.name][action].apply(this, attr);
  }
  return this;
};
