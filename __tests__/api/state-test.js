/* global describe, it, expect */

require('../_full_api_test')

describe('running', function () {
  it('creates new app and start it. Check does it have a correct state', function () {
    const vcCake = require('../../index')
    vcCake.start(function () {
      // test
    })
    expect(vcCake.state()).toBe('running')
    expect(vcCake.end().state()).toBe('stopped')
  })
})
