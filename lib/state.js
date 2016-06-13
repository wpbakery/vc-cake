'use strict';
var Immutable = require('immutable');
var state = new Immutable.Map({});

module.exports = {
  set: function(key, value) {
    state = state.set(key, Immutable.fromJS(value));
  },
  get: function(key) {
    var data = state.get(key);
    return data instanceof Immutable.Collection ? data.toJS() : data;
  },
  info: function() {
    return state.toJS();
  }
};
