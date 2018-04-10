/* global describe, it, expect */
require('../_full_api_test')
var methods = ['state', 'on', 'once', 'off', 'offOnce', 'trigger', 'registerAction', 'action']
describe('check Storage methods', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      var Storage = require('../../lib/storage-constructor')
      var testStorage = new Storage('test')
      expect(testStorage[method]).toBeDefined()
    })
  })
})
