var curry = require('lodash/curry');
var ModuleException = require('./lib/exception');
var Parts = require('./lib/Parts');
var Mediator = require('./lib/Mediator');
var Stack = require('./lib/Stack');

const SERVICE_TYPE = 'service';
const MODULE_TYPE = 'module';
const ACTION_TYPE = 'action';

var Cake = {
  add: function (type, name, callback, context, lazy, order) {
    Parts.add(type + '-' + name, callback, context, lazy, order);
  },
  subscribe: curry(function (type, name, eventName, callback) {
    return Mediator.subscribe(type + '-' + name + ':' + eventName, callback);
  }),
  publish: curry(function (type, name, eventName, data) {
    return Mediator.publish(type + '-' + name + ':' + eventName, data);
  }),
  get: function (type, name) {
    return Parts.get(type + '-' + name);
  }
};
var GetBehaviorModule = function (modules) {
  return curry(function(modules, name) {
    if (modules.indexOf(name) > -1) {
      var Module = Cake.get(MODULE_TYPE, name);
      Module.on = Cake.subscribe(MODULE_TYPE, name);
      return Module;
    }
    throw new ModuleException('Behavior does not have an access to the module '
      + name);
  })(modules);
};

module.exports = {
  addAction: function (name, callback, modules) {
    Cake.add(ACTION_TYPE, name, callback, {
      getService: this.getService,
      getModule: new GetBehaviorModule(modules)
    }, false, 6);
    return this;
  },
  addModule: function (name, callback) {
    Cake.add(MODULE_TYPE, name, callback, {
      getService: this.getService,
      publish: Cake.publish(MODULE_TYPE, name)
    });
    return this;
  },
  addService: function (name, callback) {
    Cake.add(SERVICE_TYPE, name, callback, null, true, 4);
    return this;
  },
  getService: function (name) {
    return Cake.get(SERVICE_TYPE, name);
  },
  app: function () {
    return new Stack();
  }
};
