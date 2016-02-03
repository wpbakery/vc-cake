
// Node js libs
var util = require('util');
// Node modules
var curry = require('lodash/curry');
// Inner modules
var moduleException = require('./lib/exception');
var Mediator = require('./lib/mediator');
// Storage for all apps build with vcCake.
var apps = {};

var appException = function(message, returnValue, anyway) {
  if(true === enVars.debug || true === anyway) {
   throw new moduleException(message);
  }
  return returnValue || null;
}
var Builder = function(name){
  if(['undefined', 'string'].indexOf(typeof name) < 0 || 'undefined' !== typeof apps[name]) {
    return appException(
      utils.format('Application with this name "%s" already exists or name is wrong', name),
      null,
      true
    );
  }
  var data = {
      mediator: new Mediator(),
      modules: {},
      services: {},
      name: name || 'main'
  };
  // Create app object which will be
  apps[data.name] = {
    install: function(name, object) {
      if(!data.modules[name]) {
        data.modules[name] = {
          on: curry(function(mediator, name, eventName, callback) {
            return mediator.subscribe(name + ':' + eventName, callback);
          })(data.mediator, name)
        };
      };
      return (function(o){
        o.notify = function(){
        };
        return 0;
      }(object));
    },
    module: function(name) {
      return modules[name] ? modules[name] : appException(
        util.format('Wrong module name: %s', name), {on: function(){
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
  var app = Object.create(apps[data.name]);
  app.addService = function (name, object) {
    data.services[name] = 'function' === typeof object ? new object(name) : object;
    return this;
  };
  app.start = function (callback) {
    'function' === typeof callback && callback(this);
    data.mediator.publish('start', true);
    return true;
  };
  return app;
};
Builder.app = function(name) {
  var appName = name || 'main';
  if('object' === typeof apps[appName]) {
    return apps[appName];
  }
  return appException( util.format('Wrong app name: %s', name));
};
/* This block is about environment variables for VcCake. */
var enVars = {
  debug: !!process.env.DEBUG
};
/* Set env */
Builder.setEnv = function(key, value) {
  enVars[key] = value;
};
/* Get env */
Builder.env = function(key) {
  return enVars[key];
};

module.exports = Builder;
