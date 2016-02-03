var curry = require('lodash/curry');
var moduleException = require('./lib/exception');
var Mediator = require('./lib/mediator');

var apps = {};
var envars = {
  debug: false
};
var appException = function(message, returnValue) {
  if(true === envars.debug) {
   throw new moduleException(message);
  }
  return returnValue || null;
}
var AppBuilder = function(name){
  var data = {
      mediator: new Mediator(),
      modules: {},
      services: {},
      name: name || 'main';
  };
  if('string' !== typeof data.name || 'undefined' !== typeof apps[data.name]) {
    return appException('Application with this name "' + name + '" already exists or name is wrong');
  }
  // Create app object which will be
  apps[data.name] = {
    install: function(name, object) {
      data.modules[name] = {
        on: curry(function(mediator, name, eventName, callback) {
          return mediator.subscribe(name + ':' + eventName, callback);
        })(data.mediator, name)
      };
      return Object.create(object, {
        notify: curry(function(mediator, name, eventName, data){
          return mediator.publish(name + ':' + eventName, data);
        })(data.mediator, name)
      });
    },
    module: function(name) {
      return modules[name] ? modules[name] : appException('Wrong module name: ' + name, {on: function(){
        return this;
      }});
    },
    getService: function (name) {
      return data.services[name];
    },
    // Global event subscibe
    on: function(event, callback) {
      data.mediator(event, callback);
    }
  };
  return {
    addService: function (name, callback) {
      data.services[name] = function(){
        callback()
      };
      return this;
    },
    start: function (callback) {
      'function' === typeof callback && callback(this);
      data.mediator.publish('start', true);
      return this;
    }
  };
};
AppBuilder.app = function(name) {
  var appName = name || 'main';
  if('object' === typeof apps[appName]) {
    return apps[appName];
  }
  return appException('Wrong app name: ' + name);
};
AppBuilder.setEnv = function(key, value) {
  envars[key] = value;
};
AppBuilder.env = function(key) {
  return envars[key];
};

module.exports = AppBuilder;
