require('../_full_api_test');
var vcCake = require('../../index');

describe('App Data', function() {
  var methods = ['getData', 'setData', 'getDataAll'];
  methods.forEach(function(method) {
    it('checks method "' + method + '" exists', function() {
      expect(typeof vcCake[method]).toBe('function');
    });
  });
});

describe('App Data manage', function() {

  var value = 'string_';
  var key = 'super_string_';

  vcCake.setData(key, value);
  expect(vcCake.getData(key)).toBe(value);
  
  // Test immutability of object
  value = 'mutate_';
  expect(vcCake.getData(key)).not.toBe(value);
  value = 'string_';

  // Test immutability of complex object
  var valueObject = {
    element: 'test1_',
    element2: 'test2_'
  };
  var keyObject = 'super_object_';
  vcCake.setData(keyObject, valueObject);
  valueObject.element = 'should_fail_';
  expect(vcCake.getData(keyObject).element).not.toBe(valueObject.element);

  // Check info method
  var data = vcCake.getDataAll();
  expect(data[keyObject].element2).toBe(valueObject.element2);
});
