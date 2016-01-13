module.exports = (function () {
  var Services = require('./lib/Services');
  var Modules = require('./lib/Modules');
  var Mediator = require('./lib/Mediator');

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
    init: function() {
      Modules.load();
      this.publish('init');
    }
  };
}());
