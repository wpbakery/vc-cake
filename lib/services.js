var CakeException = require('./exception');
var items = {};
module.exports = {
  add: function(name, obj) {
    if ('undefined' !== typeof items[name]) {
      new CakeException(null, true).throw('Error! Service with a name %s already exists', name);
    }
    if ('object' !== typeof obj) {
      new CakeException(null, true).throw('Error! Service with a name %s already exists', name);
    }
    items[name] = {
      loader: _.curry(function(obj, load) {
        return load ? obj : null;
      })(obj)
    };
  },
  get: function(name) {
    var value = null;
    if ('undefined' === items[name]) {
      new CakeException().throw('Error! Service with a name %s doesn\'t exists', name);
    }
    if ('undefined' !== typeof items[name].instance) {
      value = items[name].instance;
    } else if ('function' === typeof items[name].loader) {
      items[name].instance = items[name].loader(true);
      value = items[name].instance;
    }
    return value || new CakeException().throw('Error! Can\'t handle with a service %s.', name);
  },
  clear: function() {
    items = {};
  }
};
