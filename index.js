var Parts = require('./lib/Parts');
var Mediator = require('./lib/Mediator');
var Stack = require('./lib/Stack');
module.exports = (function () {

  var addPart = function(type, name, callback, context, lazy) {
    Part.add(type + ':' + name, callback, context, lazy);
  };
  var getBehaviorModule = function(modules) {
    this.modules = modules;
    return function(name) {
      if(this.modules.indexOf(name) > -1) {
        return Parts.get('module:' + name);
      }
      throw new ModuleException('Behavior does not have an access to the module '
        + name);
    }
  }
  // Main object
  return {
    addBehavior: function(callback, modules) {
      addPart('behavior', callback, {
        getService: this.getService,
        subscribe: Mediator.subscribe,
        getModule: new getBehaviorModule(modules)
      });
      this;
    },
    addModule: function(name, callback) {
      addPart('module', name, callback, {
        getService: this.getService,
        publish: Mediator.publish
      });
      this;
    },
    addService: function (name, callback) {
      addPart('service', name, callback, {
        getService: this.getService
      }, true);
      this;
    },
    getService: function (name) {
      return Parts.get('services:' + name);
    },
    app: function() {
      return new Stack();
    }
  };
}());
