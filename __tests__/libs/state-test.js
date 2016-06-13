require('../_full_api_test');
var methods = ['set', 'get', 'info'];
describe('check State module methods', function() {
  methods.forEach(function(method) {
    it('checks method "' + method + '" exists', function() {
      var state = require('../../lib/state');
      expect(typeof state[method]).toBe('function');
    });
  });
});
describe('check set/get/info for State module', function() {
  // Check set/get
  var state = require('../../lib/state');
  var value = 'string';
  var key = 'super_string';

  state.set(key, value);
  expect(state.get(key)).toBe(value);
  
  // Test immutability of object
  value = 'mutate';
  expect(state.get(key)).not.toBe(value);
  value = 'string';

  // Test immutability of complex object
  var valueObject = {
    element: 'test1',
    element2: 'test2'
  };
  var keyObject = 'super_object';
  state.set(keyObject, valueObject);
  valueObject.element = 'should_fail';
  expect(state.get(keyObject).element).not.toBe(valueObject.element);

  // Check info method
  var data = state.info();
  expect(data[keyObject].element2).toBe(valueObject.element2);
});
