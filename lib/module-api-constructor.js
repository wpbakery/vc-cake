var curry = require('lodash').curry;

var scopes = require('./scopes');
var events = require('./events');
var services = require('./services');
var constants = require('../config/settings').constants;
var enVars = require('../config/settings').env;
var ModulePublicAPI = require('./module-public-api-constructor');
/**
 * @constructor
 * @type {API}
 */
var API = module.exports = function(name) {
  this.name = name;
  if ('undefined' === typeof scopes.actions[this.name]) {
    scopes.actions[this.name] = {};
  }
  this.actions = scopes.actions[this.name];
};
API.prototype.addAction = function(name, fn) {
  this.actions[name] = fn;
  return this;
};
API.prototype.getService = function(name) {
  return services.get(name);
};
API.prototype.addService = function(name, obj) {
  services.add(name, obj);
  return this;
};
API.prototype.request = function(event, data, options) {
  if (true === enVars.get('started')) {
    events.request(event, data, options);
  } else {
    events.reply(constants.START_EVENT, curry(function(event, data, options, start) {
      if (true === start) {
        events.request(event, data, options);
      }
    })(event, data, options));
  }
  return this;
};
API.prototype.reply = function(event, fn) {
  events.reply(event, fn);
  return this;
};
API.prototype.notify = function(event, data, options) {
  if (true === enVars.get('started')) {
    events.publish(constants.MODULE_TYPE, this.name, event, data, options || {});
  } else {
    events.reply(constants.START_EVENT, curry(function(module, name, event, data, options, start) {
      if (true === start) {
        events.publish(module, name, event, data, options);
      }
    })(constants.MODULE_TYPE, this.name, event, data, options || {}));
  }
  return this;
};
API.prototype.on = ModulePublicAPI.prototype.on;
API.prototype.once = function(event, data) {
  return this.on(event, data, {once: true});
};
API.prototype.off = ModulePublicAPI.prototype.off;
API.prototype.offOnce = function(event, data) {
  return this.off(event, data, {once: true});
};
API.prototype.module = function(scope) {
  return new ModulePublicAPI(scope);
};
API.prototype.destructor = function(fn) {
  scopes.destructor(this.name, fn);
  return this;
};
