/* global describe, it, expect */
require('../_full_api_test')
const methods = ['add', 'get', 'clear']
describe('check Events module methods', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      const events = require('../../lib/services')
      expect(events[method]).toBeDefined()
    })
  })
})
