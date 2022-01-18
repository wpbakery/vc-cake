/* global describe, it, expect */
require('../_full_api_test')
const methods = ['set', 'get', 'onChange', 'ignoreChange']
describe('check Storage state module methods', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      const StorageState = require('../../lib/storage-state-constructor')
      const testStorageState = new StorageState('test', 'stateState')
      expect(testStorageState[method]).toBeDefined()
    })
  })
  it('checks does data is stored', function () {
    const StorageState = require('../../lib/storage-state-constructor')
    const testStorageState = new StorageState('test', 'checking')
    const testValue = 'check this value now'
    testStorageState.set(testValue)
    expect(testStorageState.get()).toBe(testValue)
  })
})
