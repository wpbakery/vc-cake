/* global describe, it, expect */

require('../_full_api_test')

describe('Environment variables', function () {
  it('sets debug env variable and check is it set', function () {
    const vcCake = require('../../index')
    expect(vcCake.env('debug', true).env('debug')).toBe(true)
  })
})
