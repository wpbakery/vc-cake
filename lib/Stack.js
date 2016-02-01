var ModuleException = require('./exception');
var App = function(mediator) {
  this.inited = false;
  this.mediator = mediator;
};
App.prototype.before = function(callback) {
  addCallback('before', callback);
  return this;
};
App.prototype.start = function(callback) {
  if('function' === typeof callback) {
    this.init(callback);
  }
  this.publish('before', true);
  !this.isInited() && this.publish('init');
  this.publish('after');
  return this.isInited();
};
App.prototype.isInited = function() {
  return this.inited;
};
App.prototype.init = function(callback) {
  !this.isInited() && addCallback('init', callback);
  return this;
};
App.prototype.after = function(callback) {
  !this.isInited() && addCallback('after', callback);
  return this;
};
module.exports = App;
