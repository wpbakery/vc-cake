/* global describe, it, expect */
require('../_full_api_test')
var methods = ['state', 'trigger']
describe('check Storage Public methods', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      var StoragePublic = require('../../lib/storage-public-constructor')
      var testStorage = new StoragePublic('test')
      expect(testStorage[method]).toBeDefined()
    })
  })
})
