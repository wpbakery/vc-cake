/* global describe, it, expect */

require('../_full_api_test')

describe('add service', function () {
  it('creates new service. Check does it exists', function () {
    const vcCake = require('../../index')
    const service = {
      test: function () {
        return 'testString'
      }
    }
    vcCake.addService('test', service)
    expect(vcCake.getService('test')).toEqual(service)
  })
})
