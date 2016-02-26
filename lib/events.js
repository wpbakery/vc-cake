'use strict';

var curry = require('lodash').curry;
var CakeException = require('./exception');
var mediator = require('./mediator');

var events = module.exports = {
  publish: curry(function(prefix, scope, name, data, options) {
    mediator.publish(prefix + '-' + scope + ':' + name, data, options);
  }),
  subscribe: curry(function(prefix, scope, name, fn, options) {
    var once = options && options.once ? options.once : false;
    mediator.subscribe(prefix + '-' + scope + ':' + name, fn, once);
  }),
  request: function(event, data, options) {
    if ('start' === event) {
      new CakeException().throw('Error! You can\'t call %s event. This event can be called only by aapp\'s start method', event);
    } else {
      events.publish('app', 'event', event, data, options || {});
    }
  },
  reply: function(event, fn) {
    events.subscribe('app', 'event', event, fn, {});
  },
};
