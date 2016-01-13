let services = {};
module.exports = {
  exception: function (message) {
    this.message = message;
    this.name = "ServiceException";
  },
  get: function (name) {
    if (services[name] && services[name].instance) {
      return services[name].instance;
    } else if (services[name] && services[name].path) {
      services[name] = {
        instance: require(services[name].path)
      };
      return services[name].instance;
    } else {
      throw new this.exception('Wrong service: ' + name);
    }
  },
  set: function (name, path) {
    services[name] = {
      path: path
    };
  }
};
