'use strict';
var Immutable = require('immutable');
var state = new Immutable.Map({});

module.exports = {
  set: function(key, value) {
    state = state.set(key, ['array', 'object'].indexOf(typeof value) > -1 ? new Immutable.Map(value) : value);
    return this;
  },
  get: function(key) {
    return state.get(key);
  },
  info: function() {
    return state.toJS();
  }
};
