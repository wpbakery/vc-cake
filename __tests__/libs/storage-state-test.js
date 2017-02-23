/* global describe, it, expect */
require('../_full_api_test')
var methods = ['set', 'get', 'onChange', 'ignoreChange']
describe('check Storage state module methods', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      var StorageState = require('../../lib/storage-state-constructor')
      var testStorageState = new StorageState('test', 'stateState')
      expect(testStorageState[method]).toBeDefined()
    })
  })
  it('checks does data is stored', function () {
    var StorageState = require('../../lib/storage-state-constructor')
    var testStorageState = new StorageState('test', 'checking')
    var testValue = 'check this value now'
    testStorageState.set(testValue)
    expect(testStorageState.get()).toBe(testValue)
  })
})
