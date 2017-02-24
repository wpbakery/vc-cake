/* global describe, it, expect */

require('../_full_api_test')

describe('Storage states', function () {
  it('creates new storage with a new state. Does it stores value.', function () {
    var vcCake = require('../../index')
    var testValue = 'new value'
    var test = vcCake.getStorage('test')
    var stateChecking = test.state('checking')
    stateChecking.set(testValue)
    expect(stateChecking.get()).toBe(testValue)
  })
  it('creates new storage with a new state. Check does onChange is triggered when new data set.', function () {
    var vcCake = require('../../index')
    var testValue = 'new value 2'
    var test = vcCake.getStorage('test')
    var stateChecking = test.state('checking')
    stateChecking.onChange(function (value) {
      expect(value).toBe(testValue)
    })
    stateChecking.set(testValue)
  })
  it('creates new storage with a new state. Check does ignore Changes is triggered when new data set.', function () {
    var vcCake = require('../../index')
    var testValue = 'new value 2'
    var test = vcCake.getStorage('test')
    var stateChecking = test.state('checking')
    var counter = 0

    var callbackToCall = function (value) {
      expect(value).toBe(testValue)
      counter += 1
    }
    stateChecking.onChange(callbackToCall)
    stateChecking.set(testValue)
    stateChecking.ignoreChange(callbackToCall)
    stateChecking.set('newValue not observable value')
    expect(counter).toBe(1)
  })
})
