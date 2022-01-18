/* global describe, it, expect */
require('../_full_api_test')
const methods = ['state', 'on', 'once', 'off', 'offOnce', 'trigger', 'registerAction', 'action']
describe('check Storage methods', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      const Storage = require('../../lib/storage-constructor')
      const testStorage = new Storage('test')
      expect(testStorage[method]).toBeDefined()
    })
  })
})
