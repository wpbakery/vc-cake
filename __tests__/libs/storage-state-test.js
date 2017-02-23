/* global describe, it, expect */
require('../_full_api_test')
var methods = ['set', 'get', 'onChange', 'ignoreChange']
describe('check Events module methods', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      var StorageState = require('../../lib/storage-state-constructor')
      var testStorageState = new StorageState('test', 'stateState')
      expect(testStorageState[method]).toBeDefined()
    })
  })
})
