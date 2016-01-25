var ModuleException = require('./exception');
var curry = require('lodash/curry');
var sortBy = require('lodash/sortBy');
var partsList = [];
var parts = {};
var isLoaded = false;
module.exports = {
  get: function(name) {
    if(!isLoaded) {
      throw new ModuleException('Parts not loaded.');
    }
    if('function' === typeof parts[name]) {
      parts[name] = parts[name](true);
    }
    return parts[name];
  },
  add: function (name, callback, context, lazy, order) {
    if('string' !== typeof name) {
      throw new ModuleException('Wrong part name: ' + name);
    }
    if('function' !== typeof callback) {
      throw new ModuleException('Wrong callback function for part: ' + name);
    }
    partsList.push({
      name: name,
      callback: callback,
      context: context,
      lazy: !!lazy,
      order: order || 5
    });
  },
  load: function() {
      isLoaded = true;
      sortBy(partsList, 'order').forEach(function(part){
        if(part.lazy) {
          parts[part.name] = curry(function(part, callback, context, load){
            return load ? (context ? callback(context): callback()) : null;
          })(part.name, part.callback, part.context);
        } else {
          parts[part.name] = part.context ?
            part.callback(part.context) : part.callback();
        }
      });
  }
};
