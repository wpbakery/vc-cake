var curry = require('lodash/curry');
var moduleException = require('./lib/exception');
var mediator = require('./lib/mediator');
var Parts = require('./lib/parts');
var Stack = require('./lib/stack');

const SERVICE_TYPE = 'service';
const MODULE_TYPE = 'module';
const ACTION_TYPE = 'action';

var Cake = {
  add: function (type, name, callback, context, order, wrapper) {
    Parts.add(type + '-' + name, callback, context, order, wrapper);
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
    throw new moduleException('Behavior does not have an access to the module '
      + name);
  })(modules);
};

module.exports = function(){
  var appMediator = new mediator();
  return {
    addAction: function (name, callback, modules) {
      Cake.add(ACTION_TYPE, name, callback, {
        getService: this.getService,
        getModule: new GetBehaviorModule(modules)
      }, 6, function(object){

      });
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
      Cake.add(SERVICE_TYPE, name, callback, null, 4, function(object){
          return _.curry(function(object, load) {
              return object;
          })(object);
      });
      return this;
    },
    getService: function (name) {
      return Cake.get(SERVICE_TYPE, name);
    },
    run: function () {
      var app = new Stack();
      app.init(function(){
        Parts.load();
      });
      return app;
    }
  }
};
