/* global describe, it, expect, jest */
jest.useFakeTimers()
require('../_full_api_test')

describe('Storage states ignoreChane bug', function () {
  it('creates new storage with a new state. Check does ignoreChange disables callback is called inside called callback .', function () {
    var vcCake = require('../../index')
    var testValue = 'value'
    var stateThatMustBeSet = 'new value 2'
    var test = vcCake.getStorage('test')
    var stateChecking = test.state('checking')
    var state2Checking = test.state('checking2')
    // Create custom function
    var removeFn = function () {
      stateChecking.ignoreChange(myFunc2)
    }
    var myFunc = function () {
      state2Checking.set(testValue)
      removeFn()
    }
    var myFunc2 = function () {
      state2Checking.set(stateThatMustBeSet)
    }
    stateChecking.set(true)
    setTimeout(function () {
      stateChecking.onChange(myFunc)
      stateChecking.onChange(myFunc2)
    }, 1)
    setTimeout(function () {
      stateChecking.set(false)
    }, 3)
    jest.runAllTimers()
    expect(state2Checking.get()).toBe(stateThatMustBeSet)
  })
})
