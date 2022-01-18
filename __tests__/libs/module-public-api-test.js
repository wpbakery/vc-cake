/* global describe, it, expect */
require('../_full_api_test')
const methods = ['do', 'on', 'once']

describe('check Module public API module', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      const Module = require('../../lib/module-public-api-constructor')
      const api = new Module()
      expect(api[method]).toBeDefined()
    })
  })
  it('check do via on how it works', function () {
    const Module = require('../../lib/module-public-api-constructor')
    const api = new Module('test')
    expect(api.on('test-event')).toBeDefined()
  })
})
