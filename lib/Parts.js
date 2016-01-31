var ModuleException = require('./exception');
var curry = require('lodash/curry');
var flow = require('lodash/flow');
var sortBy = require('lodash/sortBy');
var partsList = [];
var parts = {};
var isLoaded = false;
module.exports = Mediator.installTo({
  get: function(name) {
    if(!isLoaded) {
      throw new ModuleException('Parts not loaded.');
    }
    if('function' === typeof parts[name]) {
      parts[name] = parts[name](true);
    }
    return parts[name];
  },
  add: function (name, callback, context, order, wrapper) {
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
      wrapper: wrapper,
      order: order || 5
    });
  },
  load: function() {
      isLoaded = true;
      sortBy(partsList, 'order').forEach(function(part){
        if('function' === typeof part.wrapper) {
          var moduleObject = flow(part.callback, part.wrapper)(part.context);
        } else {
          parts[part.name] = part.callback(part.context);
        }
      });
  }
});
