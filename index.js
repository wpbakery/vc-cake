// Modules to work with project parts.
var Modules = require('./lib/Modules');
var Mediator = require('./lib/Mediator');
var Stack = require('./lib/Stack');
module.exports = (function () {

  var addModule = function(type, name, callback, context) {
    Module.add(type + ':' + name, callback, context);
  };
  var getBehaviorModule = function(modules) {
    this.modules = modules;
    return function(name) {
      if(this.modules.indexOf(name) > -1) {
        return Modules.get(name);
      }
      throw new ModuleException('Behavior does not have an access to the module '
        + name);
    }
  }
  // Main object
  return {
    addBehavior: function(callback, modules) {
      addModule('behavior', callback, {
        getService: this.getService,
        subscribe: Mediator.subscribe,
        getModule: new getBehaviorModule(modules)
      });
      this;
    },
    addModule: function(name, callback) {
      addModule('module', name, callback, {
        getService: this.getService,
        publish: Mediator.publish
      });
      this;
    },
    addService: function (name, callback) {
      addModule('service', name, callback, {
        getService: this.getService
      });
      this;
    },
    getService: function (name) {
      return Services.get(name);
    },
    app: function() {
      return new Stack();
    }
  };
}());
