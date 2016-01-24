var ModuleException = require('./exception');
var parts = {};
var isLoaded = false;
module.exports = {
  get: function(name) {
    return parts[name]
  },
  add: function (name, callback, context, lazy) {
    if('string' !== typeof name) {
      throw new ModuleException('Wrong part name: ' + name);
    }
    if('function' !== typeof callback) {
      throw new ModuleException('Wrong callback function for part: ' + name);
    }
    parts[name] = {
    callback: callback,
    context: context || {},
    lazy: !!lazy
    });
  },
  load: function() {
    Object.keys(parts).forEach(function(part){
      if(parts[part].lazy) {
        parts[part] = function(p){
          return p.callback(p.context);
        }(parts[part]);
      } else {
        parts[part] = parts[part].callback(parts[part].context);
      }
    });
  }
};
