var curry = require('lodash/curry');
var moduleException = require('./lib/exception');
var Mediator = require('./lib/mediator');
var Parts = require('./lib/parts');
var Stack = require('./lib/stack');

const SERVICE_TYPE = 'service';

var apps = {};
var envars = {
  debug: false
};
var appException = function(message) {
  if(true === envars.debug) {
   throw new moduleException(message);
  }
  return null;
}
exports.setEnv = function(key, value) {
  envars[key] = value;
};
exports.env = function(key) {
  return envars[key];
};
var AppBuilder = function(name){
  var appMediator = new Mediator();
  var appParts = new Parts();
  var appModules = {};
  var appName = name || '_';
  if('undefined' !== typeof appName[name]) {
    return appException('Application with this name ' + name + ' already exists');
  }
  // Create app object which will be
  apps[name || '_'] = {
    install: function(name, object) {
      appModules[name] = {
        on: function() {

        }
      };
      return Object.create(object, {
        notify: curry(function(){
          return mediator.publish(name + ':' + eventName, data);
        })(mediator, name)
      });
    },
    module: function(name) {
      return modules[name] ?  : appException('Wrong module name: ' + name);
    },
    getService: function (name) {
      return parts.get(name);
    }
  };
  return {
    addService: function (name, callback) {
      parts.add(name, callback, null, 4, function(object){
          return _.curry(function(object, load) {
              return object;
          })(object);
      });
      return this;
    },
    build: function () {
      var app = new Stack(appMediator);
      app.init(function(){
        appParts.load();
      });
      return app;
    }
  };
};

exports.app = function(name) {
  var appName = name || '_'
  if('object' === typeof apps[appName]) {
    return apps[appName];
  }
  appException('Wrong app name: ' + name);
  return null;
};
module.exports = AppBuilder;
