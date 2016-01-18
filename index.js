// Modules to work with project parts.
var Services = require('./lib/Services');
var Modules = require('./lib/Modules');
var Mediator = require('./lib/Mediator');

module.exports = (function () {
  var inited = false;
  var ModuleException = function (message) {
    this.message = message;
    this.name = "VcCakeException";
  };
  var callbacksHops = {};
  var addCallback = function(hop, callback) {
    if('string' !== typeof(hop)){
      throw new ModuleException('Wrong hop name');
    }
    if('function' !== typeof(callback)) {
      throw new ModuleException('Callback not a function for hop: ' + hop);
    }
    if('undefined' !== typeof callbacksHops[hop]) {
      callbacksHops[hop] = [];
    }
    callbacksHops[hop].push(callback);
  };
  // Before init.
  var callCallbacks = function(hop) {
    if('string' === typeof hop && Array.isArray(callCallbacks[hop])) {
      callbacksHops[hop].forEach(function(callback){
        var value = callback();
        if('boolean' !== typeof value) {
          isInit = value;
        }
      });
    } else {
      throw new ModuleException('Wrong hop or hop doesn\'t exists');
    }
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
      addCallback('before', callback);
      return this;
    },
    init: function() {
      this.call('before');
      if(!this.isInited()) {
        // Iterate via modules with call and hop.
        Services.load();
        Modules.load();
        this.publish('init');
        inited = true;
        this.call('after');
      }
      return inited;
    },
    call: function(hop) {
      !inited && callCallbacks(hop);
      return this;
    },
    isInited: function() {
      return inited;
    },
    after: function(callback) {
      addCallback('after', callback);
      return this;
    }
  };
}());
