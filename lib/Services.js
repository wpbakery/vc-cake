var services = {};
var servicesBeforeLoad = [];

var isLoaded = false;
module.exports = {
  exception: function (message) {
    this.message = message;
    this.name = "ServiceException";
  },
  get: function (name) {
    if(!isLoaded) {
      thios.load();
    }
    if (services[name]) {
      return services[name];
    } else {
      throw new this.exception('Wrong service: ' + name);
    }
  },
  isLoaded: function() {
    return isLoaded;
  },
  load: function () {
    if(this.isLoaded()) {
      return isLoaded;
    }
    servicesBeforeLoad
      .forEach((service) => {
        services[service.name] = require(service.path);
      });
    isLoaded = true;
    return this.isLoaded();
  },
  set: function (name, path) {
    servicesBeforeLoad.push({name: name, path: path});
  }
};
