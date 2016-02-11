var scopes = require('../lib/scopes');
var events = require('../lib/events');

var ModulePublicAPI = require('./module-public-constructor');

var API = module.exports = function (name) {
  this.name = name;
  if('undefined' !== typeof scopes.actions[this.name]) {
    scopes.actions[this.name] = {};
  }
  this.actions = scopes.actions[this.name];
  this.publish = events.publish(MODULE_TYPE, name);
  this.subscribe = events.subscribe(MODULE_TYPE, name);
  this.subscribeOnce = events.subscribe(MODULE_TYPE, name);
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
};
API.prototype.notify = function(event, data) {
  this.publish(event, data);
  return this;
};
API.prototype.on = function(event, data) {
  this.subscribe(event, data);
  return this;
};
API.prototype.once = function(event, data) {
  this.subscribeOnce(event, data);
  return this;
};
API.prototype.module = function(scope) {
  return new ModulePublicAPI(scope);
};
API.prototype.destructor = function(fn) {

  return this;
}