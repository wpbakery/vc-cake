var Parts = require('./Parts');
var ModuleException = require('./exception');
var callbacksHops = {};
var addCallback = function(hop, callback) {
  if('string' !== typeof(hop)){
    throw new ModuleException('Wrong hop name');
  }
  if('function' !== typeof(callback)) {
    throw new ModuleException('Callback not a function for hop: ' + hop);
  }
  if('undefined' !== typeof callbacksHops[hop]) {
    callbacksHops[hop] = [];
  }
  callbacksHops[hop].push(callback);
};
var App = function() {
  this.inited = false;
};
App.prototype.before = function(callback) {
  addCallback('before', callback);
  return this;
};
App.prototype.start = function(callback) {
  if('function' === typeof callback) {
    this.init(callback);
  }
  this.call('before');
  if(!this.isInited()) {
    Parts.load();
    this.call('init');
    this.call('after');
  }
  return this.isInited();
};
App.prototype.call = function(hop) {
  !this.isInited() && callCallbacks(hop);
  return this;
};
App.prototype.isInited = function() {
  return this.inited;
};
App.prototype.init = function(calback) {
  !this.isInited() && addCallback('init', callback);
  return this;
};
App.prototype.after = function(callback) {
  !this.isInited() && addCallback('after', callback);
  return this;
};
module.exports = App;
