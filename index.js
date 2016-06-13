// Inner modules
var enVars = require('./config/settings').env;
var constants = require('./config/settings').constants;
var services = require('./lib/services');
var events = require('./lib/events');
var scopes = require('./lib/scopes');
var state = require('./lib/state');
var ModuleAPI = require('./lib/module-api-constructor');
var CakeException = require('./lib/exception');
/**
 * @constructor
 */
var App = function() {
};

App.prototype.add = function(scope, fn) {
  scopes.add(scope, fn, new ModuleAPI(scope));
  return this;
};
App.prototype.getService = function(name) {
  return services.get(name);
};
App.prototype.addService = function(name, obj) {
  services.add(name, obj);
  return this;
};
App.prototype.env = function(key, value) {
  var returnValue = this;
  if (key && 'undefined' !== typeof value) {
    if (constants.START_EVENT === key) {
      new CakeException().throw('Error! You can\'t set %s var. This var can be set only by app\'s start method', key);
    } else {
      enVars.set(key, value);
    }
  } else if (key) {
    returnValue = enVars.get(key);
  }
  return returnValue;
};
App.prototype.start = function(fn) {
  if (false === enVars.get('started')) {
    if ('function' === typeof fn) {
      fn();
    }
    scopes.load();
    enVars.set('started', true);
    events.publish('app', 'event', constants.START_EVENT, true, {});
  }
  return this;
};
App.prototype.end = function(fn) {
  if (true === enVars.get('started')) {
    if ('function' === typeof fn) {
      fn();
    }
    scopes.clear();
    services.clear();
    enVars.set('started', false);
    events.publish('app', 'event', 'end', true, {});
  }
  return this;
};
App.prototype.state = function() {
  return enVars.get('started') ? 'running' : 'stopped';
};
App.prototype.remove = function(name) {
  scopes.remove(name);
};
App.prototype.getData = function(key) {
  return state.get(key);
};
App.prototype.setData = function(key, value) {
  state.set(key, value);
  return this;
};
App.prototype.getDataAll = function() {
  return state.info();
};
module.exports = new App();

