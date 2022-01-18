/* global describe, it, expect */
require('../_full_api_test')
const methods = ['publish', 'subscribe', 'request', 'reply', 'unsubscribe']
describe('check Events module methods', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      const events = require('../../lib/events')
      expect(events[method]).toBeDefined()
    })
  })
})
