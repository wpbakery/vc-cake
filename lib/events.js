'use strict';

var curry = require('lodash').curry;
var CakeException = require('./exception');
var mediator = require('./mediator');

var events = module.exports = {
  publish: curry(function(prefix, scope, name, data) {
    mediator.publish(prefix + '-' + scope + ':' + name, data);
  }),
  subscribe: curry(function(prefix, scope, name, fn, once) {
    mediator.subscribe(prefix + '-' + scope + ':' + name, fn, once);
  }),
  request: function(event, data) {
    if ('start' === event) {
      new CakeException().throw('Error! You can\'t call %s event. This event can be called only by aapp\'s start method', event);
    } else {
      events.publish('app', 'event', event, data);
    }
  },
  reply: function(event, fn) {
    events.subscribe('app', 'event', event, fn, false);
  }
};
