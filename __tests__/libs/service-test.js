/* global describe, it, expect */
require('../_full_api_test')
var methods = ['add', 'get', 'clear']
describe('check Events module methods', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      var events = require('../../lib/services')
      expect(events[method]).toBeDefined()
    })
  })
})
