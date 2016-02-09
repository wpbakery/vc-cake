
// Node js libs
var util = require('util');
// Node modules
var _ = require('lodash');
// Inner modules
var moduleException = require('./lib/exception');
var mediator = require('./lib/mediator');

const SERVICE_TYPE = 'service';
const MODULE_TYPE = 'module';

var Cake = {
    modules: [],
    moduleAPI: {},
    services: {},
    loadModules: function() {
      modules.map(function(m){
        var api = Cake.moduleAPI[m.scope];
        m.callback(api);
      });
    },
    publish: _.curry(function (type, name, eventName, data) {
      return mediator.publish(type + name + ':' + eventName, data);
    }),
    subscribe: _.curry(function (type, name, eventName, callback) {
      return  mediator.subscribe(type + name + ':' + eventName, callback);
    }),
    enVars: {
      debug: !!process.env.DEBUG
    },
    exception: function(message, returnValue, anyway) {
      if(true === this.enVars.debug || true === anyway) {
       throw new moduleException(message);
      }
      return returnValue || null;
    },
    API: function(scope){
      var data = {
        scope: scope,
        event: null,
      };
      var bindToEvent = function() {

      };
      return {
        // @todo set as development
        actionsList: function() {
          return Object.keys(Cake.modulesAPI.actions);
        },
        ,
        onBuild: function(event) {

        },
        // @todo need to add logic call it if it is called already
        on: function(event, callback) {
          if(callback) {

          } else {
            data.event = event;
            return {
              do: function(name) {
                return this;
              }
            };
        },
        getService: this.service,
        request: Cake.publish('', '', _, true),
        reply: Cake.subscribe('', ''),
      };
    }
};
Object.defineProperty(Cake, 'start', {
  set: function(value) {
    if(true !== this.cake) {
      this.value = true;
      this.loadModules();
      this.publish('', 'app', 'start', true);
    }
  }
  enumerable: false,
  configurable: false,
  writable: true,
  value: false
});

module.exports = {
  add: function(scope, callback) {
    if(Cake.modulesAPI[scope]) {
      var m = Cake.modulesAPI[scope] || {
        getService: this.service,
        request: Cake.publish('', '', _, true),
        reply: Cake.subscribe('', ''),
        module: new Cake.API(scope),
        actions: [],
      };
      m.addAction = function(name, callback) {
        this.actions[name] = callback;
      }.bind(m);
      Cake.modulesAPI[scope] = m;
    }
    Cake.modules[{scope: scope, callback: callback}];
    return this;
  },
  service: function(name) {
    return Cake.service(name) || Cake.exception(util.format('Serviss with a name "%s"  doesn\'t exist', name), {}, true);
  },
  addService: function(name, object) {
      Cake.add(appParts, SERVICE_TYPE, name, callback, null, 4, function(object){
        return _.curry(function(object, load) {
          return object;
      })(object);
    return this;
  },
  start: function() {
      Cake.start = true;
  },
  env: function(key) {
    return Cake[key];
  },
  setEnv: function(key, value) {
    Cake[key] = value;
  }
};
