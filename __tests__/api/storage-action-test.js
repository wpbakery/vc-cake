/* global describe, it, expect */

require('../_full_api_test')

describe('Storage actions', function () {
  it('creates new storage with a new action. Does it update value', function () {
    var vcCake = require('../../index')
    var test = vcCake.getStorage('test')
    test.registerAction('multiply', function (x, y) {
      return x * y
    })
    expect(test.action('multiply', 2, 3)).toBe(6)
  })
})
