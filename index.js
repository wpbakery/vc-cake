var curry = require('lodash/curry');
var moduleException = require('./lib/exception');
var Mediator = require('./lib/mediator');
var Parts = require('./lib/parts');
var Stack = require('./lib/stack');
const SERVICE_TYPE = 'service';
const MODULE_TYPE = 'module';
const ACTION_TYPE = 'action';

var apps = {};
var envars = {
  debug: false
};
var appException = function(message) {
  if(true === envars.debug) {
   throw new moduleException(message); 
  }
}
var Cake = {
    add: function (parts,type, name, callback, context, order, wrapper) {
      parts.add(type + '-' + name, callback, context, order, wrapper);
    },
    subscribe: curry(function (mediator, type, name, eventName, callback) {
      return  mediator.subscribe(type + '-' + name + ':' + eventName, callback);
    }),
    publish: curry(function (mediator, type, name, eventName, data) {
      return mediator.publish(type + '-' + name + ':' + eventName, data);
    }),
    get: function (parts, type, name) {
      return parts.get(type + '-' + name);
    }
};
var GetBehaviorModule = function (parts, mediator, modules) {
    return curry(function(modules, name) {
      if (modules.indexOf(name) > -1) {
        var Module = Cake.get(parts, MODULE_TYPE, name);
        Module.on = Cake.subscribe(mediator, MODULE_TYPE, name);
        return Module;
      }
      appException('Behavior does not have an access to the module '
        + name);
      return null;
    })(modules);
};
exports.setEnv = function(key, value) {
  envars[key] = value;
};
exports.env = function(key) {
  return envars[key];
};
exports.app = function(name){
  var appMediator = new Mediator();
  var appParts = new Parts();
  
  return {
    addAction: function (name, callback, modules) {
      Cake.add(appParts, ACTION_TYPE, name, callback, {
        getService: this.getService,
        getModule: new GetBehaviorModule(appParts, appMediator, modules)
      }, 6, {
          return {
            invoke: _.curry(function(moduleName, name) {
              if('undefind' !== typeof object[name]) {
                var args = arguments.slice(1);
                return object[name](...args);
              })(name);
              appException('Wrong method name "' + name + '" for module: ' + moduleName);
              return null;
            },
            list: function() {

            }
          }
      });
      return this;
    },
    addModule: function (name, callback) {
      Cake.add(appParts, MODULE_TYPE, name, callback, {
        getService: this.getService,
        publish: Cake.publish(appMediator, MODULE_TYPE, name)
      });
      return this;
    },
    addService: function (name, callback) {
      Cake.add(appParts, SERVICE_TYPE, name, callback, null, 4, function(object){
          return _.curry(function(object, load) {
              return object;
          })(object);
      });
      return this;
    },
    getService: function (name) {
      return Cake.get(appParts, SERVICE_TYPE, name);
    },
    run: function () {
      var app = new Stack(appMediator);
      app.init(function(){
        appParts.load();
      });
      return app;
    }
  }
};

exports.get = function(name) {
  if('object' === typeof apps[name]) {
    return apps[name];
  }
  appException('Wrong app name: ' + name);
  return null;
};
