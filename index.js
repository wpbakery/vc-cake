module.exports = (function () {
  let Services = require('./Services');
  let Modules = require('./Modules');
  let Mediator = require('./Mediator');

  return Bakery = {
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
    },
    init: function() {
      Modules.load();
      this.publish('core:init');
    }
  };
}());
