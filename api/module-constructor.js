'use strict';

var scopes = require('../lib/scopes');
var events = require('../lib/events');
var services = require('../lib/services');
var constants = require('../config/settings').constants;
var ModulePublicAPI = require('./module-public-constructor');
/**
 * @constructor
 * @type {API}
 */
var API = module.exports = function (name) {
  this.name = name;
  if('undefined' === typeof scopes.actions[this.name]) {
    scopes.actions[this.name] = {};
  }
  this.actions = scopes.actions[this.name];
};
API.prototype.addAction = function (name, fn) {
  this.actions[name] = fn;
  return this;
};
API.prototype.getService = function(name){
  return services.get(name);
};
API.prototype.addService = function(name, obj) {
  services.add(name, obj);
  return this;
};
API.prototype.request = function(event, data){
  events.request(event, data);
  return this;
};
API.prototype.reply = function(event, fn){
  events.reply(event, fn);
  return this;
};
API.prototype.notify = function(event, data) {
  events.publish(constants.MODULE_TYPE, this.name, event, data);
  return this;
};
API.prototype.on = function(event, data) {
  events.subscribe(constants.MODULE_TYPE, this.name, event, data);
  return this;
};
API.prototype.once = function(event, data) {
  events.subscribe(constants.MODULE_TYPE, this.name, event, data, true);
  return this;
};
API.prototype.module = function(scope) {
  return new ModulePublicAPI(scope);
};
API.prototype.destructor = function(fn) {
  scopes.destructor(this.name, fn);
  return this;
};