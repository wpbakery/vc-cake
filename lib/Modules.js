var modules = {};
module.exports = {
  exception: function (message) {
    this.message = message;
    this.name = "ServiceException";
  },
  load: function () {
    modules = modules.map((module) => {
      return module()
    });
  },
  add: function (name, module, context) {
    modules[name] = {
    callback: path,
    context: context
    });
  },
  get: function (name) {
    if (services[name]) {
      return services[name];
    } else {
      throw new this.exception('Wrong service: ' + name);
    }
  }
};


var services = {};

var isLoaded = false;
module.exports = {
  exception: function (message) {
    this.message = message;
    this.name = "ServiceException";
  },
  get: function (name) {
    if (services[name]) {
      return services[name];
    } else {
      throw new this.exception('Wrong service: ' + name);
    }
  },
  set: function (name, service, context) {
    if('function' === typeof service) {
      var Service = service(context);
      if('object' !== typeof data) {
        throw new this.exception('Service error.' +
          ' Service function desn\'t return object: ' + name);
      }
    } elseif('object' !== typeof service) {
      throw new this.exception('Service error.' +
        ' Service should be function or object: ' + name);
    }
    services[name] = service;
  }
};
