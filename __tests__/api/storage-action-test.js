/* global describe, it, expect */

require('../_full_api_test')

describe('Storage actions', function () {
  it('creates new storage with a new action. Does it update value', function () {
    var vcCake = require('../../index')
    var testValue = 'new value'
    var valueMustBe = 'updated value'
    var valueMustBeTwice = 'updated value twice'
    var test = vcCake.getStorage('test')
    var stateChecking = test.registerAction('updateValue', function (newValue) {
      testValue = newValue
    })
    stateChecking.call(valueMustBe)
    expect(testValue).toBe(valueMustBe)
    test.action('updateValue').call(valueMustBeTwice)
    expect(testValue).toBe(valueMustBeTwice)
  })
  it('creates new storage without registration with disabled debug mode', function () {
    var vcCake = require('../../index')
    var testValue = 'new value'
    var valueMustBe = 'updated value'
    var test = vcCake.getStorage('test')
    var stateChecking = test.action('unregisteredValue')
    vcCake.env('debug', false)
    stateChecking.call(valueMustBe)
    expect(testValue).not.toBe(valueMustBe)
  })
})
