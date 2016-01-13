module.exports = (function () {
  // Modules to work with project parts.
  var Services = require('./lib/Services');
  var Modules = require('./lib/Modules');
  var Mediator = require('./lib/Mediator');

  // Before/after login on init.
  var beforeCallbacks = [];
  var afterCallbacks = [];
  var callBeforeCallbacks = function() {
    beforeCallbacks.forEach(function(callback){
      callback();
    });
  };
  var callAfterCallbacks = function() {
    afterCallbacks.foreach(function(callback){
      callback();
    });
  };
  // Main object
  return {
    publish: Mediator.publish,
    subscribe: Mediator.subscribe,
    installTo: function (obj) {
      obj.subscribe = Mediator.subscribe;
      obj.publish = Mediator.publish;
      return obj;
    },
    addService: function (name, path) {
      Services.set(name, path);
      return this;
    },
    getService: function (name) {
      return Services.get(name);
    },
    require: function (path) {
      Modules.set(path);
      return this;
    },
    before: function(callback) {
      beforeCallbacks.push(callback);
      return this;
    },
    init: function() {
      callBeforeCallbacks();
      Modules.load();
      this.publish('init');
      callAfterCallbacks();
      return true;
    },
    after: function(callback) {
      afterCallbacks.push(callback);
      return this;
    }
  };
}());
